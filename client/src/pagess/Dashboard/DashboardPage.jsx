import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Target, Flame, Medal, ChevronRight
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 font-sans">

      {/* Welcome Banner */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-block bg-green-500/10 text-green-500 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md mb-4 border border-green-500/20">
            CodeZen Overview
          </div>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2 text-white tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Demo'}
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">
            You've solved <span className="text-gray-200 font-medium">42 problems</span> — keep the momentum going.
          </p>
        </div>
        
        <div className="flex flex-wrap items-stretch gap-4">
          <div className="bg-black border border-[#222] rounded-xl p-3 px-4 flex items-center gap-3">
            <div className="bg-amber-500/10 p-2 rounded-lg">
              <Flame size={18} className="text-amber-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-xl font-bold text-white leading-tight">7</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Day Streak</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/problems')}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4  rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            Solve Now <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Stat 1 – Problems Solved */}
        <div className="bg-[#0a0a0a] p-5 lg:p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors shadow-sm flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#111] border border-[#222] p-2.5 rounded-xl group-hover:bg-[#1a1a1a] transition-colors">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
            <span className="bg-green-500/10 text-green-500 text-[10px] font-semibold px-2 py-1 rounded-full border border-green-500/20">
              +12%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1 text-white tracking-tight">42</h3>
            <p className="text-sm font-medium text-gray-400">Problems Solved</p>
          </div>
        </div>

        {/* Stat 2 – Accuracy */}
        <div className="bg-[#0a0a0a] p-5 lg:p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors shadow-sm flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#111] border border-[#222] p-2.5 rounded-xl group-hover:bg-[#1a1a1a] transition-colors">
              <Target size={20} className="text-blue-500" />
            </div>
            <span className="bg-blue-500/10 text-blue-500 text-[10px] font-semibold px-2 py-1 rounded-full border border-blue-500/20">
              +5%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1 text-white tracking-tight">78%</h3>
            <p className="text-sm font-medium text-gray-400">Accuracy Rate</p>
          </div>
        </div>

        {/* Stat 3 – Streak */}
        <div className="bg-[#0a0a0a] p-5 lg:p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors shadow-sm flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#111] border border-[#222] p-2.5 rounded-xl group-hover:bg-[#1a1a1a] transition-colors">
              <Flame size={20} className="text-amber-500" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1 text-white tracking-tight">7 <span className="text-xl text-gray-500 font-medium">days</span></h3>
            <p className="text-sm font-medium text-gray-400">Current Streak</p>
          </div>
        </div>

        {/* Stat 4 – Rank */}
        <div className="bg-[#0a0a0a] p-5 lg:p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors shadow-sm flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#111] border border-[#222] p-2.5 rounded-xl group-hover:bg-[#1a1a1a] transition-colors">
              <Medal size={20} className="text-purple-500" />
            </div>
            <span className="bg-[#222] text-gray-400 text-[10px] font-semibold px-2 py-1 rounded-full">
              Top 15%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1 text-white tracking-tight">1,204</h3>
            <p className="text-sm font-medium text-gray-400">Global Rank</p>
          </div>
        </div>
      </div>

      {/* Bottom: Chart + Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">

        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] rounded-2xl border border-[#222] p-6 flex flex-col shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                Progress Overview
              </h3>
              <p className="text-xs text-gray-500 mt-1">Weekly accuracy and problems solved</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-400">Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-gray-400">Problems</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} dx={-5} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#888', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#111', stroke: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="problems" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4, fill: '#111', stroke: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Problems */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#222] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-white">
                Recommended
              </h3>
              <p className="text-xs text-gray-500 mt-1">Curated for your skill level</p>
            </div>
            <button className="text-xs text-gray-400 hover:text-white transition-colors font-medium">View All &rarr;</button>
          </div>

          <div className="space-y-3 flex-1">
            {[
              { id: '61',  title: 'Two Sum',           diff: 'Easy',   color: 'green' },
              { id: '121', title: 'Best Time to Buy',  diff: 'Easy',   color: 'green' },
              { id: '206', title: 'Reverse List',      diff: 'Medium', color: 'amber' },
              { id: '49',  title: 'Group Anagrams',    diff: 'Medium', color: 'amber' },
            ].map((p) => (
              <div key={p.id} className="bg-[#111] border border-[#222] p-4 rounded-xl hover:border-[#444] transition-colors cursor-pointer group flex items-center justify-between">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-gray-500 font-medium mb-1">#{p.id}</span>
                  <h4 className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors truncate">{p.title}</h4>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border flex-shrink-0 ml-3 ${
                  p.color === 'green' 
                    ? 'text-green-500 bg-green-500/10 border-green-500/20' 
                    : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
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
