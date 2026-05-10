export default function TipoVentaSelector() {
  return (
    <div className="flex gap-4 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant">
      <label className="flex items-center gap-2 cursor-pointer px-4 py-[7px] rounded hover:bg-surface-container transition-colors">
        <input 
          type="radio" 
          name="tipoVenta" 
          defaultChecked 
          className="w-4 h-4 text-secondary focus:ring-secondary border-outline-variant"
        />
        <span className="text-body-md font-bold text-on-surface">Generar Venta y Enviar Comprobante</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer px-4 py-[7px] rounded hover:bg-surface-container transition-colors">
        <input 
          type="radio" 
          name="tipoVenta" 
          className="w-4 h-4 text-secondary focus:ring-secondary border-outline-variant"
        />
        <span className="text-body-md font-bold text-on-surface">Solo Generar Venta</span>
      </label>
    </div>
  );
}
