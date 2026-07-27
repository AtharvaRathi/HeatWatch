import { useState } from 'react';
import CitySearch from '../components/Dashboard/CitySearch';
import WeatherCard from '../components/Dashboard/WeatherCard';
import ForecastChart from '../components/Forecast/ForecastChart';
import ForecastDayCard from '../components/Forecast/ForecastDayCard';
import AlertStatusPanel from '../components/Dashboard/AlertStatusPanel';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [selectedCity, setSelectedCity] = useState('');

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: async () => {
      if (!selectedCity) return null;
      const res = await apiClient.get(`/api/weather/current?city=${selectedCity}`);
      return res.data;
    },
    enabled: !!selectedCity,
    retry: false,
    onError: (err) => {
      toast.error('City not found. Please check the spelling and try again.');
    }
  });

  const { data: forecastData, isLoading: forecastLoading } = useQuery({
    queryKey: ['forecast', selectedCity],
    queryFn: async () => {
      if (!selectedCity) return null;
      const res = await apiClient.get(`/api/predict/${selectedCity}`);
      return res.data;
    },
    enabled: !!selectedCity,
    retry: false,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative">
        {/* Animated Background Shimmer for High Risk */}
        {forecastData?.risk_level === 'Severe' && (
          <div className="absolute inset-0 bg-red-900/20 blur-3xl rounded-[3rem] -z-10 animate-heartbeat"></div>
        )}
        
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Know the heat <span className="text-[#F97316]">before it strikes.</span>
          </h1>
          <p className="text-xl text-gray-400">
            Real-time heatwave monitoring and early warning system.
          </p>
          
          <div className="max-w-md mx-auto pt-4">
            <CitySearch onSearch={setSelectedCity} />
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      {selectedCity && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Current Weather & Map */}
          <div className="lg:col-span-1 space-y-6">
            {weatherLoading ? (
              <div className="card h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
              </div>
            ) : weatherData ? (
              <WeatherCard data={weatherData} />
            ) : null}
            
            {/* Map Placeholder */}
            <div className="card h-64 bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">Map Widget Loading...</span>
            </div>
          </div>
          
          {/* Right Column: Forecast & Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <AlertStatusPanel city={selectedCity} currentHeatIndex={weatherData?.heat_index} />
            
            {forecastLoading ? (
              <div className="card h-96 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
              </div>
            ) : forecastData ? (
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-bold mb-4">5-Day Heatwave Risk Forecast</h3>
                  <ForecastChart data={forecastData.forecast_days} />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecastData.forecast_days.map((day, idx) => (
                    <ForecastDayCard key={idx} day={day} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
