import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login/LoginPage';

function DashboardPlaceholder() {
  return (
    <div className="min-h-screen bg-[#F4F1ED] p-8">
      <h1 className="text-2xl font-bold text-[#3A3330]">Dashboard (En construcción)</h1>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
