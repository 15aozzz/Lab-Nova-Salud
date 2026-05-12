import { useState } from "react";
import { Search, Loader2, UserPlus, Download } from "lucide-react";
import { useClientes } from "./hooks/useClientes";
import { useAuth } from "@/context/AuthContext";
import TablaClientes from "./components/TablaClientes";
import ClienteForm from "./components/ClienteForm";
import Paginador from "@/components/Paginador/Paginador";

export default function Clientes() {
  const { isAdmin } = useAuth();
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

  const [formAbierto, setFormAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const handleNuevo = () => {
    setClienteSeleccionado(null);
    setFormAbierto(true);
  };

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setFormAbierto(true);
  };

  const handleCerrarForm = () => {
    setFormAbierto(false);
    setClienteSeleccionado(null);
  };

  return (
    <div className="space-y-card_gap animate-in fade-in duration-500 pb-12">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-primary-container mb-1">Directorio de Clientes</h2>
          <p className="text-body-md text-on-surface-variant">Gestiona la base de datos de clientes y empresas para facturación.</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleNuevo}
            className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-[7px] rounded-lg text-body-md font-bold shadow-sm hover:opacity-90 transition-all active:scale-95"
          >
            <UserPlus className="w-[18px] h-[18px]" />
            + Nuevo Cliente
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-on-surface-variant" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            placeholder="Buscar por documento o nombre/razón social..."
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
          <TablaClientes clientes={clientes} onEditar={handleEditar} />
          <Paginador
            actual={pagina}
            totalResultados={totalResultados}
            itemsPorPagina={itemsPorPagina}
            onCambioPagina={setPagina}
            etiqueta="clientes"
          />
        </div>
      )}

      {isAdmin && (
        <ClienteForm
          abierto={formAbierto}
          cliente={clienteSeleccionado}
          onClose={handleCerrarForm}
          onGuardado={recargar}
        />
      )}
    </div>
  );
}
