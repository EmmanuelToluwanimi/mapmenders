// import { useEffect } from 'react';
// import L from 'leaflet';

// export default function MapPage() {
//   useEffect(() => {
//     const map = L.map('map').setView([9.0820, 8.6753], 6); // Nigeria's center

//     // Tile Layer (OpenStreetMap)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//     // Example state data with coordinates and health centers
//     const states = {
//       "Lagos": { 
//         coords: [6.5244, 3.3792], 
//         healthCenters: [
//           { lat: 6.5, lng: 3.4 }, 
//           { lat: 6.52, lng: 3.39 }
//         ] 
//       },
//       "Kano": { 
//         coords: [12.0022, 8.5919], 
//         healthCenters: [
//           { lat: 12.01, lng: 8.6 }, 
//           { lat: 12.02, lng: 8.59 }
//         ]
//       },
//       // Add more states and their health centers here
//     };

//     // Create state markers
//     const stateMarkers = Object.keys(states).map(stateName => {
//       const stateData = states[stateName];
//       const marker = L.marker(stateData.coords).addTo(map).bindPopup(stateName);

//       marker.on('click', () => {
//         map.setView(stateData.coords, 10); // Zoom to state

//         // Show health centers within the state
//         const healthMarkers = stateData.healthCenters.map(center => {
//           return L.marker([center.lat, center.lng]).addTo(map).bindPopup('Health Center');
//         });

//         // On zoom out, reset the map view to the state level
//         map.on('zoomend', () => {
//           if (map.getZoom() < 8) {
//             healthMarkers.forEach(marker => marker.remove()); // Remove health markers
//             map.setView([9.0820, 8.6753], 6); // Reset to Nigeria's map
//           }
//         });
//       });

//       return marker;
//     });

//     // Clean up map instance on unmount
//     return () => {
//       map.remove();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-2xl font-bold mb-4">Map of Nigeria</h1>
//       <div id="map" className="w-full h-[500px] bg-gray-200 rounded-lg shadow-md"></div>
//     </div>
//   );
// }
