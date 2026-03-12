import { useState,useEffect } from "react";
import { Plus,ArrowBigLeftDashIcon} from "lucide-react";
import { useRef } from "react";
import api from "../api";
import Chat from "./Chat";
import { initSocket } from "../components/socket";
import { useNavigate } from "react-router-dom";

export default function ChatLayout({ setToken }) {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // chat logic
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  // scroll logic

  //chat rename logic
  const [editingChatId, setEditingChatId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const activeChat = chats.find((c) => c.id === activeChatId);
  useEffect(() => {
    const socket = initSocket();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const saveChatTitle = (id) => {
    if (!tempTitle.trim()) {
      setEditingChatId(null);
      return;
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: tempTitle.trim() } : chat,
      ),
    );

    setEditingChatId(null);
  };

  const send = async () => {
    if (!input.trim()) return;

    let currentChatId = activeChatId;

    // auto-create chat on first message
    if (!currentChatId) {
      const newChat = {
        id: Date.now(),
        title: input.slice(0, 30),
        date: new Date().toLocaleDateString(),
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      currentChatId = newChat.id;

      setMessages([]);
      setChatId(null);
    }

    try {
      const res = await api.post("/api/chat", {
        message: input,
        chatId,
      });

      setChatId(res.data.chatId);

      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: res.data.reply },
      ]);

      setInput("");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  /* ---------------- SCROLL LISTENER ---------------- */

  return (
//     <div className="relative flex h-screen bg-gray-100">
//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r transform transition-transform duration-300 ease-in-out
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
        

        
//         {/* NEW CHAT */}
//         <div className="p-4 mt-8">
//           <button
//             onClick={() => {
//               setActiveChatId(null);
//               setMessages([]);
//               setChatId(null);
//             }}
//             className="flex items-center justify-center w-full gap-2 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
//           >
//             <Plus size={18} />
//             New Chat
//           </button>
//         </div>

//         {/* CHAT LIST */}
//         <div className="flex-1 px-3 space-y-2 overflow-y-auto">
//           {chats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => setActiveChatId(chat.id)}
//               className={`p-3 rounded-lg cursor-pointer border ${
//                 chat.id === activeChatId
//                   ? "bg-gray-100 border-purple-500"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               {editingChatId === chat.id ? (
//                 <input
//                   value={tempTitle}
//                   autoFocus
//                   onChange={(e) => setTempTitle(e.target.value)}
//                   onBlur={() => saveChatTitle(chat.id)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") saveChatTitle(chat.id);
//                     if (e.key === "Escape") setEditingChatId(null);
//                   }}
//                   className="w-full px-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
//                 />
//               ) : (
//                 <div
//                   className="font-medium truncate cursor-pointer"
//                   onDoubleClick={(e) => {
//                     e.stopPropagation();
//                     setEditingChatId(chat.id);
//                     setTempTitle(chat.title);
//                   }}
//                 >
//                   {chat.title}
//                 </div>
//               )}

//               <div className="text-xs text-gray-500">{chat.date}</div>
//             </div>
//           ))}

//           {chats.length === 0 && (
//             <p className="mt-4 text-sm text-center text-gray-400">
//               No chats yet
//             </p>
//           )}
//         </div>

        
//         <div className="px-2 py-4 pt-7 mt-96">
//   <button
//     onClick={() => navigate("/")}
//     className="fixed w-64 py-3 font-medium text-center text-white bg-gray-700 rounded-lg bottom-4 left-4 hover:bg-gray-800"
//   >
//     <ArrowBigLeftDashIcon
//       size={24}
//       className="inline-block mr-2 align-middle"
//     />
//     <span className="inline-block align-middle">
//       Back to Home
//     </span>
//   </button>
// </div>

//   </aside>

//       {/* MAIN */}
//       <main
//         className={`flex flex-col flex-1 transition-all duration-300 ${
//           isSidebarOpen ? "ml-72" : "ml-0"
//         }`}
//       >
//         {/* TOGGLE BUTTON */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="absolute z-50 p-2 bg-white border rounded-lg top-1 left-4 hover:bg-gray-100"
//         >
//           ☰
//         </button>

        
//         {activeChat || messages.length > 0 ? (
//   <Chat messages={messages} />
// ) : (
//   <div className="flex flex-col items-center justify-center h-full px-4 text-center">
//     <h1 className="mb-2 text-3xl font-semibold text-purple-600">
//       Welcome to CODEZEN
//     </h1>

//     <p className="mb-8 text-gray-500">
//       Codezen helps you master in DSA
//       with clear explanations, guided problem-solving, and confidence-building practice.
//     </p>

//     <div className="w-full max-w-md space-y-4 text-left">
//       <div className="flex gap-3">
//         <span className="text-purple-500">💬</span>
//         <div>
//           <p className="font-medium text-gray-800">Share Your Problem</p>
//           <p className="text-sm text-gray-500">
//             Describe the DSA problem you're working on, or paste the problem statement
//           </p>
//         </div>
//       </div>

     

//       <div className="flex gap-3">
//         <span className="text-purple-500">🪜</span>
//         <div>
//           <p className="font-medium text-gray-800">Get Stage-by-Stage Guidance</p>
//           <p className="text-sm text-gray-500">
//             Receive structured help through understanding, planning, and implementation
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <span className="text-purple-500">✨</span>
//         <div>
//           <p className="font-medium text-gray-800">Learn and Improve</p>
//           <p className="text-sm text-gray-500">
//             Understand the concepts, patterns, and optimizations along the way
//           </p>
//         </div>
//       </div>
//     </div>

//     <h1 className="mb-2 text-2xl font-semibold text-purple-600">
//       Ready to Tackle Your Next DSA Challenge?
//             </h1>
//             <p className="text-gray-500">Type your first question below !</p>
//   </div>
// )}


//         {/* SCROLL DOWN BUTTON */}

//         {/* INPUT */}
//         <div className="p-4 bg-white border-t">
//           <div className="relative flex items-end max-w-3xl mx-auto">
//             <textarea
//               ref={textareaRef}
//               placeholder="Type your message..."
//               value={input}
//               rows={1}
//               onChange={(e) => {
//                 setInput(e.target.value);

//                 const el = textareaRef.current;
//                 if (!el) return;

//                 el.style.height = "auto";

//                 const lineHeight = 24;
//                 const maxLines = 5;
//                 const maxHeight = lineHeight * maxLines;

//                 el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
//                 el.style.overflowY =
//                   el.scrollHeight > maxHeight ? "auto" : "hidden";
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   send();
//                 }
//               }}
//               className="w-full px-5 py-3 pr-12 leading-6 border resize-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />

//             <button
//               onClick={send}
//               disabled={!input.trim()}
//               className="absolute text-2xl text-purple-600 -translate-y-1/2 right-3 top-1/2 hover:text-purple-600"
//             >
//               <div className="bg-gray-100 rounded-full p-1.5">➤</div>
//             </button>
//           </div>

//           <p className="mt-2 text-xs text-center text-gray-400">
//             AI can make mistakes. Consider checking important information.
//           </p>
//         </div>
//       </main>
//     </div>
<div className="relative flex h-screen bg-gray-100">
  {/* SIDEBAR */}
  <aside
    className={`fixed top-0 left-0 z-40 h-screen w-64 sm:w-72 md:w-80 bg-white border-r transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
    {/* NEW CHAT */}
    <div className="p-4 mt-8">
      <button
        onClick={() => {
          setActiveChatId(null);
          setMessages([]);
          setChatId(null);
        }}
        className="flex items-center justify-center w-full gap-2 py-2 text-sm text-white bg-purple-600 rounded-lg sm:text-base hover:bg-purple-700"
      >
        <Plus size={18} />
        New Chat
      </button>
    </div>

    {/* CHAT LIST */}
    <div className="flex-1 px-3 space-y-2 overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setActiveChatId(chat.id)}
          className={`p-3 rounded-lg cursor-pointer border ${
            chat.id === activeChatId
              ? "bg-gray-100 border-purple-500"
              : "hover:bg-gray-50"
          }`}
        >
          {editingChatId === chat.id ? (
            <input
              value={tempTitle}
              autoFocus
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={() => saveChatTitle(chat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveChatTitle(chat.id);
                if (e.key === "Escape") setEditingChatId(null);
              }}
              className="w-full px-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          ) : (
            <div
              className="font-medium truncate cursor-pointer"
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditingChatId(chat.id);
                setTempTitle(chat.title);
              }}
            >
              {chat.title}
            </div>
          )}
          <div className="text-xs text-gray-500">{chat.date}</div>
        </div>
      ))}

      {chats.length === 0 && (
        <p className="mt-4 text-sm text-center text-gray-400">No chats yet</p>
      )}
    </div>

    {/* BACK TO HOME BUTTON */}
    <div className="px-2 py-4">
      <button
        onClick={() => navigate("/")}
        className="fixed w-full py-3 font-medium text-center text-white bg-gray-700 rounded-lg bottom-4 left-4 sm:w-64 hover:bg-gray-800"
      >
        <ArrowBigLeftDashIcon
          size={24}
          className="inline-block mr-2 align-middle"
        />
        <span className="inline-block align-middle">Back to Home</span>
      </button>
    </div>
  </aside>

  {/* MAIN */}
  <main
    className={`flex flex-col flex-1 transition-all duration-300 ${
      isSidebarOpen ? "ml-64 sm:ml-72 md:ml-80" : "ml-0"
    }`}
  >
    {/* TOGGLE BUTTON */}
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="absolute z-50 p-2 bg-white border rounded-lg top-1 left-4 hover:bg-gray-100"
    >
      ☰
    </button>

    {activeChat || messages.length > 0 ? (
      <Chat messages={messages} />
    ) : (
      <div className="flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-purple-600 sm:text-3xl">
          Welcome to CODEZEN
        </h1>
        <p className="mb-8 text-sm text-gray-500 sm:text-base md:text-lg">
          Codezen helps you master in DSA with clear explanations, guided
          problem-solving, and confidence-building practice.
        </p>
        {/* ...rest unchanged */}
        <div className="w-full max-w-md space-y-4 text-left">
      <div className="flex gap-3">
        <span className="text-purple-500">💬</span>
         <div>
           <p className="font-medium text-gray-800">Share Your Problem</p>
           <p className="text-sm text-gray-500">
             Describe the DSA problem you're working on, or paste the problem statement
           </p>
         </div>
       </div>

     

       <div className="flex gap-3">
         <span className="text-purple-500">🪜</span>
         <div>
           <p className="font-medium text-gray-800">Get Stage-by-Stage Guidance</p>
           <p className="text-sm text-gray-500">
             Receive structured help through understanding, planning, and implementation
           </p>
         </div>
       </div>

       <div className="flex gap-3">
         <span className="text-purple-500">✨</span>
         <div>
           <p className="font-medium text-gray-800">Learn and Improve</p>
           <p className="text-sm text-gray-500">
             Understand the concepts, patterns, and optimizations along the way
           </p>
         </div>
       </div>
     </div>

     <h1 className="mb-2 text-2xl font-semibold text-purple-600">
       Ready to Tackle Your Next DSA Challenge?
             </h1>
             <p className="text-gray-500">Type your first question below !</p>
   

      </div>
    )}

    {/* INPUT */}
    <div className="p-4 bg-white border-t">
      <div className="relative flex items-end max-w-full mx-auto sm:max-w-2xl md:max-w-3xl">
        <textarea
          ref={textareaRef}
          placeholder="Type your message..."
          value={input}
          rows={1}
          onChange={(e) => {
            setInput(e.target.value);
            const el = textareaRef.current;
            if (!el) return;
            el.style.height = "auto";
            const lineHeight = 24;
            const maxLines = 5;
            const maxHeight = lineHeight * maxLines;
            el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
            el.style.overflowY =
              el.scrollHeight > maxHeight ? "auto" : "hidden";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="w-full px-4 py-2 pr-12 text-sm leading-6 border resize-none sm:px-5 sm:py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-base"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="absolute text-xl text-purple-600 -translate-y-1/2 sm:text-2xl right-3 top-1/2 hover:text-purple-600"
        >
          <div className="bg-gray-100 rounded-full p-1.5">➤</div>
        </button>
      </div>
      <p className="mt-2 text-xs text-center text-gray-400">
        AI can make mistakes. Consider checking important information.
      </p>
    </div>
  </main>
</div>
  );
}
