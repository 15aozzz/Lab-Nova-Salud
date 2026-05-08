import { Briefcase } from "lucide-react";

export default function ResumenVenta({ totales }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-8">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-4">
        Resumen
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-400">OP. GRAVADAS</span>
          <span className="text-gray-600">S/. {totales.gravadas}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-400">OP. INAFECTAS</span>
          <span className="text-gray-600">S/. {totales.inafectas}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-gray-50 pt-4">
          <span className="text-gray-400 uppercase">Subtotal</span>
          <span className="text-gray-700 font-bold">S/. {totales.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-400 uppercase">IGV (18%)</span>
          <span className="text-gray-600">S/. {totales.igv}</span>
        </div>

        <div className="flex justify-between items-baseline pt-6 border-t-2 border-dashed border-gray-100">
          <span className="text-lg font-bold text-[#2C2420]">TOTAL</span>
          <span className="text-2xl font-bold text-[#a16207]">S/. {totales.total}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button className="bg-[#a16207] hover:bg-[#854d0e] text-white py-4 rounded-lg font-bold text-lg uppercase tracking-widest shadow-xl shadow-orange-900/20 transition-all active:scale-95">
          Vender
        </button>
        <button className="py-3 rounded-lg font-bold text-red-400 hover:bg-red-50 transition-colors uppercase text-xs tracking-widest bg-red-50/30">
          Cancelar
        </button>
      </div>
    </div>
  );
}
