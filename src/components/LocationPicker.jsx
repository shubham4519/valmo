"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ✅ Fix default Leaflet icon issue
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
// ✅ Helper: Get coordinates from pincode
async function getLocationFromPincode(pincode) {
  try {
    // 1. Validate & fetch details from Postal API
    const res1 = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data1 = await res1.json();

    if (!data1[0] || data1[0].Status !== "Success") {
      return { error: "Invalid pincode" };
    }

    const office = data1[0].PostOffice[0];
    const locationDetails = {
      district: office.District,
      state: office.State,
      country: office.Country || "India",
    };

    // 2. First try postalcode-based search
    let res2 = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India&limit=1`
    );
    let data2 = await res2.json();

    let coordinates = null;
    if (data2.length > 0) {
      coordinates = {
        lat: parseFloat(data2[0].lat),
        lng: parseFloat(data2[0].lon),
      };
    }

    // 3. Fallback: Search by district + state
    if (!coordinates) {
      const query = `${office.District}, ${office.State}, India`;
      res2 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      );
      data2 = await res2.json();

      if (data2.length > 0) {
        coordinates = {
          lat: parseFloat(data2[0].lat),
          lng: parseFloat(data2[0].lon),
        };
      }
    }

    return { ...locationDetails, coordinates };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { error: "Failed to fetch location" };
  }
}


// ✅ Draggable Marker
function DraggableMarker({ position, onChange }) {
  const [markerPosition, setMarkerPosition] = useState(position);

  useMapEvents({
    click(e) {
      const latlng = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(latlng);
      onChange(latlng);
    },
  });

  return (
    <Marker
      position={markerPosition}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          const newPos = [latlng.lat, latlng.lng];
          setMarkerPosition(newPos);
          onChange(newPos);
        },
      }}
    />
  );
}

// ✅ Main Component
export function MapSelector({ pincode = "110001", onSelect }) {
  const [coordinates, setCoordinates] = useState([28.6328, 77.2197]); // Default Delhi
  const [loading, setLoading] = useState(true);
  const [locationInfo, setLocationInfo] = useState(null);

  useEffect(() => {
    async function fetchCoords() {
      setLoading(true);
      const result = await getLocationFromPincode(pincode);

      if (!result.error && result.coordinates) {
        setCoordinates([result.coordinates.lat, result.coordinates.lng]);
        setLocationInfo(result);
        onSelect?.(result); // send back location info
      }
      setLoading(false);
    }
    fetchCoords();
  }, [pincode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72 bg-gray-100 rounded-md">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div>
      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DraggableMarker
          position={coordinates}
          onChange={(pos) =>
            onSelect?.({ ...locationInfo, coordinates: { lat: pos[0], lng: pos[1] } })
          }
        />
      </MapContainer>

      {locationInfo && (
        <div className="mt-2 text-sm text-gray-600">
          📍 {locationInfo.district}, {locationInfo.state}, {locationInfo.country}
        </div>
      )}
    </div>
  );
}

