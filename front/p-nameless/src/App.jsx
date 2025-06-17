// src/App.jsx
import React, { useEffect } from 'react'; // Es buena práctica importar React aunque no se use explícitamente con Vite/JSX moderno
import useAuthStore from './stores/authStore'; // Asegúrate de que la ruta sea correcta
import './App.css'; // Asegúrate que aquí O en index.css (importado en main.jsx) estén tus directivas @tailwind
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import LoginPageV2 from './pages/LoginPageV2';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // <-- Importado
import ProfilePage from './pages/ProfilePage';   // <-- Importado
import HomePage from './pages/HomePage'; // <-- Importado
import FeaturesSection from './pages/components/FeaturesSection';
import DashboardPageV2 from './pages/components/DashboardV2';
import AdminPage from './pages/components/AdminPage';
import PorteriaPage from './pages/components/PorteriaPage';
import GestionResidentesPage from './pages/admin/GestionResidentesPage';
import ComunicadosAvisosPage from './pages/admin/ComunicadosAvisosPage';
import ReservaAreasPage from './pages/admin/ReservaAreasPage';
import GestionPagosPage from './pages/admin/GestionPagosPage';
import SolicitudesMantenimientoPage from './pages/admin/SolicitudesMantenimientoPage';
import NormativasDocumentosPage from './pages/admin/NormativasDocumentosPage';
import RegistroVisitantesPage from './pages/porteria/RegistroVisitantesPage';
import RecepcionPaqueteriaPage from './pages/porteria/RecepcionPaqueteriaPage';
import ReporteIncidentesPage from './pages/porteria/ReporteIncidentesPage';
import BitacoraRecorridosPage from './pages/porteria/BitacoraRecorridosPage';
import ContactosEmergenciaPage from './pages/porteria/ContactosEmergenciaPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; // <-- Importado

// Poteccion de rutas
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" replace />;
  }
  return children; // Si está autenticado, renderiza el componente hijo
}

// DEFINICIÓN DE AuthRedirector DEBERÍA ESTAR AQUÍ O IMPORTADA
function AuthRedirector() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const userRole = user.rol; 
      // ... tu lógica de redirección por rol ...
      if (userRole === 'superadministrador' || userRole === 'administrador') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userRole === 'propietario') {
        navigate('/propietario/dashboard', { replace: true });
      } else if (userRole === 'portero') {
        navigate('/porteria/dashboard', { replace: true });
      } else { 
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null; 
}


function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    // Verifica la autenticación al cargar la aplicación
    checkAuth();
  }, [checkAuth]);

  return (
    // Asumo que todos tus imports de componentes de página están correctos
// y que ProtectedRoute y AuthRedirector están definidos como discutimos.

<Router> 
    <AuthRedirector /> {/* Correcto: maneja la redirección post-login */}
    
    <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        {/* Un usuario no autenticado puede ver estas páginas */}
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPageV2 />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Aquí podrías añadir la ruta a RegisterPage si es pública */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}


        {/* --- RUTAS PROTEGIDAS --- */}
        {/* Solo usuarios autenticados pueden acceder a estas rutas */}
        <Route
            path="/profile"
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />
        <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardPageV2 /></ProtectedRoute>}
        />

        {/* --- RUTAS DE ADMIN (Protegidas) --- */}
        {/* Cambié "/Admin" a "/admin" por convención */}
        <Route
            path="/admin"
            element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/gestion-residentes"
            element={<ProtectedRoute><GestionResidentesPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/comunicados-avisos"
            element={<ProtectedRoute><ComunicadosAvisosPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/reserva-areas"
            element={<ProtectedRoute><ReservaAreasPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/gestion-pagos"
            element={<ProtectedRoute><GestionPagosPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/solicitudes-mantenimiento"
            element={<ProtectedRoute><SolicitudesMantenimientoPage /></ProtectedRoute>}
        />
        <Route
            path="/admin/normativas-documentos"
            element={<ProtectedRoute><NormativasDocumentosPage /></ProtectedRoute>}
        />

        {/* --- RUTAS DE PORTERÍA (Protegidas) --- */}
        {/* Cambié "/Porteria" a "/porteria" por convención */}
        <Route
            path="/porteria"
            element={<ProtectedRoute><PorteriaPage /></ProtectedRoute>}
        />
        <Route
            path="/porteria/registro-visitantes"
            element={<ProtectedRoute><RegistroVisitantesPage /></ProtectedRoute>}
        />
        <Route
            path="/porteria/recepcion-paqueteria"
            element={<ProtectedRoute><RecepcionPaqueteriaPage /></ProtectedRoute>}
        />
        <Route
            path="/porteria/reporte-incidentes"
            element={<ProtectedRoute><ReporteIncidentesPage /></ProtectedRoute>}
        />
        <Route
            path="/porteria/bitacora-recorridos"
            element={<ProtectedRoute><BitacoraRecorridosPage /></ProtectedRoute>}
        />
        <Route
            path="/porteria/contactos-emergencia"
            element={<ProtectedRoute><ContactosEmergenciaPage /></ProtectedRoute>}
        />

        {/* --- RUTA COMODÍN (Catch-All) --- */}
        {/* Siempre debe ir al final. Redirige a /home si no está logueado, o al dashboard por defecto si lo está. */}
        <Route 
            path="*" 
            element={<Navigate to={useAuthStore.getState().isAuthenticated ? "/dashboard" : "/home"} replace />} 
        />
    </Routes>
</Router>
  );
}

export default App;