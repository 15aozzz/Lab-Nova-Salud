// Basado en el esquema SQL proporcionado
export const inventario = [
  {
    id: 1,
    nombre: "Paracetamol 500mg",
    categoria: "Analgésicos",
    precios: [
      { id_precio: 1, unidad: "UND", valor: 0.50 },
      { id_precio: 2, unidad: "BLI", valor: 2.50 },
      { id_precio: 3, unidad: "CJA", valor: 15.00 },
    ],
    stock: 150
  },
  {
    id: 2,
    nombre: "Ibuprofeno 400mg",
    categoria: "Antiinflamatorios",
    precios: [
      { id_precio: 4, unidad: "UND", valor: 0.80 },
      { id_precio: 5, unidad: "BLI", valor: 3.50 },
    ],
    stock: 80
  },
  {
    id: 3,
    nombre: "Amoxicilina 500mg",
    categoria: "Antibióticos",
    precios: [
      { id_precio: 6, unidad: "UND", valor: 1.20 },
      { id_precio: 7, unidad: "CJA", valor: 22.00 },
    ],
    stock: 60
  },
  {
    id: 4,
    nombre: "Omeprazol 20mg",
    categoria: "Gastrointestinales",
    precios: [
      { id_precio: 8, unidad: "UND", valor: 0.80 },
      { id_precio: 9, unidad: "CJA", valor: 12.00 },
    ],
    stock: 90
  },
  {
    id: 10,
    nombre: "Alcohol 70° 250ml",
    categoria: "Cuidado Personal",
    precios: [
      { id_precio: 10, unidad: "FRC", valor: 7.50 },
    ],
    stock: 100
  },
  {
    id: 18,
    nombre: "Jarabe para la tos",
    categoria: "Analgésicos",
    precios: [
      { id_precio: 11, unidad: "FRC", valor: 14.00 },
    ],
    stock: 3
  }
];
