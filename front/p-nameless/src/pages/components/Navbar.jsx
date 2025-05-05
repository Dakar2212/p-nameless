import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // Usando el fondo azul que tenías en tu código
    <nav className="bg-blue-600 shadow-md w-full sticky top-0 z-50"> 
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Ícono SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-2xl font-bold text-white">E-Admin</span>
        </div>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Como te ayudamos?</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Planes</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Blog</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Contactanos</a>
        </div>

        {/* Botón Acceso Clientes (Ajusté estilo para mejor contraste con fondo azul) */}
        <div>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-200 text-blue-700 py-2 px-5 rounded-md text-sm font-medium transition duration-300"
          >
            Acceso Clientes
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;