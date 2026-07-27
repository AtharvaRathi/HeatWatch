import AlertInbox from '../components/Alerts/AlertInbox';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bell className="text-[#F97316] w-8 h-8" />
          Alert Inbox
        </h1>
        <p className="text-gray-400 mt-1">Review your heatwave early warning notifications.</p>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
          <h2 className="text-xl font-bold">Recent Notifications</h2>
        </div>
        
        <AlertInbox />
      </div>
    </div>
  );
}
