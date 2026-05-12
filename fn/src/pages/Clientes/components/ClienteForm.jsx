import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { clientesService } from "@/services/api";

export default function ClienteForm({ abierto, cliente, onClose, onGuardado }) {
  const esEdicion = !!cliente;
  const [form, setForm] = useState({ numero_documento: "", nombres_razon_social: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (abierto) {
      if (esEdicion) {
        setForm({
          numero_documento: cliente.numero_documento || "",
          nombres_razon_social: cliente.nombres_razon_social || "",
        });
      } else {
        setForm({ numero_documento: "", nombres_razon_social: "" });
      }
      setError("");
    }
  }, [abierto, esEdicion, cliente]);

  if (!abierto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.numero_documento || !form.nombres_razon_social) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.numero_documento.length !== 8 && form.numero_documento.length !== 11) {
      setError("El documento debe tener 8 dígitos (DNI) u 11 dígitos (RUC).");
      return;
    }
    setGuardando(true);
    try {
      if (esEdicion) {
        await clientesService.actualizar(cliente.id_cliente, form);
      } else {
        await clientesService.crear(form);
      }
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || `Error al ${esEdicion ? "actualizar" : "guardar"} el cliente.`);
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
            <h2 className="text-h2 font-semibold tracking-tight text-primary-container">
              {esEdicion ? "Editar Cliente" : "Nuevo Cliente"}
            </h2>
            <p className="text-body-sm text-on-surface-variant font-medium">
              {esEdicion ? cliente.numero_documento : "Registra un nuevo cliente o empresa"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-card_gap space-y-card_gap">
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">N° Documento (DNI / RUC)</label>
            <input
              name="numero_documento"
              value={form.numero_documento}
              onChange={handleChange}
              maxLength={11}
              placeholder="Ej. 12345678 o 20123456789"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">Nombre / Razón Social</label>
            <input
              name="nombres_razon_social"
              value={form.nombres_razon_social}
              onChange={handleChange}
              placeholder="Ej. Juan Carlos Pérez López"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          {error && <p className="text-body-sm text-error font-medium bg-error-container px-3 py-2 rounded">{error}</p>}
        </div>

        <div className="px-card_gap pb-card_gap flex gap-card_gap">
          <button onClick={onClose} className="flex-1 py-[7px] text-body-md font-bold text-on-surface-variant hover:text-on-surface transition-colors rounded-lg">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando} className="flex-[2] bg-secondary text-on-secondary py-[7px] rounded-lg text-body-md font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : esEdicion ? "Guardar Cambios" : "Guardar Cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
