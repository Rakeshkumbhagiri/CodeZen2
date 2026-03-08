import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chat({ messages }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((m, i) => {
        const isUser = m.role === "user";

        return (
          <div
            key={i}
            className={`mb-7 flex items-end gap-2 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            {/* BOT ICON */}
            {!isUser && (
              <div className="flex items-center justify-center w-8 h-8 text-white bg-purple-600 rounded-full">
                🤖
              </div>
            )}

            {/* MESSAGE BUBBLE */}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-3xl text-sm ${
                isUser
                  ? "bg-purple-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match?.[1] || "javascript"}
                        PreTag="div"
                        className="my-2 text-sm rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="px-1 py-0.5 bg-gray-300 rounded text-md">
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>

            {/* USER ICON */}
            {isUser && (
              <div className="flex items-center justify-center w-8 h-8 text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#621d9a" stroke-width="1.3333333333333333" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}



