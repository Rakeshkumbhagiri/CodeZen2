import { useNavigate } from 'react-router-dom';
import { Tag } from '../ui';
import { ChevronRight, Users, CheckCircle } from 'lucide-react';
import { getDifficultyColor } from '../../utils/formatters';

const ProblemCard = ({ problem, index }) => {
  const navigate = useNavigate();

  const handleSolve = () => {
    navigate(`/solve/${problem.id}`);
  };

  const diffColor = getDifficultyColor(problem.difficulty);

  return (
    <div
      onClick={handleSolve}
      style={{ animationDelay: `${index * 50}ms` }}
      className="p-4 transition-all duration-200 bg-gray-900 border border-gray-800 cursor-pointer group rounded-2xl hover:-translate-y-1 hover:shadow-lg animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Left */}
        <div className="flex-1 min-w-0">

          {/* Number + Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-gray-800 text-gray-400">
              #{problem.id}
            </span>

            <h3 className="text-sm font-semibold text-gray-200 truncate transition-colors group-hover:text-indigo-400">
              {problem.title}
            </h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {problem.topics.map((topic) => (
              <Tag key={topic}>{topic}</Tag>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className="text-green-400" />
              <span>{problem.acceptance}% acceptance</span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{problem.submissions.toLocaleString()} solved</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end flex-shrink-0 gap-3">
          <span
            className="px-3 py-1 text-xs font-semibold border rounded-full"
            style={{
              color: diffColor,
              backgroundColor: `${diffColor}18`,
              borderColor: `${diffColor}30`,
            }}
          >
            {problem.difficulty}
          </span>

          <ChevronRight
            size={18}
            className="text-gray-400 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;