import { useState, useMemo, useEffect, useCallback } from "react";
import { comprobantesService } from "../../../services/api";

export function useComprobantes() {
  const [comprobantesData, setComprobantesData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipo: "TODOS",
    busqueda: ""
  });

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 20;

  const fetchComprobantes = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const filtrosBackend = {
        fecha_inicio: filtros.fechaInicio || undefined,
        fecha_fin: filtros.fechaFin || undefined,
        tipo: filtros.tipo !== "TODOS" ? filtros.tipo : undefined,
        busqueda: filtros.busqueda || undefined
      };
      const response = await comprobantesService.getAll(filtrosBackend);
      setComprobantesData(response.data);
    } catch (err) {
      console.error("Error cargando comprobantes:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [filtros.fechaInicio, filtros.fechaFin, filtros.tipo, filtros.busqueda]);

  useEffect(() => {
    fetchComprobantes();
  }, [fetchComprobantes]);

  const parseFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const opciones = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return fecha.toLocaleDateString('es-PE', opciones);
  };

  const datosFormateados = useMemo(() => {
    return comprobantesData.map(c => ({
      id: c.id_venta,
      fecha: parseFecha(c.fecha_hora),
      tipo: c.tipo_documento,
      serie: c.serie,
      numero: c.numero_documento,
      cliente: c.cliente,
      vendedor: c.vendedor,
      total: parseFloat(c.total)
    }));
  }, [comprobantesData]);

  const kpis = useMemo(() => {
    const totalRecaudado = datosFormateados.reduce((acc, item) => acc + item.total, 0);
    const nVentas = datosFormateados.length;
    const ticketPromedio = nVentas > 0 ? totalRecaudado / nVentas : 0;

    return {
      totalRecaudado: totalRecaudado.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
      nVentas,
      ticketPromedio: ticketPromedio.toLocaleString('es-PE', { minimumFractionDigits: 2 })
    };
  }, [datosFormateados]);

  const totalResultados = datosFormateados.length;
  const datosPaginados = useMemo(() => {
    const inicio = (pagina - 1) * itemsPorPagina;
    return datosFormateados.slice(inicio, inicio + itemsPorPagina);
  }, [datosFormateados, pagina]);

  useEffect(() => {
    setPagina(1);
  }, [filtros]);

  return {
    filtros,
    setFiltros,
    pagina,
    setPagina,
    kpis,
    totalResultados,
    comprobantes: datosPaginados,
    itemsPorPagina,
    cargando,
    error,
    recargar: fetchComprobantes
  };
}