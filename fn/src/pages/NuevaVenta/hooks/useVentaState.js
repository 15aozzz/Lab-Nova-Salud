import { useState, useMemo } from "react";
import { ventasService } from "@/services/api";

export function useVentaState() {
  // Estado para los productos seleccionados
  const [productos, setProductos] = useState([]);

  // Estado para el cliente
  const [cliente, setCliente] = useState({
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
    const precioBase = productoInventario.precios[0];

    setProductos((prev) => {
      const existe = prev.find((p) => p.id === productoInventario.id && p.id_precio === precioBase.id_producto_precio);
      if (existe) {
        return prev.map((p) =>
          p.id === productoInventario.id && p.id_precio === precioBase.id_producto_precio
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [
        ...prev,
        {
          id: productoInventario.id_producto,
          nombre: productoInventario.nombre_comercial,
          categoria: productoInventario.principio_activo,
          cantidad: 1,
          id_precio: precioBase.id_producto_precio,
          unidad: precioBase.nombre_unidad,
          precio: parseFloat(precioBase.precio_venta) || 0,
          opcionesPrecios: productoInventario.precios.map(p => ({
            id_producto_precio: p.id_producto_precio,
            nombre_unidad: p.nombre_unidad,
            precio_venta: parseFloat(p.precio_venta) || 0
          }))
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
          // Normalizar búsqueda - puede ser id_producto_precio o id_precio
          const nuevaOpcion = p.opcionesPrecios.find((opt) => 
            opt.id_producto_precio === id_precio_nuevo || opt.id_precio === id_precio_nuevo
          );
          if (nuevaOpcion) {
            return {
              ...p,
              id_precio: nuevaOpcion.id_producto_precio || nuevaOpcion.id_precio,
              unidad: nuevaOpcion.nombre_unidad || nuevaOpcion.unidad,
              precio: parseFloat(nuevaOpcion.precio_venta || nuevaOpcion.valor) || 0,
            };
          }
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

  const procesarVenta = async (idUsuario = 1) => {
    try {
      if (productos.length === 0) {
        alert("Agregue al menos un producto a la venta");
        return;
      }

      const esFactura = comprobante.tipo.includes("Factura");
      const docEsperado = esFactura ? 11 : 8;
      if (cliente.numero && cliente.numero.length !== docEsperado) {
        alert(`El número de documento debe tener ${docEsperado} dígitos para ${esFactura ? 'Factura' : 'Boleta'}.`);
        return;
      }

      const idTipoComprobante = Number(esFactura ? 2 : 1);
      
      const payload = {
        id_tipo_comprobante: idTipoComprobante,
        numero_documento_cliente: cliente.numero || "00000000",
        nombres_razon_social: cliente.nombre || "CLIENTE GENERICO",
        id_usuario: Number(idUsuario),
        total: Number(totales.total),
        detalle: productos.map((p) => ({
          id_producto: Number(p.id),
          id_producto_precio: Number(p.id_precio),
          cantidad: Number(p.cantidad),
          precio_unitario: Number(p.precio),
          subtotal: (Number(p.cantidad) * Number(p.precio)).toFixed(2)
        }))
      };

      console.log("Payload enviado:", JSON.stringify(payload, null, 2));
      
      const response = await ventasService.registrar(payload);
      alert(`Venta registrada exitosamente. Documento: ${response.data.serie}-${response.data.numero_documento}`);
      
      setProductos([]);
      setCliente({ numero: "", nombre: "Cliente Genérico", direccion: "", telefono: "" });
      
    } catch (error) {
      console.error("Error al registrar venta:", error.response?.data || error.message);
      alert(error.response?.data?.error || error.response?.data?.mensaje || "Error al procesar la venta");
    }
  };

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
    procesarVenta,
  };
}

