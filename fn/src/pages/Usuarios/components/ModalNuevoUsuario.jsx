import { X, Save } from "lucide-react";
import { useState } from "react";
import { usuariosService } from "@/services/api";

const estadoInicial = { username: "", password: "", id_empleado: "" };

export default function ModalNuevoUsuario({ abierto, onClose, onGuardado, empleados }) {
  const [form, setForm] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

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
      <div className="absolute inset-0 bg-primary-container/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="px-card_gap py-card_gap border-b border-outline-variant flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-semibold tracking-tight text-primary-container">Nuevo Usuario</h2>
            <p className="text-body-sm text-on-surface-variant font-medium">Registra un nuevo usuario del sistema</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-card_gap space-y-card_gap">
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">Nombre de usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ej. admin, cajero1"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña segura"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">Empleado</label>
            <select
              name="id_empleado"
              value={form.id_empleado}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            >
              <option value="">Seleccione un empleado...</option>
              {empleadosDisponibles.map(e => (
                <option key={e.id_empleado} value={e.id_empleado}>
                  {e.nombres} {e.apellidos} - {e.nombre_cargo} (DNI: {e.dni})
                </option>
              ))}
            </select>
            {empleadosDisponibles.length === 0 && (
              <p className="text-body-sm text-on-surface-variant mt-1">No hay empleados disponibles. Todos los empleados ya tienen usuario.</p>
            )}
          </div>
          {error && <p className="text-body-sm text-error font-medium bg-error-container px-3 py-2 rounded">{error}</p>}
        </div>

        <div className="px-card_gap pb-card_gap flex gap-card_gap">
          <button onClick={onClose} className="flex-1 py-[7px] text-body-md font-bold text-on-surface-variant hover:text-on-surface transition-colors rounded-lg">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando || empleadosDisponibles.length === 0} className="flex-[2] bg-secondary text-on-secondary py-[7px] rounded-lg text-body-md font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
}
