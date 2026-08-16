import React, { useState } from 'react';
import { 
  ThermometerSun, 
  AlertTriangle, 
  MapPin, 
  Flame, 
  Target, 
  ChevronRight, 
} from 'lucide-react';
import { 
  mockDashboardStats, 
  mockWeeklyForecast, 
  mockRecentActivities, 
  mockHotspots, 
  mockAlerts, 
  mockAnalyticsData 
} from '../data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const Dashboard = () => {
  const [selectedCityTrend, setSelectedCityTrend] = useState('Nagpur');

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-6"
    >
      
      {/* Clean Minimalist Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            <ThermometerSun size={28} strokeWidth={1.5} className="text-amber-400" />
            Dashboard Overview
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Real-time heatwave telemetry and 72-hour AI model predictions.
          </p>
        </div>
        <Link 
          to="/ai-advisory"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-400 text-sm font-medium transition backdrop-blur-md"
        >
          <span>AI Advisory Generator</span>
          <ChevronRight size={16} />
        </Link>
      </motion.div>

      {/* TOP CARDS (5 Minimalist KPIs) */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <motion.div variants={itemVariants} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-[10px] font-medium uppercase tracking-widest">Avg Temperature</span>
            <ThermometerSun size={18} strokeWidth={1.5} className="text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-light text-white">{mockDashboardStats.currentAvgTemp}</div>
            <p className="text-[11px] font-light text-white/50 mt-1 truncate">{mockDashboardStats.avgTempTrend}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-[10px] font-medium uppercase tracking-widest">Active Alerts</span>
            <AlertTriangle size={18} strokeWidth={1.5} className="text-rose-400" />
          </div>
          <div>
            <div className="text-3xl font-light text-white">{mockDashboardStats.activeAlertsCount}</div>
            <p className="text-[11px] font-light text-white/50 mt-1 truncate">{mockDashboardStats.alertsBreakdown}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-[10px] font-medium uppercase tracking-widest">Affected Regions</span>
            <MapPin size={18} strokeWidth={1.5} className="text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-light text-white">{mockDashboardStats.affectedRegionsCount}</div>
            <p className="text-[11px] font-light text-white/50 mt-1 truncate">{mockDashboardStats.affectedRegionsDetail}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-[10px] font-medium uppercase tracking-widest">Highest Recorded</span>
            <Flame size={18} strokeWidth={1.5} className="text-rose-400" />
          </div>
          <div>
            <div className="text-3xl font-light text-white">{mockDashboardStats.highestRecordedTemp}</div>
            <p className="text-[11px] font-light text-white/50 mt-1 truncate">{mockDashboardStats.highestLocation}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-white/50">
            <span className="text-[10px] font-medium uppercase tracking-widest">Model Accuracy</span>
            <Target size={18} strokeWidth={1.5} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-3xl font-light text-white">{mockDashboardStats.predictionAccuracy}</div>
            <p className="text-[11px] font-light text-white/50 mt-1 truncate">{mockDashboardStats.accuracyDetail}</p>
          </div>
        </motion.div>

      </motion.div>

      {/* MIDDLE SECTION: Temperature Trend Chart & Weekly Forecast */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 7-Day Temperature Trend (2 Cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
            <div>
              <h2 className="text-lg font-light text-white">7-Day Temperature Trend</h2>
              <p className="text-xs font-light text-white/50 mt-0.5">Max daytime temperature readings (°C)</p>
            </div>
            <div className="flex gap-1.5 p-1 glass-input rounded-xl border-white/5">
              {['Nagpur', 'Jaipur', 'Delhi', 'Ahmedabad'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCityTrend(city)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCityTrend === city 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[280px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalyticsData.tempTrend7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
                <YAxis domain={[35, 48]} tickLine={false} axisLine={false} dx={-10} unit="°" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey={selectedCityTrend} 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  fill="url(#colorTrend)" 
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly Forecast (1 Col) */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-lg font-light text-white">Weekly Forecast</h2>
              <span className="text-[10px] font-mono font-medium tracking-widest text-white/40 uppercase">7 Days</span>
            </div>

            <div className="space-y-1">
              {mockWeeklyForecast.map((fc, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-light text-white w-8">{fc.day}</span>
                    <span className="text-white/40 text-[11px] font-light">{fc.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md border ${
                      fc.code === 'red' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      fc.code === 'orange' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      fc.code === 'yellow' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {fc.status}
                    </span>
                    <div className="text-right w-12 font-light text-sm">
                      <span className="text-white">{fc.maxTemp}°</span>
                      <span className="text-white/40 ml-1.5">{fc.minTemp}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* LOWER SECTION: Hotspots, Alert Highlight, Recent Activity */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Hotspots Mini List */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-lg font-light text-white">Top Hotspots</h2>
              <Link to="/hotspots" className="text-xs font-light text-amber-400 hover:text-amber-300 transition">
                View All →
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {mockHotspots.slice(0, 4).map((spot) => (
                <div key={spot.id} className="py-3 flex justify-between items-center hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors">
                  <div>
                    <span className="font-light text-white text-sm">{spot.city}</span>
                    <span className="text-white/40 ml-2 text-[11px] font-light">({spot.state})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-light text-white">{spot.temp}°C</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide border ${
                      spot.riskColor === 'red' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      Risk {spot.riskScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Latest Critical Alert Highlight */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-lg font-light text-white">Latest Critical Alert</h2>
              <Link to="/alerts" className="text-xs font-light text-amber-400 hover:text-amber-300 transition">
                All Alerts →
              </Link>
            </div>
            
            <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
              
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                  {mockAlerts[0].level}
                </span>
                <span className="font-light text-rose-300 text-sm">{mockAlerts[0].temp}</span>
              </div>
              <h3 className="font-light text-sm text-white relative z-10">{mockAlerts[0].title}</h3>
              <p className="text-[12px] font-light text-rose-200/70 leading-relaxed relative z-10">{mockAlerts[0].description}</p>
              <div className="text-[10px] text-rose-300/50 font-mono pt-2 relative z-10 border-t border-rose-500/20">
                Loc: {mockAlerts[0].city}, {mockAlerts[0].state}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-light text-white mb-6 border-b border-white/10 pb-4">Recent System Log</h2>
            <div className="space-y-4">
              {mockRecentActivities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="flex-1 pb-3 border-b border-white/5 last:border-0">
                    <h4 className="font-light text-[13px] text-white/90">{act.title}</h4>
                    <p className="text-[11px] font-light text-white/50 mt-0.5">{act.target}</p>
                    <span className="text-[9px] tracking-widest text-white/30 font-mono block mt-1.5 uppercase">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>

    </motion.div>
  );
};

export default Dashboard;
