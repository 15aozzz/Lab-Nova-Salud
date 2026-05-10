import { useState } from "react";
import { Search, Loader2, UserPlus, Download } from "lucide-react";
import { useClientes } from "./hooks/useClientes";
import TablaClientes from "./components/TablaClientes";
import ModalNuevoCliente from "./components/ModalNuevoCliente";
import DrawerEditarCliente from "./components/DrawerEditarCliente";
import PaginadorClientes from "./components/PaginadorClientes";

export default function Clientes() {
  const {
    clientes,
    totalResultados,
    busqueda,
    setBusqueda,
    handleBuscar,
    cargando,
    pagina,
    setPagina,
    itemsPorPagina,
    recargar,
  } = useClientes();

  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setDrawerAbierto(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Cabecera */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2420]">Directorio de Clientes</h1>
          <p className="text-gray-500 mt-1">Gestiona la base de datos de clientes y empresas para facturación.</p>
        </div>
        <button
          onClick={() => setModalNuevoAbierto(true)}
          className="flex items-center gap-2 bg-[#895202] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-900/20 hover:bg-[#6d4102] transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          + Nuevo Cliente
        </button>
      </div>

      {/* Buscador */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            placeholder="Buscar por documento o nombre/razón social..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all shadow-sm"
          />
        </div>
        <button
          onClick={handleBuscar}
          className="px-5 py-3 bg-[#2C2420] text-white rounded-xl text-sm font-bold hover:bg-[#3d3330] transition-all"
        >
          Buscar
        </button>
        <button
          onClick={() => { setBusqueda(""); recargar(); }}
          className="px-4 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
        >
          Limpiar
        </button>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#a16207]" />
        </div>
      ) : (
        <div className="space-y-4">
          <TablaClientes clientes={clientes} onEditar={handleEditar} />
          <PaginadorClientes
            actual={pagina}
            totalResultados={totalResultados}
            itemsPorPagina={itemsPorPagina}
            onCambioPagina={setPagina}
          />
        </div>
      )}

      {/* Modal Nuevo Cliente */}
      <ModalNuevoCliente
        abierto={modalNuevoAbierto}
        onClose={() => setModalNuevoAbierto(false)}
        onGuardado={recargar}
      />

      {/* Drawer Editar Cliente */}
      <DrawerEditarCliente
        abierto={drawerAbierto}
        onClose={() => setDrawerAbierto(false)}
        cliente={clienteSeleccionado}
        onGuardado={recargar}
      />
    </div>
  );
}