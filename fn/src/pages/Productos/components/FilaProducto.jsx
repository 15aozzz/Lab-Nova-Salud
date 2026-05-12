import { Edit3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FilaProducto({ producto, onEditar }) {
  const { isAdmin } = useAuth();
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "VIGENTE": return "bg-primary-fixed text-on-primary-fixed";
      case "STOCK CRÍTICO": return "bg-secondary-fixed text-on-secondary-fixed";
      case "POR VENCER": return "bg-secondary-fixed text-on-secondary-fixed";
      case "VENCIDO": return "bg-error-container text-on-error-container";
      default: return "bg-surface-container text-on-surface-variant";
    }
  };

  const precioPrincipal = producto.precios?.[0];

  return (
    <tr className="hover:bg-surface-container/50 transition-colors group">
      <td className="py-3 px-4">
        <span className="text-label-caps text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-sm">
          {producto.codigo}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col">
          <span className="font-bold text-on-surface text-body-sm group-hover:text-secondary transition-colors">
            {producto.nombre_comercial}
          </span>
          <span className="text-label-caps text-on-surface-variant font-medium">
            {producto.principio_activo}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col">
          <span className="text-body-sm text-on-surface">{producto.laboratorio}</span>
          <span className="text-label-caps text-on-surface-variant">{producto.categoria}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-body-sm text-on-surface-variant font-medium">
        {producto.presentacion}
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex flex-col leading-tight">
          <span className="text-body-sm font-semibold text-primary-container">
            {producto.stock_actual}
          </span>
          <span className="text-[9px] text-on-surface-variant tracking-wider">Und</span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        {precioPrincipal && (
          <div className="flex flex-col leading-tight">
            <span className="text-body-sm font-semibold text-primary-container">
              S/. {parseFloat(precioPrincipal.precio_venta).toFixed(2)}
            </span>
            <span className="text-[10px] text-secondary/60">
              {precioPrincipal.unidad}
            </span>
          </div>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getEstadoBadge(producto.estado)}`}>
          {producto.estado}
        </span>
      </td>
      {isAdmin && (
        <td className="py-3 px-4 text-right">
          <button 
            onClick={() => onEditar(producto)}
            className="p-1 hover:bg-secondary-fixed text-on-surface-variant hover:text-secondary rounded-lg transition-all"
          >
            <Edit3 className="w-[18px] h-[18px]" />
          </button>
        </td>
      )}
    </tr>
  );
}
