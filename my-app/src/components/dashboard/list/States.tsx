import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";


const FitBounds = ({ geoData }: { geoData: any }) => {
  const map = useMap();
  
  useEffect(() => {
    if (geoData) {
      const layer = L.geoJSON(geoData);
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    }
  }, [geoData, map]);
  
  return null;
};

const States = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    fetch("/nigeria-states-shapefile.geojson")

      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    const stateName = feature.properties.name || feature.properties.NAME || "Unknown State";
    
    // Hover effect
    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#666',
          fillOpacity: 0.7
        });
        setHoveredState(stateName);
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#3388ff',
          fillOpacity: 0.4
        });
        setHoveredState(null);
      },
      click: () => {
        // Navigate to state details page
        setSelectedState({
          name: stateName,
          capital: feature.properties.capital || "N/A",
          population: feature.properties.population || "N/A",
          area: feature.properties.area || "N/A"
        });
      }
    });

    layer.bindTooltip(stateName, {
      permanent: false,
      direction: 'center',
      className: 'state-label'
    });
  };

  const style = {
    fillColor: '#3388ff',
    weight: 2,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0.4
  };

  if (selectedState) {
    return (
      <div className="w-full h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setSelectedState(null)}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            ← Back to Map
          </button>
          
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{selectedState.name}</h1>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-700">Capital</h2>
              <p className="text-lg text-gray-600">{selectedState.capital}</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-700">Population</h2>
              <p className="text-lg text-gray-600">{selectedState.population}</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-700">Area</h2>
              <p className="text-lg text-gray-600">{selectedState.area}</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> This is a demo page. In a real application, you would fetch 
              detailed state information from an API or database and display comprehensive details 
              about {selectedState.name}.
            </p>
           
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      {hoveredState && (
        <div className="absolute top-4 left-4 z-[1000] bg-white px-4 py-2 rounded shadow-lg">
          <p className="font-semibold text-gray-800">{hoveredState}</p>
        </div>
      )}
      
      <MapContainer
        center={[9.0820, 8.6753]}
        zoom={6}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {geoData && (
          <>
            <GeoJSON 
              data={geoData} 
              style={style}
              onEachFeature={onEachFeature}
            />
            <FitBounds geoData={geoData} />
          </>
        )}
      </MapContainer>

      <style>{`
        .state-label {
          background: transparent;
          border: none;
          box-shadow: none;
          font-weight: 600;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default States;