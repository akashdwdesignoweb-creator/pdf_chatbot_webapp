import React, { useState } from "react";
import { buildingClauses } from "../data/clausesData";
import ChatModal from "../components/ChatModal";

const Dashboard = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffead8] via-[#fff4ed] to-[#ffe5cf] flex flex-col items-center py-12 font-sans relative">
      <header className="text-center mb-10">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-gradient-to-br from-[#ef3a2e] to-[#f4772f] p-3 rounded-xl shadow-lg">
            <span role="img" aria-label="building" className="text-3xl">
              🏛️
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] bg-clip-text text-transparent">
          UP BuildBot Dashboard
        </h1>
        <p className="text-gray-600 mt-2 font-medium">
          Explore construction clauses by building type
        </p>
      </header>

      {/* Building Grid */}
      <main className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {buildingClauses.map((b, i) => (
          <div
            key={i}
            onClick={() => setSelectedBuilding(b)}
            className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
          >
            <h3 className="text-xl font-bold text-[#ef3a2e] mb-2">{b.name}</h3>
            <p className="text-gray-700 text-sm mb-1">{b.description}</p>
            <p className="text-xs text-gray-500 italic">{b.chapter}</p>
          </div>
        ))}
      </main>

      {/* Floating Ask BuildBot */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-[#ef3a2e] to-[#f4772f] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-3xl"
      >
        💬
      </button>

      {/* Building Detail Modal */}
{selectedBuilding && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-40">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden relative">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#ef3a2e]/95 to-[#f4772f]/95 rounded-t-3xl shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {selectedBuilding.name}
          </h2>
          <p className="text-white/90 text-sm italic">
            {selectedBuilding.notes || ""}
          </p>
        </div>
        <button
          onClick={() => setSelectedBuilding(null)}
          className="text-white text-3xl font-bold hover:scale-110 transition-transform"
        >
          ×
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <p className="text-gray-700 mb-2 font-semibold">
          {selectedBuilding.description}
        </p>
        <div className="text-gray-800 whitespace-pre-line leading-relaxed">
          {selectedBuilding.clauses}
        </div>
      </div>
    </div>
  </div>
)}


      {/* Chat Modal */}
      <ChatModal open={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default Dashboard;
