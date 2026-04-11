// ================= OutputConsole.jsx =================
import React from "react";

const OutputConsole = ({ output }) => {
  return (
    <div className="w-full h-full p-4 overflow-auto text-white bg-black rounded-lg">
      <h2 className="mb-2 text-lg font-semibold">Output</h2>
      <pre className="text-sm whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default OutputConsole;