"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Draggable Marker component
function DraggableMarker({ position, onChange }) {
  const [markerPosition, setMarkerPosition] = useState(position);

  useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      onChange(e.latlng);
    },
  });

  return markerPosition ? (
    <Marker
      position={markerPosition}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setMarkerPosition([latlng.lat, latlng.lng]);
          onChange(latlng);
        },
      }}
    />
  ) : null;
}

// Helper: get coordinates from city name
async function getLocationFromPincode(pincode) {
  try {
    // 1. Validate pincode & get district/state using India Postal API
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

    // 2. Fetch coordinates from Nominatim
    const res2 = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India`
    );
    const data2 = await res2.json();

    let coordinates = null;
    if (data2.length > 0) {
      coordinates = {
        lat: parseFloat(data2[0].lat),
        lng: parseFloat(data2[0].lon),
      };
    }

    // 3. Return merged object
    return {
      ...locationDetails,
      coordinates,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { error: "Failed to fetch location" };
  }
}

export function MapSelector({ city = "Pune", onSelect }) {
  const [coordinates, setCoordinates] = useState([28.6328, 77.2197]); // default center
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoords() {
      setLoading(true);
      const coord = await getLocationFromPincode(city); // city contains pincode
      if (coord) setCoordinates([coord.coordinates?.lat, coord.coordinates?.lng]);
      setLoading(false);
    }
    fetchCoords();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72 bg-gray-100 rounded-md">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker position={coordinates} onChange={e=>console.log('done')} />
    </MapContainer>
  );
}


