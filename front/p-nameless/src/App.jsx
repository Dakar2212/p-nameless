// src/App.jsx
import React, { useEffect } from 'react'; // Es buena práctica importar React aunque no se use explícitamente con Vite/JSX moderno
// import reactLogo from './assets/react.svg' // No usado
// import viteLogo from '/vite.svg' // No usado
import './App.css'; // Asegúrate que aquí O en index.css (importado en main.jsx) estén tus directivas @tailwind
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import LoginPageV2 from './pages/LoginPageV2';
import DashboardPage from './pages/DashboardPage'; // <-- Importado
import ProfilePage from './pages/ProfilePage';   // <-- Importado
import HomePage from './pages/HomePage'; // <-- Importado
import FeaturesSection from './pages/components/FeaturesSection';
import DashboardPageV2 from './pages/components/DashboardV2';
import AdminPage from './pages/components/AdminPage';
import PorteriaPage from './pages/components/PorteriaPage'; 
import RegisterPage from './pages/RegisterPage';
import useAuthStore from './stores/authStore'; // Asegúrate de que la ruta sea correcta

// Componente para Rutas Protegidas (sin cambios)
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function AuthRedirector() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user); // Obtiene el usuario autenticado
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Asumimos que user.rol es un string como 'administrador', 'propietario', 'usuario', 'portero'
      // Si user.roles es un array, necesitarías una lógica como:
      // const isAdmin = user.roles.some(role => role.slug === 'admin');
      const userRole = user.rol; // Ajusta esto si tu estructura de rol es diferente

      console.log("Usuario autenticado con rol:", userRole); // Para depuración

      if (userRole === 'superadministrador' || userRole === 'administrador') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userRole === 'propietario' /* || userRole === 'comite' */) {
        navigate('/propietario/dashboard', { replace: true });
      } else if (userRole === 'portero') {
        navigate('/porteria/dashboard', { replace: true });
      } else { // Rol 'usuario' o cualquier otro por defecto
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null; // Este componente no renderiza nada, solo maneja la redirección
}


function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    // Verifica la autenticación al cargar la aplicación
    checkAuth();
  }, [checkAuth]);

  return (
    <Router> 
      <AuthRedirector /> {/* Componente para manejar redirecciones post-login */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Si está autenticado y va a /login o /register, redirige al dashboard apropiado (AuthRedirector se encargará) */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPageV2 />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        
        {/* Dashboards (crea los componentes de página para estos) */}
        <Route 
          path="/dashboard" // Dashboard genérico para 'usuario'
          element={<ProtectedRoute><DashboardPageV2 /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute>{/* <AdminDashboardPage /> Reemplaza con tu componente */}<div>Admin Dashboard</div></ProtectedRoute>} 
        />
        <Route 
          path="/propietario/dashboard" 
          element={<ProtectedRoute>{/* <PropietarioDashboardPage /> Reemplaza con tu componente */}<div>Propietario Dashboard</div></ProtectedRoute>} 
        />
        <Route 
          path="/porteria/dashboard" 
          element={<ProtectedRoute>{/* <PorteriaDashboardPage /> Reemplaza con tu componente */}<div>Porteria Dashboard</div></ProtectedRoute>} 
        />
        
        {/* Asegúrate que otras rutas protegidas usen ProtectedRoute */}
        {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}

        {/* Ruta por defecto: AuthRedirector manejará la redirección si se loguea. Si no, va a login. */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;