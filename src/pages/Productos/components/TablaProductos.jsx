import FilaProducto from "./FilaProducto";

export default function TablaProductos({ productos }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F6F4] text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="px-6 py-4">Código</th>
              <th className="px-6 py-4">Nombre Comercial</th>
              <th className="px-6 py-4">Principio Activo</th>
              <th className="px-6 py-4">Laboratorio</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Presentación</th>
              <th className="px-6 py-4 text-center">Stock Act.</th>
              <th className="px-6 py-4 text-center">Stock Min.</th>
              <th className="px-6 py-4 text-center">Fecha Venc.</th>
              <th className="px-6 py-4 text-center">Estado</th>
              <th className="px-6 py-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {productos.length > 0 ? (
              productos.map((prod) => (
                <FilaProducto key={prod.id} item={prod} />
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-20 text-center text-gray-300 italic text-sm">
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
