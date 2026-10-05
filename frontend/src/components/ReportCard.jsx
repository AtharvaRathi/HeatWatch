import React from 'react';
import { FileText, Download, Eye, Calendar, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportCard = ({ report, onPreview }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 transition-all flex flex-col justify-between h-full border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <FileText size={20} strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-white/40 border border-white/10 uppercase tracking-widest">
            {report.type}
          </span>
        </div>

        <h3 className="text-base font-light text-white mb-3 leading-relaxed">
          {report.title}
        </h3>

        <div className="space-y-2 text-[11px] font-light text-white/40 mb-6 tracking-wide">
          <div className="flex items-center gap-2">
            <Calendar size={14} strokeWidth={1.5} className="text-white/30" />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive size={14} strokeWidth={1.5} className="text-white/30" />
            <span>Size: {report.size}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-3 relative z-10">
        <button
          onClick={() => onPreview(report)}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl glass-card hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-medium uppercase tracking-widest transition border border-white/5 hover:border-white/10"
        >
          <Eye size={14} strokeWidth={1.5} /> Preview
        </button>
        <button
          onClick={() => alert(`Downloading PDF report: ${report.title}`)}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-[10px] font-medium uppercase tracking-widest transition border border-amber-500/30"
        >
          <Download size={14} strokeWidth={1.5} /> PDF
        </button>
        <button
          onClick={() => alert(`Exporting CSV dataset for ${report.title}`)}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl glass-card hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-medium uppercase tracking-widest transition border border-white/5 hover:border-white/10"
        >
          CSV
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
