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
      {/* Puedes añadir más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;