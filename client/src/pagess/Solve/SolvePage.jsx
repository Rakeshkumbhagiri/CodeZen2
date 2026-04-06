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
  MessageSquare,
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

const SolvePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftTab, setLeftTab] = useState("problem");
  const [chatOpen, setChatOpen] = useState(false); // Default closed for more workspace
  const [code, setCode] = useState("");

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

  // Run Code
  const handleRun = async () => {
    if (!code.trim()) return toast.error("Write code first");
    
    try {
      await submissionService.run();
      toast.success("Run successful", {
        icon: '🚀',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    } catch {
      toast.error("Error running code");
    }
  };

  // Submit Code
  const handleSubmit = async () => {
    if (!code.trim()) return toast.error("Write code first");
    
    try {
      await submissionService.submit();
      toast.success("Submitted successfully!", {
        icon: '✅',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    } catch {
      toast.error("Submit failed");
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

  const diffColor = getDifficultyColor(problem?.difficulty);

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
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all text-gray-700 hover:text-black shadow-sm"
          >
            <Play size={14} className="text-emerald-500" /> Run Code
          </button>

          <button 
            onClick={handleSubmit} 
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm border border-blue-600 rounded-lg transition-all text-white"
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
             <LanguageSelector />
          </div>
          
          <div className="flex-1 relative bg-white border-b border-gray-200 shadow-inner">
            <CodeEditor code={code} setCode={setCode} />
          </div>
          
          {/* Console Output Area */}
          <div className="h-[250px] flex flex-col bg-white">
            <div className="h-10 px-4 flex items-center border-b border-gray-200 bg-gray-50 shadow-sm">
               <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                 <CommandPromptIcon /> Output Console
               </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <OutputConsole />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI Chat Drawer */}
        <div 
          className={`flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${chatOpen ? 'w-[320px]' : 'w-0 border-l-0'} overflow-hidden flex-shrink-0`}
        >
          <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200 bg-gray-50">
             <span className="text-sm font-bold flex items-center gap-2 text-blue-700">
               <MessageSquare size={16} /> CodeZen Assistant
             </span>
             <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                <PanelRightClose size={16} />
             </button>
          </div>
          
          <div className="flex-1 p-4 flex flex-col items-center justify-center text-center text-gray-600 border-l border-gray-50">
             <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100 shadow-sm">
               <Zap size={24} className="text-blue-500" />
             </div>
             <h4 className="text-[15px] font-bold text-gray-800 mb-2">Need a Hint?</h4>
             <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
               The AI Assistant tab helps you engage with intelligent hints and code reviews securely.
             </p>
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
