export default function HeatIndexBadge({ heatIndex }) {
  let label = 'Normal';
  let colorClass = 'bg-[#22C55E] text-green-100'; // Green

  if (heatIndex >= 54) {
    label = 'Extreme Danger';
    colorClass = 'bg-[#991B1B] text-red-100 animate-pulse'; // Maroon
  } else if (heatIndex >= 40) {
    label = 'Danger';
    colorClass = 'bg-[#EF4444] text-red-100'; // Red
  } else if (heatIndex >= 32) {
    label = 'Extreme Caution';
    colorClass = 'bg-[#F97316] text-orange-100'; // Orange
  } else if (heatIndex >= 27) {
    label = 'Caution';
    colorClass = 'bg-[#EAB308] text-yellow-100'; // Yellow
  }

  return (
    <span className={`badge ${colorClass} shadow-sm`}>
      {label}
    </span>
  );
}
