export const kpiData = [
  {
    titulo: "Ventas Hoy",
    valor: "S/. 487.50",
    color: "bg-orange-100",
    iconName: "Wallet",
  },
  {
    titulo: "Comprobantes Emitidos",
    valor: "12",
    color: "bg-gray-100",
    iconName: "FileText",
  },
  {
    titulo: "Productos Stock Crítico",
    valor: "3",
    color: "bg-red-50",
    iconName: "AlertTriangle",
  },
  {
    titulo: "Productos Por Vencer",
    valor: "2",
    color: "bg-amber-50",
    iconName: "Calendar",
  },
];

export const salesData = [
  { day: "1", sales: 400 },
  { day: "2", sales: 650 },
  { day: "3", sales: 500 },
  { day: "4", sales: 300 },
  { day: "5", sales: 850 },
  { day: "6", sales: 450 },
  { day: "7", sales: 1100, isToday: true },
];

export const alertsData = [
  {
    id: 1,
    producto: "Paracetamol 500mg",
    stock: "2 / 10",
    estado: "Crítico",
    tipo: "error",
  },
  {
    id: 2,
    producto: "Amoxicilina 250mg",
    stock: "15 / 15",
    estado: "Vence pronto",
    tipo: "warning",
  },
  {
    id: 3,
    producto: "Ibuprofeno 400mg",
    stock: "5 / 20",
    estado: "Crítico",
    tipo: "error",
  },
];

export const recentReceipts = [
  {
    id: 1,
    fecha: "24 Oct, 10:30",
    tipo: "BOLETA",
    numero: "B001-00458",
    cliente: "Juan Pérez",
    vendedor: "María G.",
    total: "S/. 45.50",
  },
  {
    id: 2,
    fecha: "24 Oct, 09:15",
    tipo: "FACTURA",
    numero: "F001-00120",
    cliente: "Clínica San Juan SAC",
    vendedor: "Carlos R.",
    total: "S/. 320.00",
  },
  {
    id: 3,
    fecha: "24 Oct, 08:45",
    tipo: "BOLETA",
    numero: "B001-00457",
    cliente: "Cliente Genérico",
    vendedor: "María G.",
    total: "S/. 12.00",
  },
];
