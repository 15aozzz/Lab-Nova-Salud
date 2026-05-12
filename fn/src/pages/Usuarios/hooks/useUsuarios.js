import { useState, useEffect, useCallback } from "react";
import { usuariosService } from "@/services/api";

export function useUsuarios() {
  const [usuariosFull, setUsuariosFull] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 15;

  const fetchUsuarios = useCallback(async (q = "") => {
    try {
      setCargando(true);
      const response = await usuariosService.getAll(q);
      setUsuariosFull(response.data);
      setPagina(1);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchEmpleados = useCallback(async () => {
    try {
      const response = await usuariosService.getEmpleados();
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
    fetchEmpleados();
  }, [fetchUsuarios, fetchEmpleados]);

  const handleBuscar = () => fetchUsuarios(busqueda);

  const usuariosPaginados = usuariosFull.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  return {
    usuarios: usuariosPaginados,
    totalResultados: usuariosFull.length,
    empleados,
    busqueda,
    setBusqueda,
    handleBuscar,
    cargando,
    pagina,
    setPagina,
    itemsPorPagina,
    recargar: () => fetchUsuarios(busqueda),
  };
}
