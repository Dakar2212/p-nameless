// src/App.jsx
import React from 'react'; // Es buena práctica importar React aunque no se use explícitamente con Vite/JSX moderno
// import reactLogo from './assets/react.svg' // No usado
// import viteLogo from '/vite.svg' // No usado
import './App.css'; // Asegúrate que aquí O en index.css (importado en main.jsx) estén tus directivas @tailwind
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // <-- Importado
import ProfilePage from './pages/ProfilePage';   // <-- Importado
import HomePage from './pages/HomePage'; // <-- Importado
import FeaturesSection from './pages/components/FeaturesSection';

function App() {
  return (
    // Usas <Router> porque lo definiste como alias de BrowserRouter
    <Router> 
      <Routes>
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} /> 

      <Route path="*" element={<Navigate to="/login" replace />} />  
      </Routes>
    </Router>
  );
}

export default App;