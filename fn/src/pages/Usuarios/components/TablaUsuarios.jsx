import { Edit3, Shield, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TablaUsuarios({ usuarios, onEditar }) {
  const { isAdmin: esAdminActual } = useAuth();
  const columnas = esAdminActual ? 5 : 4;
  if (!usuarios.length) {
    return (
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Usuario</th>
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Empleado</th>
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Cargo</th>
                <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">DNI</th>
                {esAdminActual && <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
              <tr>
                <td colSpan={columnas} className="py-12 text-center text-outline italic text-body-sm">
                  No se encontraron usuarios con la búsqueda actual.
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
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Usuario</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Empleado</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">Cargo</th>
              <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase">DNI</th>
              {esAdminActual && <th className="text-[10px] font-bold tracking-wider text-on-surface-variant py-3 px-4 uppercase text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-body-sm text-on-surface divide-y divide-surface-container">
          {usuarios.map((u) => {
            const nombreCompleto = `${u.nombres} ${u.apellidos}`;
            const esAdmin = u.es_admin;
            return (
              <tr key={u.id_usuario} className="hover:bg-surface-container/50 transition-colors group">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-label-caps ${esAdmin ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'}`}>
                      {esAdmin ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </span>
                    <span className={`text-body-sm font-semibold ${esAdmin ? 'text-secondary' : 'text-on-surface group-hover:text-secondary'} transition-colors`}>
                      {u.username}
                    </span>
                    {esAdmin && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">ADMIN</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-body-sm text-on-surface font-medium">
                    {nombreCompleto}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-label-caps font-semibold text-primary-container">
                    {u.nombre_cargo}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-label-caps font-semibold text-primary-container">
                    {u.dni}
                  </span>
                </td>
                {esAdminActual && (
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
