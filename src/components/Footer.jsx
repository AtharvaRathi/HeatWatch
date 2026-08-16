import React from 'react';
import { Flame, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/[0.04] py-4 px-6 md:px-8 text-xs">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* Left info */}
        <div className="flex items-center gap-2.5 text-zinc-500">
          <Flame size={14} className="text-amber-500" />
          <span className="font-medium text-zinc-400">HeatWatch AI</span>
          <span className="text-zinc-700">•</span>
          <span>In Partnership with IMD</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-zinc-600">
          <Link to="/reports" className="hover:text-zinc-300 transition">Reports</Link>
          <Link to="/alerts" className="hover:text-zinc-300 transition">Alerts</Link>
          <a href="https://mausam.imd.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-300 transition">
            IMD Portal <ExternalLink size={10} />
          </a>
        </div>

        {/* Right status */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-zinc-500">Telemetry: Live</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
