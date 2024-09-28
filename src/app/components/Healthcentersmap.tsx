"use client";
// components/HealthCentersMap.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { HealthCenter } from "@/interface";
import { Assets, selectedState } from "@/utils/constants";
import MapLegend from "./Maplegend";

// Default marker icon setup (Leaflet's default marker might not show in Next.js without this)
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const publicHealthIcon = L.icon({
  iconUrl: Assets.greenIcon, // Path to your green icon
  iconSize: [25, 41], // Adjust size if needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const privateHealthIcon = L.icon({
  iconUrl: Assets.redIcon, // Path to your red icon
  iconSize: [25, 41], // Adjust size if needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface HealthCentersMapProps {
  filter: string;
}

const HealthCentersMap = ({ filter: ownership }: HealthCentersMapProps) => {
  // const position = [6.5244, 3.3792] as LatLngExpression;
  const position = [7.25, 5.1931] as LatLngExpression;
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [filteredData, setFilteredData] = useState<HealthCenter[]>([]);
  const [sortedData, setSortedData] = useState<HealthCenter[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filtertQuery, setFiltertQuery] = useState({
    category: "",
    type: "",
    status: "",
    ownership,
  });

  async function GetLocations() {
    const response = await fetch(`/data/${selectedState}.json`);
    const data: HealthCenter[] = await response.json();
    setHealthCenters(data);
    return data;
  }

  function HandleFilter() {
    if (ownership === "private") {
      const newData = healthCenters.filter((arg) => !IsPublic(arg.ownership));
      setFilteredData(newData);
    } else if (ownership === "public") {
      const newData = healthCenters.filter((arg) => IsPublic(arg.ownership));
      setFilteredData(newData);
    } else {
      setFilteredData(healthCenters);
    }
  }

  function IsPublic(params: string) {
    return params !== "Others" && params !== "Private";
  }

  useEffect(() => {
    HandleFilter();
    if (healthCenters.length) return;
    GetLocations();
  }, [ownership, healthCenters]);

  return (
    <section className="h-screen">
      <MapContainer
        center={position}
        zoom={10}
        className="h-full w-full"
        zoomControl={false}
        // scrollWheelZoom={true}
        // center={[7.1, 5.1]}
        // zoom={9}
        // style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapLegend />

        {filteredData.map((center) => {
          const icon = IsPublic(center.ownership)
            ? publicHealthIcon
            : privateHealthIcon;
          return (
            <Marker
              key={center.globalid}
              position={[center.latitude, center.longitude]}
              icon={icon}
            >
              <Popup>
                <strong>{center.prmry_name}</strong>
                <br />
                <em>
                  {center.wardname}, {center.lganame} LGA
                </em>
                <br />
                <p>{center.category}</p>
                <p>Status: {center.func_stats}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
};

export default HealthCentersMap;
