  import FilaProducto from "./FilaProducto";

export default function TablaProductos({ productos, onEditar }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-4 py-5">Código</th>
              <th className="px-4 py-5">Producto</th>
              <th className="px-4 py-5">Lab / Cat</th>
              <th className="px-4 py-5">Presentación</th>
              <th className="px-4 py-5 text-center">Stock</th>
              <th className="px-4 py-5 text-center">Precio Ref.</th>
              <th className="px-4 py-5 text-center">Estado</th>
              <th className="px-4 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {productos.length > 0 ? (
              productos.map((prod) => (
                <FilaProducto 
                  key={prod.id_producto} 
                  producto={prod} 
                  onEditar={onEditar} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-20 text-center text-gray-300 italic text-sm">
                  No se encontraron productos con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

