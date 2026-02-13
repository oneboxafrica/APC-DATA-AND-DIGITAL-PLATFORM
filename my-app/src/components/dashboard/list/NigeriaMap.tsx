// import React, { useState } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { useNavigate } from "react-router-dom";

// // Local GeoJSON (place /public/nigeria.geojson with polygon geometries)
// const geoUrl = "/geoBoundaries-NGA-ADM1.geojson";

// // Demo data: Keys matched to GeoJSON's 'shapeName' property
// const stateData: { [key: string]: { capital?: string; population?: number } } = {
//   Abia: { capital: "Umuahia", population: 3727347 },
//   Adamawa: { capital: "Yola", population: 4440050 },
//   "Akwa Ibom": { capital: "Uyo", population: 5912431 },
//   Anambra: { capital: "Awka", population: 6200000 },
//   Bauchi: { capital: "Bauchi", population: 6932284 },
//   Bayelsa: { capital: "Yenagoa", population: 2211069 },
//   Benue: { capital: "Makurdi", population: 5909844 },
//   Borno: { capital: "Maiduguri", population: 5760000 },
//   "Cross River": { capital: "Calabar", population: 3954644 },
//   Delta: { capital: "Asaba", population: 5995705 },
//   Ebonyi: { capital: "Abakaliki", population: 2820891 },
//   Edo: { capital: "Benin City", population: 4620000 },
//   Ekiti: { capital: "Ado Ekiti", population: 3270798 },
//   Enugu: { capital: "Enugu", population: 4740000 },
//   "Abuja Federal Capital Territory": { capital: "Abuja", population: 3676727 }, // FCT
//   Gombe: { capital: "Gombe", population: 3632565 },
//   Imo: { capital: "Owerri", population: 5500000 },
//   Jigawa: { capital: "Dutse", population: 6286065 },
//   Kaduna: { capital: "Kaduna", population: 8900000 },
//   Kano: { capital: "Kano", population: 15000000 },
//   Katsina: { capital: "Katsina", population: 8500000 },
//   Kebbi: { capital: "Birnin Kebbi", population: 4440050 },
//   Kogi: { capital: "Lokoja", population: 4633145 },
//   Kwara: { capital: "Ilorin", population: 3667197 },
//   Lagos: { capital: "Ikeja", population: 15000000 },
//   Nasarawa: { capital: "Lafia", population: 2523395 },
//   Niger: { capital: "Minna", population: 5676363 },
//   Ogun: { capital: "Abeokuta", population: 7860970 },
//   Ondo: { capital: "Akure", population: 5185625 },
//   Osun: { capital: "Osogbo", population: 5164401 },
//   Oyo: { capital: "Ibadan", population: 8081091 },
//   Plateau: { capital: "Jos", population: 4356697 },
//   Rivers: { capital: "Port Harcourt", population: 7058000 },
//   Sokoto: { capital: "Sokoto", population: 5107602 },
//   Taraba: { capital: "Jalingo", population: 3200000 },
//   Yobe: { capital: "Damaturu", population: 3300000 },
//   Zamfara: { capital: "Gusau", population: 4437285 },
// };

// export default function NigeriaMap() {
//   const [hoveredState, setHoveredState] = useState<{ name: string; capital: string; population?: number } | null>(null);
//   const navigate = useNavigate();

// const handleStateClick = (geo: any) => {
//     const stateName = geo.properties.shapename || geo.properties.shapeName || geo.properties.name || geo.properties.NAME;
//     console.log("Clicked state:", stateName); // Debug log
//     if (!stateName) return;
    
//     // Convert to slug for routing
//     let displayName = stateName;
//     if (stateName === "Abuja Federal Capital Territory") displayName = "FCT-Abuja";
//     const slug = displayName.toLowerCase().replace(/\s+/g, "-");
//     navigate(`/states/${slug}`);
//   };

//   const handleStateHover = (geo: any) => {
//     const stateName = geo.properties.shapename || geo.properties.shapeName || geo.properties.name || geo.properties.NAME;
//     console.log("Hovered state:", stateName); // Debug log
//     if (!stateName) return;
    
//     const data = stateData[stateName];
//     const displayName = stateName === "Abuja Federal Capital Territory" ? "FCT-Abuja" : stateName;
    
//     setHoveredState({
//       name: displayName,
//       capital: data?.capital || "N/A",
//       population: data?.population,
//     });
//   };

//   return (
//     <div className="relative w-full bg-gray-50 p-4 rounded-lg shadow-lg"> {/* Full width */}
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={{
//           scale: 1200,
//           center: [8.5, 9.5], // Centered on Nigeria
//         }}
//         style={{ width: "100%", height: "auto", minHeight: "400px" }} // Responsive height
//       >
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo: any) => {
//               const stateName = geo.properties.shapeName;
//               const data = stateData[stateName];
//               const isHovered = hoveredState?.name === (stateName === "Federal Capital Territory" ? "FCT-Abuja" : stateName);
//               const pop = data?.population || 0;
//               // Color based on population (darker for higher)
//               const fillColor = pop > 5000000 ? "#dc2626" : pop > 3000000 ? "#f97316" : "#10b981";

//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   onMouseEnter={() => handleStateHover(geo)}
//                   onMouseLeave={() => setHoveredState(null)}
//                   onClick={() => handleStateClick(geo)}
//                   onTouchStart={() => handleStateHover(geo)}
//                   style={{
//                     default: {
//                       fill: isHovered ? "#f59e0b" : fillColor,
//                       stroke: "#fff",
//                       strokeWidth: 1,
//                       outline: "none",
//                       cursor: "pointer",
//                       transition: "all 250ms ease-in-out",
//                     },
//                     hover: {
//                       fill: "#f59e0b",
//                       stroke: "#fff",
//                       strokeWidth: 2,
//                       outline: "none",
//                       cursor: "pointer",
//                     },
//                     pressed: {
//                       fill: "#b45309",
//                       outline: "none",
//                     },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>

//       {/* Enhanced Tooltip */}
//       {hoveredState && (
//         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-3 min-w-[200px] z-10 pointer-events-none">
//           <h3 className="font-bold text-gray-900">{hoveredState.name}</h3>
//           <p className="text-sm text-gray-600">Capital: {hoveredState.capital}</p>
//           {hoveredState.population && (
//             <p className="text-sm text-gray-600">Population: {hoveredState.population.toLocaleString()}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }