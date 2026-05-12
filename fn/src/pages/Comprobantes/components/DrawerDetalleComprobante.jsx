import { X, Loader2, FileText, Building2 } from "lucide-react";

export default function DrawerDetalleComprobante({ abierto, onClose, data, cargando }) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-lg bg-surface-container-lowest shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col">
            <div className="p-card_gap border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-container" />
                <div>
                  <h2 className="text-h2 font-semibold tracking-tight text-primary-container">Detalle de Comprobante</h2>
                  {data && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        data.cabecera.tipo_comprobante === 'FACTURA' 
                          ? 'bg-primary-fixed text-on-primary-fixed' 
                          : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}>
                        {data.cabecera.tipo_comprobante}
                      </span>
                      <span className="text-body-sm text-on-surface-variant font-medium">
                        {data.cabecera.serie_documento}-{data.cabecera.numero_documento}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>

            {cargando ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
              </div>
            ) : !data ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-body-md text-on-surface-variant italic">No se pudo cargar el detalle</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="p-card_gap border-b border-outline-variant space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-container" />
                    <h3 className="text-[11px] font-bold tracking-wider text-primary-container uppercase">Emisor</h3>
                  </div>
                  <p className="text-body-sm font-semibold text-on-surface">Nova Salud</p>
                </div>

                <div className="p-card_gap border-b border-outline-variant">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-primary-container">Fecha y Hora</span>
                      <p className="text-body-sm font-semibold text-on-surface mt-0.5">
                        {new Date(data.cabecera.fecha_hora).toLocaleString('es-PE', {
                          day: '2-digit', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="text-body-lg font-bold text-primary-container">
                      S/. {Number(data.cabecera.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-card_gap border-b border-outline-variant space-y-3">
                  <h3 className="text-[11px] font-bold tracking-wider text-primary-container uppercase">Cliente</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Documento</span>
                      <p className="text-body-sm font-semibold text-on-surface mt-0.5">{data.cabecera.doc_cliente}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        {data.cabecera.doc_cliente?.length === 11 ? 'Razón Social' : 'Nombre'}
                      </span>
                      <p className="text-body-sm font-semibold text-on-surface mt-0.5">{data.cabecera.cliente}</p>
                    </div>
                  </div>
                </div>

                <div className="p-card_gap border-b border-outline-variant space-y-3">
                  <h3 className="text-[11px] font-bold tracking-wider text-primary-container uppercase">Cajero</h3>
                  <p className="text-body-sm font-semibold text-on-surface">{data.cabecera.cajero}</p>
                </div>

                <div className="p-card_gap">
                  <h3 className="text-[11px] font-bold tracking-wider text-primary-container uppercase mb-3">Productos</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase border-b border-outline-variant">
                        <th className="py-2 pr-2">Producto</th>
                        <th className="py-2 px-2 text-center">Cant</th>
                        <th className="py-2 px-2 text-right">P. Unit</th>
                        <th className="py-2 pl-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant text-body-sm">
                      {data.detalle.map((item, i) => (
                        <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                          <td className="py-2 pr-2">
                            <span className="font-semibold text-on-surface">{item.nombre_comercial}</span>
                            <span className="text-label-caps text-on-surface-variant ml-1">({item.nombre_unidad})</span>
                          </td>
                          <td className="py-2 px-2 text-center text-on-surface-variant">{item.cantidad}</td>
                          <td className="py-2 px-2 text-right text-on-surface-variant">S/. {Number(item.precio_unitario).toFixed(2)}</td>
                          <td className="py-2 pl-2 text-right font-semibold text-on-surface">S/. {Number(item.subtotal).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      {(() => {
                        const total = Number(data.cabecera.total);
                        const base = total / 1.18;
                        const igv = total - base;
                        return (
                          <>
                            <tr className="border-t border-outline-variant">
                              <td colSpan="3" className="py-2 pr-2 text-right text-body-sm text-on-surface-variant">Base Imponible</td>
                              <td className="py-2 pl-2 text-right text-body-sm text-on-surface-variant">S/. {base.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan="3" className="py-2 pr-2 text-right text-body-sm text-on-surface-variant">IGV (18%)</td>
                              <td className="py-2 pl-2 text-right text-body-sm text-on-surface-variant">S/. {igv.toFixed(2)}</td>
                            </tr>
                            <tr className="border-t border-outline-variant">
                              <td colSpan="3" className="py-3 pr-2 text-right text-body-sm font-bold text-primary-container uppercase">Total</td>
                              <td className="py-3 pl-2 text-right text-body-md font-bold text-primary-container">S/. {total.toFixed(2)}</td>
                            </tr>
                          </>
                        );
                      })()}
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
