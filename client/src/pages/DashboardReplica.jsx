import React from 'react';
import { 
  Zap, LayoutDashboard, Code, FileText, BarChart2, History,
  Bell, Settings, LogOut, CheckCircle2, Target, Flame, Medal,
  TrendingUp, ChevronRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Mock Data for the Chart
const chartData = [
  { name: 'Mon', accuracy: 50, problems: 10 },
  { name: 'Tue', accuracy: 60, problems: 15 },
  { name: 'Wed', accuracy: 55, problems: 12 },
  { name: 'Thu', accuracy: 68, problems: 20 },
  { name: 'Fri', accuracy: 72, problems: 18 },
  { name: 'Sat', accuracy: 75, problems: 25 },
  { name: 'Sun', accuracy: 78, problems: 30 },
];

export default function DashboardReplica() {
  return (
    <div className="flex h-screen bg-[#07090E] text-white font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col justify-between flex-shrink-0 relative overflow-y-auto hidden md:flex">
        <div className="p-4 xs:p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Zap size={20} className="text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight">CodeZen</h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">AI DSA Tutor</p>
            </div>
          </div>

          {/* Navigation - LEARN */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Learn</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 bg-[#131620] text-indigo-400 px-3 py-2.5 rounded-lg border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)] transition-all">
                <LayoutDashboard size={18} />
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-200 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all">
                <Code size={18} />
                <span className="font-medium">Problems</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-200 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all">
                <FileText size={18} />
                <span className="font-medium">My Notes</span>
              </a>
            </nav>
          </div>

          {/* Navigation - TRACK */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Track</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-200 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all">
                <BarChart2 size={18} />
                <span className="font-medium">Analytics</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-gray-200 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all">
                <History size={18} />
                <span className="font-medium">History</span>
              </a>
            </nav>
          </div>

          {/* Progress Bars */}
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Progress</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
                  <span className="text-gray-400">Easy</span>
                  <span className="text-emerald-400 font-medium">18</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
                  <span className="text-gray-400">Medium</span>
                  <span className="text-amber-400 font-medium">16</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1.5 align-middle">
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
          <div className="flex gap-2 justify-between px-2 mb-6 border-t border-white/5 pt-6 mt-2">
             <div className="flex flex-col items-center">
                 <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-indigo-500/30">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', clipPath: 'inset(0 0 0 30%)'}}></div>
                    <span className="text-xs font-bold text-indigo-400">42</span>
                 </div>
                 <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">Solved</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-amber-500/30">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500" style={{ clipPath: 'inset(0 20% 0 0)'}}></div>
                    <Flame size={14} className="text-amber-500" />
                 </div>
                 <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">7d<br/>Streak</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-teal-500/30">
                    <div className="absolute inset-0 rounded-full border-2 border-teal-500" style={{ clipPath: 'inset(0 0 20% 0)'}}></div>
                    <span className="text-xs font-bold text-teal-400">78%</span>
                 </div>
                 <span className="text-[9px] text-gray-500 mt-1 uppercase text-center leading-tight">Acc.</span>
             </div>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-white/5 bg-[#0a0c10]">
          <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                D
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-white truncate">Demo</p>
                <p className="text-[10px] text-gray-500 truncate">demo@code...</p>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-60">
              <Settings size={14} className="hover:text-white transition-colors" />
              <LogOut size={14} className="hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-8 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <div className="flex flex-col">
             <h2 className="text-lg font-bold">Dashboard</h2>
             <span className="text-xs text-gray-500">Your learning overview</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* XP Bar */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#121629] px-3 py-1.5 rounded-full border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400">Lv.7</span>
                <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[68%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                </div>
                <span className="text-[10px] text-gray-400">340/500 XP</span>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 bg-[#251610] border border-amber-500/20 px-3 py-1.5 rounded-full">
              <Flame size={14} className="text-amber-500" fill="currentColor" />
              <span className="text-xs font-bold text-amber-500">7</span>
            </div>

            {/* Notification */}
            <button className="relative text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hidden sm:block">
              <Bell size={18} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#0d0f14]"></div>
            </button>

            {/* Profile Dropdown trigger */}
            <div className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-500/20 pl-1 pr-3 py-1 rounded-full cursor-pointer hover:bg-indigo-900/40 transition-colors">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold shadow-lg">
                D
              </div>
              <span className="text-sm font-medium">Demo</span>
              <ChevronRight size={14} className="text-gray-400 rotate-90 ml-1" />
            </div>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Welcome Banner */}
            <div className="relative bg-gradient-to-r from-[#171638] to-[#121422] rounded-2xl p-6 sm:p-8 border border-indigo-500/20 overflow-hidden shadow-xl">
              {/* Abstract decorative elements */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="inline-block bg-indigo-500/20 text-indigo-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md mb-3 border border-indigo-500/20">
                    AI-Powered DSA Platform
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
                    Welcome back, <span className="text-indigo-400">Demo!</span> <span className="animate-bounce">👋</span>
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    You've solved <span className="text-white font-semibold">42 problems</span> — keep the momentum going!
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#1c1815] border border-amber-500/20 rounded-xl p-3 flex items-center justify-center gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-lg">
                      <Flame size={20} className="text-amber-500" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-amber-500">7</p>
                      <p className="text-[10px] text-amber-500/80 uppercase font-bold">Day Streak</p>
                    </div>
                  </div>
                  <button className="bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm">
                    Solve Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Stat Card 1 */}
              <div className="bg-[#101218] p-5 rounded-2xl border border-white/5 hover:bg-[#13161c] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                    <CheckCircle2 size={22} className="text-emerald-400" />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/20">
                    ↑ 12% this week
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">42</h3>
                  <p className="text-sm font-medium text-gray-300">Problems Solved</p>
                  <p className="text-xs text-gray-500 mt-1">of 150+ available</p>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[#101218] p-5 rounded-2xl border border-white/5 hover:bg-[#13161c] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-500/20 p-2.5 rounded-xl">
                    <Target size={22} className="text-indigo-400" />
                  </div>
                  <span className="bg-indigo-500/10 text-indigo-400 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-500/20">
                    ↑ 5%
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">78%</h3>
                  <p className="text-sm font-medium text-gray-300">Accuracy Rate</p>
                  <p className="text-xs text-gray-500 mt-1">across all submissions</p>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-[#101218] p-5 rounded-2xl border border-white/5 hover:bg-[#13161c] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-amber-500/20 p-2.5 rounded-xl">
                    <Flame size={22} className="text-amber-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">7 days</h3>
                  <p className="text-sm font-medium text-gray-300">Current Streak</p>
                  <p className="text-xs text-gray-500 mt-1">don't break the chain!</p>
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-[#101218] p-5 rounded-2xl border border-white/5 hover:bg-[#13161c] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl">
                    <Medal size={22} className="text-blue-400" />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-1">#1,204</h3>
                  <p className="text-sm font-medium text-gray-300">Global Rank</p>
                  <p className="text-xs text-gray-500 mt-1">top 15% worldwide</p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Chart & List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
              
              {/* Progress Chart */}
              <div className="lg:col-span-2 bg-[#101218] rounded-2xl border border-white/5 p-5 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold flex items-center gap-2 text-lg">
                      <TrendingUp size={18} className="text-indigo-400" />
                      Progress Over Time
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Weekly accuracy & problems solved</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                     <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                       <span className="text-gray-400">Accuracy %</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                       <span className="text-gray-400">Problems</span>
                     </div>
                     <button className="text-indigo-400 hover:text-indigo-300 ml-2">Details {'>'}</button>
                  </div>
                </div>
                
                <div className="flex-1 min-h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#13161c', borderColor: '#ffffff10', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="problems" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommended Problems List */}
              <div className="bg-[#101218] rounded-2xl border border-white/5 p-5 sm:p-6">
                 <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Zap size={18} className="text-amber-400" />
                      Recommended
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Picked for your level</p>
                  </div>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">All problems {'>'}</button>
                </div>

                <div className="space-y-3">
                   {/* Problem Item 1 */}
                   <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl hover:border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer group flex items-center justify-between">
                     <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-medium mb-1">#61</span>
                       <h4 className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">Two Sum</h4>
                     </div>
                     <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                       Easy
                     </span>
                   </div>

                   {/* Problem Item 2 */}
                   <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl hover:border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer group flex items-center justify-between">
                     <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-medium mb-1">#121</span>
                       <h4 className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">Best Time to Buy</h4>
                     </div>
                     <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                       Easy
                     </span>
                   </div>

                   {/* Problem Item 3 */}
                   <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl hover:border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer group flex items-center justify-between">
                     <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-medium mb-1">#206</span>
                       <h4 className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">Reverse List</h4>
                     </div>
                     <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                       Medium
                     </span>
                   </div>

                   {/* Problem Item 4 */}
                   <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl hover:border-white/10 hover:bg-white/[0.03] transition-colors cursor-pointer group flex items-center justify-between">
                     <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-medium mb-1">#49</span>
                       <h4 className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">Group Anagrams</h4>
                     </div>
                     <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                       Medium
                     </span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
