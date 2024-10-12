// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { HealthCenter, StateData } from "@/interface";
// import { Assets } from "@/utils/constants"; // Asset paths for icons
// import MapLegend from "./Maplegend";
// import HealthCenterSearch from "./Actionscomponent"; // Search or filter component
// import PopupContent from "./Popup";
// import FixedCompass from "./FixedCompass";

// interface HealthCentersMapProps {
//   filterQuery: string;
//   isOpen: boolean;
//   setIsOpen: (value: boolean) => void;
// }

// // Interfaces for StateData and HealthCenter
// interface StateData {
//   latitude: number;
//   longitude: number;
//   statename: string;
//   Capital: string;
//   No_of_LGA: number;
//   No_of_Primary: number;
//   No_of_Secondary: number;
//   No_of_Tertiary: number;
//   Total: number;
// }

// interface HealthCenter {
//   latitude: number;
//   longitude: number;
//   wardname: string;
//   wardcode: string;
//   lganame: string;
//   lgacode: number;
//   statename: string;
//   func_stats: string;
//   category: string;
//   ownership: string;
//   type: string;
//   prmry_name: string;
// }

// const HealthCentersMap = ({ filterQuery, isOpen, setIsOpen }: HealthCentersMapProps) => {
//   const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
//   const [statesData, setStatesData] = useState<StateData[]>([]); // Load states data
//   const [filteredHealthCenters, setFilteredHealthCenters] = useState<HealthCenter[]>([]);
//   const [activeState, setActiveState] = useState<StateData | null>(null);

//   const DefaultIcon = L.icon({
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     shadowSize: [41, 41],
//   });
//   L.Marker.prototype.options.icon = DefaultIcon;

//   const publicHealthIcon = L.icon({
//     iconUrl: Assets.greenIcon, // Path to your green icon
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     shadowSize: [41, 41],
//   });

//   const privateHealthIcon = L.icon({
//     iconUrl: Assets.redIcon, // Path to your red icon
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     shadowSize: [41, 41],
//   });

//   // Fetch state data on load
//   async function loadStates() {
//     const response = await fetch(`/data/state.json`);
//     const data: StateData[] = await response.json();
//     setStatesData(data);
//   }

//   // Fetch health centers based on state
//   async function loadHealthCentersForState(stateName: string) {
//     const response = await fetch(`/data/nga.json`);
//     const allHealthCenters: HealthCenter[] = await response.json();
//     const filteredCenters = allHealthCenters.filter(center => center.statename === stateName);
//     setHealthCenters(filteredCenters); // Store all centers for state
//     applyFilter(filteredCenters); // Apply the filter immediately when loaded
//   }

//   const MapZoomToState = ({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView([lat, lng], zoom, {
//         animate: true,
//       });
//     }, [lat, lng, zoom, map]);
//     return null;
//   };

//   const handleStateClick = (state: StateData) => {
//     setActiveState(state); // Set active state for zooming and filtering
//     loadHealthCentersForState(state.statename); // Load health centers for the clicked state
//   };

//   // Apply the filter based on `filterQuery`
//   const applyFilter = (centers: HealthCenter[]) => {
//     const filteredCenters = centers.filter(center => {
//       // Add conditions for filtering based on query
//       return (
//         (filterQuery === "Public" && center.ownership === "Local Government Area") ||
//         (filterQuery === "Private" && center.ownership !== "Local Government Area") ||
//         (filterQuery === "" || filterQuery === "All") // Show all if no filter or All selected
//       );
//     });
//     setFilteredHealthCenters(filteredCenters);
//   };

//   // Filter health centers when the filterQuery changes
//   useEffect(() => {
//     applyFilter(healthCenters); // Apply filtering to the current list of health centers
//   }, [filterQuery, healthCenters]);

//   // Zoom event listener for dynamic loading
//   function ZoomListener() {
//     const map = useMapEvents({
//       zoomend: () => {
//         if (map.getZoom() > 8 && activeState) {
//           loadHealthCentersForState(activeState.statename);
//         }
//       },
//     });
//     return null;
//   }

//   useEffect(() => {
//     loadStates(); // Load states when the component mounts
//   }, []);

//   return (
//     <section className="h-screen">
//       <MapContainer
//         center={[9.0820, 8.6753]} // Center the map in Nigeria
//         zoom={6}
//         className="h-full w-full"
//         zoomControl={false}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <FixedCompass />
//         <MapLegend />
//         <ZoomListener />

//         {/* Display state markers */}
//         {statesData.map((state) => (
//           <Marker
//             key={state.statename}
//             position={[state.latitude, state.longitude]}
//             icon={DefaultIcon}
//             eventHandlers={{
//               click: () => handleStateClick(state),
//             }}
//           >
//             <Popup>
//               <div>
//                 <h4>{state.statename}</h4>
//                 <p>Capital: {state.Capital}</p>
//                 <p>LGAs: {state.No_of_LGA}</p>
//                 <p>Total Health Centers: {state.Total}</p>
//               </div>
//             </Popup>
//             {/* Center the map to the clicked state's location and zoom in */}
//             {activeState?.statename === state.statename && (
//               <MapZoomToState lat={state.latitude} lng={state.longitude} zoom={9} />
//             )}
//           </Marker>
//         ))}

//         {/* Display filtered health center markers */}
//         {filteredHealthCenters.map((center) => {
//           const icon = center.ownership === "Local Government Area" ? publicHealthIcon : privateHealthIcon;
//           return (
//             <Marker
//               key={center.prmry_name}
//               position={[center.latitude, center.longitude]}
//               icon={icon}
//             >
//               <Popup>
//                 <PopupContent center={center} />
//               </Popup>
//             </Marker>
//           );
//         })}
//       </MapContainer>
//     </section>
//   );
// };

// export default HealthCentersMap;

