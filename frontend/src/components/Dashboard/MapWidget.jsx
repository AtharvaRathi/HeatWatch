import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to dynamically change map view
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapWidget({ city, riskLevel }) {
  const [coordinates, setCoordinates] = useState([20.5937, 78.9629]); // Default to India center
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    
    // Fetch coordinates using Nominatim API (Free, no key required)
    const fetchCoordinates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error("Failed to fetch coordinates for map", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoordinates();
  }, [city]);

  const getColor = (risk) => {
    switch (risk) {
      case 'Severe': return '#EF4444'; // Red
      case 'Moderate': return '#F97316'; // Orange
      case 'Low': return '#22C55E'; // Green
      default: return '#3B82F6'; // Blue
    }
  };

  return (
    <div className="card h-64 overflow-hidden relative z-0">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <span className="text-white animate-pulse">Loading Map...</span>
        </div>
      )}
      <MapContainer 
        center={coordinates} 
        zoom={loading ? 4 : 10} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <ChangeView center={coordinates} zoom={loading ? 4 : 11} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map
        />
        {!loading && (
          <>
            <Marker position={coordinates}>
              <Popup>
                <div className="text-gray-800 font-medium">
                  {city}
                  <br />
                  Risk Level: <span style={{ color: getColor(riskLevel) }}>{riskLevel}</span>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={coordinates} 
              pathOptions={{ fillColor: getColor(riskLevel), color: getColor(riskLevel), fillOpacity: 0.3 }} 
              radius={15000} // 15km radius
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}
