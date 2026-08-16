import React from 'react';

const ChartCard = ({ title, subtitle, children, actionButton }) => {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        {actionButton}
      </div>
      <div className="w-full flex-1 min-h-[260px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
