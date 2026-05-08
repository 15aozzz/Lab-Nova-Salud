import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('nova_session');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;