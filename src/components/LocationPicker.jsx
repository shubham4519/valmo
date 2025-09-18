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
async function getCoordinatesFromCity(cityName) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
  }
  return { lat: 28.6328, lng: 77.2197 }; // fallback coordinates (Pune)
}

export function MapSelector({ city = "Pune", onSelect }) {
  const [coordinates, setCoordinates] = useState([28.6328, 77.2197]); // default center
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoords() {
      setLoading(true);
      const coord = await getCoordinatesFromCity(city);
      if (coord) setCoordinates([coord.lat, coord.lng]);
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
