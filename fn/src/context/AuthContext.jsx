import { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(localStorage.getItem('nova_session'));

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const stored = localStorage.getItem('nova_usuario');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      const resultado = response.data;
      if (!resultado) return false;

      localStorage.setItem('nova_session', resultado.token);
      localStorage.setItem('nova_usuario', JSON.stringify(resultado.usuario));
      setSession(resultado.token);
      setUsuarioActual(resultado.usuario);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('nova_session');
    localStorage.removeItem('nova_usuario');
    setSession(null);
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider value={{ session, usuarioActual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};