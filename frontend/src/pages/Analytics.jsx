import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { mockAnalyticsData } from '../data/mockData';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

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

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('30D');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white flex items-center gap-3 tracking-tight">
            <BarChart3 size={28} strokeWidth={1.5} className="text-amber-400" /> Analytics & Performance
          </h1>
          <p className="text-sm font-light text-white/60 mt-1">
            Recharts analytics visualizing seasonal heat anomalies, regional distribution, and model confidence.
          </p>
        </div>

        <div className="flex items-center gap-1.5 glass-input p-1.5 rounded-xl border border-white/10 relative z-10">
          {['7D', '30D', 'YTD'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-widest transition-all ${
                timeframe === tf 
                  ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)] border border-amber-500/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* CHARTS GRID 1: Multi-City Trend & Region Comparison */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Multi-City Temperature Trend (°C)"
            subtitle="7-day peak temperature progression across observation stations."
          >
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mockAnalyticsData.tempTrend7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis domain={[35, 48]} stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dx={-10} unit="°" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', color: '#ffffff', opacity: 0.6 }} />
                <Line type="monotone" dataKey="Nagpur" stroke="#f43f5e" strokeWidth={3} dot={{ r: 3, fill: '#f43f5e' }} activeDot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="Jaipur" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Delhi" stroke="#eab308" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Ahmedabad" stroke="#38bdf8" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard
            title="Regional Temperature Matrix"
            subtitle="Comparing average vs maximum recorded temperatures by region."
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={mockAnalyticsData.regionComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="region" stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis domain={[30, 50]} stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dx={-10} unit="°" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', color: '#ffffff', opacity: 0.6 }} />
                <Bar dataKey="avgTemp" fill="#eab308" radius={[4, 4, 0, 0]} name="Avg Temp (°C)" />
                <Bar dataKey="maxTemp" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Max Temp (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

      </motion.div>

      {/* CHARTS GRID 2: Monthly Heatwave Count & Severity Distribution */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard
            title="Monthly Heatwave Event Frequency"
            subtitle="Accumulated total heatwave alerts vs severe alerts."
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockAnalyticsData.monthlyHeatwaveCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSevere" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', color: '#ffffff', opacity: 0.6 }} />
                <Area type="monotone" dataKey="alerts" stroke="#f59e0b" strokeWidth={2} fill="url(#colorAlerts)" name="Total Alerts" />
                <Area type="monotone" dataKey="severeAlerts" stroke="#f43f5e" strokeWidth={2} fill="url(#colorSevere)" name="Severe Alerts" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ChartCard
            title="Severity Distribution"
            subtitle="Proportional alert level breakdown."
          >
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={mockAnalyticsData.severityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="rgba(0,0,0,0)"
                >
                  {mockAnalyticsData.severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'Red (Severe)' ? '#f43f5e' :
                      entry.name === 'Orange (Heatwave)' ? '#f59e0b' :
                      entry.name === 'Yellow (Warning)' ? '#eab308' :
                      '#10b981'
                    } />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

      </motion.div>

      {/* CHARTS GRID 3: Model Accuracy & Confidence */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Prediction Accuracy Over Time"
            subtitle="Ground station actuals vs AI model predicted curves."
          >
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={mockAnalyticsData.predictionAccuracyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis domain={[38, 48]} stroke="#ffffff" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} dx={-10} unit="°" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} name="Actual Ground Station" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" name="AI Predicted" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard
            title="Regional Model Confidence Index (%)"
            subtitle="Model reliability calculated per station cluster."
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mockAnalyticsData.forecastConfidenceByRegion} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[80, 100]} stroke="#ffffff" opacity={0.4} fontSize={10} unit="%" tickLine={false} axisLine={false} />
                <YAxis dataKey="region" type="category" stroke="#ffffff" opacity={0.4} fontSize={10} width={80} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 22, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '11px', backdropFilter: 'blur(16px)' }} 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="confidence" fill="#10b981" radius={[0, 4, 4, 0]} name="Confidence %" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

      </motion.div>

    </motion.div>
  );
};

export default Analytics;
