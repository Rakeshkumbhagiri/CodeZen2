// // import { useProblemStore } from '../../store/problemStore';
// // import { useAuthStore } from '../../store/authStore';
// import { useNavigate } from 'react-router-dom';
// import { TOPICS, DIFFICULTIES } from '../../utils/mockData';
// import { getDifficultyColor } from '../../utils/formatters';
// // import { useDebounce } from '../../hooks/useDebounce';
// import { useEffect, useState, useMemo } from 'react';
// import {
//   BookOpen, Search, X, ChevronRight, CheckCircle2,
//   LayoutGrid, List, TrendingUp,
//   ArrowUpDown, ArrowUp, ArrowDown, Tag,
//   Circle, Filter
// } from 'lucide-react';

// // Difficulty config (unchanged logic)
// const DIFF_CONFIG = {
//   Easy: { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
//   Medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
//   Hard: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
// };

// // Sort icon
// const SortIcon = ({ col, sortKey, sortAsc }) => {
//   if (sortKey !== col) return <ArrowUpDown size={11} className="text-white/20" />;
//   return sortAsc
//     ? <ArrowUp size={11} className="text-indigo-400" />
//     : <ArrowDown size={11} className="text-indigo-400" />;
// };

// // Solved badge
// const SolvedBadge = ({ solved }) =>
//   solved
//     ? <CheckCircle2 size={14} className="text-green-500" />
//     : <Circle size={14} className="text-white/20" />;

// // Difficulty pill
// const DiffPill = ({ difficulty }) => {
//   const c = DIFF_CONFIG[difficulty] || DIFF_CONFIG.Easy;
//   return (
//     <span className={`text-[10px] font-bold px-2 py-[2px] rounded-full border ${c.color} ${c.bg} ${c.border}`}>
//       {difficulty}
//     </span>
//   );
// };

// // Topic tag
// const TopicTag = ({ label }) => (
//   <span className="text-[10px] px-2 py-[2px] rounded-full bg-white/5 border border-white/10 text-white/50">
//     {label}
//   </span>
// );

// // Acceptance bar
// const AccBar = ({ pct, color }) => (
//   <div className="flex items-center gap-2">
//     <div className="h-1 overflow-hidden rounded-full w-11 bg-white/10">
//       <div className="h-full rounded-full opacity-70" style={{ width: `${pct}%`, background: color }} />
//     </div>
//     <span className="text-[11px] text-white/40 font-mono">{pct}%</span>
//   </div>
// );

// // Table row
// const TableRow = ({ problem, index, solved }) => {
//   const navigate = useNavigate();
//   const dc = getDifficultyColor(problem.difficulty);

//   return (
//     <tr
//       onClick={() => navigate(`/solve/${problem.id}`)}
//       className={`group cursor-pointer border-b border-white/5 transition
//         ${solved ? 'bg-green-500/5' : ''}
//         hover:bg-indigo-500/10`}
//     >
//       <td className="w-10 p-3"><SolvedBadge solved={solved} /></td>

//       <td className="text-[11px] text-white/30 font-mono">
//         {String(problem.id).padStart(3, '0')}
//       </td>

//       <td>
//         <div className="flex items-center gap-2">
//           <p className={`text-sm font-semibold ${solved ? 'text-white/50' : 'text-white group-hover:text-indigo-300'}`}>
//             {problem.title}
//           </p>
//           {solved && <span className="text-[10px] text-green-500 font-bold">Solved</span>}
//         </div>
//       </td>

//       <td><DiffPill difficulty={problem.difficulty} /></td>

//       <td className="flex flex-wrap gap-1">
//         {problem.topics.slice(0, 2).map(t => <TopicTag key={t} label={t} />)}
//       </td>

//       <td><AccBar pct={problem.acceptance} color={dc} /></td>

//       <td>
//         <ChevronRight size={14} className="text-indigo-400 transition opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
//       </td>
//     </tr>
//   );
// };

// // Grid card
// const GridCard = ({ problem, solved }) => {
//   const navigate = useNavigate();
//   const dc = getDifficultyColor(problem.difficulty);

//   return (
//     <div
//       onClick={() => navigate(`/solve/${problem.id}`)}
//       className={`p-4 rounded-xl border cursor-pointer transition hover:-translate-y-1 hover:shadow-lg
//       ${solved ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'}`}
//     >
//       <div className="flex justify-between mb-2 text-xs text-white/30">
//         <span>#{problem.id}</span>
//         <div className="flex gap-2">
//           <SolvedBadge solved={solved} />
//           <DiffPill difficulty={problem.difficulty} />
//         </div>
//       </div>

//       <p className="mb-2 text-sm font-bold text-white">{problem.title}</p>

