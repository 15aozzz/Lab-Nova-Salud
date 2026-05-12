import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function ProtectedRoute() {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;