import { Edit3, Pin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TIPO_BADGE = (doc) => {
  if (!doc) return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
  if (doc === "00000000000") return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
  if (doc.length === 8) return { label: "DNI", color: "bg-secondary-fixed text-on-secondary-fixed" };
  if (doc.length === 11) return { label: "RUC", color: "bg-primary-fixed text-on-primary-fixed" };
  return { label: "OTROS", color: "bg-surface-container text-on-surface-variant" };
};

export default function TablaClientes({ clientes, onEditar }) {
  const { isAdmin } = useAuth();
  const columnas = isAdmin ? 4 : 3;
  if (!clientes.length) {
    return (
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">N° Documento</th>
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Tipo</th>
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Nombre / Razón Social</th>
                {isAdmin && <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              <tr>
                <td colSpan={columnas} className="py-12 text-center text-outline italic text-body-sm">
                  No se encontraron clientes con la búsqueda actual.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">N° Documento</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Tipo</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Nombre / Razón Social</th>
              {isAdmin && <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
          {clientes.map((c) => {
            const badge = TIPO_BADGE(c.numero_documento);
            const esConsumidorFinal = c.numero_documento === "00000000000";
            return (
              <tr key={c.id_cliente} className="hover:bg-surface-container/50 transition-colors group">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {esConsumidorFinal && <Pin className="w-3 h-3 text-secondary" />}
                    <span className="text-label-caps font-semibold text-primary-container">
                      {c.numero_documento}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-body-sm font-semibold ${esConsumidorFinal ? 'text-on-surface-variant italic' : 'text-on-surface group-hover:text-secondary'} transition-colors`}>
                    {c.nombres_razon_social}
                  </span>
                </td>
                {isAdmin && (
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
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
