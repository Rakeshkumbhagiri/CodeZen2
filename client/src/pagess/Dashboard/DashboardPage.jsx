import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, CheckCircle2, Target, Flame, Medal, TrendingUp, ChevronRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Mon', accuracy: 50, problems: 10 },
  { name: 'Tue', accuracy: 60, problems: 15 },
  { name: 'Wed', accuracy: 55, problems: 12 },
  { name: 'Thu', accuracy: 68, problems: 20 },
  { name: 'Fri', accuracy: 72, problems: 18 },
  { name: 'Sat', accuracy: 75, problems: 25 },
  { name: 'Sun', accuracy: 78, problems: 30 },
];

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 mt-20">

      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-[#071510] to-[#050505] rounded-2xl p-6 sm:p-8 border border-green-500/20 overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.05)]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-green-400/3 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-block bg-green-500/10 text-green-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md mb-3 border border-green-500/20">
              CodeZen
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 text-white">
              Welcome back, <span className="text-green-400">{user?.name?.split(' ')[0] || 'Demo'}!</span>&nbsp;<span className="animate-bounce">👋</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              You've solved <span className="text-green-400 font-semibold">42 problems</span> — keep the momentum going!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-black border border-amber-500/20 rounded-xl p-3 flex items-center gap-3">
              <div className="bg-amber-500/10 p-2 rounded-lg">
                <Flame size={20} className="text-amber-400" fill="currentColor" />
              </div>
              <div>
                <p className="text-xl font-bold text-amber-400">7</p>
                <p className="text-[10px] text-amber-500/70 uppercase font-bold">Day Streak</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/problems')}
              className="bg-green-500 hover:bg-green-400 hover:-translate-y-0.5 text-black font-bold shadow-[0_4px_20px_rgba(74,222,128,0.3)] px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              Solve Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Stat 1 – Problems Solved */}
        <div className="bg-[#080808] p-5 rounded-2xl border border-green-500/10 hover:border-green-500/25 hover:bg-black transition-all shadow-lg group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-500/10 p-2.5 rounded-xl group-hover:bg-green-500/15 transition-colors">
              <CheckCircle2 size={22} className="text-green-400" />
            </div>
            <span className="bg-green-500/10 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/20">
              ↑ 12% this week
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1 text-white">42</h3>
          <p className="text-sm font-medium text-gray-300">Problems Solved</p>
          <p className="text-xs text-gray-600 mt-1">of 150+ available</p>
        </div>

        {/* Stat 2 – Accuracy */}
        <div className="bg-[#080808] p-5 rounded-2xl border border-green-500/10 hover:border-green-500/25 hover:bg-black transition-all shadow-lg group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-500/10 p-2.5 rounded-xl group-hover:bg-green-500/15 transition-colors">
              <Target size={22} className="text-green-400" />
            </div>
            <span className="bg-green-500/10 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/20">
              ↑ 5%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1 text-white">78%</h3>
          <p className="text-sm font-medium text-gray-300">Accuracy Rate</p>
          <p className="text-xs text-gray-600 mt-1">across all submissions</p>
        </div>

        {/* Stat 3 – Streak */}
        <div className="bg-[#080808] p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/25 hover:bg-black transition-all shadow-lg group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-500/10 p-2.5 rounded-xl group-hover:bg-amber-500/15 transition-colors">
              <Flame size={22} className="text-amber-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1 text-white">7 days</h3>
          <p className="text-sm font-medium text-gray-300">Current Streak</p>
          <p className="text-xs text-gray-600 mt-1">don't break the chain!</p>
        </div>

        {/* Stat 4 – Rank */}
        <div className="bg-[#080808] p-5 rounded-2xl border border-green-500/10 hover:border-green-500/25 hover:bg-black transition-all relative overflow-hidden shadow-lg group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/3 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="bg-green-500/10 p-2.5 rounded-xl group-hover:bg-green-500/15 transition-colors">
              <Medal size={22} className="text-green-400" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-1 text-white">#1,204</h3>
            <p className="text-sm font-medium text-gray-300">Global Rank</p>
            <p className="text-xs text-gray-600 mt-1">top 15% worldwide</p>
          </div>
        </div>
      </div>

      {/* Bottom: Chart + Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 pb-8">

        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-[#080808] rounded-2xl border border-green-500/10 p-5 sm:p-6 flex flex-col shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="font-bold flex items-center gap-2 text-lg text-white">
                <TrendingUp size={18} className="text-green-400" />
                Progress Over Time
              </h3>
              <p className="text-xs text-gray-500 mt-1">Weekly accuracy & problems solved</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <span className="text-gray-400">Accuracy %</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span className="text-gray-400">Problems</span>
              </div>
              <button className="text-green-400 hover:text-green-300">Details &rsaquo;</button>
            </div>
          </div>

          <div className="flex-1 min-h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#16a34a30', borderRadius: '10px', color: '#fff' }}
                  itemStyle={{ color: '#d1fae5' }}
                  labelStyle={{ color: '#4ade80', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#4ade80" strokeWidth={2.5} dot={{ r: 4, fill: '#4ade80', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#4ade80' }} />
                <Line type="monotone" dataKey="problems" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 4, fill: '#fbbf24', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#fbbf24' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Problems */}
        <div className="bg-[#080808] rounded-2xl border border-green-500/10 p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                <Zap size={18} className="text-green-400" fill="currentColor" />
                Recommended
              </h3>
              <p className="text-xs text-gray-500 mt-1">Picked for your level</p>
            </div>
            <button className="text-xs text-green-400 hover:text-green-300 font-medium">All problems &rsaquo;</button>
          </div>

          <div className="space-y-3">
            {[
              { id: '#61',  title: 'Two Sum',           diff: 'Easy',   color: 'green' },
              { id: '#121', title: 'Best Time to Buy',  diff: 'Easy',   color: 'green' },
              { id: '#206', title: 'Reverse List',      diff: 'Medium', color: 'amber' },
              { id: '#49',  title: 'Group Anagrams',    diff: 'Medium', color: 'amber' },
            ].map((p) => (
              <div key={p.id} className="bg-black/40 border border-white/5 p-3.5 rounded-xl hover:border-green-500/20 hover:bg-green-500/5 transition-all cursor-pointer group flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-600 font-medium mb-1">{p.id}</span>
                  <h4 className="font-semibold text-sm text-gray-200 group-hover:text-green-400 transition-colors">{p.title}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                  p.color === 'green' 
                    ? 'text-green-400 bg-green-500/10 border-green-500/20' 
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}>
                  {p.diff}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
