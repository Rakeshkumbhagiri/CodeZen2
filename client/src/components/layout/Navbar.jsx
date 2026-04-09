import { useLocation } from 'react-router-dom';
import { Bell, Flame, ChevronRight, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, isOpen }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const pageName = location.pathname.replace('/', '') || 'Dashboard';

  return (
    <header className={`fixed top-0 right-0 h-16 bg-black px-6 sm:px-8 border-b border-green-500/10 flex items-center justify-between bg-[#050505] z-40 transition-all duration-300 ${isOpen ? 'left-64' : 'left-0'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="text-gray-400 hover:text-green-400 transition-colors bg-green-500/5 hover:bg-green-500/10 p-2 rounded-lg border border-green-500/10"
        >
          <Menu size={20} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-white capitalize tracking-tight">{pageName}</h2>
          <span className="text-[11px] text-green-500/50 font-medium">Your learning overview</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        {/* XP Bar */}
        <div className="hidden sm:flex items-center gap-2 bg-black px-3 py-1.5 rounded-full border border-green-500/20">
          <span className="text-xs font-bold text-green-400">Lv.7</span>
          <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-400 h-full w-[68%] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          </div>
          <span className="text-[10px] text-gray-400 font-bold">340/500 XP</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/20 px-3 py-1.5 rounded-full">
          <Flame size={14} className="text-amber-400" fill="currentColor" />
          <span className="text-xs font-bold text-amber-400">7</span>
        </div>

        {/* Bell */}
        <button className="relative text-gray-500 hover:text-green-400 transition-colors bg-green-500/5 hover:bg-green-500/10 border border-green-500/10 p-2 rounded-full hidden sm:block">
          <Bell size={18} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#050505]"></div>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 pl-1 pr-3 py-1 rounded-full cursor-pointer hover:bg-green-500/15 transition-colors">
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-black">
            {user?.name?.[0]?.toUpperCase() || 'D'}
          </div>
          <span className="text-sm font-medium text-green-300">{user?.name?.split(' ')[0] || 'Demo'}</span>
          <ChevronRight size={14} className="text-green-500/60 rotate-90 ml-1" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;