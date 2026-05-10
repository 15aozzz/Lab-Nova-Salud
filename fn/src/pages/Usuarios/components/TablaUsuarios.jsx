import { Edit3, Shield, User } from "lucide-react";

export default function TablaUsuarios({ usuarios, onEditar }) {
  if (!usuarios.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuario</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Empleado</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Cargo</th>
              <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">DNI</th>
              <th className="py-4 px-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
        </table>
        <div className="py-20 text-center">
          <p className="text-sm text-gray-400 italic">No se encontraron usuarios con la búsqueda actual.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuario</th>
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Empleado</th>
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Cargo</th>
            <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">DNI</th>
            <th className="py-4 px-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {usuarios.map((u) => {
            const nombreCompleto = `${u.nombres} ${u.apellidos}`;
            const esAdmin = u.es_admin;
            return (
              <tr key={u.id_usuario} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${esAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {esAdmin ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </span>
                    <span className={`text-sm font-bold ${esAdmin ? 'text-purple-700' : 'text-[#2C2420] group-hover:text-[#895202]'} transition-colors`}>
                      {u.username}
                    </span>
                    {esAdmin && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">ADMIN</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-bold text-[#2C2420]">
                    {nombreCompleto}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {u.nombre_cargo}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {u.dni}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  {!esAdmin && (
                    <button
                      onClick={() => onEditar(u)}
                      className="p-2 hover:bg-orange-50 text-gray-300 hover:text-[#895202] rounded-lg transition-all"
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
