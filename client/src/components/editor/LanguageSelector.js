// ================= LanguageSelector.jsx =================
import React, { useState } from "react";

const LanguageSelector = ({ languages, current, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10`}
        style={open ? { background: current.bg } : {}}
      >
        <span>{current.name}</span>
      </div>

      {open && (
        <div className="absolute z-10 w-40 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
          {languages.map((lang) => (
            <div
              key={lang.name}
              onClick={() => {
                onSelect(lang);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700"
              style={{ color: lang.color }}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;