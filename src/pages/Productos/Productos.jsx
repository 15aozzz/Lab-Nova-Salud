import { useState } from "react";
import { useProductos } from "./hooks/useProductos";
import FiltrosProductos from "./components/FiltrosProductos";
import TablaProductos from "./components/TablaProductos";
import Paginador from "./components/Paginador";
import DrawerEditarProducto from "./components/DrawerEditarProducto";

export default function Productos() {
  const { 
    filtros, 
    setFiltros, 
    categoriasUnicas,
    laboratoriosUnicos,
    ejecutarFiltro,
    productos, 
    totalResultados, 
    pagina, 
    setPagina, 
    itemsPorPagina 
  } = useProductos();

  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // En una implementación real, este evento vendría de FilaProducto
  const handleAbrirEdicion = (producto) => {
    setProductoSeleccionado(producto);
    setDrawerAbierto(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Cabecera */}
      <div>
        <h1 className="text-3xl font-bold text-[#2C2420]">Inventario de Productos</h1>
        <p className="text-gray-500 mt-1">Controla el stock, vencimientos y precios de tus medicinas.</p>
      </div>

      {/* Filtros y Acción */}
      <FiltrosProductos 
        filtros={filtros} 
        setFiltros={setFiltros} 
        categorias={categoriasUnicas}
        laboratorios={laboratoriosUnicos}
        onFiltrar={ejecutarFiltro}
      />

      {/* Tabla Principal */}
      <div className="space-y-6">
        <TablaProductos 
          productos={productos} 
          onEditar={handleAbrirEdicion} 
        />

        <Paginador 
          actual={pagina} 
          totalResultados={totalResultados} 
          itemsPorPagina={itemsPorPagina} 
          onCambioPagina={setPagina}
        />
      </div>

      {/* Panel Lateral de Edición */}
      <DrawerEditarProducto 
        abierto={drawerAbierto}
        onClose={() => setDrawerAbierto(false)}
        producto={productoSeleccionado}
      />
    </div>
  );
}