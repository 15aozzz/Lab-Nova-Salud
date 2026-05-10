import { X, Save } from "lucide-react";
import { useState } from "react";
import { productosService } from "../../../services/api";

const Campo = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none focus:border-[#895202] transition-all"
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
      <div className="absolute inset-0 bg-[#2C2420]/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-[#2C2420]">Nuevo Producto</h2>
            <p className="text-xs text-gray-400 font-medium">Registro de medicamentos e insumos</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-8 space-y-8 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Campo label="Nombre Comercial" >
              <div className="md:col-span-2">
                <Input name="nombre_comercial" value={form.nombre_comercial} onChange={handleChange} placeholder="Ej. Panadol Extra Fuerte" />
              </div>
            </Campo>
            <Campo label="Principio Activo">
              <Input name="principio_activo" value={form.principio_activo} onChange={handleChange} placeholder="Ej. Paracetamol + Cafeína" />
            </Campo>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Campo label="Laboratorio">
              <select name="laboratorio" value={form.laboratorio} onChange={handleChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none cursor-pointer transition-all">
                <option value="">Seleccionar...</option>
                {laboratorios.filter(l => l !== "Todos").map(l => <option key={l}>{l}</option>)}
              </select>
            </Campo>
            <Campo label="Categoría">
              <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-4 focus:ring-orange-50 outline-none cursor-pointer transition-all">
                <option value="">Seleccionar...</option>
                {categorias.filter(c => c !== "Todas").map(c => <option key={c}>{c}</option>)}
              </select>
            </Campo>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          {/* Precios */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <div>
              <h3 className="text-xs font-black text-[#895202] uppercase tracking-tighter">Unidades de Venta</h3>
              <p className="text-[10px] text-gray-400 font-medium italic">Marque las presentaciones en las que se venderá este producto</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {UNIDADES_DISPONIBLES.map((uni) => {
                const config = unidades[uni.id];
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
        <div className="p-8 bg-white border-t border-gray-100 flex gap-4 sticky bottom-0 z-10">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors rounded-xl">
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={guardando} className="flex-[2] bg-[#895202] text-white py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-900/20 hover:bg-[#6d4102] transition-all active:scale-95 disabled:opacity-60">
            <Save className="w-5 h-5" /> {guardando ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </div>
    </div>
  );
}
