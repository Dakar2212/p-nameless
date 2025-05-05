// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link para navegación declarativa

function DashboardPage() {
  const navigate = useNavigate(); // Para la acción de logout

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí limpiarías el estado de autenticación real
    navigate('/login'); // Redirige a login
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Principal</h1>
        <p className="text-gray-600 mb-6">
          ¡Bienvenido de nuevo! Contenido principal de tu aplicación.
        </p>
        
        {/* Enlace para ir a la página de Perfil */}
        <div className="mb-6">
          <Link 
            to="/profile" 
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Ir a mi Perfil
          </Link>
        </div>

        {/* Botón de Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800 transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;