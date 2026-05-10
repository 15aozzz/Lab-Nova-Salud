import { Search, Plus } from "lucide-react";

export default function FiltrosProductos({ 
  filtros, 
  setFiltros, 
  categorias, 
  laboratorios,
  onNuevoProducto
}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Buscar</label>
          <div className="relative">
            <input 
              type="text" 
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleChange}
              placeholder="Nombre o principio activo..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Categoría</label>
          <select 
            name="categoria"
            value={filtros.categoria}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-orange-100 transition-all"
          >
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Laboratorio</label>
          <select 
            name="laboratorio"
            value={filtros.laboratorio}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-orange-100 transition-all"
          >
            {laboratorios.map(lab => <option key={lab} value={lab}>{lab}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Estado</label>
          <select 
            name="estado"
            value={filtros.estado}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-orange-100 transition-all"
          >
            <option>Todos</option>
            <option>VIGENTE</option>
            <option>STOCK CRÍTICO</option>
            <option>POR VENCER</option>
            <option>VENCIDO</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <button 
          onClick={onNuevoProducto}
          className="flex items-center gap-2 bg-[#895202] hover:bg-[#6d4102] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-md shadow-orange-900/10"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

    </div>
  );
}


