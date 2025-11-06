const BuildingDetail = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] p-8 overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
      >
        ×
      </button>
      <h2 className="text-2xl font-extrabold text-[#ef3a2e] mb-3">{data.name}</h2>
      <p className="text-gray-700 font-semibold mb-2">{data.description}</p>
      <p className="text-sm text-gray-500 mb-4">{data.notes}</p>
      <div className="text-gray-800 whitespace-pre-line leading-relaxed">
        {data.clauses}
      </div>
    </div>
  </div>
);

export default BuildingDetail;
