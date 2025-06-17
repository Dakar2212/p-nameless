// src/components/LoggedInNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

// Importa los nuevos componentes de dropdown
import NotificationsDropdown from './NotificationsDropdown';
import UserDropdown from './UserDropdown';

function LoggedInNavbar() {
  const navigate = useNavigate();
  const logoutAction = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const handleLogout = async () => {
    await logoutAction();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo y Nombre */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-xl font-bold text-white">E-Admin Dashboard</span>
        </Link>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
          <Link to="/tasks" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Tareas</Link>
          <Link to="/reports" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Reportes</Link>
        </div>

        {/* Contenedor para los iconos de la derecha */}
        <div className="flex items-center space-x-3">
          {/* Renderiza el componente de Notificaciones */}
          <NotificationsDropdown />
          
          {/* Renderiza el componente de Perfil de Usuario */}
          <UserDropdown user={user} onLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
}

export default LoggedInNavbar;