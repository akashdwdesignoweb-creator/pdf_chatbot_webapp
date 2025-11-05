// import React, { useState, useRef, useEffect } from 'react'
// import axios from 'axios'

// const App = () => {
//   const [question, setQuestion] = useState('')
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const backendUrl =  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

//   const handleAsk = async () => {
//     if (!question.trim()) return
//     setLoading(true)
//     const userQuestion = question.trim()
//     setMessages(prev => [...prev, { type: 'user', content: userQuestion }])
//     setQuestion('')
//     try {
//       const res = await axios.post(`${backendUrl}/ask`, { question: userQuestion })
//       setMessages(prev => [...prev, { type: 'bot', content: res.data.answer }])
//     } catch (err) {
//       setMessages(prev => [...prev, { type: 'bot', content: 'Error connecting to server.' }])
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="fixed inset-0 bg-gray-50 flex flex-col font-sans">
//   <header className="flex items-center px-8 py-6 bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] shadow-md">
//         <div className="bg-white p-3 rounded-full shadow">
//           <span role="img" aria-label="building" className="text-3xl">🏛️</span>
//         </div>
//         <h1 className="text-2xl font-extrabold ml-4 text-white tracking-wide drop-shadow" style={{fontFamily:'Montserrat,Arial,sans-serif'}}>UP BuildBot</h1>
//       </header>
//       <main className="flex-1 flex flex-col justify-end items-center w-full">
//         <div className="w-full max-w-3xl flex-1 flex flex-col justify-end px-4 pb-4 pt-2 mx-auto">
//           <div className="flex-1 overflow-y-auto space-y-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {messages.length === 0 && (
//               <div className="flex justify-center items-center h-full text-gray-400 text-lg opacity-70">
//                 Start chatting about UP Building Byelaws & Zoning Regulations!
//               </div>
//             )}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[70%] rounded-2xl px-5 py-3 shadow text-base font-semibold transition-all ${
//                     msg.type === 'user'
//                       ? 'bg-white text-gray-900 border border-gray-300 rounded-tr-none'
//                       : 'bg-gray-100 text-gray-700 rounded-tl-none border border-gray-200'
//                   }`}
//                   style={{fontFamily:'Montserrat,Arial,sans-serif'}}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           <form className="flex gap-3 pt-2" onSubmit={e => {e.preventDefault(); handleAsk();}}>
//             <input
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAsk()}
//               placeholder="Ask about UP building regulations..."
//               className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 bg-white shadow font-semibold"
//               style={{fontFamily:'Montserrat,Arial,sans-serif'}}
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-105 transition disabled:opacity-50 shadow-lg"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-7 w-7 border-4 border-white border-t-transparent" />
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               )}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default App;
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
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: res.data.answer },
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
              } mb-2`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 text-base font-semibold rounded-2xl shadow transition-all duration-200 ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-[#ef3a2e] to-[#f4772f] text-white rounded-tr-none"
                    : "bg-white/70 text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
                style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* AI typing indicator */}
          {loading && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[75%] px-5 py-3 text-base font-semibold rounded-2xl shadow bg-white/70 text-gray-800 border border-gray-200 rounded-tl-none flex items-center gap-2" style={{ fontFamily: "Montserrat, Arial, sans-serif" }}>
                <span className="inline-flex">
                  <span className="w-2 h-2 bg-[#ef3a2e] rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[#f4772f] rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[#ef3a2e] rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
