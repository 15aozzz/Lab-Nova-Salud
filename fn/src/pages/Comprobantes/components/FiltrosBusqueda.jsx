import { Search } from "lucide-react";

export default function FiltrosBusqueda({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fecha Inicio</label>
          <div className="relative">
            <input 
              type="date" 
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fecha Fin</label>
          <input 
            type="date" 
            name="fechaFin"
            value={filtros.fechaFin}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tipo de Comprobante</label>
          <select 
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
          >
            <option value="TODOS">Todos los tipos</option>
            <option value="BOLETA">Boleta de Venta</option>
            <option value="FACTURA">Factura</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Buscar</label>
          <div className="relative">
            <input 
              type="text" 
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleChange}
              placeholder="N° Comprobante o cliente..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
