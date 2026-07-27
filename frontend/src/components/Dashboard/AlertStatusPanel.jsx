import { AlertTriangle, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/client';

export default function AlertStatusPanel({ city, currentHeatIndex }) {
  // Try to fetch the threshold for this city from the admin endpoints
  // For standard users, we might need a public endpoint, or we just mock a default for the UI
  // if they aren't admin. Let's assume there's a default of 40.0 if we can't fetch.
  
  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/api/admin/thresholds');
        return res.data;
      } catch {
        return [];
      }
    },
    retry: false
  });

  const region = regions?.find(r => r.city_name.toLowerCase() === city.toLowerCase());
  const threshold = region?.alert_threshold_celsius || 40.0;
  
  const isAlertActive = currentHeatIndex >= threshold;
  const percentage = Math.min(100, Math.max(0, (currentHeatIndex / 55) * 100)); // Assuming 55 is max normal scale
  const thresholdPercentage = Math.min(100, (threshold / 55) * 100);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            Alert Status Panel
            <Info className="h-4 w-4 text-gray-500" />
          </h3>
          <p className="text-sm text-gray-400 mt-1">Current threshold for {city}: <span className="font-mono text-white">{threshold}°C</span></p>
        </div>
        {isAlertActive && (
          <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse border border-red-500/30">
            <AlertTriangle className="h-4 w-4" />
            ACTIVE ALERT
          </div>
        )}
      </div>

      <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden mt-8 mb-2">
        {/* Threshold Marker */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ left: `${thresholdPercentage}%` }}
        >
          <div className="absolute -top-6 -translate-x-1/2 text-xs font-bold text-gray-300">
            Limit
          </div>
        </div>
        
        {/* Heat Index Bar */}
        <div 
          className={`h-full transition-all duration-1000 ease-out ${isAlertActive ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-yellow-400'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 font-mono">
        <span>0°C</span>
        <span>Current: {currentHeatIndex}°C</span>
        <span>55°C+</span>
      </div>

      {isAlertActive && (
        <div className="mt-6 bg-[#991B1B]/20 border border-[#EF4444]/50 rounded-lg p-4">
          <h4 className="text-[#EF4444] font-bold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5" />
            Severe Heatwave Warning
          </h4>
          <p className="text-sm text-red-200">
            The heat index has exceeded the safety threshold of {threshold}°C. Avoid outdoor activities, stay hydrated, and check on vulnerable individuals.
          </p>
        </div>
      )}
    </div>
  );
}
