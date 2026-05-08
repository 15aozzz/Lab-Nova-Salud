import { useVentaState } from "./hooks/useVentaState";
import TipoVentaSelector from "./components/TipoVentaSelector";
import ComprobanteInfo from "./components/ComprobanteInfo";
import DatosCliente from "./components/DatosCliente";
import TablaProductos from "./components/TablaProductos";
import ResumenVenta from "./components/ResumenVenta";
import { useEffect } from "react";

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
    totales 
  } = useVentaState();

  // El useEffect ahora está vacío, usa el buscador para agregar productos
  //useEffect(() => {
    // Aquí podrías cargar datos iniciales si fuera necesario en el futuro
  //}, []);


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <nav className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Inicio / Ventas / <span className="text-[#a16207]">Boleta</span>
          </nav>
          <h1 className="text-3xl font-bold text-[#2C2420]">Nueva Venta</h1>
        </div>
        <TipoVentaSelector />
      </div>

      {/* Grid Principal: Info y Cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <ComprobanteInfo info={comprobante} setInfo={setComprobante} />
        </div>
        <div className="lg:col-span-4">
          <DatosCliente cliente={cliente} setCliente={setCliente} />
        </div>
      </div>

      {/* Grid Secundario: Productos y Resumen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
          <ResumenVenta totales={totales} />
        </div>
      </div>
    </div>
  );
}

