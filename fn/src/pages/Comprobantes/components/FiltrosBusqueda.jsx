import { Search } from "lucide-react";

export default function FiltrosBusqueda({ filtros, setFiltros, onFiltrar }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-3 flex flex-wrap items-end gap-3 shadow-[0_4px_12px_rgba(22,15,12,0.02)]">
      <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
        <label className="text-[11px] font-bold tracking-wider text-primary-container">Fecha Inicio</label>
        <input 
          type="date" 
          name="fechaInicio"
          value={filtros.fechaInicio}
          onChange={handleChange}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer" 
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
        <label className="text-[11px] font-bold tracking-wider text-primary-container">Fecha Fin</label>
        <input 
          type="date" 
          name="fechaFin"
          value={filtros.fechaFin}
          onChange={handleChange}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer" 
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
        <label className="text-[11px] font-bold tracking-wider text-primary-container">Tipo de Comprobante</label>
        <select 
          name="tipo"
          value={filtros.tipo}
          onChange={handleChange}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer appearance-none"
        >
          <option value="TODOS">Todos</option>
          <option value="BOLETA">Boleta</option>
          <option value="FACTURA">Factura</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-[2] min-w-[200px]">
        <label className="text-[11px] font-bold tracking-wider text-primary-container">Buscar</label>
        <div className="relative w-full">
          <Search className="w-[20px] h-[20px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            name="busqueda"
            value={filtros.busqueda}
            onChange={handleChange}
            placeholder="Cliente, Serie, Número..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-10 pr-3 py-[7px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" 
          />
        </div>
      </div>

      <button 
        onClick={onFiltrar}
        className="bg-surface-container border border-outline-variant text-primary-container text-body-md px-5 py-[7px] rounded hover:bg-surface-container-highest transition-colors"
      >
        Filtrar
      </button>
    </div>
  );
}
