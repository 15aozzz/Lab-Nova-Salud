import { Menu, Bell, CircleHelp } from "lucide-react";

export default function Navbar() {
  // Obtenemos la fecha actual en el formato de la imagen
  const today = new Date();
  const formattedDate = `Hoy: ${today.getDate()} ${today.toLocaleString('es-ES', { month: 'short' }).replace('.', '')}, ${today.getFullYear()}`;

  return (
    <header className="h-16 bg-[#F8F6F4] border-b border-gray-200 px-8 flex items-center justify-between">
      {/* Izquierda: Menú y Título */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-[#2C2420]">Panel de Control</h2>
      </div>

      {/* Derecha: Fecha e Iconos */}
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-500 font-medium">
          {formattedDate}
        </span>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-[#895202] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F6F4]"></span>
          </button>
          <button className="text-gray-500 hover:text-[#895202] transition-colors">
            <CircleHelp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
