export default function KpiCard({ titulo, valor, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-surface-container-lowest rounded-lg p-4 border border-outline-variant flex flex-col gap-1 relative overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <span className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">{titulo}</span>
      <span className="text-[20px] font-semibold text-primary-container">{valor}</span>
    </div>
  );
}
