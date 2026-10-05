import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Users, 
  Tractor, 
  Building2, 
  Hospital, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { mockAIAdvisoryPresets } from '../data/mockData';
import { motion } from 'framer-motion';

const AIAdvisoryGenerator = () => {
  const [city, setCity] = useState('Nagpur');
  const [temp, setTemp] = useState('45.2°C');
  const [severity, setSeverity] = useState('Severe (Red)');
  const [audience, setAudience] = useState('Citizen');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [advisoryText, setAdvisoryText] = useState(mockAIAdvisoryPresets[0].text);

  const handleGenerate = (e) => {
    e?.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const preset = mockAIAdvisoryPresets.find(p => p.audience === audience);
      if (preset) {
        setAdvisoryText(preset.text.replace('NAGPUR', city.toUpperCase()).replace('45.2°C', temp));
      } else {
        setAdvisoryText(`🔥 AI PUBLIC SAFETY ADVISORY - ${city.toUpperCase()} (${temp})
        
• Target Group: ${audience}
• Warning Level: ${severity}
• Key Protocol: Enforce mandatory rest intervals between 12 PM - 4 PM. Keep hydration centers active across high-density hubs.
• Medical Emergency: Keep IV cooling fluids ready and dial 108 for emergency transport.`);
      }
      setIsGenerating(false);
    }, 600);
  };

  const handlePresetSelect = (preset) => {
    setCity(preset.city);
    setTemp(preset.temp);
    setSeverity(preset.severity);
    setAudience(preset.audience);
    setAdvisoryText(preset.text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(advisoryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      
      {/* Title */}
      <div className="glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-[10px] uppercase tracking-widest font-mono mb-2">
            <Sparkles size={14} /> AI Generative Advisory Model
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">AI Advisory Generator</h1>
          <p className="text-white/50 text-sm font-light mt-1">
            Synthesize domain-specific advisories for Citizens, Farmers, Hospitals, and Municipalities.
          </p>
        </div>
      </div>

      {/* CHAT / GENERATOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT FORM (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-light text-white flex items-center gap-3">
            <Bot className="text-amber-400" size={20} strokeWidth={1.5} /> Input Parameters
          </h2>

          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* City */}
            <div>
              <label className="text-[10px] font-medium tracking-widest uppercase text-white/40 block mb-2">City / District</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Nagpur"
                className="w-full px-4 py-2.5 glass-input rounded-xl text-sm font-light text-white transition-all"
              />
            </div>

            {/* Temp & Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-medium tracking-widest uppercase text-white/40 block mb-2">Max Temp (°C)</label>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full px-4 py-2.5 glass-input rounded-xl text-sm font-light text-white transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-medium tracking-widest uppercase text-white/40 block mb-2">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full py-2.5 px-4 glass-input rounded-xl text-sm font-light text-white appearance-none"
                >
                  <option value="Severe (Red)" className="bg-[#1a1a1e]">Severe (Red)</option>
                  <option value="Heatwave (Orange)" className="bg-[#1a1a1e]">Heatwave (Orange)</option>
                  <option value="Warning (Yellow)" className="bg-[#1a1a1e]">Warning (Yellow)</option>
                  <option value="Normal (Green)" className="bg-[#1a1a1e]">Normal (Green)</option>
                </select>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-[10px] font-medium tracking-widest uppercase text-white/40 block mb-3">Target Audience</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Citizen', icon: Users, label: 'Citizen' },
                  { id: 'Farmer', icon: Tractor, label: 'Farmer' },
                  { id: 'Hospital', icon: Hospital, label: 'Hospital' },
                  { id: 'Municipality', icon: Building2, label: 'Municipality' },
                ].map(aud => {
                  const IconComp = aud.icon;
                  const isSelected = audience === aud.id;
                  return (
                    <button
                      type="button"
                      key={aud.id}
                      onClick={() => setAudience(aud.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-light transition-all ${
                        isSelected 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                          : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <IconComp size={16} strokeWidth={1.5} /> {aud.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl glass-card hover:bg-amber-500/20 border-white/10 hover:border-amber-500/30 text-white font-medium text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Synthesizing Data...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-amber-400" /> Generate Advisory
                </>
              )}
            </button>

          </form>

          {/* Quick Presets */}
          <div className="pt-4 border-t border-white/10 mt-6">
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 block mb-3">Quick Prompts</span>
            <div className="flex flex-wrap gap-2">
              {mockAIAdvisoryPresets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handlePresetSelect(preset)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-[11px] font-light transition border border-white/5"
                >
                  {preset.city} ({preset.audience})
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT DISPLAY (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Bot size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-light text-white text-lg tracking-wide">Generated Output</h3>
                  <span className="text-[10px] text-emerald-400/80 flex items-center gap-1.5 uppercase tracking-widest mt-0.5">
                    <CheckCircle2 size={12} /> Neural Rules Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg glass-card hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-medium uppercase tracking-widest transition"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} strokeWidth={1.5} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => alert(`Downloading Advisory PDF for ${city}`)}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-[11px] font-medium uppercase tracking-widest transition"
                >
                  <Download size={14} strokeWidth={1.5} /> PDF
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 rounded-xl glass-input border-white/5 font-mono text-[13px] text-white/90 leading-loose shadow-inner relative z-10 whitespace-pre-wrap">
              {advisoryText}
            </div>
          </div>

          <div className="text-[10px] text-white/30 text-center pt-4 tracking-widest uppercase font-mono relative z-10">
            Advisory generated for operational municipal dispatch.
          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default AIAdvisoryGenerator;
