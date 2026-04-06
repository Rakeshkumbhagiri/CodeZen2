// Date Formatting
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatRelativeTime = (isoString) => {
  const now = new Date();
  const date = new Date(isoString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Colors (used in Tailwind inline style)
export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "#10b981";
    case "medium":
      return "#f59e0b";
    case "hard":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "correct":
      return "#10b981";
    case "incorrect":
      return "#ef4444";
    case "optimized":
      return "#6366f1";
    default:
      return "#94a3b8";
  }
};

// Code Helpers
export const truncateCode = (code, maxLines = 5) => {
  const lines = code.split("\n");
  if (lines.length <= maxLines) return code;
  return lines.slice(0, maxLines).join("\n") + "\n...";
};

export const generateId = () =>
  Math.random().toString(36).substring(2, 9);