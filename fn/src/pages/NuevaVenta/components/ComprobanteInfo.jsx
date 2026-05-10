export default function ComprobanteInfo({ info, setInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 pb-2 border-b border-gray-50">
        Comprobante de Pago
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empresa */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Empresa</label>
          <input 
            type="text"
            name="empresa"
            value={info.empresa}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#895202]/20 focus:border-[#895202] transition-all outline-none"
          />
        </div>

        {/* Tipo */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Comprobante</label>
          <select 
            name="tipo"
            value={info.tipo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#895202]/20 focus:border-[#895202] transition-all outline-none"
          >
            <option>Boleta Electrónica</option>
            <option>Factura Electrónica</option>
          </select>
        </div>

        {/* Serie y Correlativo en una fila si es necesario, pero aquí usaremos el grid */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Serie</label>
          <input 
            type="text"
            name="serie"
            value={info.serie}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#895202]/20 focus:border-[#895202] outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Correlativo</label>
          <input 
            type="text"
            name="correlativo"
            value={info.correlativo}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Fecha de Emisión</label>
          <input 
            type="text"
            name="fecha"
            value={info.fecha}
            readOnly
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Operación</label>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 outline-none">
            <option>Venta Interna</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Forma de Pago</label>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 outline-none">
            <option>Contado</option>
            <option>Crédito</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1">
          <label className="text-sm font-medium text-gray-700">Moneda</label>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 outline-none font-bold">
            <option>PEN - SOLES</option>
            <option>USD - DÓLARES</option>
          </select>
        </div>
      </div>
    </div>
  );
}
