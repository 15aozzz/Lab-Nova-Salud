import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import KpiCard from "./components/KpiCard";
import GraficoVentas from "./components/GraficoVentas";
import AlertasProductos from "./components/AlertasProductos";
import UltimosComprobantes from "./components/UltimosComprobantes";
import { kpiData, salesData, alertsData, recentReceipts } from "../../mocks/dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2420]">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bienvenido, aquí está el resumen de hoy</p>
        </div>
        <button 
          onClick={() => navigate("/nueva-venta")}
          className="flex items-center justify-center gap-2 bg-[#a16207] hover:bg-[#854d0e] text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-orange-900/20 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Nueva Venta
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Middle Section: Chart and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <GraficoVentas datos={salesData} />
        </div>
        <div className="lg:col-span-4">
          <AlertasProductos alertas={alertsData} />
        </div>
      </div>

      {/* Bottom Section: Receipts */}
      <div className="w-full">
        <UltimosComprobantes comprobantes={recentReceipts} />
      </div>
    </div>
  );
}