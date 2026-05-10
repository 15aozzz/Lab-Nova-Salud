import { useNavigate } from "react-router-dom";

export default function AlertasProductos({ alertas }) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant shadow-[0_4px_12px_rgba(22,15,12,0.02)] h-full">
      <h3 className="text-h2 font-semibold tracking-tight text-primary-container mb-6">Alertas de productos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
              <th className="pb-4 font-medium">Producto</th>
              <th className="pb-4 font-medium">Stock</th>
              <th className="pb-4 text-center font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {alertas.map((alerta) => (
              <tr key={alerta.id} className="text-body-md hover:bg-surface-container-low transition-colors">
                <td className="py-4 text-primary-container font-medium">{alerta.producto}</td>
                <td className="py-4">
                  <span className={alerta.tipo === 'error' ? 'text-error font-semibold' : 'text-primary-container'}>
                    {alerta.stock}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    alerta.tipo === 'error' 
                      ? 'bg-error-container text-on-error-container' 
                      : 'bg-secondary-fixed text-on-secondary-fixed'
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
        className="mt-6 text-[11px] font-bold text-secondary hover:underline"
      >
        Ver todas las alertas
      </button>
    </div>
  );
}
