import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginadorUsuarios({ actual, totalResultados, itemsPorPagina, onCambioPagina }) {
  const totalPaginas = Math.ceil(totalResultados / itemsPorPagina);
  if (totalPaginas <= 1) return null;

  const inicio = (actual - 1) * itemsPorPagina + 1;
  const fin = Math.min(actual * itemsPorPagina, totalResultados);

  return (
    <div className="flex items-center justify-between py-4 px-1">
      <p className="text-sm text-gray-500">
        Mostrando <span className="font-bold text-[#2C2420]">{inicio}</span> a{" "}
        <span className="font-bold text-[#2C2420]">{fin}</span> de{" "}
        <span className="font-bold text-[#2C2420]">{totalResultados}</span> usuarios
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCambioPagina(actual - 1)}
          disabled={actual === 1}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
              <span key={`dots-${idx}`} className="px-1 text-gray-400 text-sm">...</span>
            ) : (
              <button
                key={p}
                onClick={() => onCambioPagina(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  p === actual
                    ? "bg-[#895202] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        <button
          onClick={() => onCambioPagina(actual + 1)}
          disabled={actual === totalPaginas}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
