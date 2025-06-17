// src/pages/admin/SolicitudesMantenimientoPagina.jsx
import React from 'react';
import AdminBarTemporal from '../components/AdminBarPage'; // ¡VERIFICA ESTA RUTA!

function SolicitudesMantenimientoPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Solicitudes de Mantenimiento
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de solicitudes de mantenimiento aquí...</p>
          {/* Aquí iría la lista de solicitudes, detalles, etc. */}
        </div>
      </main>
    </div>
  );
}

export default SolicitudesMantenimientoPagina;