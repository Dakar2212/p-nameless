// src/pages/porteria/ContactosEmergenciaPagina.jsx
import React from 'react';
import NavBarTemporal from '../components/NavBarTemporal'; // ¡VERIFICA ESTA RUTA!

function ContactosEmergenciaPagina() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Contactos de Emergencia
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Contenido del módulo de contactos de emergencia aquí...</p>
          {/* Por ejemplo: Lista de números importantes (policía, bomberos, administración) */}
        </div>
      </main>
    </div>
  );
}

export default ContactosEmergenciaPagina;