// src/components/UserDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function UserDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Lógica para cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogoutClick = () => {
    setIsOpen(false); // Cierra el dropdown
    onLogout(); // Llama a la función de logout pasada como prop
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
      >
        <span className="sr-only">Abrir menú de usuario</span>
        {/* Aquí podrías usar user.foto_perfil si la tienes */}
        <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-800">Hola,</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Usuario'}</p>
          </div>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
            Mi Perfil
          </Link>
          <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-500" />
            Configuración
          </Link>
          <button
            onClick={handleLogoutClick}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;