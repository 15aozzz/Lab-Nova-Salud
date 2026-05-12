import { Eye } from "lucide-react";

export default function FilaComprobante({ item, onVerDetalle }) {
  return (
    <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer text-body-sm">
      <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">{item.fecha}</td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
          item.tipo === 'BOLETA' 
            ? 'bg-secondary-fixed text-on-secondary-fixed' 
            : 'bg-primary-fixed text-on-primary-fixed'
        }`}>
          {item.tipo}
        </span>
      </td>
      <td className="py-3 px-4 font-medium">{item.serie}</td>
      <td className="py-3 px-4 text-on-surface-variant">{item.numero}</td>
      <td className="py-3 px-4 truncate max-w-[150px]">{item.cliente}</td>
      <td className="py-3 px-4 text-on-surface-variant">{item.vendedor}</td>
      <td className="py-3 px-4 text-right text-body-md font-semibold text-primary">
        S/. {item.total.toFixed(2)}
      </td>
      <td className="py-3 px-4 text-center">
        <button onClick={() => onVerDetalle?.(item.id)} className="text-on-surface-variant group-hover:text-secondary transition-colors p-1 rounded hover:bg-surface-container">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
