import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';
import { Loader2, Edit2, Check, X } from 'lucide-react';

export default function ThresholdsTable() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const { data: thresholds, isLoading } = useQuery({
    queryKey: ['admin-thresholds'],
    queryFn: async () => {
      const res = await apiClient.get('/api/admin/thresholds');
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, threshold }) => {
      const res = await apiClient.put(`/api/admin/thresholds/${id}`, { threshold: parseFloat(threshold) });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-thresholds'] });
      // Also invalidate public regions query if they share state
      queryClient.invalidateQueries({ queryKey: ['regions'] }); 
      setEditingId(null);
      toast.success('Threshold updated successfully');
    },
    onError: () => {
      toast.error('Failed to update threshold');
    }
  });

  const handleEdit = (region) => {
    setEditingId(region.id);
    setEditValue(region.alert_threshold_celsius.toString());
  };

  const handleSave = (id) => {
    if (!editValue || isNaN(parseFloat(editValue))) {
      toast.error('Please enter a valid number');
      return;
    }
    updateMutation.mutate({ id, threshold: editValue });
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#F97316] w-8 h-8" /></div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-gray-400 font-medium">City</th>
            <th className="py-3 px-4 text-gray-400 font-medium">Country</th>
            <th className="py-3 px-4 text-gray-400 font-medium">Threshold (°C)</th>
            <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {thresholds?.map((region) => (
            <tr key={region.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 font-medium">{region.city_name}</td>
              <td className="py-3 px-4 text-gray-400">{region.country_code}</td>
              <td className="py-3 px-4">
                {editingId === region.id ? (
                  <input
                    type="number"
                    step="0.1"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="input-field py-1 px-2 w-24 bg-gray-900 border-gray-600"
                    autoFocus
                  />
                ) : (
                  <span className="font-mono">{region.alert_threshold_celsius}°C</span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                {editingId === region.id ? (
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleSave(region.id)}
                      disabled={updateMutation.isPending}
                      className="p-1 text-green-500 hover:bg-green-500/20 rounded"
                    >
                      {updateMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="p-1 text-red-500 hover:bg-red-500/20 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEdit(region)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {(!thresholds || thresholds.length === 0) && (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-500">
                No regions monitored currently.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
