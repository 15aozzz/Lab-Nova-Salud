import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const IconoMortero = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20L18 20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20L4 6Z" fill="#895202"/>
    <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V6H3V6Z" fill="#895202"/>
    <path d="M12 10V18M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2L18 0" stroke="#895202" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    
    const exito = await login(usuario, clave);
    if (exito) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-container">
      <div className="bg-surface-container-lowest rounded-xl p-10 w-[420px] flex flex-col items-center shadow-2xl mx-4">
        <div className="mb-8 flex flex-col items-center">
          <IconoMortero />
          <h1 className="text-primary-container text-h1 font-bold tracking-tight mt-3">Nova Salud</h1>
          <p className="text-on-surface-variant text-body-sm mt-0.5">Botica - Sistema de Ventas</p>
        </div>

        <form onSubmit={manejarEnvio} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-on-surface-variant text-[11px] font-bold tracking-wider ml-0.5">Usuario</label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario" 
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[9px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors placeholder-[#B5B0AA]"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-on-surface-variant text-[11px] font-bold tracking-wider ml-0.5">Contraseña</label>
            <input 
              type="password" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Ingrese su contraseña" 
              className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-[9px] text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors placeholder-[#B5B0AA]"
              required
            />
          </div>

          <div className="mt-4">
            <button 
              type="submit" 
              className="w-full bg-secondary text-on-secondary font-bold py-[9px] rounded-lg text-body-md hover:opacity-90 transition-opacity shadow-sm"
            >
              Iniciar Sesión
            </button>
            {error && (
              <p className="text-error text-body-sm mt-3 text-center">{error}</p>
            )}
          </div>
        </form>

        <p className="text-on-surface-variant text-label-caps mt-10 tracking-wide">
          Botica Nova Salud &copy; 2026
        </p>
      </div>
    </div>
  );
}
