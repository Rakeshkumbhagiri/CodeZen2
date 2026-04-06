import { useLocation } from 'react-router-dom';
import { Bell, Flame, ChevronRight, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, isOpen }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className={`fixed top-0 right-0 h-16 px-6 sm:px-8 border-b border-gray-200 flex items-center justify-between bg-white z-40 transition-all duration-300 ${isOpen ? 'left-64' : 'left-0'}`}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-lg border border-gray-200 shadow-sm">
          <Menu size={20} />
        </button>
        <div className="flex flex-col">
           <h2 className="text-lg font-bold text-gray-900 capitalize tracking-tight">{location.pathname.replace('/', '') || 'Dashboard'}</h2>
           <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Your learning overview</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <span className="text-xs font-bold text-blue-600">Lv.7</span>
            <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[68%] rounded-full shadow-inner"></div>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">340/500 XP</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-orange-50 border border-amber-200 px-3 py-1.5 rounded-full shadow-sm">
          <Flame size={14} className="text-amber-500" fill="currentColor" />
          <span className="text-xs font-bold text-amber-600">7</span>
        </div>

        <button className="relative text-gray-500 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-sm p-2 rounded-full hidden sm:block">
          <Bell size={18} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
        </button>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 shadow-sm pl-1 pr-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shadow-md text-white">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-bold text-blue-900">{user?.name?.split(' ')[0] || 'User'}</span>
          <ChevronRight size={14} className="text-blue-400 rotate-90 ml-1" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;