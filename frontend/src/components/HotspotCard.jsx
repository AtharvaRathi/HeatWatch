import React from 'react';
import { MapPin, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const HotspotCard = ({ hotspot }) => {
  const getSeverityStyle = (color) => {
    switch (color) {
      case 'red':
        return { bg: 'bg-rose-500', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', glow: 'shadow-[0_0_15px_-3px_rgba(251,113,133,0.2)]' };
      case 'orange':
        return { bg: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]' };
      case 'yellow':
        return { bg: 'bg-yellow-500', text: 'text-yellow-400', badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', glow: '' };
      default:
        return { bg: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', glow: '' };
    }
  };

  const style = getSeverityStyle(hotspot.riskColor);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card glass-card-hover rounded-2xl p-6 transition-all flex flex-col justify-between relative overflow-hidden ${style.glow}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${style.bg} blur-[60px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-white/40 tracking-wider">#{hotspot.rank}</span>
              <span className={`text-[10px] font-medium tracking-widest px-2.5 py-0.5 rounded-md uppercase border ${style.badge}`}>
                {hotspot.status}
              </span>
            </div>
            <h3 className="text-xl font-light text-white">
              {hotspot.city}
            </h3>
            <p className="text-[11px] text-white/50 flex items-center gap-1.5 mt-1 tracking-wide font-light">
              <MapPin size={12} strokeWidth={1.5} /> {hotspot.state} ({hotspot.region})
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-light text-white">{hotspot.temp}°C</div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Max Peak</span>
          </div>
        </div>

        {/* Risk Score Progress Bar */}
        <div className="space-y-1.5 my-4">
          <div className="flex justify-between text-[11px] font-light uppercase tracking-wider">
            <span className="text-white/50">Risk Score</span>
            <span className={style.text}>{hotspot.riskScore} / 100</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-1 overflow-hidden">
            <div className={`h-full rounded-full ${style.bg} shadow-[0_0_8px_currentColor]`} style={{ width: `${hotspot.riskScore}%`, color: style.bg.replace('bg-', '') }} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs relative z-10">
        <div className="glass-input p-3 rounded-xl border border-white/5">
          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">AI Confidence</span>
          <span className="font-light text-white flex items-center gap-1.5 text-sm">
            <Cpu size={14} strokeWidth={1.5} className="text-amber-400" />
            {hotspot.confidence}%
          </span>
        </div>
        <div className="glass-input p-3 rounded-xl border border-white/5">
          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">Humidity</span>
          <span className="font-light text-white block text-sm">
            {hotspot.humidity}% RH
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HotspotCard;
