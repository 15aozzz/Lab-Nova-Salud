export default function KPIRow({ kpis }) {
  const cards = [
    { title: "TOTAL RECAUDADO", value: `S/. ${kpis.totalRecaudado}` },
    { title: "N° DE VENTAS", value: kpis.nVentas },
    { title: "TICKET PROMEDIO", value: `S/. ${kpis.ticketPromedio}` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-card_gap">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant flex flex-col gap-1 relative overflow-hidden"
        >
          <span className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
            {card.title}
          </span>
          <span className="text-[20px] font-semibold text-primary-container">
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}
