import { Droplets, Wind, MapPin } from 'lucide-react';
import HeatIndexBadge from './HeatIndexBadge';

export default function WeatherCard({ data }) {
  if (!data) return null;

  const date = new Date(data.timestamp * 1000).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="card bg-gradient-to-br from-[#111827] to-[#1F2937] p-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500 opacity-5 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="text-[#F97316] h-6 w-6" />
            {data.city}, {data.country}
          </h2>
          <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center bg-gray-800/50 rounded-lg px-3 py-1">
          <img 
            src={`https://openweathermap.org/img/wn/${data.icon}.png`} 
            alt={data.description} 
            className="w-10 h-10"
          />
          <span className="text-sm capitalize ml-1 text-gray-300">{data.description}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 border-y border-gray-700/50 mb-6">
        <div className="flex items-start">
          <span className="text-6xl font-extrabold tracking-tighter">{Math.round(data.temp)}</span>
          <span className="text-2xl font-bold text-gray-400 mt-2 ml-1">°C</span>
        </div>
        <div className="text-gray-400 mt-2 font-medium flex items-center gap-2">
          Feels like {Math.round(data.feels_like)}°C
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-800/30 p-3 rounded-lg">
          <span className="text-gray-300 font-medium">Heat Index</span>
          <div className="flex items-center gap-3">
            <span className="font-bold font-mono text-lg">{Math.round(data.heat_index)}°C</span>
            <HeatIndexBadge heatIndex={data.heat_index} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-800/30 p-3 rounded-lg">
            <Droplets className="text-[#06B6D4] h-5 w-5" />
            <div>
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="font-bold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/30 p-3 rounded-lg">
            <Wind className="text-gray-400 h-5 w-5" />
            <div>
              <p className="text-xs text-gray-400">Wind</p>
              <p className="font-bold">{data.wind_speed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
