import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CodeEditor from "../../components/editor/CodeEditor";
import LanguageSelector from "../../components/editor/LanguageSelector";
import OutputConsole from "../../components/editor/OutputConsole";
import NotesPanel from "../../components/notes/NotesPanel";

import { problemService, submissionService } from "../../services/mockService";
import { getDifficultyColor } from "../../utils/formatters";
import toast from "react-hot-toast";

import {
  Play,
  Send,
  ChevronLeft,
  FileText,
  BookOpen,
  Timer,
  PanelRight,
  PanelRightClose,
  Zap
} from "lucide-react";

// Timer Component
const SolveTimer = () => {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 font-mono text-xs shadow-sm">
      <Timer size={14} className="text-gray-500" />
      <span className="font-bold tracking-wider">{fmt(secs)}</span>
    </div>
  );
};

// Tab Button Component
const TabBtn = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
      active 
        ? 'bg-blue-50 border-blue-600 text-blue-700' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
  >
    <Icon size={14} />
    {label}
  </button>
);

const LANGUAGES = [
  { name: "JavaScript", value: "javascript", version: "*", bg: "#1e1e1e", color: "#f7df1e" },
  { name: "Python", value: "python", version: "*", bg: "#1e1e1e", color: "#3776ab" },
  { name: "C++", value: "c++", version: "*", bg: "#1e1e1e", color: "#00599c" },
  { name: "Java", value: "java", version: "*", bg: "#1e1e1e", color: "#b07219" }
];

const SolvePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftTab, setLeftTab] = useState("problem");
  const [chatOpen, setChatOpen] = useState(false); // Default closed for more workspace
  const [code, setCode] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [output, setOutput] = useState("Run your code to see output...");
  const [isRunning, setIsRunning] = useState(false);

  // Load problem
  useEffect(() => {
    const load = async () => {
      try {
        const p = await problemService.getById(id);
        setProblem(p);
        setCode(p.starterCode?.javascript || "");
      } catch {
        toast.error("Problem not found");
        navigate("/problems");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const executeCode = async (sourceCode) => {
    // Simulate compilation delay
    await new Promise(r => setTimeout(r, 1200));
    
    // Use mock logic if Piston API is down
    const isError = sourceCode.includes("error") || sourceCode.includes("throw");
    if (isError) {
      return "SyntaxError: Unexpected token or runtime error.\n    at main (script.js:4:1)";
    }
    
    // Dummy outputs based on code presence
    let outputMatch = null;
    if (currentLang.value === "javascript" && sourceCode.includes("console.log")) {
      outputMatch = sourceCode.match(/console\.log\(['"`](.*?)['"`]\)/);
    } else if (currentLang.value === "python" && sourceCode.includes("print")) {
      outputMatch = sourceCode.match(/print\(['"`](.*?)['"`]\)/);
    } else if (currentLang.value === "java" && sourceCode.includes("System.out.println")) {
      outputMatch = sourceCode.match(/System\.out\.println\(['"`](.*?)['"`]\)/);
    } else if (currentLang.value === "c++" && sourceCode.includes("cout")) {
      outputMatch = sourceCode.match(/cout\s*<<\s*['"`](.*?)['"`]/);
    }

    if (outputMatch && outputMatch[1]) {
      return outputMatch[1] + "\n\nProgram executed successfully.";
    }
    
    return "Code compiled successfully.\nRuntime: " + Math.floor(Math.random() * 50 + 10) + "ms\nMemory: " + (Math.random() * 5 + 30).toFixed(1) + "MB\n\nNo output printed to console.";
  };

  // Run Code
  const handleRun = async () => {
    if (!code.trim()) return toast.error("Write code first");
    
    setIsRunning(true);
    setOutput("Executing code...\n");
    try {
      const result = await executeCode(code);
      setOutput(result);
      toast.success("Run successful", {
        icon: '🚀',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    } catch (err) {
      toast.error("Error running code");
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code
  const handleSubmit = async () => {
    if (!code.trim()) return toast.error("Write code first");
    
    setIsRunning(true);
    setOutput("Running tests...\n");
    try {
      const mockRes = await submissionService.run();
      let out = `Test Results:\nStatus: ${mockRes.status}\nRuntime: ${mockRes.runtime}\nMemory: ${mockRes.memory}\n\n`;
      mockRes.testCases.forEach(tc => {
        out += `${tc.name}: ${tc.passed ? "✅ Passed" : "❌ Failed"}\n`;
      });
      setOutput(out);
      
      if (mockRes.status === 'Passed') {
        toast.success("All tests passed! Submitted successfully.", {
          icon: '✅',
          style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
        await submissionService.submit();
      } else {
        toast.error("Some test cases failed.");
      }
    } catch (err) {
      toast.error("Submit failed");
    } finally {
      setIsRunning(false);
    }
  };

  // AI Auto-Fix Code
  const handleAutoFix = async () => {
    if (!code.trim()) return toast.error("Write code first to get suggestions!");
    
    setAiLoading(true);
    setAiSuggestion("");
    setChatOpen(true);
    
    try {
      const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE}/api/ai/repair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      });
      const data = await response.json();
      
      if (data.success) {
        setAiSuggestion(data.fixed_code);
        toast.success("AI generated a fix!", { icon: '🤖' });
      } else {
        toast.error("AI Error: " + (data.error || "Failed to generate fix"));
      }
    } catch (err) {
      toast.error("AI Error: Failed to reach the server");
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyFix = () => {
    if (aiSuggestion) {
      setCode(aiSuggestion);
      setAiSuggestion("");
      toast.success("Fix applied to editor!");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
        <Zap size={32} className="animate-pulse mb-4 text-blue-500" />
        <span className="font-bold uppercase tracking-widest text-sm">Loading Problem Workspace...</span>
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  const diffColor = getDifficultyColor(problem.difficulty);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* TOP HEADER MENU */}
      <div className="flex items-center justify-between h-14 px-6 border-b border-gray-200 bg-white shadow-sm z-10 flex-shrink-0">
        
        {/* Left: Nav Profile */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/problems")} 
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-bold tracking-wide">{problem.title}</h2>
            <span
              className="px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider border"
              style={{
                color: diffColor,
                backgroundColor: `${diffColor}15`,
                borderColor: `${diffColor}30`,
              }}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
           <SolveTimer />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block md:hidden mr-2">
            <SolveTimer />
          </div>

          <button 
            onClick={handleRun} 
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all text-gray-700 hover:text-black shadow-sm disabled:opacity-50"
          >
            <Play size={14} className="text-emerald-500" /> {isRunning ? "Running..." : "Run Code"}
          </button>

          <button 
            onClick={handleSubmit} 
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm border border-blue-600 rounded-lg transition-all text-white disabled:opacity-50"
          >
            <Send size={14} /> Submit
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          <button 
            onClick={() => setChatOpen(v => !v)}
            className={`p-2 rounded-lg transition-colors ${chatOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 hover:text-gray-800'}`}
          >
            {chatOpen ? <PanelRightClose size={18} /> : <PanelRight size={18} />}
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE BODY */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: Problem / Notes */}
        <div className="w-[350px] lg:w-[450px] border-r border-gray-200 flex flex-col bg-white flex-shrink-0 shadow-sm z-10">
          <div className="flex px-2 pt-2 border-b border-gray-200 bg-gray-50">
            <TabBtn active={leftTab === "problem"} onClick={() => setLeftTab("problem")} icon={BookOpen} label="Problem Description" />
            <TabBtn active={leftTab === "notes"} onClick={() => setLeftTab("notes")} icon={FileText} label="My Notes" />
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
            {leftTab === "problem" && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">{problem.title}</h1>
                <div className="whitespace-pre-wrap leading-relaxed text-[15px]">{problem.description}</div>
              </div>
            )}

            {leftTab === "notes" && (
              <NotesPanel problemId={id} problemTitle={problem.title} />
            )}
          </div>
        </div>

        {/* CENTER PANEL: Code Editor & Console */}
        <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
          <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 bg-white">
             <LanguageSelector languages={LANGUAGES} current={currentLang} onSelect={setCurrentLang} />
          </div>
          
          <div className="flex-1 relative bg-white border-b border-gray-200 shadow-inner">
            <CodeEditor code={code} setCode={setCode} language={currentLang.value} />
          </div>
          
          {/* Console Output Area */}
          <div className="h-[250px] flex flex-col bg-white">
            <div className="h-10 px-4 flex items-center border-b border-gray-200 bg-gray-50 shadow-sm">
               <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                 <CommandPromptIcon /> Output Console
               </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <OutputConsole output={output} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI Chat Drawer */}
        <div 
          className={`flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${chatOpen ? 'w-[320px]' : 'w-0 border-l-0'} overflow-hidden flex-shrink-0`}
        >
          <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200 bg-gray-50">
             <span className="text-sm font-bold flex items-center gap-2 text-blue-700">
               <Zap size={16} /> CodeT5 AI Assistant
             </span>
             <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                <PanelRightClose size={16} />
             </button>
          </div>
          
          <div className="flex-1 p-4 flex flex-col gap-4 text-gray-600 border-l border-gray-50 overflow-y-auto">
             <button 
               onClick={handleAutoFix}
               disabled={aiLoading}
               className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 shadow-sm"
             >
               {aiLoading ? <Zap size={16} className="animate-pulse" /> : <Zap size={16} />}
               {aiLoading ? "Analyzing Code..." : "Auto-Fix My Code"}
             </button>

             {aiSuggestion ? (
               <div className="mt-2 text-sm border border-emerald-200 rounded-lg overflow-hidden flex flex-col">
                 <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-200 font-bold text-emerald-800 flex items-center justify-between">
                    <span>Suggested Fix</span>
                 </div>
                 <div className="p-3 bg-gray-50 overflow-x-auto max-h-[300px] overflow-y-auto font-mono text-xs text-gray-800">
                   <pre>{aiSuggestion}</pre>
                 </div>
                 <button onClick={handleApplyFix} className="py-2 bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700">Apply Fix to Editor</button>
               </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-8">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100 shadow-sm">
                    <Zap size={24} className="text-blue-500" />
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-800 mb-2">Need a Hint?</h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                    Click "Auto-Fix My Code" to have our CodeT5 ML model analyze and repair your bugs!
                  </p>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper SVG Icon
const CommandPromptIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

export default SolvePage;
