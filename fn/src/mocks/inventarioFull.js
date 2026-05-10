export const productosFull = [
  {
    id_producto: 1,
    codigo: "P-001",
    nombre_comercial: "Paracetamol 500mg",
    principio_activo: "Paracetamol",
    laboratorio: "Genfar",
    categoria: "Analgésicos",
    presentacion: "Caja x 100 tab",
    stock_actual: 450, // Siempre en unidades mínimas
    stock_minimo: 50,
    fecha_vencimiento: "2025-12-01",
    estado: "VIGENTE",
    precios: [
      { id_producto_precio: 101, unidad: "Caja", abreviatura: "CJA", precio_venta: 45.00, factor: 100 },
      { id_producto_precio: 102, unidad: "Blíster", abreviatura: "BLI", precio_venta: 5.00, factor: 10 },
      { id_producto_precio: 103, unidad: "Unidad", abreviatura: "UND", precio_venta: 0.50, factor: 1 }
    ]
  },
  {
    id_producto: 2,
    codigo: "P-042",
    nombre_comercial: "Amoxicilina 500mg",
    principio_activo: "Amoxicilina",
    laboratorio: "Farmindustria",
    categoria: "Antibióticos",
    presentacion: "Caja x 50 cap",
    stock_actual: 12,
    stock_minimo: 20,
    fecha_vencimiento: "2024-08-15",
    estado: "STOCK CRÍTICO",
    precios: [
      { id_producto_precio: 201, unidad: "Caja", abreviatura: "CJA", precio_venta: 35.00, factor: 50 },
      { id_producto_precio: 202, unidad: "Unidad", abreviatura: "UND", precio_venta: 0.80, factor: 1 }
    ]
  },
  {
    id_producto: 3,
    codigo: "P-089",
    nombre_comercial: "Ibuprofeno 400mg",
    principio_activo: "Ibuprofeno",
    laboratorio: "Teva",
    categoria: "Analgésicos",
    presentacion: "Blíster x 10 tab",
    stock_actual: 120,
    stock_minimo: 30,
    fecha_vencimiento: "2024-11-20",
    estado: "POR VENCER",
    precios: [
      { id_producto_precio: 301, unidad: "Blíster", abreviatura: "BLI", precio_venta: 4.50, factor: 10 },
      { id_producto_precio: 302, unidad: "Unidad", abreviatura: "UND", precio_venta: 0.50, factor: 1 }
    ]
  },
  {
    id_producto: 4,
    codigo: "P-105",
    nombre_comercial: "Loratadina 10mg",
    principio_activo: "Loratadina",
    laboratorio: "Bayer",
    categoria: "Antihistamínicos",
    presentacion: "Caja x 20 tab",
    stock_actual: 45,
    stock_minimo: 15,
    fecha_vencimiento: "2023-05-10",
    estado: "VENCIDO",
    precios: [
      { id_producto_precio: 401, unidad: "Caja", abreviatura: "CJA", precio_venta: 15.00, factor: 20 },
      { id_producto_precio: 402, unidad: "Unidad", abreviatura: "UND", precio_venta: 0.80, factor: 1 }
    ]
  }
];
