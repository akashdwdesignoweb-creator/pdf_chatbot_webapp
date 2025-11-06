import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatModal = ({ open, onClose }) => {
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
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: res.data.answer,
          context: res.data.context || "",
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      {/* Chat window */}
      <div className="relative w-full max-w-2xl h-[80vh] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] rounded-t-3xl">
          <h2 className="text-xl font-bold text-white">🏛️ UP BuildBot</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold hover:scale-110 transition-transform"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-gray-400 text-lg italic">
              💬 Ask me anything about UP Building Byelaws & Zoning Regulations
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 text-base rounded-2xl shadow transition-all ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-[#ef3a2e] to-[#f4772f] text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
              >
                <div className="font-semibold">{msg.content}</div>

                {msg.type === "bot" && msg.context && (
                  <details className="mt-2">
                    <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                      Show context
                    </summary>
                    <pre className="mt-1 p-2 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-200 overflow-x-auto whitespace-pre-wrap leading-snug font-mono">
                      {msg.context}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-5 py-3 bg-white text-gray-700 border border-gray-200 rounded-2xl flex items-center gap-2 shadow">
                <span className="inline-flex">
                  <span className="w-2 h-2 bg-[#ef3a2e] rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-[#f4772f] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-[#ef3a2e] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          className="flex items-center gap-3 px-6 py-4 border-t border-gray-200"
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
            className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-300 shadow-inner text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#f4772f] focus:outline-none transition font-semibold"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
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
      </div>
    </div>
  );
};

export default ChatModal;
