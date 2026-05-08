import { useState, useMemo } from "react";
import { comprobantesMock } from "../../../mocks/comprobantes";

export function useComprobantes() {
  const [filtros, setFiltros] = useState({
    fechaInicio: "2023-10-01",
    fechaFin: "2023-10-24",
    tipo: "Todos",
    busqueda: ""
  });

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 20;

  // Filtrado de datos
  const datosFiltrados = useMemo(() => {
    return comprobantesMock.filter(item => {
      const matchTipo = filtros.tipo === "Todos" || item.tipo === filtros.tipo;
      const matchBusqueda = 
        item.cliente.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        item.numero.includes(filtros.busqueda);
      
      return matchTipo && matchBusqueda;
    });
  }, [filtros]);

  // Cálculos de KPI (Sobre todos los datos filtrados, no solo la página actual)
  const kpis = useMemo(() => {
    const totalRecaudado = datosFiltrados.reduce((acc, item) => acc + item.total, 0);
    const nVentas = datosFiltrados.length;
    const ticketPromedio = nVentas > 0 ? totalRecaudado / nVentas : 0;

    return {
      totalRecaudado: totalRecaudado.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
      nVentas,
      ticketPromedio: ticketPromedio.toLocaleString('es-PE', { minimumFractionDigits: 2 })
    };
  }, [datosFiltrados]);

  // Paginación
  const totalResultados = datosFiltrados.length;
  const datosPaginados = useMemo(() => {
    const inicio = (pagina - 1) * itemsPorPagina;
    return datosFiltrados.slice(inicio, inicio + itemsPorPagina);
  }, [datosFiltrados, pagina]);

  return {
    filtros,
    setFiltros,
    pagina,
    setPagina,
    kpis,
    totalResultados,
    comprobantes: datosPaginados,
    itemsPorPagina
  };
}
