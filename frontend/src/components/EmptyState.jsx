import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-full bg-white/[0.04] text-white/50 mb-4 border border-white/5 backdrop-blur-md">
        <SearchX size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-medium text-white mb-1">No matches found</h3>
      <p className="text-xs font-light text-white/50 max-w-sm mb-6">
        We couldn't find any data matching your current filters. Try adjusting your search or clearing the filters.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium transition border border-white/[0.06]"
        >
          <RefreshCw size={14} /> Clear all filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
