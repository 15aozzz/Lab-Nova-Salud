import { Search } from "lucide-react";
import FilaProducto from "./FilaProducto";
import { useState } from "react";
import { inventario } from "../../../mocks/inventario";

export default function TablaProductos({ productos, onActualizarCantidad, onEliminar, onAgregar, onCambiarUnidad }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBusqueda = (e) => {
    const term = e.target.value;
    setBusqueda(term);

    if (term.length > 1) {
      const filtered = inventario.filter(p => 
        p.nombre.toLowerCase().includes(term.toLowerCase())
      );
      setResultados(filtered);
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Listado de Productos
        </h3>
        
        <div className="relative flex-1 max-w-md">
          <input 
            type="text"
            value={busqueda}
            onChange={handleBusqueda}
            placeholder="Digite el producto..."
            className="w-full bg-gray-50 border border-gray-100 rounded-full pl-12 pr-6 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-inner"
          />
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

          {/* Resultados de búsqueda flotantes */}
          {resultados.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
              {resultados.map(p => (
                <button
                  key={p.id}
                  onClick={() => seleccionarProducto(p)}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-700">{p.nombre}</p>
                    <p className="text-[10px] text-gray-400 uppercase">{p.categoria}</p>
                  </div>
                  <span className="text-xs font-bold text-[#a16207]">Stock: {p.stock}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] border-b border-gray-50">
              <th className="pb-4">Descripción</th>
              <th className="pb-4">UND</th>
              <th className="pb-4 text-center">Valor</th>
              <th className="pb-4 text-center">Cantidad</th>
              <th className="pb-4 text-center">IGV</th>
              <th className="pb-4 text-right">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
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
                <td colSpan="6" className="py-12 text-center text-gray-300 italic text-sm">
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

