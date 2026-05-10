import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginador({ actual, totalResultados, itemsPorPagina, onCambioPagina }) {
  const paginas = Math.ceil(totalResultados / itemsPorPagina) || 1;

  const numerosPagina = [];
  const mostrarPaginas = [];
  if (paginas <= 5) {
    for (let i = 1; i <= paginas; i++) mostrarPaginas.push(i);
  } else {
    mostrarPaginas.push(1);
    if (actual > 3) mostrarPaginas.push('...');
    for (let i = Math.max(2, actual - 1); i <= Math.min(paginas - 1, actual + 1); i++) {
      mostrarPaginas.push(i);
    }
    if (actual < paginas - 2) mostrarPaginas.push('...');
    mostrarPaginas.push(paginas);
  }

  return (
    <div className="border-t border-outline-variant bg-surface-container-lowest p-4 flex items-center justify-between">
      <span className="text-body-sm text-on-surface-variant">
        Mostrando 1 a {Math.min(itemsPorPagina, totalResultados)} de {totalResultados} resultados
      </span>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onCambioPagina(Math.max(1, actual - 1))}
          disabled={actual === 1}
          className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </button>
        
        {mostrarPaginas.map((n, i) => 
          n === '...' ? (
            <span key={`ellipsis-${i}`} className="text-on-surface-variant text-body-sm">...</span>
          ) : (
            <button
              key={n}
              onClick={() => onCambioPagina(n)}
               className={`w-8 h-8 rounded flex items-center justify-center text-body-sm transition-colors ${
                actual === n 
                  ? 'bg-secondary text-surface-container-lowest font-medium' 
                  : 'border border-outline-variant text-on-surface hover:bg-surface-container'
              }`}
            >
              {n}
            </button>
          )
        )}

        <button 
          onClick={() => onCambioPagina(Math.min(paginas, actual + 1))}
          disabled={actual === paginas}
          className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}

