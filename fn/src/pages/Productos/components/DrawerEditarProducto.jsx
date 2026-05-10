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
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col">
            <div className="p-card_gap border-b border-outline-variant flex items-center justify-between">
              <div>
                <h2 className="text-h2 font-semibold tracking-tight text-primary-container">Editar Producto</h2>
                <p className="text-body-sm text-on-surface-variant font-medium mt-1">{producto.codigo} — {producto.nombre_comercial}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-card_gap space-y-card_gap">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-primary-container">Nombre Comercial</label>
                <input type="text" name="nombre_comercial" value={form.nombre_comercial} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-primary-container">Principio Activo</label>
                <input type="text" name="principio_activo" value={form.principio_activo} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-card_gap">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-wider text-primary-container">Laboratorio</label>
                  <select name="laboratorio" value={form.laboratorio} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer">
                    <option value="">Seleccionar...</option>
                    {(laboratorios || []).filter(l => l !== "Todos").map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-wider text-primary-container">Categoría</label>
                  <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer">
                    {(categorias || []).filter(c => c !== "Todas").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-primary-container">Presentación</label>
                <input type="text" name="presentacion" value={form.presentacion} onChange={handleChange} placeholder="Ej. Caja x 100" className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-card_gap">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-wider text-primary-container">Stock Actual</label>
                  <input type="number" name="stock_actual" value={form.stock_actual} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-wider text-primary-container">Stock Mínimo</label>
                  <input type="number" name="stock_minimo" value={form.stock_minimo} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none" />
                </div>
              </div>

              <div className="space-y-card_gap pt-card_gap border-t border-outline-variant">
                <div>
                  <h3 className="text-[11px] font-bold tracking-wider text-secondary">Unidades de Venta</h3>
                  <p className="text-label-caps text-on-surface-variant font-medium italic">Actualice las presentaciones y precios</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {UNIDADES_DISPONIBLES.map((uni) => {
                    const config = unidades[uni.id] || { activo: false, precio: "", factor: uni.factorDefault };
                    return (
                      <div key={uni.id} className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${config.activo ? 'bg-secondary-fixed/30 border-secondary-fixed-dim shadow-sm' : 'bg-surface-container/50 border-outline-variant opacity-60'}`}>
                        <label className="relative flex items-center cursor-pointer">
                          <input type="checkbox" checked={config.activo} onChange={() => toggleUnidad(uni.id)} className="sr-only peer" />
                          <div className="w-5 h-5 bg-surface-container-lowest border-2 border-outline-variant rounded peer-checked:bg-secondary peer-checked:border-secondary transition-all flex items-center justify-center">
                            <div className="w-2 h-2 bg-surface-container-lowest rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                        </label>
                        <div className="flex-1">
                          <span className={`text-body-md font-bold ${config.activo ? 'text-primary-container' : 'text-on-surface-variant'}`}>{uni.nombre}</span>
                        </div>
                        <div className={`flex items-center gap-3 transition-all duration-300 ${config.activo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          <div className="flex flex-col gap-1 w-24">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-1">Contenido</label>
                            <input type="number" value={config.factor} disabled={uni.id === 'UND'} onChange={(e) => handleUpdateUnidad(uni.id, 'factor', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-1.5 text-label-caps font-bold text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all disabled:bg-surface-container" />
                          </div>
                          <div className="flex flex-col gap-1 w-32">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-1">Precio Venta</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[10px] font-bold">S/.</span>
                              <input type="number" placeholder="0.00" value={config.precio} onChange={(e) => handleUpdateUnidad(uni.id, 'precio', e.target.value)} className="w-full bg-surface-container-lowest border border-secondary rounded pl-8 pr-3 py-1.5 text-label-caps font-bold text-secondary focus:ring-1 focus:ring-secondary outline-none transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
