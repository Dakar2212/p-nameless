// src/pages/ProfilePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación declarativa

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mi Perfil</h1>
        <p className="text-gray-600 mb-6">
          Aquí verás la información de tu cuenta. (Contenido simulado por ahora).
        </p>
        
        {/* Puedes añadir más detalles del perfil aquí */}
        <div className="mb-6">
          <p><span className="font-semibold text-gray-700">Nombre:</span> Usuario de Prueba</p>
          <p><span className="font-semibold text-gray-700">Email:</span> usuario@ejemplo.com</p>
        </div>

        {/* Enlace para volver al Dashboard */}
        <Link 
          to="/dashboard" 
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;