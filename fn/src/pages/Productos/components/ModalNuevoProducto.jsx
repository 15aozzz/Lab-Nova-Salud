import { X, Save } from "lucide-react";
import { useState } from "react";
import { productosService } from "../../../services/api";

const Campo = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-bold tracking-wider text-primary-container ml-0.5">{label}</label>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
  />
);

const UNIDADES_DISPONIBLES = [
  { id: "CJA", nombre: "Caja", factorDefault: "100" },
  { id: "BLI", nombre: "Blíster", factorDefault: "10" },
  { id: "FRA", nombre: "Frasco", factorDefault: "1" },
  { id: "UND", nombre: "Unidad", factorDefault: "1" },
];

const estadoInicial = {
  nombre_comercial: "",
  principio_activo: "",
  laboratorio: "",
  categoria: "",
  presentacion: "",
  stock_inicial: "0",
  stock_minimo: "10",
};

export default function ModalNuevoProducto({ abierto, onClose, categorias, laboratorios, onGuardado }) {
  const [form, setForm] = useState(estadoInicial);
  const [unidades, setUnidades] = useState({
    CJA: { activo: false, precio: "", factor: "100" },
    BLI: { activo: false, precio: "", factor: "10" },
    FRA: { activo: false, precio: "", factor: "1" },
    UND: { activo: true, precio: "", factor: "1" },
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  if (!abierto) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleUnidad = (id) =>
    setUnidades(prev => ({ ...prev, [id]: { ...prev[id], activo: !prev[id].activo } }));

  const handleUpdateUnidad = (id, campo, valor) =>
    setUnidades(prev => ({ ...prev, [id]: { ...prev[id], [campo]: valor } }));

  const handleGuardar = async () => {
    setError("");
    const preciosActivos = UNIDADES_DISPONIBLES
      .filter(u => unidades[u.id].activo && unidades[u.id].precio)
      .map(u => ({
        nombre_unidad: u.nombre,
        factor: parseInt(unidades[u.id].factor) || 1,
        precio_venta: parseFloat(unidades[u.id].precio),
      }));

    if (!form.nombre_comercial || !form.laboratorio || !form.categoria) {
      setError("Completa Nombre Comercial, Laboratorio y Categoría.");
      return;
    }
    if (!preciosActivos.length) {
      setError("Activa al menos una unidad de venta con precio.");
      return;
    }

    setGuardando(true);
    try {
      await productosService.crear({
        ...form,
        stock_inicial: parseInt(form.stock_inicial) || 0,
        stock_minimo: parseInt(form.stock_minimo) || 0,
        precios: preciosActivos,
      });
      setForm(estadoInicial);
      setUnidades({ CJA: { activo: false, precio: "", factor: "100" }, BLI: { activo: false, precio: "", factor: "10" }, FRA: { activo: false, precio: "", factor: "1" }, UND: { activo: true, precio: "", factor: "1" } });
      onGuardado?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary-container/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

        <div className="px-card_gap py-card_gap border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest sticky top-0 z-10">
          <div>
            <h2 className="text-h2 font-semibold tracking-tight text-primary-container">Nuevo Producto</h2>
            <p className="text-body-sm text-on-surface-variant font-medium">Registro de medicamentos e insumos</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-card_gap space-y-card_gap overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-card_gap">
            <div className="md:col-span-2">
              <Campo label="Nombre Comercial">
                <Input name="nombre_comercial" value={form.nombre_comercial} onChange={handleChange} placeholder="Ej. Panadol Extra Fuerte" />
              </Campo>
            </div>
            <Campo label="Principio Activo">
              <Input name="principio_activo" value={form.principio_activo} onChange={handleChange} placeholder="Ej. Paracetamol + Cafeína" />
            </Campo>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-card_gap">
            <Campo label="Laboratorio">
              <select name="laboratorio" value={form.laboratorio} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer transition-all">
                <option value="">Seleccionar...</option>
                {laboratorios.filter(l => l !== "Todos").map(l => <option key={l}>{l}</option>)}
              </select>
            </Campo>
            <Campo label="Categoría">
              <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer transition-all">
                <option value="">Seleccionar...</option>
                {categorias.filter(c => c !== "Todas").map(c => <option key={c}>{c}</option>)}
              </select>
            </Campo>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-card_gap">
            <Campo label="Presentación">
              <Input name="presentacion" value={form.presentacion} onChange={handleChange} placeholder="Caja x 100" />
            </Campo>
            <Campo label="Stock Inic.">
              <Input type="number" name="stock_inicial" value={form.stock_inicial} onChange={handleChange} />
            </Campo>
            <Campo label="Stock Mín.">
              <Input type="number" name="stock_minimo" value={form.stock_minimo} onChange={handleChange} />
            </Campo>
          </div>

          <div className="space-y-card_gap pt-card_gap border-t border-outline-variant">
            <div>
              <h3 className="text-[11px] font-bold tracking-wider text-secondary">Unidades de Venta</h3>
              <p className="text-label-caps text-on-surface-variant font-medium italic">Marque las presentaciones en las que se venderá este producto</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {UNIDADES_DISPONIBLES.map((uni) => {
                const config = unidades[uni.id];
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

        <div className="p-card_gap bg-surface-container-lowest border-t border-outline-variant flex gap-card_gap sticky bottom-0 z-10">
          <button onClick={onClose} className="flex-1 py-[7px] text-body-md font-bold text-on-surface-variant hover:text-on-surface transition-colors rounded-lg">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando} className="flex-[2] bg-secondary text-on-secondary py-[7px] rounded-lg text-body-md font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </div>
    </div>
  );
}
