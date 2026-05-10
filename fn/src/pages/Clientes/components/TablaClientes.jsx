import { Edit3, Pin } from "lucide-react";

const TIPO_BADGE = (doc) => {
  if (!doc) return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
  if (doc === "00000000000") return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
  if (doc.length === 8) return { label: "DNI", color: "bg-secondary-fixed text-on-secondary-fixed" };
  if (doc.length === 11) return { label: "RUC", color: "bg-primary-fixed text-on-primary-fixed" };
  return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
};

export default function TablaClientes({ clientes, onEditar }) {
  if (!clientes.length) {
    return (
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">N° Documento</th>
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Tipo</th>
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Nombre / Razón Social</th>
              <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Acciones</th>
            </tr>
          </thead>
        </table>
        <div className="py-20 text-center">
          <p className="text-body-md text-on-surface-variant italic">No se encontraron clientes con la búsqueda actual.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">N° Documento</th>
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Tipo</th>
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Nombre / Razón Social</th>
            <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {clientes.map((c) => {
            const badge = TIPO_BADGE(c.numero_documento);
            const esConsumidorFinal = c.numero_documento === "00000000000";
            return (
              <tr key={c.id_cliente} className="hover:bg-surface-container/50 transition-colors group">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {esConsumidorFinal && <Pin className="w-3 h-3 text-secondary" />}
                    <span className="text-label-caps font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-sm">
                      {c.numero_documento}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-label-caps font-bold px-2 py-1 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-body-md font-bold ${esConsumidorFinal ? 'text-on-surface-variant italic' : 'text-on-surface group-hover:text-secondary'} transition-colors`}>
                    {c.nombres_razon_social}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {!esConsumidorFinal && (
                    <button
                      onClick={() => onEditar(c)}
                      className="p-2 hover:bg-secondary-fixed text-on-surface-variant hover:text-secondary rounded-lg transition-all"
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
