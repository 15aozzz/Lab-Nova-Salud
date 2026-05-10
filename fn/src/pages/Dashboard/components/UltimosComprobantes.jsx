export default function UltimosComprobantes({ comprobantes }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-[#2C2420] mb-8">Últimos comprobantes</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-4">
              <th className="pb-6">Fecha</th>
              <th className="pb-6">Tipo</th>
              <th className="pb-6">Número</th>
              <th className="pb-6">Cliente</th>
              <th className="pb-6">Vendedor</th>
              <th className="pb-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {comprobantes.map((item) => (
              <tr key={item.id} className="text-sm hover:bg-gray-50 transition-colors">
                <td className="py-6 text-gray-500">{item.fecha}</td>
                <td className="py-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded text-[10px] font-bold ${
                    item.tipo === 'FACTURA' 
                      ? 'bg-[#2C2420] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.tipo}
                  </span>
                </td>
                <td className="py-6 font-medium text-gray-700">{item.numero}</td>
                <td className="py-6 text-gray-700">{item.cliente}</td>
                <td className="py-6 text-gray-500">{item.vendedor}</td>
                <td className="py-6 text-right font-bold text-[#2C2420]">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
