import React from 'react';

export const SpinnerLoader = ({ size = 'medium' }) => {
  const sizeClasses = size === 'small' ? 'w-5 h-5 border-2' : size === 'large' ? 'w-12 h-12 border-4' : 'w-8 h-8 border-3';
  return (
    <div className="flex justify-center items-center p-8">
      <div className={`${sizeClasses} border-amber-800 border-t-transparent dark:border-amber-400 dark:border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-stone-200 dark:border-slate-700 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-12 h-12 bg-stone-200 dark:bg-slate-700 rounded-xl" />
        <div className="w-16 h-6 bg-stone-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-1/3" />
      <div className="h-8 bg-stone-200 dark:bg-slate-700 rounded w-2/3" />
      <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-full" />
    </div>
  );
};

export const SkeletonTable = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-stone-200 dark:border-slate-700 p-6 animate-pulse space-y-4">
      <div className="h-8 bg-stone-200 dark:bg-slate-700 rounded w-1/4 mb-6" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-between items-center gap-4">
          <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-1/5" />
          <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-1/6" />
          <div className="h-4 bg-stone-200 dark:bg-slate-700 rounded w-1/6" />
          <div className="h-6 bg-stone-200 dark:bg-slate-700 rounded-full w-20" />
        </div>
      ))}
    </div>
  );
};

export default SpinnerLoader;
