import { X, Save } from "lucide-react";
import { useState } from "react";
import { clientesService } from "../../../services/api";

const estadoInicial = { numero_documento: "", nombres_razon_social: "" };

export default function ModalNuevoCliente({ abierto, onClose, onGuardado }) {
  const [form, setForm] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  if (!abierto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.numero_documento || !form.nombres_razon_social) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setGuardando(true);
    try {
      await clientesService.crear(form);
      setForm(estadoInicial);
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el cliente.");
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
            <h2 className="text-2xl font-black text-[#2C2420]">Nuevo Cliente</h2>
            <p className="text-xs text-gray-400 font-medium">Registra un nuevo cliente o empresa</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">N° Documento (DNI / RUC)</label>
            <input
              name="numero_documento"
              value={form.numero_documento}
              onChange={handleChange}
              maxLength={11}
              placeholder="Ej. 12345678 o 20123456789"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre / Razón Social</label>
            <input
              name="nombres_razon_social"
              value={form.nombres_razon_social}
              onChange={handleChange}
              placeholder="Ej. Juan Carlos Pérez López"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all"
            />
          </div>
          {error && <p className="text-xs text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-4">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors rounded-xl">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando} className="flex-[2] bg-[#895202] text-white py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-900/20 hover:bg-[#6d4102] transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar Cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
