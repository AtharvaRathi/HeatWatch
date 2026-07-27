export default function ForecastDayCard({ day }) {
  const dateObj = new Date(day.date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const dateNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  
  let bgColor = 'bg-gray-800/50';
  let badgeColor = 'bg-[#22C55E] text-green-100';
  
  if (day.risk_level === 'Severe') {
    bgColor = 'bg-[#991B1B]/20 border border-[#EF4444]/30';
    badgeColor = 'bg-[#EF4444] text-red-100';
  } else if (day.risk_level === 'Moderate') {
    bgColor = 'bg-[#EAB308]/10 border border-[#EAB308]/20';
    badgeColor = 'bg-[#EAB308] text-yellow-100';
  }

  return (
    <div className={`card p-4 flex flex-col items-center text-center h-full ${bgColor} transition-all hover:scale-105`}>
      <p className="font-bold">{dayName}</p>
      <p className="text-xs text-gray-400 mb-3">{dateNum}</p>
      
      <div className="flex-grow flex flex-col justify-center w-full my-2">
        <div className="flex justify-between w-full px-2 text-sm mb-1">
          <span className="text-gray-400">Max</span>
          <span className="font-bold text-[#F97316]">{day.max_temp}°</span>
        </div>
        <div className="flex justify-between w-full px-2 text-sm">
          <span className="text-gray-400">Min</span>
          <span className="font-bold text-gray-300">{day.min_temp}°</span>
        </div>
      </div>
      
      <span className={`badge ${badgeColor} w-full justify-center py-1 mt-auto text-[10px] uppercase tracking-wider`}>
        {day.risk_level}
      </span>
      
      <p className="text-[10px] text-gray-400 mt-2 leading-tight">
        {day.risk_level === 'Severe' ? 'Avoid outdoors' : 
         day.risk_level === 'Moderate' ? 'Stay hydrated' : 'Normal conditions'}
      </p>
    </div>
  );
}
