import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine
} from 'recharts';

import {
  TrendingUp, Target, AlertTriangle, Clock, Zap, Award,
  CheckCircle2, XCircle, Sparkles, ArrowUp, ArrowDown, Minus,
  BarChart3, Activity, Brain, Calendar
} from 'lucide-react';

import {
  ACCURACY_DATA, TOPIC_RADAR_DATA, ERROR_PATTERN_DATA, SUBMISSIONS
} from '../../utils/mockData';

import { formatRelativeTime } from '../../utils/formatters';


// ─── Tooltip ─────────────────────────────────────────
const ChartTooltip = ({ active, payload, label, unit = '' }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="p-3 text-xs border rounded-lg shadow-lg bg-black/90 border-indigo-500/30">
      <p className="mb-1 text-white/40">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color }}>
          {p.name}: {p.value}{unit || (p.name === 'accuracy' ? '%' : '')}
        </p>
      ))}
    </div>
  );
};


// ─── Card ────────────────────────────────────────────
const Card = ({ children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-[fadeInUp_0.4s_ease]">
    {children}
  </div>
);


// ─── Header ──────────────────────────────────────────
const CardHeader = ({ icon: Icon, title, sub }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-indigo-400" />
      <h3 className="text-sm font-bold text-white/90">{title}</h3>
    </div>
    {sub && <p className="ml-5 text-xs text-white/40">{sub}</p>}
  </div>
);


// ─── Stat Card ───────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, gradient, trend }) => (
  <div className="flex flex-col gap-3 p-4 transition border bg-white/5 border-white/10 rounded-xl hover:-translate-y-1 hover:shadow-lg">

    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center text-white rounded-lg w-9 h-9"
           style={{ background: gradient }}>
        <Icon size={16} />
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border
          ${trend > 0 ? 'text-green-400 border-green-400/30 bg-green-400/10' :
            trend < 0 ? 'text-red-400 border-red-400/30 bg-red-400/10' :
              'text-white/40 border-white/10 bg-white/5'}`}>
          {trend > 0 ? <ArrowUp size={10} /> :
            trend < 0 ? <ArrowDown size={10} /> :
              <Minus size={10} />}
          {trend !== 0 ? `${Math.abs(trend)}%` : 'Flat'}
        </div>
      )}
    </div>

    <div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  </div>
);


// ─── Status Badge ────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    Correct: "text-green-400 bg-green-400/10 border-green-400/30",
    Incorrect: "text-red-400 bg-red-400/10 border-red-400/30",
    Optimized: "text-indigo-400 bg-indigo-400/10 border-indigo-400/30"
  };

  const icons = {
    Correct: CheckCircle2,
    Incorrect: XCircle,
    Optimized: Sparkles
  };

  const Icon = icons[status] || XCircle;

  return (
    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}>
      <Icon size={10} /> {status}
    </span>
  );
};


// ─── MAIN ────────────────────────────────────────────
const ProgressPage = () => {

  const avgAccuracy = Math.round(
    ACCURACY_DATA.reduce((s, d) => s + d.accuracy, 0) / ACCURACY_DATA.length
  );

  const recent = SUBMISSIONS.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-white/40" />
          <h2 className="text-lg font-bold text-white">Analytics & Progress</h2>
        </div>
        <p className="text-sm text-white/40">Performance overview</p>
      </div>


      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Avg Accuracy" value={`${avgAccuracy}%`} gradient="linear-gradient(135deg,#6366f1,#8b5cf6)" trend={8} />
        <StatCard icon={Target} label="Best Streak" value="12 days" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" trend={0} />
        <StatCard icon={Clock} label="Avg Solve Time" value="18 min" gradient="linear-gradient(135deg,#06b6d4,#6366f1)" trend={-5} />
        <StatCard icon={Award} label="Problems Solved" value="42" gradient="linear-gradient(135deg,#10b981,#059669)" trend={12} />
      </div>


      {/* CHART */}
      <Card>
        <CardHeader icon={Activity} title="Accuracy Over Time" />

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={ACCURACY_DATA}>
            <CartesianGrid stroke="#1e293b" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />

            <Tooltip content={<ChartTooltip />} />

            <ReferenceLine y={avgAccuracy} stroke="#6366f1" strokeDasharray="4 4" />

            <Area dataKey="accuracy" stroke="#6366f1" fill="#6366f1" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>


      {/* RECENT SUBMISSIONS */}
      <Card>
        <CardHeader icon={Activity} title="Recent Submissions" />

        <div className="space-y-2">
          {recent.map(s => (
            <div key={s.id}
              className="flex items-center gap-3 p-3 transition border rounded-lg bg-white/5 border-white/10 hover:bg-indigo-500/10">

              <div className={`w-2 h-2 rounded-full
                ${s.status === 'Correct' ? 'bg-green-400' :
                  s.status === 'Optimized' ? 'bg-indigo-400' : 'bg-red-400'}`} />

              <p className="flex-1 text-sm text-white truncate">{s.problemTitle}</p>

              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                {s.language}
              </span>

              <StatusBadge status={s.status} />

              <span className="text-xs text-white/30">
                {formatRelativeTime(s.submittedAt)}
              </span>

            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default ProgressPage;