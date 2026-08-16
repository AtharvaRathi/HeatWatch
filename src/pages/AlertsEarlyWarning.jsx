import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  LayoutGrid, 
  ListOrdered
} from 'lucide-react';
import { mockAlerts } from '../data/mockData';
import AlertCard from '../components/AlertCard';
import EmptyState from '../components/EmptyState';
import { filterAlerts } from '../utils/alertFilters';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsEarlyWarning = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = useMemo(() => {
    return filterAlerts(mockAlerts, activeTab, searchTerm);
  }, [activeTab, searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            <AlertTriangle size={28} strokeWidth={1.5} className="text-amber-400" />
            Alerts & Early Warning
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            IMD & NDMA operational early warning broadcasts with safety guidelines.
          </p>
        </div>

        {/* View Toggle */}
        <div className="relative z-10 flex items-center gap-1.5 glass-input p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
              viewMode === 'grid' 
                ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid size={16} strokeWidth={1.5} /> Cards
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
              viewMode === 'timeline' 
                ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <ListOrdered size={16} strokeWidth={1.5} /> Timeline
          </button>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="glass-card p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Severity Color Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Alerts', color: 'bg-white/10 text-white border-white/20' },
            { id: 'red', label: 'Red (Severe)', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
            { id: 'orange', label: 'Orange (Heatwave)', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
            { id: 'yellow', label: 'Yellow (Warning)', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
            { id: 'green', label: 'Green (Normal)', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-widest border transition-all ${
                activeTab === tab.id 
                  ? tab.color 
                  : 'bg-transparent text-white/40 border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
           <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search alerts..."
            className="w-full px-4 py-2.5 glass-input rounded-xl text-sm font-light text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>

      </div>

      {/* CARDS OR TIMELINE */}
      {filteredAlerts.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState onReset={() => { setActiveTab('all'); setSearchTerm(''); }} />
        </div>
      ) : viewMode === 'grid' ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredAlerts.map(alert => (
              <motion.div 
                layout 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={alert.id}
              >
                <AlertCard alert={alert} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute left-10 top-8 bottom-8 w-px bg-white/10 hidden md:block" />

          <div className="space-y-8 relative z-10">
            {filteredAlerts.map((alert) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={alert.id} 
                className="flex flex-col md:flex-row items-start gap-6"
              >
                <div className="w-12 h-12 rounded-full glass-card border border-white/20 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Clock size={20} strokeWidth={1.5} className="text-amber-400" />
                </div>
                <div className="flex-1 w-full">
                  <AlertCard alert={alert} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default AlertsEarlyWarning;
