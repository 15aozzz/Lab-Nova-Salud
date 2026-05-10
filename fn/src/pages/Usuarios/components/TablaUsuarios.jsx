import { Edit3, Shield, User } from "lucide-react";

export default function TablaUsuarios({ usuarios, onEditar }) {
  if (!usuarios.length) {
    return (
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Usuario</th>
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Empleado</th>
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Cargo</th>
              <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">DNI</th>
              <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Acciones</th>
            </tr>
          </thead>
        </table>
        <div className="py-20 text-center">
          <p className="text-body-md text-on-surface-variant italic">No se encontraron usuarios con la búsqueda actual.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Usuario</th>
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Empleado</th>
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Cargo</th>
            <th className="py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">DNI</th>
            <th className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {usuarios.map((u) => {
            const nombreCompleto = `${u.nombres} ${u.apellidos}`;
            const esAdmin = u.es_admin;
            return (
              <tr key={u.id_usuario} className="hover:bg-surface-container/50 transition-colors group">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-label-caps font-bold ${esAdmin ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'}`}>
                      {esAdmin ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </span>
                    <span className={`text-body-md font-bold ${esAdmin ? 'text-secondary' : 'text-on-surface group-hover:text-secondary'} transition-colors`}>
                      {u.username}
                    </span>
                    {esAdmin && (
                      <span className="text-label-caps font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">ADMIN</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-body-md font-bold text-on-surface">
                    {nombreCompleto}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-label-caps font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded-sm">
                    {u.nombre_cargo}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-label-caps font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-sm">
                    {u.dni}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {!esAdmin && (
                    <button
                      onClick={() => onEditar(u)}
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
