import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Sliders, Check, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [tempThreshold, setTempThreshold] = useState(42);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <SettingsIcon size={28} strokeWidth={1.5} className="text-amber-400" /> System Settings
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Manage user profile, alert dispatch thresholds, and notification settings.
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        
        {/* PROFILE */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 rounded-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-50" />
          
          <h2 className="text-base font-light text-white flex items-center gap-3 pb-3 border-b border-white/10 tracking-wide">
            <User size={20} strokeWidth={1.5} className="text-amber-400" /> User Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-medium text-white/40 uppercase tracking-widest block mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Dr. Rajesh Sharma"
                className="w-full px-4 py-3 glass-input rounded-xl text-sm font-light text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-white/40 uppercase tracking-widest block mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="rajesh.sharma@imd-ai.gov.in"
                className="w-full px-4 py-3 glass-input rounded-xl text-sm font-light text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-white/40 uppercase tracking-widest block mb-2">Role</label>
              <input
                type="text"
                defaultValue="Chief Climate ML Lead"
                className="w-full px-4 py-3 glass-input rounded-xl text-sm font-light text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-white/40 uppercase tracking-widest block mb-2">Organization</label>
              <input
                type="text"
                defaultValue="IMD Climate Risk Integration Wing"
                className="w-full px-4 py-3 glass-input rounded-xl text-sm font-light text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition"
              />
            </div>
          </div>
        </motion.div>

        {/* THRESHOLDS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 rounded-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-rose-500 opacity-50" />
          
          <h2 className="text-base font-light text-white flex items-center gap-3 pb-3 border-b border-white/10 tracking-wide">
            <Sliders size={20} strokeWidth={1.5} className="text-amber-400" /> Alert Threshold Configuration
          </h2>

          <div className="space-y-6">
            <div className="glass-input p-6 rounded-xl border border-white/5">
              <div className="flex justify-between font-light mb-4">
                <span className="text-white/80">Heatwave Trigger Threshold (°C)</span>
                <span className="text-amber-400 font-light text-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">{tempThreshold}°C</span>
              </div>
              <input
                type="range"
                min="38"
                max="46"
                step="0.5"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(e.target.value)}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-black/40 rounded-full appearance-none custom-range shadow-inner"
              />
              <p className="text-[11px] text-white/40 mt-4 font-light tracking-wide">Automatic emergency advisory dispatches when city readings cross this value.</p>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center justify-between font-light text-white/80 cursor-pointer p-4 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/10 text-sm">
                <span className="flex-1">Instant Email Alerts for Severe (Red) Broadcasts</span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#0f0f11] appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                    style={{ transform: emailAlerts ? 'translateX(100%)' : 'translateX(0)' }}
                  />
                  <div className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out border ${emailAlerts ? 'bg-amber-500 border-amber-500' : 'bg-black/40 border-white/10'}`}></div>
                </div>
              </label>

              <label className="flex items-center justify-between font-light text-white/80 cursor-pointer p-4 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/10 text-sm">
                <span className="flex-1">SMS Gateway Dispatch to District Officers</span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#0f0f11] appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                    style={{ transform: smsAlerts ? 'translateX(100%)' : 'translateX(0)' }}
                  />
                  <div className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out border ${smsAlerts ? 'bg-amber-500 border-amber-500' : 'bg-black/40 border-white/10'}`}></div>
                </div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* SAVE */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end pt-4"
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 py-3 px-8 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 font-medium text-sm tracking-widest uppercase shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)] transition-all"
          >
            {saved ? <Check size={18} strokeWidth={1.5} /> : <Save size={18} strokeWidth={1.5} />}
            {saved ? 'Settings Saved' : 'Save Preferences'}
          </button>
        </motion.div>

      </div>

    </motion.div>
  );
};

export default Settings;
