import { useState, useMemo } from "react";

export function useVentaState() {
  // Estado para los productos seleccionados
  const [productos, setProductos] = useState([]);

  // Estado para el cliente
  const [cliente, setCliente] = useState({
    tipoDoc: "DNI",
    numero: "",
    nombre: "Cliente Genérico",
    direccion: "",
    telefono: "",
  });

  // Estado para la info del comprobante
  const [comprobante, setComprobante] = useState({
    empresa: "Nova Salud",
    tipo: "Boleta Electrónica",
    serie: "B001",
    correlativo: "000145",
    fecha: new Date().toLocaleDateString(),
    operacion: "Venta Interna",
    pago: "Contado",
    moneda: "PEN - SOLES",
  });

  // Funciones para manejar productos
  const agregarProducto = (productoInventario) => {
    // Por defecto seleccionamos el primer precio/unidad disponible
    const precioBase = productoInventario.precios[0];

    setProductos((prev) => {
      const existe = prev.find((p) => p.id === productoInventario.id && p.id_precio === precioBase.id_precio);
      if (existe) {
        return prev.map((p) =>
          p.id === productoInventario.id && p.id_precio === precioBase.id_precio
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [
        ...prev,
        {
          id: productoInventario.id,
          nombre: productoInventario.nombre,
          categoria: productoInventario.categoria,
          cantidad: 1,
          id_precio: precioBase.id_precio,
          unidad: precioBase.unidad,
          precio: precioBase.valor,
          opcionesPrecios: productoInventario.precios // Guardamos todas las opciones para el selector
        },
      ];
    });
  };

  const actualizarCantidad = (id, id_precio, cantidad) => {
    if (cantidad <= 0) {
      setProductos((prev) => prev.filter((p) => !(p.id === id && p.id_precio === id_precio)));
      return;
    }
    setProductos((prev) =>
      prev.map((p) => (p.id === id && p.id_precio === id_precio ? { ...p, cantidad } : p))
    );
  };

  const eliminarProducto = (id, id_precio) => {
    setProductos((prev) => prev.filter((p) => !(p.id === id && p.id_precio === id_precio)));
  };

  const cambiarUnidad = (id, id_precio_actual, id_precio_nuevo) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id === id && p.id_precio === id_precio_actual) {
          const nuevaOpcion = p.opcionesPrecios.find((opt) => opt.id_precio === id_precio_nuevo);
          return {
            ...p,
            id_precio: nuevaOpcion.id_precio,
            unidad: nuevaOpcion.unidad,
            precio: nuevaOpcion.valor,
          };
        }
        return p;
      })
    );
  };

  // Cálculos automáticos (Memoizados para rendimiento)
  const totales = useMemo(() => {
    const subtotal = productos.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    );
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    return {
      gravadas: subtotal.toFixed(2),
      inafectas: "0.00",
      subtotal: subtotal.toFixed(2),
      igv: igv.toFixed(2),
      total: total.toFixed(2),
    };
  }, [productos]);

  return {
    productos,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
    cambiarUnidad,
    cliente,
    setCliente,
    comprobante,
    setComprobante,
    totales,
  };
}

