import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { usuariosService } from "../../../services/api";

export default function DrawerEditarUsuario({ abierto, onClose, usuario, onGuardado, empleados }) {
  const [form, setForm] = useState({ username: "", password: "", id_empleado: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (usuario) {
      setForm({
        username: usuario.username || "",
        password: "", // Dejar vacío para no modificar si no se cambia
        id_empleado: usuario.id_empleado || "",
      });
      setError("");
    }
  }, [usuario]);

  // Empleados disponibles: los que no tienen usuario O los que ya están asignados a este usuario
  const empleadosDisponibles = empleados.filter(e => !e.tiene_usuario || e.id_empleado === usuario?.id_empleado);

  if (!abierto || !usuario) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.username || !form.id_empleado) {
      setError("Usuario y empleado son obligatorios.");
      return;
    }
    setGuardando(true);
    try {
      // Solo enviar password si se ha modificado (no vacío)
      const data = {
        username: form.username,
        id_empleado: parseInt(form.id_empleado),
        ...(form.password && { password: form.password })
      };
      await usuariosService.actualizar(usuario.id_usuario, data);
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el usuario.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#2C2420]">Editar Usuario</h2>
                <p className="text-xs text-gray-400 font-medium mt-1">{usuario.username}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre de usuario</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contraseña {form.password === "" ? "(dejar en blanco para mantener actual)" : ""}
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Nueva contraseña (opcional)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Empleado</label>
                <select
                  name="id_empleado"
                  value={form.id_empleado}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none"
                >
                  <option value="">Seleccione un empleado...</option>
                  {empleadosDisponibles.map(e => (
                    <option key={e.id_empleado} value={e.id_empleado}>
                      {e.nombres} {e.apellidos} - {e.nombre_cargo} (DNI: {e.dni})
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-xs text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex gap-4">
              <button onClick={onClose} className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleGuardar} disabled={guardando} className="flex-1 px-6 py-3 bg-[#895202] text-white rounded-lg text-sm font-bold shadow-lg shadow-orange-900/10 hover:bg-[#6d4102] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                <Save className="w-4 h-4" /> {guardando ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
