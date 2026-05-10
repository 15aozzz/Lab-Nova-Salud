import { useState } from "react";
import { Search, Loader2, UserPlus } from "lucide-react";
import { useUsuarios } from "./hooks/useUsuarios";
import TablaUsuarios from "./components/TablaUsuarios";
import ModalNuevoUsuario from "./components/ModalNuevoUsuario";
import DrawerEditarUsuario from "./components/DrawerEditarUsuario";
import PaginadorUsuarios from "./components/PaginadorUsuarios";

export default function Usuarios() {
  const {
    usuarios,
    totalResultados,
    empleados,
    busqueda,
    setBusqueda,
    handleBuscar,
    cargando,
    pagina,
    setPagina,
    itemsPorPagina,
    recargar,
  } = useUsuarios();

  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setDrawerAbierto(true);
  };

  return (
    <div className="space-y-card_gap animate-in fade-in duration-500 pb-12">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-primary-container mb-1">Gestión de Usuarios</h2>
          <p className="text-body-md text-on-surface-variant">Administra las cuentas de acceso al sistema.</p>
        </div>
        <button
          onClick={() => setModalNuevoAbierto(true)}
          className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-[7px] rounded-lg text-body-md font-bold shadow-sm hover:opacity-90 transition-all active:scale-95"
        >
          <UserPlus className="w-[18px] h-[18px]" />
          + Nuevo Usuario
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-on-surface-variant" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            placeholder="Buscar por usuario, nombre o DNI..."
            className="w-full pl-10 pr-3 py-[7px] bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          />
        </div>
        <button
          onClick={handleBuscar}
          className="px-4 py-[7px] bg-primary-container text-on-primary-container rounded-lg text-body-md font-bold hover:opacity-90 transition-all"
        >
          Buscar
        </button>
        <button
          onClick={() => { setBusqueda(""); recargar(); }}
          className="px-4 py-[7px] border border-outline-variant text-on-surface-variant rounded-lg text-body-md font-medium hover:bg-surface-container transition-all"
        >
          Limpiar
        </button>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      ) : (
        <div className="space-y-card_gap">
          <TablaUsuarios usuarios={usuarios} onEditar={handleEditar} />
          <PaginadorUsuarios
            actual={pagina}
            totalResultados={totalResultados}
            itemsPorPagina={itemsPorPagina}
            onCambioPagina={setPagina}
          />
        </div>
      )}

      <ModalNuevoUsuario
        abierto={modalNuevoAbierto}
        onClose={() => setModalNuevoAbierto(false)}
        onGuardado={recargar}
        empleados={empleados}
      />

      <DrawerEditarUsuario
        abierto={drawerAbierto}
        onClose={() => setDrawerAbierto(false)}
        usuario={usuarioSeleccionado}
        onGuardado={recargar}
        empleados={empleados}
      />
    </div>
  );
}
