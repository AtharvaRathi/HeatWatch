import React, { useState } from 'react';
import IndiaMap from '../components/IndiaMap';
import { mockIndiaStatesMapData } from '../data/mockData';
import { MapPin, Thermometer, Flame, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InteractiveHeatMap = () => {
  const [selectedState, setSelectedState] = useState(mockIndiaStatesMapData[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            <MapPin size={28} strokeWidth={1.5} className="text-amber-400" />
            Interactive Heat Map
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Displaying India state temperature distribution. Click any state for localized forecasts.
          </p>
        </div>
      </div>

      {/* MAP & PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Main Interactive Map (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 min-h-[600px] flex items-center justify-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
           <IndiaMap 
            selectedStateId={selectedState?.id}
            onSelectState={(st) => setSelectedState(st)}
          />
        </div>

        {/* State Side Panel (1 Col) */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-medium tracking-widest px-2.5 py-1 rounded-md uppercase border ${
                  selectedState.code === 'red' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  selectedState.code === 'orange' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  selectedState.code === 'yellow' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {selectedState.severity}
                </span>
                <span className="text-xs text-white/40 font-mono tracking-wider">ID: {selectedState.id}</span>
              </div>
              <h2 className="text-3xl font-light text-white">
                {selectedState.name}
              </h2>
            </div>
            <div className="p-3 rounded-xl glass-input text-white font-light text-xl border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              {selectedState.temp}
            </div>
          </div>

          {/* Forecast & Prob */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass-input border-white/10">
              <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase block mb-2">Tomorrow</span>
              <div className="flex items-center gap-2 font-light text-xl text-white">
                <Thermometer size={18} strokeWidth={1.5} className="text-rose-400" />
                {selectedState.forecastTomorrow}
              </div>
            </div>
            <div className="p-4 rounded-xl glass-input border-white/10">
              <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase block mb-2">Risk Prob</span>
              <div className="flex items-center gap-2 font-light text-xl text-amber-400">
                <Flame size={18} strokeWidth={1.5} />
                {selectedState.heatwaveProb}%
              </div>
            </div>
          </div>

          {/* Risk Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-light">
              <span className="text-white/70">Severity Exposure</span>
              <span className="text-amber-400">{selectedState.heatwaveProb}%</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" style={{ width: `${selectedState.heatwaveProb}%` }} />
            </div>
          </div>

          {/* Top Affected Cities */}
          <div>
            <h4 className="text-[10px] font-medium tracking-widest uppercase text-white/40 mb-3">High-Risk Cities</h4>
            <div className="flex flex-wrap gap-2">
              {selectedState.topCities.map(city => (
                <span key={city} className="px-3 py-1.5 bg-white/5 text-white/80 rounded-lg text-xs font-light border border-white/10">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Weather Summary */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-md">
            <h4 className="font-light text-amber-400 flex items-center gap-2 mb-2 text-sm">
              <Info size={16} strokeWidth={1.5} /> Weather Summary
            </h4>
            <p className="text-xs font-light text-amber-100/70 leading-relaxed">
              {selectedState.summary}
            </p>
          </div>

          {/* Action Link */}
          <Link
            to="/ai-advisory"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-card hover:bg-amber-500/20 text-white font-medium text-sm transition border border-white/10 hover:border-amber-500/30"
          >
            Generate Advisory <ChevronRight size={16} strokeWidth={1.5} />
          </Link>

        </div>

      </div>

    </motion.div>
  );
};

export default InteractiveHeatMap;
