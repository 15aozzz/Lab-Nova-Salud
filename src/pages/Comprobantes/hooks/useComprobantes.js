import { useState, useMemo } from "react";
import { comprobantesMock } from "../../../mocks/comprobantes";

export function useComprobantes() {
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipo: "TODOS",
    busqueda: ""
  });

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 20;

  // Función para convertir "24 Oct 2023, 14:30" a objeto Date
  const parseFecha = (fechaStr) => {
    const meses = {
      "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
      "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
    };
    const partes = fechaStr.split(" ");
    const dia = parseInt(partes[0]);
    const mes = meses[partes[1]];
    const anio = parseInt(partes[2].replace(",", ""));
    return new Date(anio, mes, dia);
  };

  // Filtrado de datos
  const datosFiltrados = useMemo(() => {
    return comprobantesMock.filter(c => {
      // Búsqueda por texto (SIEMPRE REACTIVA)
      const matchBusqueda = 
        c.numero.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        c.cliente.toLowerCase().includes(filtros.busqueda.toLowerCase());

      // Filtros de Botón (Tipo y Fechas)
      const matchTipo = filtros.tipo === "TODOS" || c.tipo === filtros.tipo;
      
      let matchFecha = true;
      if (filtros.fechaInicio || filtros.fechaFin) {
        const fechaComprobante = parseFecha(c.fecha);
        
        if (filtros.fechaInicio) {
          const inicio = new Date(filtros.fechaInicio + "T00:00:00");
          if (fechaComprobante < inicio) matchFecha = false;
        }
        if (filtros.fechaFin) {
          const fin = new Date(filtros.fechaFin + "T23:59:59");
          if (fechaComprobante > fin) matchFecha = false;
        }
      }

      return matchBusqueda && matchTipo && matchFecha;
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
