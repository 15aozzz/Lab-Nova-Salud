import { ChevronDown, Trash2 } from "lucide-react";

export default function FilaProducto({ producto, onActualizar, onEliminar, onCambiarUnidad }) {
  const precio = parseFloat(producto.precio) || 0;
  const cantidad = parseInt(producto.cantidad) || 0;
  const importe = (precio * cantidad).toFixed(2);
  const igv = (parseFloat(importe) * 0.18).toFixed(2);

  const opciones = Array.isArray(producto.opcionesPrecios) 
    ? producto.opcionesPrecios.map(opt => ({
        id_precio: opt.id_producto_precio || opt.id_precio,
        unidad: opt.nombre_unidad || opt.unidad,
        valor: opt.precio_venta || opt.valor
      }))
    : [];

  return (
    <tr className="text-body-md group hover:bg-surface-container/50 transition-colors">
      <td className="py-4 px-4 font-medium text-on-surface max-w-xs">
        {producto.nombre}
        <p className="text-label-caps text-on-surface-variant font-normal">{producto.categoria}</p>
      </td>
      <td className="py-4 px-4">
        <div className="relative w-fit">
          <select
            value={producto.id_precio}
            onChange={(e) => onCambiarUnidad(producto.id, producto.id_precio, parseInt(e.target.value))}
            className="appearance-none bg-surface-container text-[11px] font-bold text-on-surface-variant px-3 py-1.5 rounded-sm pr-7 cursor-pointer outline-none hover:bg-surface-container-high transition-colors"
          >
            {opciones.map((opt) => (
              <option key={opt.id_precio} value={opt.id_precio}>
                {opt.unidad}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
        </div>
      </td>
      <td className="py-4 px-4 text-center text-on-surface-variant font-medium">
        <span className="text-label-caps mr-0.5">S/.</span>
        {precio.toFixed(2)}
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-center">
          <input 
            type="number"
            value={cantidad}
            onChange={(e) => onActualizar(producto.id, producto.id_precio, parseInt(e.target.value) || 0)}
            className="w-16 bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-center text-on-surface font-bold focus:border-secondary outline-none shadow-sm"
          />
        </div>
      </td>
      <td className="py-4 px-4 text-center text-on-surface-variant font-medium italic">
        <span className="text-label-caps mr-0.5">S/.</span>
        {igv}
      </td>
      <td className="py-4 px-4 text-right font-semibold text-primary-container">
        <span className="text-label-caps mr-1 text-on-surface-variant font-normal italic">S/.</span>
        {importe}
      </td>
      <td className="py-4 pl-4 text-right">
        <button 
          onClick={() => onEliminar(producto.id, producto.id_precio)}
          className="p-2 text-on-surface-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
