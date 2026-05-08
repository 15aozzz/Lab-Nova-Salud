import { Eye } from "lucide-react";

export default function FilaComprobante({ item }) {
  return (
    <tr className="text-sm hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 text-gray-500">{item.fecha}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded text-[10px] font-bold ${
          item.tipo === 'BOLETA' 
            ? 'bg-orange-50 text-orange-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {item.tipo}
        </span>
      </td>
      <td className="px-6 py-4 text-center font-medium text-gray-500">{item.serie}</td>
      <td className="px-6 py-4 text-center font-medium text-gray-700">{item.numero}</td>
      <td className="px-6 py-4 font-medium text-gray-700">{item.cliente}</td>
      <td className="px-6 py-4 text-gray-500">{item.vendedor}</td>
      <td className="px-6 py-4 text-right font-bold text-[#2C2420]">
        S/. {item.total.toFixed(2)}
      </td>
      <td className="px-6 py-4 text-center">
        <button className="p-2 text-gray-400 hover:text-[#895202] transition-colors">
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}
