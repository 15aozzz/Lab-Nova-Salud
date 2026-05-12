import FilaProducto from "./FilaProducto";
import { useAuth } from "@/context/AuthContext";

export default function TablaProductos({ productos, onEditar }) {
  const { isAdmin } = useAuth();
  const columnas = isAdmin ? 8 : 7;

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container text-[10px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant">
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">Lab / Cat</th>
              <th className="py-3 px-4">Presentación</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-center">Precio Ref.</th>
              <th className="py-3 px-4 text-center">Estado</th>
              {isAdmin && <th className="py-3 px-4 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
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
                <td colSpan={columnas} className="py-12 text-center text-outline italic text-body-sm">
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
