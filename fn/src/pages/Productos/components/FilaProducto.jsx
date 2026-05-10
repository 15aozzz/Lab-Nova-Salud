import { Edit3 } from "lucide-react";

export default function FilaProducto({ producto, onEditar }) {
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
        <span className="text-label-caps font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-sm">
          {producto.codigo}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col">
          <span className="font-bold text-on-surface text-body-md group-hover:text-secondary transition-colors">
            {producto.nombre_comercial}
          </span>
          <span className="text-label-caps text-on-surface-variant font-medium">
            {producto.principio_activo}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col">
          <span className="text-body-md font-bold text-on-surface">{producto.laboratorio}</span>
          <span className="text-label-caps text-on-surface-variant">{producto.categoria}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-body-md text-on-surface-variant font-medium">
        {producto.presentacion}
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex flex-col">
          <span className="text-body-lg font-bold text-primary-container">
            {producto.stock_actual}
          </span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase">Unidades</span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        {precioPrincipal && (
          <div className="flex flex-col">
            <span className="text-body-md font-bold text-secondary">
              S/. {parseFloat(precioPrincipal.precio_venta).toFixed(2)}
            </span>
            <span className="text-[10px] font-bold text-secondary/60 uppercase">
              {precioPrincipal.unidad}
            </span>
          </div>
        )}
      </td>
      <td className="py-3 px-4 text-center">
        <span className={`text-label-caps font-bold px-3 py-1 rounded-full ${getEstadoBadge(producto.estado)}`}>
          {producto.estado}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <button 
          onClick={() => onEditar(producto)}
          className="p-2 hover:bg-secondary-fixed text-on-surface-variant hover:text-secondary rounded-lg transition-all"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
