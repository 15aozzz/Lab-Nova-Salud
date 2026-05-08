import { Pencil } from "lucide-react";

export default function FilaProducto({ item }) {
  // Lógica de colores para alertas visuales
  const isStockCritico = item.stockActual <= item.stockMinimo;
  const isVencido = item.estado === "VENCIDO";
  const isPorVencer = item.estado === "POR VENCER";

  const getStatusStyles = (estado) => {
    switch (estado) {
      case "VIGENTE": return "bg-green-50 text-green-700";
      case "STOCK CRÍTICO": return "bg-red-50 text-red-700";
      case "POR VENCER": return "bg-orange-50 text-orange-700";
      case "VENCIDO": return "bg-red-100 text-red-800";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <tr className="text-[13px] hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-500">{item.codigo}</td>
      <td className="px-6 py-4 font-bold text-[#2C2420] max-w-[180px]">
        {item.nombreComercial}
      </td>
      <td className="px-6 py-4 text-gray-500">{item.principioActivo}</td>
      <td className="px-6 py-4 text-gray-500">{item.laboratorio}</td>
      <td className="px-6 py-4 text-gray-500">{item.categoria}</td>
      <td className="px-6 py-4 text-gray-500 text-xs">{item.presentacion}</td>
      
      <td className={`px-6 py-4 text-center font-bold ${isStockCritico ? 'text-red-500' : 'text-gray-700'}`}>
        {item.stockActual}
      </td>
      
      <td className="px-6 py-4 text-center text-gray-400 font-medium">
        {item.stockMinimo}
      </td>
      
      <td className={`px-6 py-4 text-center font-medium ${isVencido ? 'text-red-600' : isPorVencer ? 'text-orange-500' : 'text-gray-500'}`}>
        {item.fechaVencimiento.split('-').reverse().slice(1).join('/')}
      </td>
      
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight ${getStatusStyles(item.estado)}`}>
          {item.estado}
        </span>
      </td>
      
      <td className="px-6 py-4 text-center">
        <button className="p-2 text-gray-300 hover:text-[#895202] transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
