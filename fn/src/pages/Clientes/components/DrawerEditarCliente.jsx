import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { clientesService } from "../../../services/api";

export default function DrawerEditarCliente({ abierto, onClose, cliente, onGuardado }) {
  const [form, setForm] = useState({ numero_documento: "", nombres_razon_social: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cliente) {
      setForm({
        numero_documento: cliente.numero_documento || "",
        nombres_razon_social: cliente.nombres_razon_social || "",
      });
      setError("");
    }
  }, [cliente]);

  if (!abierto || !cliente) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.numero_documento || !form.nombres_razon_social) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setGuardando(true);
    try {
      await clientesService.actualizar(cliente.id_cliente, form);
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el cliente.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col">
            <div className="p-card_gap border-b border-outline-variant flex items-center justify-between">
              <div>
                <h2 className="text-h2 font-semibold tracking-tight text-primary-container">Editar Cliente</h2>
                <p className="text-body-sm text-on-surface-variant font-medium mt-1">{cliente.numero_documento}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-card_gap space-y-card_gap">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-primary-container">N° Documento</label>
                <input
                  type="text"
                  name="numero_documento"
                  value={form.numero_documento}
                  onChange={handleChange}
                  maxLength={11}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-primary-container">Nombre / Razón Social</label>
                <input
                  type="text"
                  name="nombres_razon_social"
                  value={form.nombres_razon_social}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                />
              </div>
              {error && <p className="text-body-sm text-error font-medium bg-error-container px-3 py-2 rounded">{error}</p>}
            </div>

            <div className="p-card_gap border-t border-outline-variant flex gap-card_gap">
              <button onClick={onClose} className="flex-1 px-4 py-[7px] border border-outline-variant rounded-lg text-body-md font-bold text-on-surface hover:bg-surface-container transition-colors">
                Cancelar
              </button>
              <button onClick={handleGuardar} disabled={guardando} className="flex-1 px-4 py-[7px] bg-secondary text-on-secondary rounded-lg text-body-md font-bold shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                <Save className="w-4 h-4" /> {guardando ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
