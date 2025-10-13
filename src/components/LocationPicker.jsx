"use client";

import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ✅ Fix default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Helper: Get coordinates from pincode
async function getLocationFromPincode(pincode) {
  try {
    const res1 = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data1 = await res1.json();

    if (!data1[0] || data1[0].Status !== "Success") return { error: "Invalid pincode" };

    const office = data1[0].PostOffice[0];
    const locationDetails = {
      district: office.District,
      state: office.State,
      country: office.Country || "India",
    };

    // Nominatim search
    let res2 = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India&limit=1`
    );
    let data2 = await res2.json();

    let coordinates = null;
    if (data2.length > 0) coordinates = { lat: parseFloat(data2[0].lat), lng: parseFloat(data2[0].lon) };

    // Fallback: district + state
    if (!coordinates) {
      const query = `${office.District}, ${office.State}, India`;
      res2 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      data2 = await res2.json();
      if (data2.length > 0) coordinates = { lat: parseFloat(data2[0].lat), lng: parseFloat(data2[0].lon) };
    }

    return { ...locationDetails, coordinates };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { error: "Failed to fetch location" };
  }
}

// ✅ Recenter map and zoom to pinned location
function RecenterZoom({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (!coordinates) return;

    // Zoom to the circle around pinned location (approx 20km)
    const radius = 20000; // meters
    map.fitBounds([
      [coordinates.lat - 0.2, coordinates.lng - 0.2],
      [coordinates.lat + 0.2, coordinates.lng + 0.2],
    ]);

    // Optional: keep map max bounds restricted to India
    const indiaBounds = [
      [6.5546079, 68.1100483], // SW
      [35.6745457, 97.395561], // NE
    ];
    map.setMaxBounds(indiaBounds);
    map.setMinZoom(5);
    map.setMaxZoom(12);
  }, [coordinates, map]);
  return null;
}

// ✅ Main Component
export function MapSelector({ pincode = "", onSelect }) {
  const [coordinates, setCoordinates] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pincode) return;

    async function fetchCoords() {
      setLoading(true);
      const result = await getLocationFromPincode(pincode);
      if (!result.error && result.coordinates) {
        setCoordinates(result.coordinates);
        setLocationInfo(result);
        onSelect?.(result);
      }
      setLoading(false);
    }

    fetchCoords();
  }, [pincode, onSelect]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center h-72 bg-gray-100 rounded-md">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}

      {!loading && coordinates && (
        <MapContainer
          center={coordinates}
          zoom={6}
          style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          attributionControl={false}
        >
          <RecenterZoom coordinates={coordinates} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          <Marker position={coordinates} />
          <Circle
            center={coordinates}
            radius={20000} // 20km
            pathOptions={{ color: "blue", fillColor: "#blue", fillOpacity: 0.2 }}
          />
        </MapContainer>
      )}

      {locationInfo && (
        <div className="mt-2 text-sm text-gray-600">
          📍 {locationInfo.district}, {locationInfo.state}, {locationInfo.country}
        </div>
      )}
    </div>
  );
}


