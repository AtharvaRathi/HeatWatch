import React, { useState, useMemo } from 'react';
import { Flame, Search, RefreshCw } from 'lucide-react';
import { mockHotspots } from '../data/mockData';
import HotspotCard from '../components/HotspotCard';
import EmptyState from '../components/EmptyState';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const HeatwaveHotspots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState('riskScore');

  const states = useMemo(() => ['All', ...new Set(mockHotspots.map(h => h.state))], []);

  const filteredHotspots = useMemo(() => {
    return mockHotspots
      .filter(item => {
        const matchesSearch = item.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.state.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesColor = selectedColor === 'All' || item.riskColor === selectedColor;
        const matchesState = selectedState === 'All' || item.state === selectedState;
        return matchesSearch && matchesColor && matchesState;
      })
      .sort((a, b) => {
        if (sortBy === 'riskScore') return b.riskScore - a.riskScore;
        if (sortBy === 'temp') return b.temp - a.temp;
        if (sortBy === 'confidence') return b.confidence - a.confidence;
        return a.city.localeCompare(b.city);
      });
  }, [searchTerm, selectedColor, selectedState, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedColor('All');
    setSelectedState('All');
    setSortBy('riskScore');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            <Flame size={28} strokeWidth={1.5} className="text-rose-400" />
            Heatwave Hotspots
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Vulnerability ranking calculated by risk score algorithms and surface temperature metrics.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="relative z-10 flex items-center gap-2 py-2 px-4 rounded-xl glass-card text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition"
        >
          <RefreshCw size={16} strokeWidth={1.5} /> Reset View
        </button>
      </div>

      {/* CONTROLS BAR */}
      <div className="glass-card p-5 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-white/40" size={16} strokeWidth={1.5} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hotspot city..."
              className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm font-light text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          {/* Filter Color */}
          <div>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All Risk Colors</option>
              <option value="red" className="bg-[#1a1a1e]">Red (Severe)</option>
              <option value="orange" className="bg-[#1a1a1e]">Orange (Heatwave)</option>
              <option value="yellow" className="bg-[#1a1a1e]">Yellow (Warning)</option>
              <option value="green" className="bg-[#1a1a1e]">Green (Normal)</option>
            </select>
          </div>

          {/* Filter State */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All States</option>
              {states.filter(s => s !== 'All').map(s => <option key={s} value={s} className="bg-[#1a1a1e]">{s}</option>)}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="riskScore" className="bg-[#1a1a1e]">Sort by Risk Score</option>
              <option value="temp" className="bg-[#1a1a1e]">Sort by Temperature</option>
              <option value="confidence" className="bg-[#1a1a1e]">Sort by AI Confidence</option>
              <option value="city" className="bg-[#1a1a1e]">Sort by City Name</option>
            </select>
          </div>

        </div>
      </div>

      {/* HOTSPOTS GRID LAYOUT */}
      {filteredHotspots.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState onReset={handleReset} />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredHotspots.map((hotspot) => (
            <HotspotCard key={hotspot.id} hotspot={hotspot} />
          ))}
        </motion.div>
      )}

    </motion.div>
  );
};

export default HeatwaveHotspots;
