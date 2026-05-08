import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    return localStorage.getItem('nova_session');
  });

  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const token = 'simulated_token_123';
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
