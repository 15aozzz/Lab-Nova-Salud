import { X } from "lucide-react";

export default function DrawerEditarProducto({ abierto, onClose, producto }) {
  if (!abierto || !producto) return null;

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
                <p className="text-xs text-gray-400 font-medium mt-1">{producto.codigo} — {producto.nombreComercial}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Formulario */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre Comercial</label>
                <input type="text" defaultValue={producto.nombreComercial} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Actual</label>
                  <input type="number" defaultValue={producto.stockActual} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Mínimo</label>
                  <input type="number" defaultValue={producto.stockMinimo} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <select defaultValue={producto.categoria} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer">
                  <option>Analgésicos</option>
                  <option>Antibióticos</option>
                  <option>Antihistamínicos</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex gap-4">
              <button onClick={onClose} className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button className="flex-1 px-6 py-3 bg-[#895202] text-white rounded-lg text-sm font-bold shadow-lg shadow-orange-900/10 hover:bg-[#6d4102] transition-colors">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
