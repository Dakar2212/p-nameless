// src/components/LoggedInNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importa íconos (ajusta según necesites)
import { UserCircleIcon, ArrowLeftOnRectangleIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function LoggedInNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref para detectar clicks fuera

  // Lógica para cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // Añadir listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Limpiar listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    setDropdownOpen(false); // Cierra el dropdown
    // Aquí va la lógica real de logout:
    // - Limpiar token JWT (de localStorage, state global, etc.)
    // - Redirigir a la página de login
    navigate('/login'); // O la ruta de tu login
  };

  return (
    // Navbar con fondo oscuro (ejemplo)
    <nav className="bg-blue-600 shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo o Nombre App */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          {/* Puedes usar el mismo SVG o tu logo */}
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          <span className="text-xl font-bold text-white">E-Admin Dashboard</span>
        </Link>

        {/* Enlaces de Navegación Principales */}
        <div className="hidden md:flex space-x-4">
          {/* Asegúrate que 'to' apunte a tus rutas reales */}
          <Link to="/dashboard" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
          <Link to="/tasks" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tareas</Link>
          <Link to="/reports" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reportes</Link>
          {/* Añade más enlaces según necesites */}
        </div>

        {/* Menú de Usuario (Dropdown) - Contenedor relativo para posicionar el menú */}
        <div className="relative" ref={dropdownRef}>
          {/* Botón que abre/cierra el dropdown */}
          <button
            onClick={toggleDropdown}
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">Abrir menú de usuario</span>
            {/* Ícono de Usuario o Avatar */}
            <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
            {/* O podrías poner una imagen: <img className="h-8 w-8 rounded-full" src="..." alt="Avatar" /> */}
          </button>

          {/* Menú Desplegable */}
          {isDropdownOpen && (
            <div 
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20" // z-20 para estar sobre otros elementos
              role="menu" 
              aria-orientation="vertical" 
              aria-labelledby="user-menu-button" 
              tabIndex="-1"
            >
              {/* Enlace a Perfil */}
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)} // Cierra al hacer clic
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-0"
              >
                <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                Mi Perfil
              </Link>
              
              {/* Opción de Configuración (Ejemplo) */}
              <Link
                to="/settings" // Cambia la ruta si es necesario
                onClick={() => setDropdownOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-1"
              >
                 <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-500" />
                 Configuración
              </Link>

              {/* Botón de Cerrar Sesión */}
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-2"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div> {/* Fin del contenedor relativo del dropdown */}
      </div>
    </nav>
  );
}

export default LoggedInNavbar;