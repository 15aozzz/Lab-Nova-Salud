import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { productosService } from "../../../services/api";

export default function DrawerEditarProducto({ abierto, onClose, producto, categorias, onGuardado }) {
  const [form, setForm] = useState({ nombre_comercial: "", stock_actual: 0, stock_minimo: 0, categoria: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (producto) {
      setForm({
        nombre_comercial: producto.nombre_comercial || "",
        stock_actual: producto.stock_actual || 0,
        stock_minimo: producto.stock_minimo || 0,
        categoria: producto.categoria || "",
      });
      setError("");
    }
  }, [producto]);

  if (!abierto || !producto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    setError("");
    if (!form.nombre_comercial || !form.categoria) {
      setError("Nombre Comercial y Categoría son obligatorios.");
      return;
    }
    setGuardando(true);
    try {
      await productosService.actualizar(producto.id_producto, {
        nombre_comercial: form.nombre_comercial,
        stock_actual: parseInt(form.stock_actual) || 0,
        stock_minimo: parseInt(form.stock_minimo) || 0,
        categoria: form.categoria,
      });
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#2C2420]">Editar Producto</h2>
                <p className="text-xs text-gray-400 font-medium mt-1">{producto.codigo} — {producto.nombre_comercial}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Formulario */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre Comercial</label>
                <input type="text" name="nombre_comercial" value={form.nombre_comercial} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Actual</label>
                  <input type="number" name="stock_actual" value={form.stock_actual} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Mínimo</label>
                  <input type="number" name="stock_minimo" value={form.stock_minimo} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer">
                  {(categorias || []).filter(c => c !== "Todas").map(c => <option key={c}>{c}</option>)}
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