//       <div className="flex flex-wrap gap-1 mb-3">
//         {problem.topics.slice(0, 3).map(t => <TopicTag key={t} label={t} />)}
//       </div>

//       <div className="flex items-center justify-between">
//         <AccBar pct={problem.acceptance} color={dc} />
//         <ChevronRight size={14} className="text-indigo-400" />
//       </div>
//     </div>
//   );
// };

// // MAIN COMPONENT
// const ProblemsPage = () => {
//   const { filteredProblems, filters, setFilter, resetFilters } = useProblemStore();
//   const { user } = useAuthStore();

//   const [view, setView] = useState('table');
//   const [sortKey, setSortKey] = useState(null);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [searchInput, setSearchInput] = useState(filters.search || '');

//   const debouncedSearch = useDebounce(searchInput, 280);

//   useEffect(() => setFilter('search', debouncedSearch), [debouncedSearch]);

//   const solvedIds = useMemo(() => new Set(user?.solvedProblems || []), [user]);

//   const displayList = useMemo(() => {
//     let list = [...filteredProblems];

//     if (filters.status === 'Solved') list = list.filter(p => solvedIds.has(p.id));
//     if (filters.status === 'Unsolved') list = list.filter(p => !solvedIds.has(p.id));

//     if (sortKey) {
//       list.sort((a, b) => {
//         let cmp = 0;
//         if (sortKey === 'id') cmp = a.id - b.id;
//         if (sortKey === 'title') cmp = a.title.localeCompare(b.title);
//         if (sortKey === 'difficulty') {
//           const o = { Easy: 0, Medium: 1, Hard: 2 };
//           cmp = (o[a.difficulty] ?? 0) - (o[b.difficulty] ?? 0);
//         }
//         if (sortKey === 'acceptance') cmp = a.acceptance - b.acceptance;
//         return sortAsc ? cmp : -cmp;
//       });
//     }

//     return list;
//   }, [filteredProblems, filters, sortKey, sortAsc]);

//   const handleSort = (key) => {
//     if (sortKey === key) setSortAsc(v => !v);
//     else { setSortKey(key); setSortAsc(true); }
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">

//       {/* HEADER */}
//       <div>
//         <div className="flex items-center gap-2">
//           <BookOpen size={16} className="text-white/40" />
//           <h2 className="text-lg font-bold text-white">Problem Set</h2>
//         </div>
//         <p className="text-sm text-white/40">{filteredProblems.length} problems available</p>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-sm">
//         <Search size={14} className="absolute left-3 top-2.5 text-white/40" />
//         <input
//           value={searchInput}
//           onChange={e => setSearchInput(e.target.value)}
//           placeholder="Search problems..."
//           className="w-full py-2 pl-8 pr-8 text-sm text-white border rounded-lg bg-white/5 border-white/10"
//         />
//         {searchInput && (
//           <button onClick={() => setSearchInput('')} className="absolute right-2 top-2.5">
//             <X size={14} />
//           </button>
//         )}
//       </div>

