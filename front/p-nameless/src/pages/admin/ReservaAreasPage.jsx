// src/pages/admin/ReservaAreasPagina.jsx
import React from 'react';
import AdminBarTemporal from '../components/AdminBarPage'; // ¡VERIFICA ESTA RUTA!

function ReservaAreasPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Reserva de Áreas Comunes
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de reserva de áreas comunes aquí...</p>
          {/* Aquí iría el calendario de reservas, lista de solicitudes, etc. */}
        </div>
      </main>
    </div>
  );
}

export default ReservaAreasPagina;