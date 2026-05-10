import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { productosService } from "../../../services/api";

const UNIDADES_DISPONIBLES = [
  { id: "UND", nombre: "Unidad", dbNames: ["Unidad"], factorDefault: "1" },
  { id: "BLI", nombre: "Blíster", dbNames: ["Blíster x10", "Blíster x12"], factorDefault: "10" },
  { id: "CJA", nombre: "Caja", dbNames: ["Caja x100"], factorDefault: "100" },
  { id: "FRA", nombre: "Frasco", dbNames: ["Frasco"], factorDefault: "1" },
];

export default function DrawerEditarProducto({ abierto, onClose, producto, categorias, laboratorios, onGuardado }) {
  const [form, setForm] = useState({
    nombre_comercial: "",
    principio_activo: "",
    laboratorio: "",
    categoria: "",
    presentacion: "",
    stock_actual: 0,
    stock_minimo: 0,
  });
  const [unidades, setUnidades] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (producto) {
      setForm({
        nombre_comercial: producto.nombre_comercial || "",
        principio_activo: producto.principio_activo || "",
        laboratorio: producto.laboratorio || "",
        categoria: producto.categoria || "",
        presentacion: producto.presentacion || "",
        stock_actual: producto.stock_actual || 0,
        stock_minimo: producto.stock_minimo || 0,
      });

      const preciosMap = {};
      UNIDADES_DISPONIBLES.forEach(u => {
        const existente = (producto.precios || []).find(p =>
          u.dbNames.some(dbName => p.nombre_unidad?.toLowerCase() === dbName.toLowerCase())
        );
        preciosMap[u.id] = {
          activo: !!existente,
          precio: existente ? String(existente.precio_venta || "") : "",
          factor: existente ? String(existente.factor || existente.cantidad_equivalente || u.factorDefault) : u.factorDefault,
        };
      });
      setUnidades(preciosMap);
      setError("");
    }
  }, [producto]);

  if (!abierto || !producto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleUnidad = (id) =>
    setUnidades(prev => ({ ...prev, [id]: { ...prev[id], activo: !prev[id].activo } }));

  const handleUpdateUnidad = (id, campo, valor) =>
    setUnidades(prev => ({ ...prev, [id]: { ...prev[id], [campo]: valor } }));

  const handleGuardar = async () => {
    setError("");
    if (!form.nombre_comercial || !form.categoria) {
      setError("Nombre Comercial y Categoría son obligatorios.");
      return;
    }

    const preciosActivos = UNIDADES_DISPONIBLES
      .filter(u => unidades[u.id]?.activo && unidades[u.id]?.precio)
      .map(u => ({
        nombre_unidad: u.dbNames[0],
        cantidad_equivalente: parseInt(unidades[u.id].factor) || 1,
        precio_venta: parseFloat(unidades[u.id].precio),
      }));

    setGuardando(true);
    try {
      await productosService.actualizar(producto.id_producto, {
        nombre_comercial: form.nombre_comercial,
        principio_activo: form.principio_activo,
        laboratorio: form.laboratorio,
        categoria: form.categoria,
        presentacion: form.presentacion,
        stock_actual: parseInt(form.stock_actual) || 0,
        stock_minimo: parseInt(form.stock_minimo) || 0,
        precios: preciosActivos,
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Principio Activo</label>
                <input type="text" name="principio_activo" value={form.principio_activo} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Laboratorio</label>
                  <select name="laboratorio" value={form.laboratorio} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer">
                    <option value="">Seleccionar...</option>
                    {(laboratorios || []).filter(l => l !== "Todos").map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Categoría</label>
                  <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer">
                    {(categorias || []).filter(c => c !== "Todas").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Presentación</label>
                <input type="text" name="presentacion" value={form.presentacion} onChange={handleChange} placeholder="Ej. Caja x 100" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
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

              {/* Unidades de Venta */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div>
                  <h3 className="text-xs font-black text-[#895202] uppercase tracking-tighter">Unidades de Venta</h3>
                  <p className="text-[10px] text-gray-400 font-medium italic">Actualice las presentaciones y precios</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {UNIDADES_DISPONIBLES.map((uni) => {
                    const config = unidades[uni.id] || { activo: false, precio: "", factor: uni.factorDefault };
                    return (
                      <div key={uni.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${config.activo ? 'bg-orange-50/30 border-orange-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
                        <label className="relative flex items-center cursor-pointer">
                          <input type="checkbox" checked={config.activo} onChange={() => toggleUnidad(uni.id)} className="sr-only peer" />
                          <div className="w-6 h-6 bg-white border-2 border-gray-200 rounded-lg peer-checked:bg-[#895202] peer-checked:border-[#895202] transition-all flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                        </label>
                        <div className="flex-1">
                          <span className={`text-sm font-bold ${config.activo ? 'text-[#2C2420]' : 'text-gray-400'}`}>{uni.nombre}</span>
                        </div>
                        <div className={`flex items-center gap-3 transition-all duration-300 ${config.activo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          <div className="flex flex-col gap-1 w-24">
                            <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Contenido</label>
                            <input type="number" value={config.factor} disabled={uni.id === 'UND'} onChange={(e) => handleUpdateUnidad(uni.id, 'factor', e.target.value)} className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 focus:ring-4 focus:ring-orange-50 outline-none transition-all disabled:bg-gray-50" />
                          </div>
                          <div className="flex flex-col gap-1 w-32">
                            <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Precio Venta</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#895202] text-[10px] font-black">S/.</span>
                              <input type="number" placeholder="0.00" value={config.precio} onChange={(e) => handleUpdateUnidad(uni.id, 'precio', e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-[#895202] focus:ring-4 focus:ring-orange-100 outline-none transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