//       {/* TABLE / GRID */}
//       {view === 'table' ? (
//         <table className="w-full text-sm">
//           <thead className="text-xs border-b text-white/40 border-white/10">
//             <tr>
//               <th></th>
//               <th onClick={() => handleSort('id')}>#</th>
//               <th onClick={() => handleSort('title')}>Title</th>
//               <th onClick={() => handleSort('difficulty')}>Difficulty</th>
//               <th>Topics</th>
//               <th onClick={() => handleSort('acceptance')}>Acceptance</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayList.map((p, i) => (
//               <TableRow key={p.id} problem={p} index={i} solved={solvedIds.has(p.id)} />
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {displayList.map(p => (
//             <GridCard key={p.id} problem={p} solved={solvedIds.has(p.id)} />
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default ProblemsPage;



// import { useNavigate } from 'react-router-dom';
// import { PROBLEMS } from '../../utils/mockData';
// import { getDifficultyColor } from '../../utils/formatters';
// import { useState, useMemo } from 'react';
// import {
//   FiBookOpen,
//   FiSearch,
//   FiX,
//   FiChevronRight
// } from 'react-icons/fi';

// // Difficulty config
// const DIFF_CONFIG = {
//   Easy: { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
//   Medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
//   Hard: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
// };

// // Components
// const DiffPill = ({ difficulty }) => {
//   const c = DIFF_CONFIG[difficulty] || DIFF_CONFIG.Easy;
//   return (
//     <span className={`text-[10px] font-bold px-2 py-[2px] rounded-full border ${c.color} ${c.bg} ${c.border}`}>
//       {difficulty}
//     </span>
//   );
// };

// const TopicTag = ({ label }) => (
//   <span className="text-[10px] px-2 py-[2px] rounded-full bg-white/5 border border-white/10 text-white/50">
//     {label}
//   </span>
// );

// const AccBar = ({ pct, color }) => (
//   <div className="flex items-center gap-2">
//     <div className="h-1 overflow-hidden rounded-full w-11 bg-white/10">
//       <div className="h-full rounded-full opacity-70" style={{ width: `${pct}%`, background: color }} />
//     </div>
//     <span className="text-[11px] text-white/40 font-mono">{pct}%</span>
//   </div>
// );

// // Table Row
// const TableRow = ({ problem }) => {
//   const navigate = useNavigate();
//   const dc = getDifficultyColor(problem.difficulty);

//   return (
//     <tr
//       onClick={() => navigate(`/solve/${problem.id}`)}
//       className="border-b cursor-pointer border-white/5 hover:bg-indigo-500/10"
//     >
//       <td className="p-3 text-[11px] text-white/30 font-mono">
//         {String(problem.id).padStart(3, '0')}
//       </td>

//       <td className="text-sm font-semibold text-white">
//         {problem.title}
//       </td>

//       <td><DiffPill difficulty={problem.difficulty} /></td>

//       <td className="flex flex-wrap gap-1">
//         {problem.topics.slice(0, 2).map(t => <TopicTag key={t} label={t} />)}
//       </td>

//       <td><AccBar pct={problem.acceptance} color={dc} /></td>

//       <td>
//         <FiChevronRight size={14} className="text-indigo-400" />
//       </td>
//     </tr>
//   );
// };

// // Grid Card
// const GridCard = ({ problem }) => {
//   const navigate = useNavigate();
//   const dc = getDifficultyColor(problem.difficulty);

//   return (
//     <div
//       onClick={() => navigate(`/solve/${problem.id}`)}
//       className="p-4 border cursor-pointer rounded-xl bg-white/5 border-white/10 hover:-translate-y-1 hover:shadow-lg"
//     >
//       <div className="flex justify-between mb-2 text-xs text-white/30">
//         <span>#{problem.id}</span>
//         <DiffPill difficulty={problem.difficulty} />
//       </div>

//       <p className="mb-2 text-sm font-bold text-white">{problem.title}</p>

//       <div className="flex flex-wrap gap-1 mb-3">
//         {problem.topics.slice(0, 3).map(t => <TopicTag key={t} label={t} />)}
//       </div>

//       <div className="flex items-center justify-between">
//         <AccBar pct={problem.acceptance} color={dc} />
//         <FiChevronRight size={14} className="text-indigo-400" />
//       </div>
//     </div>
//   );
// };

// // MAIN COMPONENT
// const ProblemsPage = () => {
//   const navigate = useNavigate();
//   const [view, setView] = useState('table');
//   const [searchInput, setSearchInput] = useState('');

//   // Filter problems
//   const filteredProblems = useMemo(() => {
//     return PROBLEMS.filter(p =>
//       p.title.toLowerCase().includes(searchInput.toLowerCase())
//     );
//   }, [searchInput]);

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">

//       {/* HEADER */}
//       <div>
//         <div className="flex items-center gap-2">
//           <FiBookOpen size={16} className="text-white/40" />
//           <h2 className="text-lg font-bold text-white">Problem Set</h2>
//         </div>
//         <p className="text-sm text-white/40">
//           {filteredProblems.length} problems available
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="relative max-w-sm">
//         <FiSearch size={14} className="absolute left-3 top-2.5 text-white/40" />
//         <input
//           value={searchInput}
//           onChange={e => setSearchInput(e.target.value)}
//           placeholder="Search problems..."
//           className="w-full py-2 pl-8 pr-8 text-sm text-white border rounded-lg bg-white/5 border-white/10"
//         />
//         {searchInput && (
//           <button onClick={() => setSearchInput('')} className="absolute right-2 top-2.5">
//             <FiX size={14} />
//           </button>
//         )}
//       </div>

//       {/* VIEW TOGGLE */}
//       <div className="flex gap-2">
//         <button
//           onClick={() => setView('table')}
//           className={`px-3 py-1 text-sm rounded ${view === 'table' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}
//         >
//           Table
//         </button>
//         <button
//           onClick={() => setView('grid')}
//           className={`px-3 py-1 text-sm rounded ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'}`}
//         >
//           Grid
//         </button>
//       </div>

//       {/* TABLE / GRID */}
//       {view === 'table' ? (
//         <table className="w-full text-sm">
//           <thead className="text-xs border-b text-white/40 border-white/10">
//             <tr>
//               <th className="p-2">#</th>
//               <th>Title</th>
//               <th>Difficulty</th>
//               <th>Topics</th>
//               <th>Acceptance</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProblems.map(p => (
//               <TableRow key={p.id} problem={p} />
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {filteredProblems.map(p => (
//             <GridCard key={p.id} problem={p} />
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default ProblemsPage;


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
