import ThresholdsTable from '../components/Admin/ThresholdsTable';
import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShieldCheck className="text-[#F97316] w-8 h-8" />
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Manage system configurations and monitor alerts.</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Alert Thresholds Configuration</h2>
        <p className="text-sm text-gray-400 mb-6">
          Set the temperature at which severe heatwave alerts will be triggered for each region. 
          Changes here take effect immediately for subsequent evaluations.
        </p>
        <ThresholdsTable />
      </div>
      
      {/* Additional admin sections can go here like User Management, Alert Log */}
    </div>
  );
}
