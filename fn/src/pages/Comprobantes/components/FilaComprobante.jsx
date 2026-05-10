import { Eye } from "lucide-react";

export default function FilaComprobante({ item }) {
  return (
    <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
      <td className="p-4 whitespace-nowrap text-on-surface-variant">{item.fecha}</td>
      <td className="p-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
          item.tipo === 'BOLETA' 
            ? 'bg-secondary-fixed text-on-secondary-fixed' 
            : 'bg-primary-fixed text-on-primary-fixed'
        }`}>
          {item.tipo}
        </span>
      </td>
      <td className="p-4 font-medium">{item.serie}</td>
      <td className="p-4 text-on-surface-variant">{item.numero}</td>
      <td className="p-4 truncate max-w-[150px]">{item.cliente}</td>
      <td className="p-4 text-on-surface-variant">{item.vendedor}</td>
      <td className="p-4 text-right text-price-display font-semibold text-primary">
        S/. {item.total.toFixed(2)}
      </td>
      <td className="p-4 text-center">
        <button className="text-on-surface-variant group-hover:text-secondary transition-colors p-1 rounded hover:bg-surface-container">
          <Eye className="w-[20px] h-[20px]" />
        </button>
      </td>
    </tr>
  );
}
