import { Search } from "lucide-react";

export default function FiltrosBusqueda({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-end gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase">Fecha Inicio</label>
          <input 
            type="date" 
            name="fechaInicio"
            value={filtros.fechaInicio}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase">Fecha Fin</label>
          <input 
            type="date" 
            name="fechaFin"
            value={filtros.fechaFin}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase">Tipo de Comprobante</label>
          <select 
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-100 cursor-pointer"
          >
            <option>Todos</option>
            <option>BOLETA</option>
            <option>FACTURA</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase">Buscar</label>
          <div className="relative">
            <input 
              type="text" 
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleChange}
              placeholder="Cliente, Serie, Número..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-100"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-2 rounded-lg font-bold text-sm transition-colors mb-0.5">
        Filtrar
      </button>
    </div>
  );
}
