import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
    <aside className="w-sidebar_width bg-primary-container text-surface-container-lowest h-screen flex flex-col border-r border-outline-variant">
      <div className="px-4 py-6 mb-4">
        <h1 className="text-body-lg font-semibold text-surface-container-lowest">Nova Salud</h1>
        <p className="text-on-primary-container text-body-sm mt-1">Sistema de ventas</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block transition-all ${
                isActive
                  ? "bg-secondary text-surface-container-lowest font-medium rounded-lg mx-2 my-1 px-4 py-2"
                  : "text-on-tertiary-container px-4 py-2 hover:text-surface-bright hover:bg-tertiary-container"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <button
          onClick={handleLogout}
          className="w-full text-left text-on-tertiary-container px-4 py-2 hover:text-surface-bright hover:bg-tertiary-container transition-all rounded-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
