import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Zap, LayoutDashboard, Code, FileText, BarChart2, History, Settings, LogOut, Flame, X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100 shadow-sm' 
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-medium'
    }`;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={`fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 z-50 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 xs:p-6 pb-0">
          <div className="flex items-center justify-between gap-3 mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
                <Zap size={20} className="text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-xl leading-tight text-gray-900">CodeZen</h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">AI DSA Tutor</p>
              </div>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-800 mt-1">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 mb-3 px-2 uppercase tracking-wider">Learn</p>
            <nav className="space-y-1">
              <NavLink to="/dashboard" className={navItemClass}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/problems" className={navItemClass}>
                <Code size={18} />
                <span>Problems</span>
              </NavLink>
              <NavLink to="/notes" className={navItemClass}>
                <FileText size={18} />
                <span>My Notes</span>
              </NavLink>
            </nav>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 mb-3 px-2 uppercase tracking-wider">Track</p>
            <nav className="space-y-1">
              <NavLink to="/analytics" className={navItemClass}>
                <BarChart2 size={18} />
                <span>Analytics</span>
              </NavLink>
              <NavLink to="/history" className={navItemClass}>
                <History size={18} />
                <span>History</span>
              </NavLink>
            </nav>
          </div>

          <div className="mb-6 px-2">
            <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Progress</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
                  <span className="text-gray-600 font-medium">Easy</span>
                  <span className="text-emerald-600 font-bold">18</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[35%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
                  <span className="text-gray-600 font-medium">Medium</span>
                  <span className="text-amber-500 font-bold">16</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[25%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
                  <span className="text-gray-600 font-medium">Hard</span>
                  <span className="text-rose-500 font-bold">8</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between px-2 mb-6 border-t border-gray-100 pt-6 mt-2">
             <div className="flex flex-col items-center">
                 <div className="relative w-11 h-11 flex items-center justify-center rounded-full border border-blue-200">
                    <span className="text-xs font-bold text-blue-600">42</span>
                 </div>
                 <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase text-center leading-tight">Solved</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="relative w-11 h-11 flex items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                    <Flame size={14} className="text-amber-500" />
                 </div>
                 <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase text-center leading-tight">7d<br/>Streak</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="relative w-11 h-11 flex items-center justify-center rounded-full border border-teal-200">
                    <span className="text-xs font-bold text-teal-600">78%</span>
                 </div>
                 <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase text-center leading-tight">Acc.</span>
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 text-white">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="truncate text-left">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.name?.split(' ')[0] || 'User'}</p>
                <p className="text-[10px] text-gray-500 font-medium truncate">{user?.email || 'user@codezen...'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Settings size={14} className="hover:text-gray-700 transition-colors" />
              <LogOut size={14} onClick={(e) => { e.stopPropagation(); logout(); }} className="hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;