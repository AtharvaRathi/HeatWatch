import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import { AlertTriangle, Check, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AlertInbox() {
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['user-alerts'],
    queryFn: async () => {
      // Fetch both read and unread for inbox view
      const res = await apiClient.get('/api/alerts?unread=false');
      return res.data;
    }
  });

  const markReadMutation = useMutation({
    mutationFn: async (id) => {
      await apiClient.patch(`/api/alerts/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-alerts'] });
    }
  });

  const dismissMutation = useMutation({
    mutationFn: async (id) => {
      await apiClient.delete(`/api/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-alerts'] });
      toast.success('Alert dismissed');
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#F97316] w-8 h-8" /></div>;
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 bg-gray-800/20 rounded-lg border border-gray-800">
        <BellOff className="mx-auto h-12 w-12 text-gray-600 mb-4" />
        <p>Your inbox is empty. No recent alerts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`p-4 rounded-lg border transition-all ${
            !alert.is_read 
              ? 'bg-[#991B1B]/20 border-[#EF4444]/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
              : 'bg-gray-800/40 border-gray-700'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full mt-1 ${!alert.is_read ? 'bg-red-500/20 text-red-500' : 'bg-gray-700 text-gray-400'}`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className={`font-bold flex items-center gap-2 ${!alert.is_read ? 'text-[#EF4444]' : 'text-gray-300'}`}>
                  Severe Heatwave: {alert.city}
                  {!alert.is_read && <span className="flex h-2 w-2 relative rounded-full bg-red-500 animate-ping"></span>}
                </h4>
                <p className={`text-sm mt-1 ${!alert.is_read ? 'text-red-200' : 'text-gray-400'}`}>
                  Heat index reached <span className="font-mono font-bold">{alert.heat_index}°C</span> 
                  (Threshold: {alert.threshold}°C). Please take necessary precautions.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(alert.triggered_at).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 ml-4">
              {!alert.is_read && (
                <button 
                  onClick={() => markReadMutation.mutate(alert.id)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button 
                onClick={() => dismissMutation.mutate(alert.id)}
                className="p-2 bg-red-900/30 hover:bg-red-900/60 rounded text-red-400 transition-colors"
                title="Dismiss"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple fallback icon
function BellOff(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.06 5.3a7 7 0 0 1 10.4 4.1" />
      <path d="m2 2 20 20" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
    </svg>
  );
}
