import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginador({ actual, totalResultados, itemsPorPagina, onCambioPagina }) {
  const paginas = Math.ceil(totalResultados / itemsPorPagina) || 1;

  const numerosPagina = [];
  for (let i = 1; i <= paginas; i++) {
    numerosPagina.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-1">
      <p className="text-body-md text-on-surface-variant font-medium">
        Mostrando <span className="text-on-surface font-bold">{totalResultados === 0 ? 0 : (actual - 1) * itemsPorPagina + 1}</span> a{" "}
        <span className="text-on-surface font-bold">{Math.min(actual * itemsPorPagina, totalResultados)}</span> de{" "}
        <span className="text-on-surface font-bold">{totalResultados}</span> resultados
      </p>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onCambioPagina(Math.max(1, actual - 1))}
          disabled={actual === 1}
          className="p-2 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {numerosPagina.map(n => (
          <button
            key={n}
            onClick={() => onCambioPagina(n)}
            className={`w-8 h-8 flex items-center justify-center rounded text-body-md font-bold transition-colors ${
              actual === n 
                ? 'bg-secondary text-on-secondary shadow-sm' 
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            {n}
          </button>
        ))}

        <button 
          onClick={() => onCambioPagina(Math.min(paginas, actual + 1))}
          disabled={actual === paginas}
          className="p-2 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
