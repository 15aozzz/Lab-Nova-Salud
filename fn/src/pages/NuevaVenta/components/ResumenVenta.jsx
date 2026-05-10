export default function ResumenVenta({ totales, onVender }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-card_gap flex flex-col gap-card_gap">
      <h3 className="text-[11px] font-bold tracking-wider text-primary-container pb-3 border-b border-outline-variant">
        Resumen
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-body-md font-bold">
          <span className="text-on-surface-variant">OP. GRAVADAS</span>
          <span className="text-on-surface">S/. {totales.gravadas}</span>
        </div>
        <div className="flex justify-between text-body-md font-bold">
          <span className="text-on-surface-variant">OP. INAFECTAS</span>
          <span className="text-on-surface">S/. {totales.inafectas}</span>
        </div>
        <div className="flex justify-between text-body-md font-bold border-t border-outline-variant pt-3">
          <span className="text-on-surface-variant">Subtotal</span>
          <span className="text-on-surface font-bold">S/. {totales.subtotal}</span>
        </div>
        <div className="flex justify-between text-body-md font-bold">
          <span className="text-on-surface-variant">IGV (18%)</span>
          <span className="text-on-surface">S/. {totales.igv}</span>
        </div>

        <div className="flex justify-between items-baseline pt-4 border-t-2 border-dashed border-outline-variant">
          <span className="text-h2 font-bold text-primary-container">TOTAL</span>
          <span className="text-price-display font-bold text-secondary">S/. {totales.total}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-card_gap">
        <button 
          onClick={onVender}
          className="bg-secondary text-on-secondary py-3 rounded-lg font-bold text-body-md tracking-wider shadow-sm hover:opacity-90 transition-all active:scale-95"
        >
          Vender
        </button>
        <button className="py-2 rounded-lg font-bold text-on-surface-variant hover:bg-surface-container transition-colors text-body-sm tracking-wider">
          Cancelar
        </button>
      </div>
    </div>
  );
}
