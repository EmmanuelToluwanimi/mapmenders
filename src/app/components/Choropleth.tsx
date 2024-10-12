// import { useEffect } from "react";
// import L from "leaflet";
// import { getColor, healthCenterDensity } from "@/utils/constants";
// // import 'leaflet/dist/leaflet.css';
// // import nigeriaGeoJson from '/path/to/nigeriaGeoJson.json'; // The GeoJSON data of Nigeria

// export default function ChoroplethMap() {
//   useEffect(() => {
//     const map = L.map("map").setView([9.082, 8.6753], 6); // Nigeria's center

//     // Tile Layer for the base map
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
//       map
//     );

//     // Style function for the choropleth
//     const style = (feature: any) => {
//       const stateName = feature.properties.name; // Assume the GeoJSON has a name property for each state
//       const density = healthCenterDensity[stateName] || 0; // Default to 0 if no data
//       return {
//         fillColor: getColor(density),
//         weight: 2,
//         opacity: 1,
//         color: "white",
//         fillOpacity: 0.7,
//       };
//     };

//     // Add the GeoJSON layer to the map
//     L.geoJson(nigeriaGeoJson, { style }).addTo(map);

//     return () => {
//       map.remove();
//     };
//   }, []);

//   return <div id="map" className="h-screen w-full"></div>;
// }
