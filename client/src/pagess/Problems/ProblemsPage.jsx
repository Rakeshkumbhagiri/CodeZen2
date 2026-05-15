import { useNavigate } from 'react-router-dom';
import { PROBLEMS } from '../../utils/mockData';
import { getDifficultyColor } from '../../utils/formatters';
import { useState, useMemo } from 'react';
import { FiBookOpen, FiSearch, FiX, FiChevronRight } from 'react-icons/fi';

// Difficulty config
const DIFF_CONFIG = {
  Easy: { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  Medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  Hard: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

// Components
const DiffPill = ({ difficulty }) => {
  const c = DIFF_CONFIG[difficulty] || DIFF_CONFIG.Easy;
  return (
    <span className={`text-[10px] font-bold px-2 py-[2px] rounded-full border ${c.color} ${c.bg} ${c.border}`}>
      {difficulty}
    </span>
  );
};

const TopicTag = ({ label }) => (
  <span className="text-[10px] px-2 py-[2px] rounded-full bg-white/5 border border-white/10 text-white/50">
    {label}
  </span>
);

const AccBar = ({ pct = 0, color }) => (
  <div className="flex items-center gap-2">
    <div className="h-1 overflow-hidden rounded-full w-11 bg-white/10">
      <div className="h-full rounded-full opacity-70" style={{ width: `${pct}%`, background: color }} />
    </div>
    <span className="text-[11px] text-white/40 font-mono">{pct}%</span>
  </div>
);

// Table Row
const TableRow = ({ problem = {} }) => {
  const navigate = useNavigate();
  const dc = getDifficultyColor(problem?.difficulty);

  return (
    <tr onClick={() => navigate(`/solve/${problem?.id}`)} className="border-b cursor-pointer border-white/5 hover:bg-indigo-500/10">
      <td className="p-3 text-[11px] text-white/30 font-mono">{String(problem?.id || 0).padStart(3, '0')}</td>

      <td className="text-sm font-semibold text-white">{problem?.title || 'Untitled'}</td>

      <td>
        <DiffPill difficulty={problem?.difficulty} />
      </td>

      <td className="flex flex-wrap gap-1">
        {(problem?.topics || []).slice(0, 2).map((t, i) => (
          <TopicTag key={i} label={t} />
        ))}
      </td>

      <td>
        <AccBar pct={problem?.acceptance || 0} color={dc} />
      </td>

      <td>
        <FiChevronRight size={14} className="text-indigo-400" />
      </td>
    </tr>
  );
};

// Grid Card
const GridCard = ({ problem = {} }) => {
  const navigate = useNavigate();
  const dc = getDifficultyColor(problem?.difficulty);

  return (
    <div onClick={() => navigate(`/solve/${problem?.id}`)} className="p-4 border cursor-pointer rounded-xl bg-white/5 border-white/10 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex justify-between mb-2 text-xs text-white/30">
        <span>#{problem?.id}</span>
        <DiffPill difficulty={problem?.difficulty} />
      </div>

      <p className="mb-2 text-sm font-bold text-white">{problem?.title || 'Untitled'}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {(problem?.topics || []).slice(0, 3).map((t, i) => (
          <TopicTag key={i} label={t} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <AccBar pct={problem?.acceptance || 0} color={dc} />
        <FiChevronRight size={14} className="text-indigo-400" />
      </div>
    </div>
  );
};

// MAIN COMPONENT
const ProblemsPage = () => {
  const [view, setView] = useState('table');
  const [searchInput, setSearchInput] = useState('');

  const filteredProblems = useMemo(() => {
    return (PROBLEMS || []).filter((p) => (p?.title || '').toLowerCase().includes(searchInput.toLowerCase()));
  }, [searchInput]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <FiBookOpen size={16} className="text-white/40" />
          <h2 className="text-lg font-bold text-white">Problem Set</h2>
        </div>
        <p className="text-sm text-white/40">{filteredProblems.length} problems available</p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <FiSearch size={14} className="absolute left-3 top-2.5 text-white/40" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search problems..."
          className="w-full py-2 pl-8 pr-8 text-sm text-white border rounded-lg bg-white/5 border-white/10"
        />
        {searchInput && (
          <button onClick={() => setSearchInput('')} className="absolute right-2 top-2.5">
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* VIEW TOGGLE */}
      <div className="flex gap-2">
        <button onClick={() => setView('table')} className={`px-3 py-1 text-sm rounded ${view === 'table' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}>
          Table
        </button>

        <button onClick={() => setView('grid')} className={`px-3 py-1 text-sm rounded ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}>
          Grid
        </button>
      </div>

      {/* TABLE / GRID */}
      {view === 'table' ? (
        <table className="w-full text-sm">
          <thead className="text-xs border-b text-white/40 border-white/10">
            <tr>
              <th className="p-2">#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Topics</th>
              <th>Acceptance</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredProblems.map((p, i) => (
              <TableRow key={p?.id || i} problem={p} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map((p, i) => (
            <GridCard key={p?.id || i} problem={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemsPage;
