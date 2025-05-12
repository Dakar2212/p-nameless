// src/pages/DashboardPageV2.jsx
import React from 'react';
import LoggedInNavbar from '../components/LoggedInNavbar'; // Importa la Navbar

function DashboardPageV2() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* Fondo claro para el contenido */}
      <LoggedInNavbar />

      {/* Área de Contenido Principal del Dashboard */}
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Bienvenido Usuario {/* Aquí puedes poner el nombre del usuario si tienes un sistema de autenticación */}
        </h1>
        {/* Aquí empezarías a añadir el contenido real de tu dashboard:
          - Tarjetas con estadísticas
          - Tablas de datos
          - Gráficos
          - Etc.
        */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del dashboard irá aquí...</p>
        </div>
      </main>

      {/* Puedes añadir un footer específico para el dashboard si quieres */}
      {/* <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t"> ... </footer> */}
    </div>
  );
}

export default DashboardPageV2;