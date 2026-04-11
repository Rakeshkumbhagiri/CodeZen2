import { Search, X } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore';
import { TOPICS, DIFFICULTIES } from '../../utils/mockData';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';

const FilterBar = () => {
  const { filters, setFilter, resetFilters } = useProblemStore();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setFilter('search', debouncedSearch);
  }, [debouncedSearch]);

  const hasActiveFilters =
    filters.difficulty !== 'All' ||
    filters.topic !== 'All' ||
    filters.search !== '';

  return (
    <div className="p-4 mb-6 bg-gray-900 border border-gray-800 rounded-2xl">

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
        />

        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search problems..."
          className="w-full py-2 pl-10 pr-10 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {searchInput && (
          <button
            onClick={() => {
              setSearchInput('');
              setFilter('search', '');
            }}
            className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-white"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Difficulty Filter */}
      <div className="mb-3">
        <p className="text-[11px] text-gray-400 font-semibold tracking-wider mb-2">
          DIFFICULTY
        </p>

        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => {
            const isActive = filters.difficulty === d;

            const base =
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all';

            const styles = isActive
              ? d === 'Easy'
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : d === 'Medium'
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                : d === 'Hard'
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
              : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700';

            return (
              <button
                key={d}
                onClick={() => setFilter('difficulty', d)}
                className={`${base} ${styles}`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Filter */}
      <div>
        <p className="text-[11px] text-gray-400 font-semibold tracking-wider mb-2">
          TOPIC
        </p>

        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const isActive = filters.topic === t;

            return (
              <button
                key={t}
                onClick={() => setFilter('topic', t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                  ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
                  }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <div className="pt-3 mt-3 border-t border-gray-800">
          <button
            onClick={() => {
              resetFilters();
              setSearchInput('');
            }}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-500 transition-colors"
          >
            <X size={12} />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;