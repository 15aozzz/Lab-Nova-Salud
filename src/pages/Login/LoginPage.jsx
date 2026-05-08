import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MortarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mortar Body */}
    <path d="M4 6H20L18 20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20L4 6Z" fill="#84511A"/>
    <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V6H3V6Z" fill="#84511A"/>
    {/* Plus Sign */}
    <path d="M12 10V18M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Pestle */}
    <path d="M14 2L18 0" stroke="#84511A" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282422]">
      <div className="bg-white rounded-[12px] p-10 w-[420px] flex flex-col items-center shadow-2xl mx-4">
        {/* Logo and Title */}
        <div className="mb-8 flex flex-col items-center">
          <MortarIcon />
          <h1 className="text-[#3A3330] text-[22px] font-bold mt-3 font-sans tracking-tight">Nova Salud</h1>
          <p className="text-[#9C948A] text-[13px] mt-0.5">Botica - Sistema de Ventas</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5D544E] text-[13px] font-medium ml-0.5">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario" 
              className="border border-[#E4DDD6] bg-[#FCFAF8] text-[#3A3330] px-3.5 py-2.5 rounded-md outline-none focus:border-[#84511A] focus:ring-1 focus:ring-[#84511A] transition-colors text-[14px] placeholder-[#B5B0AA]"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#5D544E] text-[13px] font-medium ml-0.5">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña" 
              className="border border-[#E4DDD6] bg-[#FCFAF8] text-[#3A3330] px-3.5 py-2.5 rounded-md outline-none focus:border-[#84511A] focus:ring-1 focus:ring-[#84511A] transition-colors text-[14px] placeholder-[#B5B0AA]"
              required
            />
          </div>

          <div className="mt-4">
            <button 
              type="submit" 
              className="w-full bg-[#8C5D23] hover:bg-[#784f1d] text-white font-medium py-2.5 rounded-md transition-colors text-[14px] shadow-sm"
            >
              Iniciar Sesión
            </button>
            {error && (
              <p className="text-[#D32F2F] text-xs mt-3 text-center">{error}</p>
            )}
          </div>
        </form>

        <p className="text-[#A39C93] text-[11px] mt-10 tracking-wide">
          Botica Nova Salud &copy; 2026
        </p>
      </div>
    </div>
  );
}
