import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/20 blur-[40px] rounded-full" />
        <div className="w-20 h-20 rounded-2xl glass-card text-amber-500 flex items-center justify-center relative z-10 border border-white/[0.08] shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]">
          <ShieldAlert size={40} />
        </div>
      </div>
      
      <div className="space-y-2 relative z-10">
        <span className="text-[11px] font-mono font-bold text-amber-500 uppercase tracking-widest block">Error 404</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">Page Not Found</h1>
        <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
          The telemetry route or section you are looking for does not exist.
        </p>
      </div>

      <div className="pt-2 relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)]"
        >
          <Home size={16} /> Return to Dashboard
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
