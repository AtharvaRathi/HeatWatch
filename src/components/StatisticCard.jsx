import React from 'react';

const StatisticCard = ({ title, value, subtitle, icon: Icon, colorClass, bgClass, trend, badge }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${bgClass || 'bg-amber-500/10'} ${colorClass || 'text-amber-400'}`}>
            <Icon size={18} />
          </div>
          {badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 border border-white/[0.06]">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-zinc-100 tracking-tight mb-1">{value}</div>
      </div>
      {subtitle && (
        <div className="pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
          <span>{subtitle}</span>
          {trend && <span className="font-medium text-zinc-400">{trend}</span>}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;
