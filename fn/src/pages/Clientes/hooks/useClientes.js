import { useState, useEffect, useCallback } from "react";
import { clientesService } from "@/services/api";

export function useClientes() {
  const [clientesFull, setClientesFull] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 15;

  const fetchClientes = useCallback(async (q = "") => {
    try {
      setCargando(true);
      const response = await clientesService.getAll(q);
      setClientesFull(response.data);
      setPagina(1);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleBuscar = () => fetchClientes(busqueda);

  const clientesPaginados = clientesFull.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  return {
    clientes: clientesPaginados,
    totalResultados: clientesFull.length,
    busqueda,
    setBusqueda,
    handleBuscar,
    cargando,
    pagina,
    setPagina,
    itemsPorPagina,
    recargar: () => fetchClientes(busqueda),
  };
}
