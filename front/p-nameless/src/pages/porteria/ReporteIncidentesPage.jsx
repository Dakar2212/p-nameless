// src/pages/porteria/ReporteIncidentesPagina.jsx
import React from 'react';
import NavBarTemporal from '../components/NavBarTemporal'; // ¡VERIFICA ESTA RUTA!

function ReporteIncidentesPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Reporte de Incidentes
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de reporte de incidentes aquí...</p>
          {/* Por ejemplo: Formulario para nuevo incidente, lista de incidentes reportados */}
        </div>
      </main>
    </div>
  );
}

export default ReporteIncidentesPagina;