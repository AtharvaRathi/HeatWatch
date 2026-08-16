import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Flame, 
  Thermometer, 
  Droplets, 
  Wind, 
  RefreshCw, 
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CloudSun
} from 'lucide-react';
import { mockCitiesWeather } from '../data/mockData';
import EmptyState from '../components/EmptyState';
import { motion } from 'framer-motion';

const WeatherMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-07-26');
  const [sortField, setSortField] = useState('temp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const regions = useMemo(() => ['All', ...new Set(mockCitiesWeather.map(item => item.region))], []);
  const states = useMemo(() => ['All', ...new Set(mockCitiesWeather.map(item => item.state))], []);

  const filteredData = useMemo(() => {
    return mockCitiesWeather.filter(item => {
      const matchesSearch = item.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
      const matchesState = selectedState === 'All' || item.state === selectedState;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchesSearch && matchesRegion && matchesState && matchesStatus;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (sortDirection === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [searchTerm, selectedRegion, selectedState, selectedStatus, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedRegion('All');
    setSelectedState('All');
    setSelectedStatus('All');
    setSortField('temp');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  const getStatusBadge = (color) => {
    switch (color) {
      case 'red':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'orange':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'yellow':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

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
            <CloudSun size={28} strokeWidth={1.5} className="text-amber-400" />
            Weather Monitoring
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Real-time district meteorological readings, station data, and temperature alerts.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <span className="text-sm font-light text-white flex items-center gap-2 glass-input px-4 py-2 rounded-xl border border-white/10">
            <Calendar size={16} strokeWidth={1.5} className="text-amber-400" />
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="bg-transparent focus:outline-none cursor-pointer text-white calendar-dark"
            />
          </span>
          <button 
            onClick={handleReset} 
            className="p-2.5 rounded-xl glass-card hover:bg-white/10 text-white/70 hover:text-white transition"
            title="Reset Filters"
          >
            <RefreshCw size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="glass-card p-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-white/40" size={16} strokeWidth={1.5} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search city or state..."
              className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm font-light text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>

          {/* Region */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All Regions</option>
              {regions.filter(r => r !== 'All').map(r => <option key={r} value={r} className="bg-[#1a1a1e]">{r}</option>)}
            </select>
          </div>

          {/* State */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All States</option>
              {states.filter(s => s !== 'All').map(s => <option key={s} value={s} className="bg-[#1a1a1e]">{s}</option>)}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All Status Levels</option>
              <option value="Severe" className="bg-[#1a1a1e]">Severe (Red)</option>
              <option value="Heatwave" className="bg-[#1a1a1e]">Heatwave (Orange)</option>
              <option value="Warning" className="bg-[#1a1a1e]">Warning (Yellow)</option>
              <option value="Normal" className="bg-[#1a1a1e]">Normal (Green)</option>
            </select>
          </div>

        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {filteredData.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-medium tracking-widest uppercase text-white/50">
                  <th className="p-4 cursor-pointer hover:text-white transition" onClick={() => handleSort('city')}>
                    <div className="flex items-center gap-1.5">City & State <ArrowUpDown size={14} strokeWidth={1.5} /></div>
                  </th>
                  <th className="p-4 cursor-pointer hover:text-white transition" onClick={() => handleSort('temp')}>
                    <div className="flex items-center gap-1.5">Temperature <ArrowUpDown size={14} strokeWidth={1.5} /></div>
                  </th>
                  <th className="p-4 cursor-pointer hover:text-white transition" onClick={() => handleSort('humidity')}>
                    <div className="flex items-center gap-1.5">Humidity <ArrowUpDown size={14} strokeWidth={1.5} /></div>
                  </th>
                  <th className="p-4 cursor-pointer hover:text-white transition" onClick={() => handleSort('windSpeed')}>
                    <div className="flex items-center gap-1.5">Wind Speed <ArrowUpDown size={14} strokeWidth={1.5} /></div>
                  </th>
                  <th className="p-4 cursor-pointer hover:text-white transition" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-1.5">Status <ArrowUpDown size={14} strokeWidth={1.5} /></div>
                  </th>
                  <th className="p-4">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                          <MapPin size={14} strokeWidth={1.5} className="text-amber-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{row.city}</div>
                          <div className="text-[11px] font-light text-white/50 tracking-wide">{row.state} • {row.region}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-light text-white">
                        <Thermometer size={16} strokeWidth={1.5} className="text-rose-400" />
                        <span className="text-base">{row.temp}°C</span>
                      </div>
                    </td>

                    <td className="p-4 font-light text-white/80">
                      <div className="flex items-center gap-1.5">
                        <Droplets size={14} strokeWidth={1.5} className="text-sky-400" />
                        {row.humidity}%
                      </div>
                    </td>

                    <td className="p-4 font-light text-white/80">
                      <div className="flex items-center gap-1.5">
                        <Wind size={14} strokeWidth={1.5} className="text-white/40" />
                        {row.windSpeed} km/h
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase border ${getStatusBadge(row.statusColor)}`}>
                        <Flame size={12} strokeWidth={1.5} /> {row.status}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-[11px] text-white/40 tracking-wider">
                      {row.lastUpdated}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredData.length > 0 && (
          <div className="p-4 border-t border-white/10 flex justify-between items-center text-xs font-light text-white/50">
            <div>
              Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="text-white">{filteredData.length}</span> records
            </div>
            <div className="flex items-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-1.5 rounded-lg glass-card hover:bg-white/10 disabled:opacity-40 transition"
              >
                <ChevronLeft size={16} strokeWidth={1.5} className="text-white" />
              </button>
              <span className="font-medium text-white/80">Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-1.5 rounded-lg glass-card hover:bg-white/10 disabled:opacity-40 transition"
              >
                <ChevronRight size={16} strokeWidth={1.5} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default WeatherMonitoring;
