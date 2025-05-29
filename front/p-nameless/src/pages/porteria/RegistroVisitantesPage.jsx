// src/pages/porteria/RegistroVisitantesPagina.jsx
import React from 'react';
import NavBarTemporal from '../components/NavBarTemporal'; // ¡VERIFICA ESTA RUTA!

function RegistroVisitantesPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Registro de Visitantes
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de registro de visitantes aquí...</p>
          {/* Por ejemplo: Formulario para registrar nuevo visitante, lista de visitantes recientes */}
        </div>
      </main>
    </div>
  );
}

export default RegistroVisitantesPagina;