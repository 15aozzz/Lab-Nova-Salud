import { Edit3 } from "lucide-react";

export default function FilaProducto({ producto, onEditar }) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "VIGENTE": return "bg-green-50 text-green-600 border-green-100";
      case "STOCK CRÍTICO": return "bg-orange-50 text-orange-600 border-orange-100";
      case "POR VENCER": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "VENCIDO": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  // Obtenemos el precio principal (el primero de la lista, ej: Caja)
  const precioPrincipal = producto.precios?.[0];

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="py-4 px-4">
        <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
          {producto.codigo}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-bold text-[#2C2420] text-sm group-hover:text-[#895202] transition-colors">
            {producto.nombre_comercial}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">
            {producto.principio_activo}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-600">{producto.laboratorio}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{producto.categoria}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-xs text-gray-500 font-medium">
        {producto.presentacion}
      </td>
      <td className="py-4 px-4 text-center">
        <div className="flex flex-col">
          <span className="text-sm font-black text-[#2C2420]">
            {producto.stock_actual}
          </span>
          <span className="text-[9px] font-bold text-gray-400 uppercase">Unidades</span>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        {precioPrincipal && (
          <div className="flex flex-col">
            <span className="text-sm font-black text-[#895202]">
              S/. {parseFloat(precioPrincipal.precio_venta).toFixed(2)}
            </span>
            <span className="text-[9px] font-bold text-orange-800/40 uppercase">
              {precioPrincipal.unidad}
            </span>
          </div>
        )}
      </td>
      <td className="py-4 px-4 text-center">
        <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${getEstadoColor(producto.estado)}`}>
          {producto.estado}
        </span>
      </td>
      <td className="py-4 px-4 text-right">
        <button 
          onClick={() => onEditar(producto)}
          className="p-2 hover:bg-orange-50 text-gray-300 hover:text-[#895202] rounded-lg transition-all"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

