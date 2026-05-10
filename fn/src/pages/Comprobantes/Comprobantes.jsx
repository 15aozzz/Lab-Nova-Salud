import { Download } from "lucide-react";
import { useComprobantes } from "./hooks/useComprobantes";
import KPIRow from "./components/KPIRow";
import FiltrosBusqueda from "./components/FiltrosBusqueda";
import TablaComprobantes from "./components/TablaComprobantes";

export default function Comprobantes() {
  const { 
    filtros, 
    setFiltros, 
    pagina, 
    setPagina, 
    kpis, 
    totalResultados, 
    comprobantes,
    itemsPorPagina,
    recargar
  } = useComprobantes();

  return (
    <div className="space-y-card_gap animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-primary-container mb-2">Gestión de Comprobantes</h2>
          <p className="text-body-md text-on-surface-variant">Revisa y administra el historial de ventas y facturación.</p>
        </div>
        <button className="bg-secondary text-on-secondary px-4 py-2 rounded-lg text-body-md hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
          <Download className="w-[18px] h-[18px]" />
          Exportar Reporte
        </button>
      </div>

      <KPIRow kpis={kpis} />

      <FiltrosBusqueda filtros={filtros} setFiltros={setFiltros} onFiltrar={recargar} />

      <TablaComprobantes 
        comprobantes={comprobantes}
        pagina={pagina}
        totalResultados={totalResultados}
        itemsPorPagina={itemsPorPagina}
        onCambioPagina={setPagina}
      />
    </div>
  );
}