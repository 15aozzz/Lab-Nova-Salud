import FilaProducto from "./FilaProducto";

export default function TablaProductos({ productos, onEditar }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant">
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">Lab / Cat</th>
              <th className="py-3 px-4">Presentación</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-center">Precio Ref.</th>
              <th className="py-3 px-4 text-center">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
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
                <td colSpan="8" className="py-20 text-center text-on-surface-variant italic text-body-md">
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
