import { Download } from "lucide-react";
import { useComprobantes } from "./hooks/useComprobantes";
import KPIRow from "./components/KPIRow";
import FiltrosBusqueda from "./components/FiltrosBusqueda";
import TablaComprobantes from "./components/TablaComprobantes";
import Paginador from "./components/Paginador";

export default function Comprobantes() {
  const { 
    filtros, 
    setFiltros, 
    pagina, 
    setPagina, 
    kpis, 
    totalResultados, 
    comprobantes,
    itemsPorPagina
  } = useComprobantes();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2420]">Gestión de Comprobantes</h1>
          <p className="text-gray-500 mt-1">Revisa y administra el historial de ventas y facturación.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#895202] hover:bg-[#6d4102] text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-orange-900/10 transition-all active:scale-95">
          <Download className="w-5 h-5" />
          Exportar Reporte
        </button>
      </div>

      {/* KPIs */}
      <KPIRow kpis={kpis} />

      {/* Filtros */}
      <FiltrosBusqueda filtros={filtros} setFiltros={setFiltros} />

      {/* Tabla y Paginador */}
      <div className="space-y-6">
        <TablaComprobantes comprobantes={comprobantes} />
        <Paginador 
          actual={pagina} 
          totalResultados={totalResultados} 
          itemsPorPagina={itemsPorPagina}
          onCambioPagina={setPagina}
        />
      </div>
    </div>
  );
}