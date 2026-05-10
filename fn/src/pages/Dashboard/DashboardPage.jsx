import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import KpiCard from "./components/KpiCard";
import GraficoVentas from "./components/GraficoVentas";
import AlertasProductos from "./components/AlertasProductos";
import UltimosComprobantes from "./components/UltimosComprobantes";
import { dashboardService } from "../../services/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getResumen();
        const { kpis, ventasSemana, alertas, ultimosComprobantes } = response.data;
        const kpiRow = kpis[0] || { ventas_hoy: 0, comprobantes_hoy: 0, stock_critico: 0, por_vencer: 0 };
        
        setData({
          kpiData: [
            { titulo: "Ventas Hoy", valor: `S/. ${parseFloat(kpiRow.ventas_hoy || 0).toFixed(2)}`, color: "bg-orange-100", iconName: "Wallet" },
            { titulo: "Comprobantes Emitidos", valor: (kpiRow.comprobantes_hoy || 0).toString(), color: "bg-gray-100", iconName: "FileText" },
            { titulo: "Productos Stock Crítico", valor: (kpiRow.stock_critico || 0).toString(), color: "bg-red-50", iconName: "AlertTriangle" },
            { titulo: "Productos Por Vencer", valor: (kpiRow.por_vencer || 0).toString(), color: "bg-amber-50", iconName: "Calendar" },
          ],
          salesData: Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const localDateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            const found = ventasSemana.find(v => {
               const vDate = new Date(v.fecha);
               vDate.setMinutes(vDate.getMinutes() + vDate.getTimezoneOffset());
               const vDateStr = `${vDate.getFullYear()}-${String(vDate.getMonth() + 1).padStart(2, '0')}-${String(vDate.getDate()).padStart(2, '0')}`;
               return vDateStr === localDateStr;
            });

            return {
              day: date.getDate().toString(),
              sales: found ? parseFloat(found.total_ventas) : 0,
              isToday: date.toDateString() === new Date().toDateString()
            };
          }),
          alertsData: alertas,
          recentReceipts: ultimosComprobantes.map(c => ({
             ...c,
             fecha: new Date(c.fecha).toLocaleString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
             total: `S/. ${parseFloat(c.total).toFixed(2)}`
          }))
        });
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#a16207]" />
      </div>
    );
  }

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
        {data.kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Middle Section: Chart and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <GraficoVentas datos={data.salesData} />
        </div>
        <div className="lg:col-span-4">
          <AlertasProductos alertas={data.alertsData} />
        </div>
      </div>

      {/* Bottom Section: Receipts */}
      <div className="w-full">
        <UltimosComprobantes comprobantes={data.recentReceipts} />
      </div>
    </div>
  );
}