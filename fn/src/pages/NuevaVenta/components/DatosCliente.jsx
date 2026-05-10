import { Search, PlusCircle } from "lucide-react";
import { useState } from "react";
import { clientesService } from "../../../services/api";

export default function DatosCliente({ cliente, setCliente }) {
  const [buscando, setBuscando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const buscarCliente = async () => {
    if (!cliente.numero || cliente.numero.length < 8) {
      alert("Ingrese un número de documento válido");
      return;
    }
    
    setBuscando(true);
    try {
      const response = await clientesService.buscar(cliente.numero);
      if (response.data.encontrado) {
        setCliente(prev => ({ ...prev, nombre: response.data.nombres_razon_social }));
      } else {
        alert("Cliente no encontrado. Puede registrar los datos manualmente.");
      }
    } catch (error) {
      console.error("Error buscando cliente:", error);
      alert("Error al buscar cliente");
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-card_gap h-full flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-card_gap">
        <h3 className="text-[11px] font-bold tracking-wider text-primary-container">
          Datos del Cliente
        </h3>
        <button className="flex items-center gap-1 text-[11px] font-bold text-secondary hover:underline">
          <PlusCircle className="w-3 h-3" />
          Nuevo Cliente
        </button>
      </div>

      <div className="space-y-5 flex-1">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <label className="text-[11px] font-bold tracking-wider text-primary-container mb-1 block">Doc.</label>
            <select 
              name="tipoDoc"
              value={cliente.tipoDoc}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-[7px] text-body-md font-bold text-on-surface outline-none"
            >
              <option>DNI</option>
              <option>RUC</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-[11px] font-bold tracking-wider text-primary-container mb-1 block">Número</label>
            <div className="relative">
              <input 
                type="text"
                name="numero"
                placeholder="Ej: 7245..."
                value={cliente.numero}
                onChange={handleChange}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-3 pr-10 py-[7px] text-body-md text-on-surface outline-none"
              />
              <button 
                onClick={buscarCliente}
                disabled={buscando}
                className="absolute right-0 top-0 h-full px-3 text-on-surface-variant border-l border-outline-variant hover:text-secondary disabled:opacity-50"
              >
                {buscando ? (
                  <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full"></div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider text-primary-container mb-1 block">Nombre / Razón Social</label>
          <input 
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md font-medium text-on-surface outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider text-primary-container mb-1 block">Dirección</label>
          <input 
            type="text"
            name="direccion"
            placeholder="Opcional"
            value={cliente.direccion}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider text-primary-container mb-1 block">Teléfono</label>
          <input 
            type="text"
            name="telefono"
            placeholder="Ej: 987 654 321"
            value={cliente.telefono}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[7px] text-body-md text-on-surface outline-none"
          />
        </div>
      </div>
    </div>
  );
}
