export default function TipoVentaSelector() {
  return (
    <div className="flex gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100">
      <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-colors hover:bg-gray-50">
        <input 
          type="radio" 
          name="tipoVenta" 
          defaultChecked 
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
        />
        <span className="text-sm font-medium text-gray-700">Generar Venta y Enviar Comprobante</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-colors hover:bg-gray-50">
        <input 
          type="radio" 
          name="tipoVenta" 
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
        />
        <span className="text-sm font-medium text-gray-700">Solo Generar Venta</span>
      </label>
    </div>
  );
}
