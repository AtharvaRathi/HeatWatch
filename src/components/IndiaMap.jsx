import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { mockIndiaStatesMapData } from '../data/mockData';
import { Flame, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const INDIA_GEOJSON_URL = '/india-topo.json';

const stateNameMap = {
  "Rajasthan": "RJ",
  "Maharashtra": "MH",
  "Uttar Pradesh": "UP",
  "Gujarat": "GJ",
  "Delhi": "DL",
  "Madhya Pradesh": "MP",
  "Telangana": "TS",
  "Andhra Pradesh": "AP",
  "Bihar": "BR",
  "Orissa": "OR", 
  "Odisha": "OR", 
  "Karnataka": "KA",
  "Tamil Nadu": "TN",
  "West Bengal": "WB"
};

const IndiaMap = ({ onSelectState, selectedStateId }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ coordinates: [80, 22], zoom: 1 });

  const getSeverityColor = (code) => {
    switch (code) {
      case 'red': return '#F43F5E';
      case 'orange': return '#FB923C';
      case 'yellow': return '#FBBF24';
      case 'green': return '#34D399';
      default: return '#1E293B'; // default dark gray for states without data
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Map our mock data to a fast lookup dictionary
  const stateDataMap = useMemo(() => {
    const map = {};
    mockIndiaStatesMapData.forEach(st => {
      map[st.id] = st;
    });
    return map;
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[#121214] rounded-2xl p-4 overflow-hidden border border-white/[0.05] shadow-2xl flex flex-col justify-between">
      {/* Map Header Controls */}
      <div className="flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2 bg-[#1a1a1e]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/[0.05]">
          <Flame className="text-amber-500 animate-pulse" size={18} />
          <span className="text-xs font-bold text-zinc-300">Live Telemetry Map</span>
        </div>

        <div className="flex items-center gap-1 bg-[#1a1a1e]/80 backdrop-blur p-1 rounded-lg border border-white/[0.05]">
          <button onClick={handleZoomIn} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded transition" title="Zoom In">
            <ZoomIn size={16} />
          </button>
          <button onClick={handleZoomOut} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded transition" title="Zoom Out">
            <ZoomOut size={16} />
          </button>
          <button onClick={handleResetZoom} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded transition" title="Reset View">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 850 * zoomLevel,
            center: [80, 23]
          }}
          className="w-full h-full max-h-[500px]"
        >
          <Geographies geography={INDIA_GEOJSON_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.NAME_1;
                const stateCode = stateNameMap[stateName];
                const stateData = stateCode ? stateDataMap[stateCode] : null;
                
                const isSelected = selectedStateId === stateCode;
                const isHovered = hoveredState?.id === stateCode;
                
                const defaultFill = stateData ? getSeverityColor(stateData.code) : '#1a1a1e';
                const strokeColor = '#3f3f46'; // zinc-700
                const hoverFill = stateData ? getSeverityColor(stateData.code) : '#27272a';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (stateData) setHoveredState(stateData);
                    }}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => {
                      if (stateData) onSelectState(stateData);
                    }}
                    style={{
                      default: {
                        fill: defaultFill,
                        fillOpacity: isSelected ? 1 : 0.8,
                        stroke: isSelected ? '#fff' : strokeColor,
                        strokeWidth: isSelected ? 2 : 0.5,
                        outline: 'none',
                        transition: 'all 250ms ease'
                      },
                      hover: {
                        fill: hoverFill,
                        fillOpacity: 1,
                        stroke: stateData ? '#fff' : strokeColor,
                        strokeWidth: stateData ? 1.5 : 0.5,
                        outline: 'none',
                        cursor: stateData ? 'pointer' : 'default',
                        transition: 'all 250ms ease'
                      },
                      pressed: {
                        fill: defaultFill,
                        stroke: '#fff',
                        strokeWidth: 2,
                        outline: 'none'
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Floating Tooltip */}
        {hoveredState && (
          <div className="absolute top-4 left-4 glass-card bg-[#0f0f11]/95 text-white px-4 py-3 rounded-xl border border-white/[0.05] shadow-2xl z-20 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm tracking-wide">{hoveredState.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                hoveredState.code === 'red' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                hoveredState.code === 'orange' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                hoveredState.code === 'yellow' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {hoveredState.severity}
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-3">
              <span>Temp: <strong className="text-zinc-100">{hoveredState.temp}</strong></span>
              <span>Risk Prob: <strong className="text-amber-400">{hoveredState.heatwaveProb}%</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Legend Bar */}
      <div className="z-10 bg-[#1a1a1e]/80 backdrop-blur p-3 rounded-xl border border-white/[0.05] flex flex-wrap justify-between items-center text-xs text-zinc-400 relative">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-zinc-300">Severity Level:</span>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span> Severe</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]"></span> Heatwave</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span> Warning</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span> Normal</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#1E293B]"></span> No Data</div>
        </div>
        <span className="text-[11px] text-zinc-500 hidden md:inline">Click any highlighted state to view insights</span>
      </div>
    </div>
  );
};

export default IndiaMap;
