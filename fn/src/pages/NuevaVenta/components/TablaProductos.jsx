import { Search } from "lucide-react";
import FilaProducto from "./FilaProducto";
import { useState } from "react";
import { productosService } from "../../../services/api";

export default function TablaProductos({ productos, onActualizarCantidad, onEliminar, onAgregar, onCambiarUnidad }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setcargando] = useState(false);

  const handleBusqueda = async (e) => {
    const term = e.target.value;
    setBusqueda(term);

    if (term.length > 1) {
      setcargando(true);
      try {
        const response = await productosService.buscar(term);
        setResultados(response.data);
      } catch (error) {
        console.error("Error buscando productos:", error);
        setResultados([]);
      } finally {
        setcargando(false);
      }
    } else {
      setResultados([]);
    }
  };

  const seleccionarProducto = (p) => {
    onAgregar(p);
    setBusqueda("");
    setResultados([]);
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-card_gap flex-1 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-card_gap">
        <h3 className="text-[11px] font-bold tracking-wider text-primary-container">
          Listado de Productos
        </h3>
        
        <div className="relative flex-1 max-w-md">
          <input 
            type="text"
            value={busqueda}
            onChange={handleBusqueda}
            placeholder="Digite el producto..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-[7px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          />
          <Search className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />

          {cargando && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden p-4 text-center">
              <div className="animate-spin w-5 h-5 border-2 border-secondary border-t-transparent rounded-full inline-block"></div>
            </div>
          )}
          {!cargando && resultados.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
              {resultados.map(p => (
                <button
                  key={p.id_producto}
                  onClick={() => seleccionarProducto(p)}
                  className="w-full text-left px-4 py-3 hover:bg-surface-container transition-colors flex items-center justify-between border-b border-outline-variant last:border-0"
                >
                  <div>
                    <p className="text-body-md font-bold text-on-surface">{p.nombre_comercial}</p>
                    <p className="text-label-caps text-on-surface-variant">{p.principio_activo}</p>
                  </div>
                  <span className="text-label-caps font-bold text-secondary">Stock: {p.stock_actual_unidades}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant">
              <th className="pb-3 px-4">Descripción</th>
              <th className="pb-3 px-4">UND</th>
              <th className="pb-3 px-4 text-center">Valor</th>
              <th className="pb-3 px-4 text-center">Cantidad</th>
              <th className="pb-3 px-4 text-center">IGV</th>
              <th className="pb-3 px-4 text-right">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {productos.length > 0 ? (
              productos.map((prod) => (
                <FilaProducto 
                  key={`${prod.id}-${prod.id_precio}`} 
                  producto={prod} 
                  onActualizar={onActualizarCantidad}
                  onEliminar={onEliminar}
                  onCambiarUnidad={onCambiarUnidad}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center text-on-surface-variant italic text-body-md">
                  No hay productos agregados a la venta
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
