export default function UltimosComprobantes({ comprobantes }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)]">
      <h3 className="text-h2 font-semibold tracking-tight text-primary-container mb-6">Últimos comprobantes</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase border-b border-surface-container">
              <th className="pb-4 font-medium">Fecha</th>
              <th className="pb-4 font-medium">Tipo</th>
              <th className="pb-4 font-medium">Número</th>
              <th className="pb-4 font-medium">Cliente</th>
              <th className="pb-4 font-medium">Vendedor</th>
              <th className="pb-4 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {comprobantes.map((item) => (
              <tr key={item.id} className="text-body-md hover:bg-surface-container-low transition-colors">
                <td className="py-4 text-on-surface-variant">{item.fecha}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    item.tipo === 'FACTURA' 
                      ? 'bg-primary-fixed text-on-primary-fixed' 
                      : 'bg-secondary-fixed text-on-secondary-fixed'
                  }`}>
                    {item.tipo}
                  </span>
                </td>
                <td className="py-4 font-medium text-on-surface">{item.numero}</td>
                <td className="py-4 text-on-surface">{item.cliente}</td>
                <td className="py-4 text-on-surface-variant">{item.vendedor}</td>
                <td className="py-4 text-right font-semibold text-primary">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
