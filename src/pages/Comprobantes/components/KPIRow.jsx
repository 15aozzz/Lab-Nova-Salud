export default function KPIRow({ kpis }) {
  const cards = [
    { title: "TOTAL RECAUDADO", value: `S/. ${kpis.totalRecaudado}` },
    { title: "N° DE VENTAS", value: kpis.nVentas },
    { title: "TICKET PROMEDIO", value: `S/. ${kpis.ticketPromedio}` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
        >
          {/* Efecto de degradado sutil en la esquina */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-bl-full -mr-8 -mt-8" />
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">
            {card.title}
          </p>
          <h3 className="text-2xl font-bold text-[#2C2420] relative z-10">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
