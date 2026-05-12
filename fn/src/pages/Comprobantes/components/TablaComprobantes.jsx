import FilaComprobante from "./FilaComprobante";

export default function TablaComprobantes({ comprobantes, onVerDetalle }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Fecha y Hora</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Tipo</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Serie</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Número</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Cliente</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Vendedor</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Total</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
            {comprobantes.length > 0 ? (
              comprobantes.map((comp) => (
                <FilaComprobante key={comp.id} item={comp} onVerDetalle={onVerDetalle} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-12 text-center text-outline italic text-body-sm">
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
