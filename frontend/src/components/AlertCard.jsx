import React from 'react';
import { AlertTriangle, Clock, MapPin, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertCard = ({ alert }) => {
  const getBadgeStyle = (code) => {
    switch (code) {
      case 'red':
        return {
          border: 'border-rose-500/20',
          accentBorder: 'border-l-rose-500',
          badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          iconColor: 'text-rose-400',
          glow: 'shadow-[0_0_15px_-3px_rgba(251,113,133,0.15)]'
        };
      case 'orange':
        return {
          border: 'border-amber-500/20',
          accentBorder: 'border-l-amber-500',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          iconColor: 'text-amber-400',
          glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]'
        };
      case 'yellow':
        return {
          border: 'border-yellow-500/20',
          accentBorder: 'border-l-yellow-500',
          badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          iconColor: 'text-yellow-400',
          glow: ''
        };
      default:
        return {
          border: 'border-emerald-500/20',
          accentBorder: 'border-l-emerald-500',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          iconColor: 'text-emerald-400',
          glow: ''
        };
    }
  };

  const style = getBadgeStyle(alert.code);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card glass-card-hover rounded-2xl p-6 border-l-[3px] ${style.accentBorder} transition-all flex flex-col justify-between relative overflow-hidden ${style.glow}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${style.badgeBg.split(' ')[0].replace('/10', '/20')} blur-[50px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-widest border ${style.badgeBg}`}>
              {alert.level}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-light text-white/50 tracking-wide">
              <MapPin size={14} strokeWidth={1.5} className="text-white/40" />
              {alert.city}, {alert.state}
            </span>
          </div>
          <span className="text-2xl font-light text-white">
            {alert.temp}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-light text-white mb-2 flex items-center gap-2">
          <AlertTriangle size={18} strokeWidth={1.5} className={style.iconColor} />
          {alert.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-light text-white/70 leading-relaxed mb-4">
          {alert.description}
        </p>

        {/* Recommended Action */}
        <div className="p-4 rounded-xl glass-input border border-white/5 text-xs">
          <span className="font-medium tracking-wider uppercase text-white/40 block mb-1 text-[10px]">Recommended Action</span>
          <span className="font-light text-white/90 leading-relaxed">{alert.recommendedAction}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-light tracking-wider text-white/40 relative z-10">
        <div className="flex items-center gap-1.5">
          <Clock size={12} strokeWidth={1.5} />
          <span>Issued: {alert.timestamp}</span>
        </div>
        <button 
          onClick={() => alert(`Exporting advisory PDF for ${alert.city}`)}
          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition uppercase tracking-widest font-medium text-[10px]"
        >
          <Download size={14} strokeWidth={1.5} /> PDF
        </button>
      </div>
    </motion.div>
  );
};

export default AlertCard;
