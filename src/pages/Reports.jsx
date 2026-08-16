import React, { useState } from 'react';
import { FileText, Download, Eye, Search, X } from 'lucide-react';
import { mockReportsList } from '../data/mockData';
import ReportCard from '../components/ReportCard';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Reports = () => {
  const [selectedReportPreview, setSelectedReportPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredHistory = mockReportsList.filter(rep => {
    const matchesSearch = rep.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rep.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || rep.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      
      {/* Title */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white flex items-center gap-3 tracking-tight">
            <FileText size={28} strokeWidth={1.5} className="text-amber-400" /> Reports & Downloads
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Certified daily risk bulletins, weekly climate summaries, and CSV data exports.
          </p>
        </div>
      </div>

      {/* FEATURED REPORT CARDS */}
      <div>
        <h2 className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-4 px-1">
          Featured Reports
        </h2>
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {mockReportsList.slice(0, 3).map((report) => (
            <motion.div variants={itemVariants} key={report.id}>
              <ReportCard 
                report={report} 
                onPreview={(rep) => setSelectedReportPreview(rep)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* HISTORICAL REPORTS TABLE */}
      <div className="glass-card rounded-2xl overflow-hidden p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-lg font-light text-white">Archive History</h3>
            <p className="text-xs font-light text-white/50 mt-1">Historical dataset releases and official climate reports.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3.5 top-3 text-white/40" size={16} strokeWidth={1.5} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history..."
                className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm font-light text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition appearance-none"
            >
              <option value="All" className="bg-[#1a1a1e]">All Types</option>
              <option value="Daily" className="bg-[#1a1a1e]">Daily</option>
              <option value="Weekly" className="bg-[#1a1a1e]">Weekly</option>
              <option value="Monthly" className="bg-[#1a1a1e]">Monthly</option>
              <option value="Quarterly" className="bg-[#1a1a1e]">Quarterly</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-medium uppercase tracking-widest text-white/40">
                <th className="p-4">Report Title</th>
                <th className="p-4">Period</th>
                <th className="p-4">Size</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredHistory.map((rep) => (
                <tr key={rep.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <span className="font-light text-white text-base block mb-1">{rep.title}</span>
                      <span className="text-[11px] text-white/40 font-mono tracking-wider block">{rep.id} • {rep.date}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/70 font-light">{rep.period}</td>
                  <td className="p-4 text-white/50 font-mono text-[11px] tracking-wider">{rep.size}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-md text-[10px] font-medium uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {rep.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setSelectedReportPreview(rep)}
                        className="p-2 rounded-xl glass-card hover:bg-white/10 text-white/70 hover:text-white transition border border-white/10"
                        title="Preview"
                      >
                        <Eye size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => alert(`Downloading PDF: ${rep.title}`)}
                        className="p-2 rounded-xl glass-card hover:bg-amber-500/20 text-amber-400 transition border border-amber-500/30"
                        title="Download PDF"
                      >
                        <Download size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {selectedReportPreview && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-10 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md" 
              onClick={() => setSelectedReportPreview(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-card rounded-3xl shadow-2xl overflow-hidden z-10 p-8 space-y-6 border border-white/10"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-medium px-3 py-1.5 rounded-lg bg-white/5 text-white/50 uppercase tracking-widest border border-white/10">
                    {selectedReportPreview.type} Preview
                  </span>
                  <h3 className="text-2xl font-light text-white mt-4">{selectedReportPreview.title}</h3>
                  <span className="text-xs text-white/40 font-mono tracking-widest mt-1 block">{selectedReportPreview.id}</span>
                </div>
                <button onClick={() => setSelectedReportPreview(null)} className="p-2 text-white/40 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="p-6 glass-input rounded-2xl border border-white/5 space-y-5 text-sm font-light leading-relaxed text-white/80 shadow-inner">
                <h4 className="font-medium text-white text-[11px] uppercase tracking-widest border-b border-white/10 pb-3">Summary</h4>
                <p>
                  During <strong className="text-amber-400 font-normal">{selectedReportPreview.date}</strong>, thermal sensors recorded maximum temperature peaks reaching 46.2°C in Phalodi, Rajasthan, with Vidarbha registering 3 consecutive severe heatwave days.
                </p>
                <p>
                  Ground station validation confirmed AI model accuracy at 95.4%. Public safety advisories were dispatched to 14 municipal bodies.
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 font-mono text-[11px] text-white/50 flex items-center justify-between mt-4 tracking-wider">
                  <span>Size: {selectedReportPreview.size}</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> Verified IMD Node</span>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedReportPreview(null)}
                  className="py-3 px-6 rounded-xl glass-card hover:bg-white/10 text-white/70 text-xs font-medium uppercase tracking-widest transition border border-white/10"
                >
                  Close
                </button>
                <button
                  onClick={() => alert(`Downloading ${selectedReportPreview.title}`)}
                  className="py-3 px-6 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-medium uppercase tracking-widest transition flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)] border border-amber-500/30"
                >
                  <Download size={16} strokeWidth={1.5} /> Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Reports;
