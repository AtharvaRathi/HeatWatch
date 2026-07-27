import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ThermometerSun, Bell, User as UserIcon } from 'lucide-react';

export default function Header() {
  const { user, logout } = useStore();

  return (
    <header className="bg-[#111827] border-b border-[#1F2937] sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <ThermometerSun className="h-8 w-8 text-[#F97316] group-hover:text-orange-400 transition-colors" />
            <div className="absolute inset-0 bg-[#F97316] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EF4444]">
            HeatWatch
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Bell className="h-6 w-6" />
            {/* Badge for unread alerts */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#111827]">
              3
            </span>
          </button>
          
          <div className="h-8 w-px bg-gray-700 mx-2"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 rounded-full p-1 border border-gray-600">
                  <UserIcon className="h-5 w-5 text-gray-300" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm py-1.5 px-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
