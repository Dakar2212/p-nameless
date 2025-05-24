// src/App.jsx
import React from 'react'; // Es buena práctica importar React aunque no se use explícitamente con Vite/JSX moderno
// import reactLogo from './assets/react.svg' // No usado
// import viteLogo from '/vite.svg' // No usado
import './App.css'; // Asegúrate que aquí O en index.css (importado en main.jsx) estén tus directivas @tailwind
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import LoginPageV2 from './pages/LoginPageV2';
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


function App() {
  return (
    // Usas <Router> porque lo definiste como alias de BrowserRouter
    //<Route path="/login" element={<LoginPage />} />
    <Router> 
      <Routes>
      <Route path="*" element={<Navigate to="/home" replace />} /> 
      
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} /> 
      <Route path="/login" element={<LoginPageV2 />} /> 
      <Route path="/dashboard" element={<DashboardPageV2 />} />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/Porteria" element={<PorteriaPage />} />
      <Route path="/admin/gestion-residentes" element={<GestionResidentesPage />} />
      <Route path="/admin/comunicados-avisos" element={<ComunicadosAvisosPage />} />
      <Route path="/admin/reserva-areas" element={<ReservaAreasPage />} />
      <Route path="/admin/gestion-pagos" element={<GestionPagosPage />} />
      <Route path="/admin/solicitudes-mantenimiento" element={<SolicitudesMantenimientoPage />} />
      <Route path="/admin/normativas-documentos" element={<NormativasDocumentosPage />} />
      </Routes>
    </Router>
  );
}

export default App;