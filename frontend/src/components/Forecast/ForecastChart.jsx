import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

export default function ForecastChart({ data }) {
  if (!data || data.length === 0) return null;

  // Format data for chart
  const chartData = data.map((day, index) => {
    const dateObj = new Date(day.date);
    const dayLabel = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      name: dayLabel,
      max_temp: day.max_temp,
      heat_index: day.heat_index,
      risk_level: day.risk_level
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-gray-700 p-3 rounded shadow-xl">
          <p className="font-bold mb-2">{label}</p>
          <p className="text-orange-500 font-medium">Temp: {payload[0].value}°C</p>
          <p className="text-red-500 font-medium">Heat Index: {payload[1].value}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Background bands for risk levels (approximate mapping on Y axis) */}
          <ReferenceArea y1={40} y2={60} fill="#EF4444" fillOpacity={0.1} />
          <ReferenceArea y1={27} y2={40} fill="#EAB308" fillOpacity={0.1} />
          <ReferenceArea y1={0} y2={27} fill="#22C55E" fillOpacity={0.05} />

          <Area 
            type="monotone" 
            dataKey="max_temp" 
            stroke="#F97316" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTemp)" 
            name="Max Temp"
          />
          <Area 
            type="monotone" 
            dataKey="heat_index" 
            stroke="#EF4444" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorHI)" 
            name="Heat Index"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
