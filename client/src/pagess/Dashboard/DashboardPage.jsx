import { PROBLEMS } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Target, Flame, Medal,
  TrendingUp, ChevronRight, Zap
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
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

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const stats = user?.stats || {
    solved: 42,
    accuracy: 78,
    streak: 7,
    rank: 1204
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-lg border border-blue-500/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-block bg-white/20 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md mb-3 border border-white/20 shadow-sm">
              AI-Powered DSA Platform
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2 text-white">
              Welcome back, <span className="text-blue-200">{user?.name?.split(' ')[0] || 'Demo'}!</span> <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-blue-100 text-sm sm:text-base font-medium">
              You've solved <span className="text-white font-bold">{stats.solved} problems</span> — keep the momentum going!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center gap-3 backdrop-blur-sm shadow-sm">
              <div className="bg-amber-400 p-2 rounded-lg shadow-sm">
                <Flame size={20} className="text-white" fill="white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">{stats.streak}</p>
                <p className="text-[10px] text-amber-200 uppercase font-bold mt-1 tracking-wider">Day Streak</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/problems')}
              className="bg-white hover:bg-gray-50 text-blue-700 shadow-md border border-gray-100 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 text-sm"
            >
              Solve Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-200 shadow-sm">
              <CheckCircle2 size={22} className="text-emerald-600" />
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
              ↑ 12% week
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.solved}</h3>
            <p className="text-sm font-bold text-gray-500">Problems Solved</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">of 150+ available</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
              <Target size={22} className="text-blue-600" />
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-200 uppercase tracking-wide">
              ↑ 5%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.accuracy}%</h3>
            <p className="text-sm font-bold text-gray-500">Accuracy Rate</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">across all submissions</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-100 p-2.5 rounded-xl border border-amber-200 shadow-sm">
              <Flame size={22} className="text-amber-500" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stats.streak} days</h3>
            <p className="text-sm font-bold text-gray-500">Current Streak</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">don't break the chain!</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="bg-cyan-100 p-2.5 rounded-xl border border-cyan-200 shadow-sm">
              <Medal size={22} className="text-cyan-600" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">#{stats.rank.toLocaleString()}</h3>
            <p className="text-sm font-bold text-gray-500">Global Rank</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">top 15% worldwide</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold flex items-center gap-2 text-lg text-gray-900">
                <TrendingUp size={18} className="text-blue-600" />
                Progress Over Time
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Weekly accuracy & problems solved</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></div>
                 <span className="text-gray-600">Accuracy %</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div>
                 <span className="text-gray-600">Problems</span>
               </div>
               <button className="text-blue-600 hover:text-blue-700 ml-2">Details {'>'}</button>
            </div>
          </div>
          
          <div className="flex-1 min-h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} fontWeight={600} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dx={-10} fontWeight={600} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="problems" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
           <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 text-gray-900">
                <Zap size={18} className="text-amber-500" />
                Recommended
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Picked for your level</p>
            </div>
            <button onClick={() => navigate('/problems')} className="text-xs text-blue-600 hover:text-blue-700 font-bold">All problems {'>'}</button>
          </div>

          <div className="space-y-3">
             {PROBLEMS && PROBLEMS.slice(0, 4).map((p, i) => (
               <div key={p.id || i} onClick={() => navigate(`/solve/${p.id}`)} className="bg-gray-50 border border-gray-200 shadow-sm p-3.5 rounded-xl hover:border-gray-300 hover:bg-white transition-colors cursor-pointer group flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">#{p.id || i+1}</span>
                   <h4 className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors uppercase-first">{p.title}</h4>
                 </div>
                 <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${p.difficulty === 'Easy' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : p.difficulty === 'Medium' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200'}`}>
                   {p.difficulty || 'Easy'}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;