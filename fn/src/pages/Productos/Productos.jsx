import { useState } from "react";
import { useProductos } from "./hooks/useProductos";
import FiltrosProductos from "./components/FiltrosProductos";
import TablaProductos from "./components/TablaProductos";
import Paginador from "./components/Paginador";
import DrawerEditarProducto from "./components/DrawerEditarProducto";
import ModalNuevoProducto from "./components/ModalNuevoProducto";
import { Loader2 } from "lucide-react";

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
    itemsPorPagina,
    cargando,
    recargar
  } = useProductos();

  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
        onNuevoProducto={() => setModalNuevoAbierto(true)}
      />

      {/* Tabla Principal */}
      <div className="space-y-6">
        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#a16207]" />
          </div>
        ) : (
          <TablaProductos 
            productos={productos} 
            onEditar={handleAbrirEdicion} 
          />
        )}

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
        categorias={categoriasUnicas}
        laboratorios={laboratoriosUnicos}
        onGuardado={recargar}
      />

      {/* Modal Centrado de Creación */}
      <ModalNuevoProducto 
        abierto={modalNuevoAbierto}
        onClose={() => setModalNuevoAbierto(false)}
        categorias={categoriasUnicas}
        laboratorios={laboratoriosUnicos}
        onGuardado={recargar}
      />
    </div>
  );
}
