import { createContext, useContext, useState } from 'react';
import usuarios from '../mocks/datosmock.js';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(
    localStorage.getItem('nova_session')
  );

  const login = async (username, password) => {
    const usuario = usuarios.find(
      u => u.username === username && u.password === password
    );
    if (usuario) {
      const token = "jwt-" + usuario.id_usuario.toString();
      localStorage.setItem('nova_session', token);
      setSession(token);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('nova_session');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
