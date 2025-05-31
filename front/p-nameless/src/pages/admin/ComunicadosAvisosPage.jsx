// src/pages/admin/ComunicadosAvisosPagina.jsx
import React from 'react';
import AdminBarTemporal from '../components/AdminBarTemporal'; // ¡VERIFICA ESTA RUTA!

function ComunicadosAvisosPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Comunicados y Avisos
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de comunicados y avisos aquí...</p>
          {/* Aquí iría la lista de comunicados, formulario para crear nuevo, etc. */}
        </div>
      </main>
    </div>
  );
}

export default ComunicadosAvisosPagina;