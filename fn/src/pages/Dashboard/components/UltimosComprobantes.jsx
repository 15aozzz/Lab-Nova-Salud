export default function UltimosComprobantes({ comprobantes }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
      <h3 className="text-h2 font-semibold tracking-tight text-primary-container px-4 pt-4 pb-2">Últimos comprobantes</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Fecha</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Tipo</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Número</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Cliente</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Vendedor</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
            {comprobantes.length > 0 ? (
              comprobantes.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 text-on-surface-variant">{item.fecha}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.tipo === 'FACTURA' 
                        ? 'bg-primary-fixed text-on-primary-fixed' 
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-on-surface">{item.numero}</td>
                  <td className="py-3 px-4 text-on-surface">{item.cliente}</td>
                  <td className="py-3 px-4 text-on-surface-variant">{item.vendedor}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">{item.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center text-outline italic text-body-sm">
                  No hay comprobantes recientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
