const BuildingCard = ({ building, onClick }) => (
  <div
    className="bg-white/80 backdrop-blur rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl transition"
    onClick={onClick}
  >
    <h3 className="text-lg font-bold text-[#ef3a2e]">{building.name}</h3>
    <p className="text-gray-600 text-sm mt-1">{building.description}</p>
    <p className="text-xs text-gray-400 mt-1 italic">{building.chapter}</p>
  </div>
);

export default BuildingCard;
