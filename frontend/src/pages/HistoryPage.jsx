import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import HistoryChart from '../components/History/HistoryChart';
import { Loader2, Info } from 'lucide-react';

export default function HistoryPage() {
  const [city, setCity] = useState('Mumbai');
  const [year, setYear] = useState('2023');
  const [riskLevel, setRiskLevel] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['history', city, year, riskLevel],
    queryFn: async () => {
      const params = new URLSearchParams({ city, year });
      if (riskLevel) params.append('risk_level', riskLevel);
      
      const res = await apiClient.get(`/api/history?${params.toString()}`);
      return res.data;
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Historical Trends</h1>
          <p className="text-gray-400 mt-1">Analyze past heatwave patterns and severity.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field py-2 w-auto"
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          
          <select 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input-field py-2 w-auto"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          
          <select 
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="input-field py-2 w-auto"
          >
            <option value="">All Risk Levels</option>
            <option value="Severe">Severe</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Temperature & Heat Index Trend</h2>
          
          {/* TC08 Data Source Info Tooltip */}
          <div className="group relative flex items-center cursor-help">
            <Info className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 text-xs text-gray-200 p-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-gray-700">
              Data source: Historical seed dataset v1.0 (2022–2024)
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
          </div>
        ) : (
          <HistoryChart data={data} />
        )}
      </div>
    </div>
  );
}
