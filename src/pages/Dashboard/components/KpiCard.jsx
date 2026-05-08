import * as Icons from "lucide-react";

export default function KpiCard({ titulo, valor, iconName, color, onClick }) {
  const Icon = Icons[iconName] || Icons.HelpCircle;

  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{titulo}</p>
        <h3 className="text-2xl font-bold text-[#2C2420]">{valor}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-[#895202]" />
      </div>
    </div>
  );
}
