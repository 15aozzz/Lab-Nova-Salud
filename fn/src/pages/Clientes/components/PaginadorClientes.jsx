import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginadorClientes({ actual, totalResultados, itemsPorPagina, onCambioPagina }) {
  const totalPaginas = Math.ceil(totalResultados / itemsPorPagina);
  if (totalPaginas <= 1) return null;

  const inicio = (actual - 1) * itemsPorPagina + 1;
  const fin = Math.min(actual * itemsPorPagina, totalResultados);

  return (
    <div className="flex items-center justify-between py-2 px-1">
      <p className="text-body-md text-on-surface-variant">
        Mostrando <span className="font-bold text-on-surface">{inicio}</span> a{" "}
        <span className="font-bold text-on-surface">{fin}</span> de{" "}
        <span className="font-bold text-on-surface">{totalResultados}</span> clientes
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCambioPagina(actual - 1)}
          disabled={actual === 1}
          className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPaginas || Math.abs(p - actual) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
            acc.push(p);
            return acc;
          }, [])
          .map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-1 text-on-surface-variant text-body-md">...</span>
            ) : (
              <button
                key={p}
                onClick={() => onCambioPagina(p)}
                className={`w-8 h-8 rounded text-body-md font-bold transition-all ${
                  p === actual
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {p}
              </button>
            )
          )}
        <button
          onClick={() => onCambioPagina(actual + 1)}
          disabled={actual === totalPaginas}
          className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
