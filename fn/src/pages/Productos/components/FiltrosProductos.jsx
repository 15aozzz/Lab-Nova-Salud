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
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-card_gap space-y-card_gap">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-card_gap">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Buscar</label>
          <div className="relative">
            <input 
              type="text" 
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleChange}
              placeholder="Nombre o principio activo..."
              className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-9 pr-3 py-[7px] text-body-md outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            />
            <Search className="w-[18px] h-[18px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Categoría</label>
          <select 
            name="categoria"
            value={filtros.categoria}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md outline-none cursor-pointer focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          >
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Laboratorio</label>
          <select 
            name="laboratorio"
            value={filtros.laboratorio}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md outline-none cursor-pointer focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
          >
            {laboratorios.map(lab => <option key={lab} value={lab}>{lab}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Estado</label>
          <select 
            name="estado"
            value={filtros.estado}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md outline-none cursor-pointer focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
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
          className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-[7px] rounded-lg font-bold text-body-md hover:opacity-90 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-[18px] h-[18px]" />
          Nuevo Producto
        </button>
      </div>

    </div>
  );
}
