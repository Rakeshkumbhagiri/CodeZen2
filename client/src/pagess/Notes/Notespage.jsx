import { useState, useEffect, useRef } from "react";
import { Trash2, FileText, Bold, Code, List, Type, Upload } from "lucide-react";
// import toast from "react-hot-toast";

const FORMAT_SHORTCUTS = [
  { icon: Bold, label: "Bold", insert: "**text**", select: "text" },
  { icon: Code, label: "Inline code", insert: "`code`", select: "code" },
  { icon: List, label: "Bullet", insert: "\n- item" },
  { icon: Type, label: "Heading", insert: "\n## Heading\n" },
];

// ✅ localStorage helpers (replaces Zustand)
const getNote = (id) => localStorage.getItem(`note-${id}`) || "";

const saveNote = (id, value) => {
  localStorage.setItem(`note-${id}`, value);
};

const deleteNote = (id) => {
  localStorage.removeItem(`note-${id}`);
};

const NotesPanel = ({ problemId, problemTitle }) => {
  const [content, setContent] = useState(() => getNote(problemId));
  const [saveStatus, setSaveStatus] = useState("saved");
  const textareaRef = useRef(null);

  const [pdfFile, setPdfFile] = useState(null);

  // ✅ Auto-save with debounce (no external hook)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== getNote(problemId)) {
        setSaveStatus("saving");
        saveNote(problemId, content);
        setTimeout(() => setSaveStatus("saved"), 400);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [content, problemId]);

  // Load note on problem change
  useEffect(() => {
    setContent(getNote(problemId));
    setSaveStatus("saved");
  }, [problemId]);

  const handleChange = (e) => {
    setContent(e.target.value);
    setSaveStatus("unsaved");
  };

  const handleInsert = (shortcut) => {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    const before = content.slice(0, start);
    const after = content.slice(end);

    const newContent = before + shortcut.insert + after;
    setContent(newContent);
    setSaveStatus("unsaved");

    setTimeout(() => {
      const selectStart = start + (shortcut.select
        ? shortcut.insert.indexOf(shortcut.select)
        : shortcut.insert.length);

      const selectEnd = shortcut.select
        ? selectStart + shortcut.select.length
        : selectStart;

      ta.focus();
      ta.setSelectionRange(selectStart, selectEnd);
    }, 10);
  };

  const handleDelete = () => {
    if (!content.trim()) return;
    deleteNote(problemId);
    setContent("");
    setSaveStatus("saved");
    // toast("Note deleted", { icon: "🗑️" });
  };

  // PDF upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      // toast.error("Only PDF files are allowed");
      return;
    }

    setPdfFile(file);
    // toast.success("PDF uploaded");
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    // toast("PDF removed", { icon: "🗑️" });
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div className="flex flex-col h-full text-gray-200 bg-gray-900">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 border rounded-lg bg-yellow-500/20 border-yellow-500/30">
            <FileText size={13} className="text-yellow-400" />
          </div>
          <span className="text-sm font-semibold">My Notes</span>
        </div>

        <div className="flex items-center gap-2">

          {/* Upload PDF */}
          <label className="p-1.5 rounded-lg cursor-pointer text-gray-400 hover:text-blue-400">
            <Upload size={13} />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Save Status */}
          <span
            className={`text-xs flex items-center gap-1 ${
              saveStatus === "saved"
                ? "text-green-400"
                : saveStatus === "saving"
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
          >
            {saveStatus === "saving" && (
              <span className="w-3 h-3 border border-current rounded-full border-t-transparent animate-spin" />
            )}
            {saveStatus === "saved"
              ? "✓ Saved"
              : saveStatus === "saving"
              ? "Saving..."
              : "● Unsaved"}
          </span>

          {/* Delete */}
          {content.trim() && (
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-800 bg-gray-900/40">
        {FORMAT_SHORTCUTS.map(({ icon: Icon, label, insert, select }) => (
          <button
            key={label}
            onClick={() => handleInsert({ insert, select })}
            className="flex items-center justify-center text-gray-400 rounded-lg w-7 h-7 hover:bg-indigo-500/20 hover:text-indigo-400"
            title={label}
          >
            <Icon size={13} />
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[10px] text-gray-400">Markdown supported</span>
      </div>

      {/* PDF Preview */}
      {pdfFile && (
        <div className="flex items-center justify-between px-4 py-2 text-xs bg-gray-800 border-b border-gray-700">
          <span className="truncate">📄 {pdfFile.name}</span>
          <button
            onClick={handleRemoveFile}
            className="text-red-400 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      )}

      {/* Textarea */}
      <div className="relative flex-1">
        {!content && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pointer-events-none">
            <div className="flex items-center justify-center w-10 h-10 border rounded-xl bg-yellow-500/10 border-yellow-500/20">
              <FileText size={20} className="text-yellow-400 opacity-50" />
            </div>
            <p className="text-xs leading-relaxed text-center text-gray-400">
              Jot down your thoughts, approach,<br />
              or complexity analysis here.
            </p>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          className="w-full h-full p-4 font-mono text-sm leading-relaxed text-gray-300 bg-transparent outline-none resize-none caret-indigo-400"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-400 border-t border-gray-800 bg-gray-900/40">
        <span>{problemTitle}</span>
        <span>{wordCount}w · {charCount}c</span>
      </div>
    </div>
  );
};

export default NotesPanel;