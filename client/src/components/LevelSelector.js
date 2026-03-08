const LevelSelector = ({ setLevel }) => {
  return (
    <select
      className="px-4 py-2 border rounded"
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value="">Select Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  );
};

export default LevelSelector;
