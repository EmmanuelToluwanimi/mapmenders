"use client";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from 'leaflet';

const MapComponent = () => {
  // Coordinates for Lagos, Nigeria
  // const position = [6.5244, 3.3792] as LatLngExpression;
  const position = [7.25, 5.1931] as LatLngExpression;

  return (
    <div className="h-screen">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Lagos, Nigeria</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
