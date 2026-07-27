import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function HistoryChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="h-64 w-full flex items-center justify-center text-gray-500">
      No historical data available for this selection.
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-gray-700 p-3 rounded shadow-xl">
          <p className="font-bold mb-2">{label}</p>
          <p className="text-[#F97316] font-medium">Max Temp: {payload[0].value}°C</p>
          <p className="text-[#EF4444] font-medium">Heat Index: {payload[1].value}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(tick) => {
              const d = new Date(tick);
              return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
            }}
          />
          <YAxis 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="max_temp" 
            stroke="#F97316" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }} 
            name="Max Temp (°C)"
          />
          <Line 
            type="monotone" 
            dataKey="heat_index" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Heat Index (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
