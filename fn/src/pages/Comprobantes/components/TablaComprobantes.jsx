import FilaComprobante from "./FilaComprobante";

export default function TablaComprobantes({ comprobantes }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8F6F4] text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="px-6 py-4">Fecha y Hora</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4 text-center">Serie</th>
              <th className="px-6 py-4 text-center">Número</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Vendedor</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {comprobantes.length > 0 ? (
              comprobantes.map((comp) => (
                <FilaComprobante key={comp.id} item={comp} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-20 text-center text-gray-300 italic text-sm">
                  No se encontraron comprobantes para los filtros aplicados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
