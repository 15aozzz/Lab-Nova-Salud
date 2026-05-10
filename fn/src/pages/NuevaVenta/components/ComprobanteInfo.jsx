export default function ComprobanteInfo({ info, setInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-card_gap">
      <h3 className="text-[11px] font-bold tracking-wider text-primary-container pb-3 border-b border-outline-variant mb-card_gap">
        Comprobante de Pago
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card_gap">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Empresa</label>
          <input 
            type="text"
            name="empresa"
            value={info.empresa}
            onChange={handleChange}
            className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Tipo de Comprobante</label>
          <select 
            name="tipo"
            value={info.tipo}
            onChange={handleChange}
            className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none"
          >
            <option>Boleta Electrónica</option>
            <option>Factura Electrónica</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Serie</label>
          <input 
            type="text"
            name="serie"
            value={info.serie}
            onChange={handleChange}
            className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Correlativo</label>
          <input 
            type="text"
            name="correlativo"
            value={info.correlativo}
            onChange={handleChange}
            className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Fecha de Emisión</label>
          <input 
            type="text"
            name="fecha"
            value={info.fecha}
            readOnly
            className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface-variant cursor-not-allowed outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Tipo de Operación</label>
          <select className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none">
            <option>Venta Interna</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Forma de Pago</label>
          <select className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none">
            <option>Contado</option>
            <option>Crédito</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 lg:col-span-1">
          <label className="text-[11px] font-bold tracking-wider text-primary-container">Moneda</label>
          <select className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none font-bold">
            <option>PEN - SOLES</option>
            <option>USD - DÓLARES</option>
          </select>
        </div>
      </div>
    </div>
  );
}
