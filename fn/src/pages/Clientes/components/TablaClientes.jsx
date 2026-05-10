import { Edit3, Pin } from "lucide-react";

const TIPO_BADGE = (doc) => {
  if (!doc) return { label: "OTROS", color: "bg-gray-100 text-gray-500" };
  if (doc === "00000000000") return { label: "OTROS", color: "bg-gray-100 text-gray-500" };
  if (doc.length === 8) return { label: "DNI", color: "bg-amber-100 text-amber-700" };
  if (doc.length === 11) return { label: "RUC", color: "bg-blue-100 text-blue-700" };
  return { label: "OTROS", color: "bg-gray-100 text-gray-500" };
};

export default function TablaClientes({ clientes, onEditar }) {
  if (!clientes.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">N° Documento</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipo</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre / Razón Social</th>
              <th className="py-4 px-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
        </table>
        <div className="py-20 text-center">
          <p className="text-sm text-gray-400 italic">No se encontraron clientes con la búsqueda actual.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">N° Documento</th>
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipo</th>
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre / Razón Social</th>
            <th className="py-4 px-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {clientes.map((c) => {
            const badge = TIPO_BADGE(c.numero_documento);
            const esConsumidorFinal = c.numero_documento === "00000000000";
            return (
              <tr key={c.id_cliente} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {esConsumidorFinal && <Pin className="w-3 h-3 text-[#895202]" />}
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {c.numero_documento}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-sm font-bold ${esConsumidorFinal ? 'text-gray-400 italic' : 'text-[#2C2420] group-hover:text-[#895202]'} transition-colors`}>
                    {c.nombres_razon_social}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  {!esConsumidorFinal && (
                    <button
                      onClick={() => onEditar(c)}
                      className="p-2 hover:bg-orange-50 text-gray-300 hover:text-[#895202] rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
