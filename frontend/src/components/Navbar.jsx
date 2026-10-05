import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown
} from 'lucide-react';
import Breadcrumb from './Breadcrumb';

const Navbar = ({ onOpenMobileSidebar, onOpenNotifications, onOpenSearch }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#0f0f11]/80 backdrop-blur-xl border-b border-white/[0.04] transition-all">
      <div className="flex items-center justify-between h-14 px-4 md:px-8">
        
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-white/[0.06] transition"
          >
            <Menu size={18} />
          </button>

          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 glass-card hover:bg-white/[0.06] text-zinc-400 px-3 py-1.5 rounded-lg text-xs font-medium transition"
          >
            <Search size={14} className="text-zinc-500" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 bg-white/[0.04] rounded text-[10px] font-mono text-zinc-500 border border-white/[0.06]">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-zinc-400 hover:bg-white/[0.06] glass-card transition"
            title="View Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </button>

          <div className="h-4 w-px bg-white/[0.06] mx-1 hidden sm:block" />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/[0.06] transition"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                RS
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-zinc-200 leading-tight">Dr. Rajesh Sharma</span>
                <span className="text-[10px] text-zinc-500">IMD Climate ML Lead</span>
              </div>
              <ChevronDown size={12} className="text-zinc-500 hidden md:block" />
            </button>

            {/* Profile Menu Popup */}
            {profileDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 glass-card bg-[#1a1a1e] rounded-xl shadow-2xl p-1.5 z-50"
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div className="p-3 border-b border-white/[0.06]">
                  <p className="text-xs font-semibold text-zinc-200">Dr. Rajesh Sharma</p>
                  <p className="text-[11px] text-zinc-500 truncate">rajesh.sharma@imd-ai.gov.in</p>
                </div>

                <div className="py-1">
                  <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200 rounded-lg transition">
                    <User size={14} /> Profile Settings
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200 rounded-lg transition">
                    <Settings size={14} /> Alert Preferences
                  </a>
                </div>

                <div className="pt-1 border-t border-white/[0.06]">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
