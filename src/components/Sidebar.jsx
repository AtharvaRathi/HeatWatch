import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CloudSun, 
  Map, 
  Flame, 
  AlertTriangle, 
  Bot, 
  BarChart3, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Wind
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Weather Monitoring', path: '/monitoring', icon: CloudSun },
  { name: 'Heat Map', path: '/map', icon: Map },
  { name: 'Hotspots', path: '/hotspots', icon: Flame },
  { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { name: 'AI Advisory', path: '/ai-advisory', icon: Bot },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isCollapsed, toggleSidebar, mobileOpen, closeMobileSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeMobileSidebar}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 h-screen left-0 z-50
        flex flex-col justify-between
        glass-sidebar
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Brand */}
        <div>
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/[0.08]">
            <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden" onClick={closeMobileSidebar}>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/5 backdrop-blur-md">
                <Wind size={16} strokeWidth={1.5} className="text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-light text-base tracking-widest text-white">
                    HeatWatch
                  </span>
                </div>
              )}
            </NavLink>
            <button 
              onClick={toggleSidebar} 
              className="hidden lg:flex p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition backdrop-blur-md border border-transparent hover:border-white/10"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={16} strokeWidth={1.5} /> : <ChevronLeft size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-4">
            <div className="px-3 pb-2 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
              {!isCollapsed ? 'Menu' : '•••'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-light transition-all group relative
                    ${isActive 
                      ? 'bg-white/[0.08] text-white border border-white/[0.05] shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
                      : 'text-white/50 hover:bg-white/[0.04] hover:text-white border border-transparent'}
                  `}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className={`shrink-0 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/50 group-hover:text-white'}`} />
                  
                  {!isCollapsed && (
                    <span className="truncate tracking-wide">{item.name}</span>
                  )}

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}

                  {/* Tooltip for Collapsed view */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 glass-card text-white text-xs font-light tracking-wide rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition z-50">
                      {item.name}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Minimal Indicator */}
        {!isCollapsed && (
          <div className="p-4 m-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-3 text-white/80 font-light text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              </span>
              <span className="tracking-wide">System Online</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
