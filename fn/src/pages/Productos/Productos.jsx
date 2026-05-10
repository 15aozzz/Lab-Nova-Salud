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
    <div className="space-y-card_gap animate-in fade-in duration-500 pb-12">
      <div>
        <h2 className="text-[28px] font-semibold tracking-tight text-primary-container mb-1">Inventario de Productos</h2>
        <p className="text-body-md text-on-surface-variant">Controla el stock, vencimientos y precios de tus medicinas.</p>
      </div>

      <FiltrosProductos 
        filtros={filtros} 
        setFiltros={setFiltros} 
        categorias={categoriasUnicas}
        laboratorios={laboratoriosUnicos}
        onNuevoProducto={() => setModalNuevoAbierto(true)}
      />

      <div className="space-y-card_gap">
        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
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

      <DrawerEditarProducto 
        abierto={drawerAbierto}
        onClose={() => setDrawerAbierto(false)}
        producto={productoSeleccionado}
        categorias={categoriasUnicas}
        laboratorios={laboratoriosUnicos}
        onGuardado={recargar}
      />

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
