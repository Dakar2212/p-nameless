// src/pages/admin/GestionResidentesPage.jsx
import React from 'react';
import AdminBarTemporal from '../components/AdminBarTemporal'; // ¡VERIFICA ESTA RUTA!

function GestionResidentesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Gestión de Residentes
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de gestión de residentes aquí...</p>
          {/* Aquí iría la tabla de residentes, formularios, etc. */}
        </div>
      </main>
    </div>
  );
}

export default GestionResidentesPage;