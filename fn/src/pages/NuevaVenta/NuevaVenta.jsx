import { useVentaState } from "./hooks/useVentaState";
import TipoVentaSelector from "./components/TipoVentaSelector";
import ComprobanteInfo from "./components/ComprobanteInfo";
import DatosCliente from "./components/DatosCliente";
import TablaProductos from "./components/TablaProductos";
import ResumenVenta from "./components/ResumenVenta";

export default function NuevaVenta() {
  const { 
    productos, 
    agregarProducto, 
    actualizarCantidad, 
    eliminarProducto, 
    cambiarUnidad,
    cliente, 
    setCliente, 
    comprobante, 
    setComprobante,
    totales,
    procesarVenta
  } = useVentaState();

  return (
    <div className="space-y-card_gap animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-primary-container mb-1">Nueva Venta</h2>
        </div>
        <TipoVentaSelector />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-card_gap items-stretch">
        <div className="lg:col-span-8">
          <ComprobanteInfo info={comprobante} setInfo={setComprobante} />
        </div>
        <div className="lg:col-span-4">
          <DatosCliente cliente={cliente} setCliente={setCliente} comprobanteTipo={comprobante.tipo} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-card_gap items-start">
        <div className="lg:col-span-8 flex flex-col h-full">
          <TablaProductos 
            productos={productos} 
            onActualizarCantidad={actualizarCantidad}
            onEliminar={eliminarProducto}
            onAgregar={agregarProducto}
            onCambiarUnidad={cambiarUnidad}
          />
        </div>
        <div className="lg:col-span-4">
          <ResumenVenta totales={totales} onVender={() => procesarVenta()} />
        </div>
      </div>
    </div>
  );
}
