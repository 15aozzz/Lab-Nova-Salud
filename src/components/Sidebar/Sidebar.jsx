import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Nueva Venta", path: "/nueva-venta" },
  { name: "Comprobantes", path: "/comprobantes" },
  { name: "Productos", path: "/productos" },
  { name: "Clientes", path: "/clientes" },
  { name: "Usuarios", path: "/usuarios" },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-[#2C2420] text-white h-screen flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Nova Salud</h1>
        <p className="text-xs text-orange-200/60 font-medium uppercase tracking-wider">Sistema de ventas</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-5 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? "bg-[#895202] text-white shadow-lg shadow-orange-900/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full px-5 py-3 text-left text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200 font-medium"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
