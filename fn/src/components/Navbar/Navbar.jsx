import { Menu, Bell, CircleHelp } from "lucide-react";

export default function Navbar() {
  const today = new Date();
  const formattedDate = `Hoy: ${today.getDate()} ${today.toLocaleString('es-ES', { month: 'short' }).replace('.', '')}, ${today.getFullYear()}`;

  return (
    <header className="h-header_height bg-surface-container-low border-b border-outline-variant px-container_padding flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-secondary transition-colors md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold tracking-tight text-h2">Comprobantes</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-body-sm text-on-surface-variant">
          {formattedDate}
        </span>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-secondary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full border-2 border-surface-container-low"></span>
          </button>
          <button className="text-on-surface-variant hover:text-secondary transition-colors">
            <CircleHelp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
