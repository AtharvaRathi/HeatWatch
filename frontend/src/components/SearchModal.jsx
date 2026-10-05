import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Flame, AlertTriangle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCitiesWeather, mockAlerts } from '../data/mockData';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCities = mockCitiesWeather.filter(c => 
    c.city.toLowerCase().includes(query.toLowerCase()) || 
    c.state.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlerts = mockAlerts.filter(a =>
    a.city.toLowerCase().includes(query.toLowerCase()) ||
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#1a1a1e] rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
          <Search size={18} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cities, alerts, or pages..."
            className="w-full bg-transparent text-zinc-200 placeholder-zinc-600 focus:outline-none text-sm font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-300 rounded-lg">
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {query.trim() === '' ? (
            <div>
              <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Dashboard Overview', path: '/dashboard', icon: Flame },
                  { name: 'Weather Monitoring', path: '/monitoring', icon: MapPin },
                  { name: 'Interactive India Map', path: '/map', icon: MapPin },
                  { name: 'Hotspots Ranking', path: '/hotspots', icon: Flame },
                  { name: 'Alerts & Warnings', path: '/alerts', icon: AlertTriangle },
                  { name: 'AI Advisory Generator', path: '/ai-advisory', icon: FileText }
                ].map(item => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-left border border-white/[0.04] transition"
                  >
                    <item.icon size={14} className="text-amber-400" />
                    <span className="text-xs font-medium text-zinc-400">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Cities */}
              {filteredCities.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Matching Cities</h4>
                  <div className="space-y-1">
                    {filteredCities.slice(0, 4).map((city) => (
                      <div
                        key={city.id}
                        onClick={() => handleNavigate('/monitoring')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer border border-transparent hover:border-white/[0.06] transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin size={14} className="text-zinc-500" />
                          <div>
                            <span className="font-medium text-xs text-zinc-300">{city.city}</span>
                            <span className="text-[11px] text-zinc-500 ml-2">({city.state})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-300 text-xs">{city.temp}°C</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            city.statusColor === 'red' ? 'bg-rose-500/15 text-rose-400' : 
                            city.statusColor === 'orange' ? 'bg-amber-500/15 text-amber-400' :
                            'bg-white/[0.06] text-zinc-400'
                          }`}>
                            {city.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alerts */}
              {filteredAlerts.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Matching Alerts</h4>
                  <div className="space-y-1">
                    {filteredAlerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => handleNavigate('/alerts')}
                        className="flex items-start justify-between p-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer border border-transparent hover:border-white/[0.06] transition"
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle size={14} className="text-rose-400 mt-0.5" />
                          <div>
                            <div className="font-medium text-xs text-zinc-300">{alert.title}</div>
                            <div className="text-[11px] text-zinc-500">{alert.city}, {alert.state}</div>
                          </div>
                        </div>
                        <span className="text-xs text-rose-400 font-semibold">{alert.temp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 border-t border-white/[0.06] text-center text-xs text-zinc-600">
          Press <kbd className="px-1.5 py-0.5 bg-white/[0.04] rounded text-[10px] font-mono text-zinc-500 border border-white/[0.06]">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
