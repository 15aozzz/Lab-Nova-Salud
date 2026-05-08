import { useState, useMemo } from "react";
import { productosFull } from "../../../mocks/inventarioFull";

export function useProductos() {
  // Extraer valores únicos para los selectores automáticamente
  const categoriasUnicas = useMemo(() => 
    ["Todas", ...new Set(productosFull.map(p => p.categoria))], 
  []);
  
  const laboratoriosUnicos = useMemo(() => 
    ["Todos", ...new Set(productosFull.map(p => p.laboratorio))], 
  []);

  const [filtros, setFiltros] = useState({
    busqueda: "",
    categoria: "Todas",
    laboratorio: "Todos",
    estado: "Todos"
  });

  const [aplicar, setAplicar] = useState(0); // Gatillo para el botón filtrar

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 20;

  const productosFiltrados = useMemo(() => {
    return productosFull.filter(p => {
      const matchBusqueda = 
        p.nombreComercial.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        p.principioActivo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        p.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase());
      
      const matchCategoria = filtros.categoria === "Todas" || p.categoria === filtros.categoria;
      const matchLaboratorio = filtros.laboratorio === "Todos" || p.laboratorio === filtros.laboratorio;
      const matchEstado = filtros.estado === "Todos" || p.estado === filtros.estado;

      return matchBusqueda && matchCategoria && matchLaboratorio && matchEstado;
    });
  }, [filtros, aplicar]); // Ahora reacciona también al gatillo

  const totalResultados = productosFiltrados.length;
  
  return {
    filtros,
    setFiltros,
    categoriasUnicas,
    laboratoriosUnicos,
    ejecutarFiltro: () => setAplicar(prev => prev + 1),
    productos: productosFiltrados.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina),
    totalResultados,
    pagina,
    setPagina,
    itemsPorPagina
  };
}

