import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './router/ProtectedRoute';
import LoginPage from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/DashboardPage.jsx';
import Layout from './components/Layout/Layout.jsx';
import NuevaVenta from './pages/NuevaVenta/NuevaVenta.jsx';
import Comprobantes from './pages/Comprobantes/Comprobantes.jsx';
import Productos from './pages/Productos/Productos.jsx';
import Clientes from './pages/Clientes/Clientes.jsx';
import Usuarios from './pages/Usuarios/Usuarios.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout/>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/nueva-venta" element={<NuevaVenta />} />
              <Route path="/comprobantes" element={<Comprobantes />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
