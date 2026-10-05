import React from 'react';
import { X, Bell, AlertTriangle, Flame, CheckCircle2, Clock } from 'lucide-react';
import { mockRecentActivities } from '../data/mockData';

const NotificationsPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141416] shadow-2xl border-l border-white/[0.06] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-200 text-sm">Notifications</h3>
                <p className="text-[11px] text-zinc-500">Real-time system events</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-white/[0.06] transition">
              <X size={16} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {mockRecentActivities.map((act) => (
              <div key={act.id} className="p-3.5 rounded-xl glass-card hover:bg-white/[0.04] transition">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    act.severity === 'red' ? 'bg-rose-500/10 text-rose-400' :
                    act.severity === 'orange' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-white/[0.04] text-zinc-400'
                  }`}>
                    {act.severity === 'red' ? <AlertTriangle size={14} /> :
                     act.severity === 'orange' ? <Flame size={14} /> :
                     <CheckCircle2 size={14} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-xs text-zinc-300">{act.title}</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{act.target}</p>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-600 mt-1.5">
                      <Clock size={10} />
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06]">
            <button onClick={onClose} className="w-full py-2.5 px-4 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold transition">
              Dismiss All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
