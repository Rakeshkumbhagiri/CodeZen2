const ProgressBar = ({ total, completed }) => {
  const percent = (completed / total) * 100;

  return (
    <div className="w-full max-w-xl p-4 mx-auto mt-10 bg-white rounded shadow">
      <div className="w-full h-3 bg-gray-300 rounded">
        <div
          className="h-3 bg-green-500 rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">
        {completed} / {total} Completed
      </p>
    </div>
  );
};

export default ProgressBar;
