import { useState, useMemo, useEffect } from "react";
import { productosService } from "../../../services/api";

export function useProductos() {
  const [productosFull, setProductosFull] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Extraer valores únicos para los selectores automáticamente
  const categoriasUnicas = useMemo(() => 
    ["Todas", ...new Set(productosFull.map(p => p.categoria).filter(Boolean))], 
  [productosFull]);
  
  const laboratoriosUnicos = useMemo(() => 
    ["Todos", ...new Set(productosFull.map(p => p.laboratorio).filter(Boolean))], 
  [productosFull]);

  const [filtros, setFiltros] = useState({
    busqueda: "",
    categoria: "Todas",
    laboratorio: "Todos",
    estado: "Todos"
  });

  const [aplicar, setAplicar] = useState(0); // Gatillo para el botón filtrar

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 20;

  const fetchProductos = async () => {
    try {
      setCargando(true);
      const response = await productosService.getAll();
      setProductosFull(response.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productosFiltrados = useMemo(() => {
    return productosFull.filter(p => {
      const matchBusqueda = 
        (p.nombre_comercial?.toLowerCase() || "").includes(filtros.busqueda.toLowerCase()) ||
        (p.principio_activo?.toLowerCase() || "").includes(filtros.busqueda.toLowerCase()) ||
        (p.codigo?.toLowerCase() || "").includes(filtros.busqueda.toLowerCase());
      
      const matchCategoria = filtros.categoria === "Todas" || p.categoria === filtros.categoria;
      const matchLaboratorio = filtros.laboratorio === "Todos" || p.laboratorio === filtros.laboratorio;
      const matchEstado = filtros.estado === "Todos" || p.estado === filtros.estado;

      return matchBusqueda && matchCategoria && matchLaboratorio && matchEstado;
    });
  }, [filtros, productosFull]);


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
    itemsPorPagina,
    cargando,
    recargar: fetchProductos
  };
}
