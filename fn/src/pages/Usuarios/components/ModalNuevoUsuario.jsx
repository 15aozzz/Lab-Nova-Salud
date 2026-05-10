import { X, Save } from "lucide-react";
import { useState } from "react";
import { usuariosService } from "../../../services/api";

const estadoInicial = { username: "", password: "", id_empleado: "" };

export default function ModalNuevoUsuario({ abierto, onClose, onGuardado, empleados }) {
  const [form, setForm] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Empleados que no tienen usuario asignado
  const empleadosDisponibles = empleados.filter(e => !e.tiene_usuario);

  if (!abierto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.username || !form.password || !form.id_empleado) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setGuardando(true);
    try {
      await usuariosService.crear({
        username: form.username,
        password: form.password,
        id_empleado: parseInt(form.id_empleado, 10)
      });
      setForm(estadoInicial);
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el usuario.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2C2420]/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#2C2420]">Nuevo Usuario</h2>
            <p className="text-xs text-gray-400 font-medium">Registra un nuevo usuario del sistema</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre de usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ej. admin, cajero1"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña segura"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Empleado</label>
            <select
              name="id_empleado"
              value={form.id_empleado}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all"
            >
              <option value="">Seleccione un empleado...</option>
              {empleadosDisponibles.map(e => (
                <option key={e.id_empleado} value={e.id_empleado}>
                  {e.nombres} {e.apellidos} - {e.nombre_cargo} (DNI: {e.dni})
                </option>
              ))}
            </select>
            {empleadosDisponibles.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">No hay empleados disponibles. Todos los empleados ya tienen usuario.</p>
            )}
          </div>
          {error && <p className="text-xs text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-4">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors rounded-xl">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando || empleadosDisponibles.length === 0} className="flex-[2] bg-[#895202] text-white py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-900/20 hover:bg-[#6d4102] transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
}
