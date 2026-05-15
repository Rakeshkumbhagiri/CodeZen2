import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Code, FileText, BarChart2, History, Flame, X, MessageSquare
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();


  // Close sidebar on mobile after navigation
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      isActive 
        ? 'bg-[#111] text-white border border-[#222] shadow-sm' 
        : 'text-gray-400 hover:text-white hover:bg-[#111] font-medium border border-transparent'
    }`;

  return (
    <>
      {/* Backdrop overlay — visible on mobile/tablet only */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={`fixed left-0 top-0 w-64 h-full bg-[#0a0a0a] border-r border-[#222] flex flex-col justify-between flex-shrink-0 z-50 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 sm:p-5 pb-0">
          {/* Logo */}
          <div className="flex items-center justify-between gap-3 mb-8 px-2">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-bold text-xl leading-tight text-white">CodeZen</h1>
                <p className="text-[10px] text-green-500/70 font-semibold tracking-wider uppercase">AI DSA Tutor</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-white mt-1 transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Navigation - LEARN */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-green-500/50 mb-3 px-2 uppercase tracking-wider">Learn</p>
            <nav className="space-y-1">
              <NavLink to="/dashboard" className={navItemClass} onClick={handleNavClick}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/problems" className={navItemClass} onClick={handleNavClick}>
                <Code size={18} />
                <span>Problems</span>
              </NavLink>
              <NavLink to="/notes" className={navItemClass} onClick={handleNavClick}>
                <FileText size={18} />
                <span>My Notes</span>
              </NavLink>
            </nav>
          </div>

          {/* Navigation - TRACK */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-green-500/50 mb-3 px-2 uppercase tracking-wider">Track</p>
            <nav className="space-y-1">
              <NavLink to="/analytics" className={navItemClass} onClick={handleNavClick}>
                <BarChart2 size={18} />
                <span>Analytics</span>
              </NavLink>
              <NavLink to="/history" className={navItemClass} onClick={handleNavClick}>
                <History size={18} />
                <span>History</span>
              </NavLink>
            </nav>
          </div>

          {/* Progress Bars */}
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-green-500/50 mb-4 uppercase tracking-wider">Progress</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">Easy</span>
                  <span className="text-green-400 font-medium">18</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full rounded-full shadow-[0_0_6px_rgba(74,222,128,0.5)]" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">Medium</span>
                  <span className="text-amber-400 font-medium">16</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">Hard</span>
                  <span className="text-rose-500 font-medium">8</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Circular Stats */}
          <div className="flex justify-between px-2 mb-6 border-t border-[#222] pt-6 mt-2">
             <div className="flex flex-col items-center">
               <div className="w-11 h-11 flex items-center justify-center rounded-full border border-[#222] bg-[#111]">
                 <span className="text-xs font-bold text-green-400">42</span>
               </div>
               <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">Solved</span>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-11 h-11 flex items-center justify-center rounded-full border border-[#222] bg-[#111]">
                 <Flame size={14} className="text-amber-400" />
               </div>
               <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">7d<br/>Streak</span>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-11 h-11 flex items-center justify-center rounded-full border border-[#222] bg-[#111]">
                 <span className="text-xs font-bold text-green-400">78%</span>
               </div>
               <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">Acc.</span>
             </div>
          </div>
        </div>

        {/* Chatbot Button */}
        <div className="p-3">
          <button
            onClick={() => {
              navigate("/chat");
              handleNavClick();
            }}
            className="w-full py-3 font-medium text-center text-black bg-white hover:bg-gray-200 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageSquare size={16} />
            Chatbot
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;