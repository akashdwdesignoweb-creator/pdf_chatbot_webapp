import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const userQuestion = question.trim();
    setMessages((prev) => [...prev, { type: "user", content: userQuestion }]);
    setQuestion("");
    try {
      const res = await axios.post(`${backendUrl}/ask`, {
        question: userQuestion,
      });

      // ✅ Store both answer and context
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: res.data.answer,
          context: res.data.context || "", // show raw context
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "⚠️ Error connecting to server." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#ffead8] via-[#fff4ed] to-[#ffe5cf] flex flex-col items-center justify-center font-sans">
      {/* Top branding */}
      <header className="absolute top-0 w-full flex justify-between items-center px-10 py-2 backdrop-blur-md bg-white/40 border-b border-white/30 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-[#ef3a2e] to-[#f4772f] p-3 rounded-xl shadow-lg">
            <span role="img" aria-label="building" className="text-xl">
              🏛️
            </span>
          </div>
          <h1
            className="text-xl font-extrabold bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] bg-clip-text text-transparent"
            style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
          >
            UP BuildBot
          </h1>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex flex-col justify-between mt-20 w-full h-[90vh] bg-white/60 backdrop-blur-lg shadow-2xl pb-6">
        <div className="flex-1 overflow-y-auto pt-10 px-10 custom-scrollbar">
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-gray-400 text-lg italic">
              💬 Ask me anything about UP Building Byelaws & Zoning Regulations
            </div>
          )}

          {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${
      msg.type === "user" ? "justify-end" : "justify-start"
    } mb-3`}
  >
    <div
      className={`max-w-[75%] px-5 py-3 text-base rounded-2xl shadow transition-all duration-200 ${
        msg.type === "user"
          ? "bg-gradient-to-br from-[#ef3a2e] to-[#f4772f] text-white rounded-tr-none"
          : "bg-white/70 text-gray-800 border border-gray-200 rounded-tl-none"
      }`}
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      {/* Main message */}
      <div className="font-semibold">{msg.content}</div>

      {/* Context dropdown (only for bot messages with context) */}
      {msg.type === "bot" && msg.context && (
        <details className="mt-2">
          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition">
            Show context
          </summary>
          <pre className="mt-1 p-2 bg-gray-50 text-gray-600 text-xs font-mono rounded-lg border border-gray-200 overflow-x-auto whitespace-pre-wrap leading-snug">
            {msg.context}
          </pre>
        </details>
      )}
    </div>
  </div>
))}


          {/* AI typing indicator */}
          {loading && (
            <div className="flex justify-start mb-2">
              <div
                className="max-w-[75%] px-5 py-3 text-base font-semibold rounded-2xl shadow bg-white/70 text-gray-800 border border-gray-200 rounded-tl-none flex items-center gap-2"
                style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
              >
                <span className="inline-flex">
                  <span
                    className="w-2 h-2 bg-[#ef3a2e] rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-[#f4772f] rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-[#ef3a2e] rounded-full mx-0.5 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <form
          className="flex gap-3 pt-4 px-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-5 py-3 rounded-full bg-white/80 backdrop-blur border border-gray-300 shadow-inner text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#f4772f] focus:outline-none transition font-semibold"
            style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-7 w-7 border-4 border-white border-t-transparent" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default App;
