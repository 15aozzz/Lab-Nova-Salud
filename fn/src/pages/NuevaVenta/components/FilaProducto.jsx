import { ChevronDown, Trash2 } from "lucide-react";

export default function FilaProducto({ producto, onActualizar, onEliminar, onCambiarUnidad }) {
  const precio = parseFloat(producto.precio) || 0;
  const cantidad = parseInt(producto.cantidad) || 0;
  const importe = (precio * cantidad).toFixed(2);
  const igv = (parseFloat(importe) * 0.18).toFixed(2);

  // Normalizar opcionesPrecios para que tengan id_precio y unidad/precio_venta
  const opciones = Array.isArray(producto.opcionesPrecios) 
    ? producto.opcionesPrecios.map(opt => ({
        id_precio: opt.id_producto_precio || opt.id_precio,
        unidad: opt.nombre_unidad || opt.unidad,
        valor: opt.precio_venta || opt.valor
      }))
    : [];

  return (
    <tr className="text-sm group hover:bg-gray-50/50 transition-colors">
      <td className="py-5 font-medium text-gray-700 max-w-xs pr-4">
        {producto.nombre}
        <p className="text-[10px] text-gray-400 font-normal">{producto.categoria}</p>
      </td>
      <td className="py-5">
        <div className="relative w-fit">
          <select
            value={producto.id_precio}
            onChange={(e) => onCambiarUnidad(producto.id, producto.id_precio, parseInt(e.target.value))}
            className="appearance-none bg-gray-100 text-[11px] font-bold text-gray-600 px-3 py-1.5 rounded pr-7 cursor-pointer outline-none hover:bg-gray-200 transition-colors"
          >
            {opciones.map((opt) => (
              <option key={opt.id_precio} value={opt.id_precio}>
                {opt.unidad}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </td>
      <td className="py-5 text-center text-gray-600 font-medium">
        <span className="text-[10px] mr-0.5">S/.</span>
        {precio.toFixed(2)}
      </td>
      <td className="py-5">
        <div className="flex justify-center">
          <input 
            type="number"
            value={cantidad}
            onChange={(e) => onActualizar(producto.id, producto.id_precio, parseInt(e.target.value) || 0)}
            className="w-16 bg-white border border-gray-200 rounded px-2 py-1.5 text-center text-gray-700 font-bold focus:border-[#895202] outline-none shadow-sm"
          />
        </div>
      </td>
      <td className="py-5 text-center text-gray-400 font-medium italic">
        <span className="text-[10px] mr-0.5">S/.</span>
        {igv}
      </td>
      <td className="py-5 text-right font-bold text-[#2C2420]">
        <span className="text-xs mr-1 text-gray-400 font-normal italic">S/.</span>
        {importe}
      </td>
      <td className="py-5 pl-4 text-right">
        <button 
          onClick={() => onEliminar(producto.id, producto.id_precio)}
          className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

