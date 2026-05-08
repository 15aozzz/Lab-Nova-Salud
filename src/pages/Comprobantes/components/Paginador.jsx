import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginador({ actual, totalResultados, itemsPorPagina, onCambioPagina }) {
  const paginas = Math.ceil(totalResultados / itemsPorPagina) || 1;

  // Generar array de números de página
  const numerosPagina = [];
  for (let i = 1; i <= paginas; i++) {
    numerosPagina.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-2">
      <p className="text-sm text-gray-500 font-medium">
        Mostrando <span className="text-gray-800">{totalResultados === 0 ? 0 : (actual - 1) * itemsPorPagina + 1}</span> a{" "}
        <span className="text-gray-800">{Math.min(actual * itemsPorPagina, totalResultados)}</span> de{" "}
        <span className="text-gray-800">{totalResultados}</span> resultados
      </p>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onCambioPagina(Math.max(1, actual - 1))}
          disabled={actual === 1}
          className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {numerosPagina.map(n => (
          <button
            key={n}
            onClick={() => onCambioPagina(n)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
              actual === n 
                ? 'bg-[#895202] text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {n}
          </button>
        ))}

        <button 
          onClick={() => onCambioPagina(Math.min(paginas, actual + 1))}
          disabled={actual === paginas}
          className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

