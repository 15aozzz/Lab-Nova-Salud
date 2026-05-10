import { useNavigate } from "react-router-dom";

export default function AlertasProductos({ alertas }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-[#2C2420] mb-6">Alertas de productos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <th className="pb-4">Producto</th>
              <th className="pb-4">Stock</th>
              <th className="pb-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {alertas.map((alerta) => (
              <tr key={alerta.id} className="text-sm">
                <td className="py-4 text-[#2C2420] font-medium">{alerta.producto}</td>
                <td className="py-4">
                  <span className={alerta.tipo === 'error' ? 'text-red-600 font-bold' : 'text-[#2C2420]'}>
                    {alerta.stock}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    alerta.tipo === 'error' 
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {alerta.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={() => navigate("/productos")}
        className="mt-6 text-sm font-bold text-[#a16207] hover:underline"
      >
        Ver todas las alertas
      </button>
    </div>
  );
}
