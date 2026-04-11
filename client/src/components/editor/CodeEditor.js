// ================= CodeEditor.jsx =================
import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <div className="w-full h-full overflow-hidden border border-gray-700 rounded-xl">
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="vs-light"
        onChange={(value) => setCode(value)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;