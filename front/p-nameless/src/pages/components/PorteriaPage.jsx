// src/pages/DashboardPageV2.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- ¡NUEVO! Importar Link
import NavBarTemporal from '../components/NavBarTemporal';

// Tus iconos (sin cambios)
const IdentificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-sky-500 group-hover:text-sky-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm0-15h15M4.5 12H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1 0-1.5Zm0 3H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1 0-1.5Zm0 3H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1 0-1.5Z" /></svg>;
const ArchiveBoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-amber-500 group-hover:text-amber-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V3M3.75 3H20.25M3.75 3h16.5M3.75 8.25h16.5M3.75 12.75h16.5m-16.5 3.75h16.5M12 6.75h.008v.008H12V6.75Zm0 3.75h.008v.008H12v-.008Zm0 3.75h.008v.008H12v-.008Z" /></svg>;
const ExclamationTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-red-500 group-hover:text-red-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-teal-500 group-hover:text-teal-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-lime-500 group-hover:text-lime-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.018-.991-.053-1.463A12.06 12.06 0 0 1 18.305 15.58a2.25 2.25 0 0 0-2.096 1.059l-.099.178c-.432.76-.967 1.412-1.555 1.971C13.999 19.23 13.03 20 12 20c-1.03 0-1.999-.77-2.655-1.392-.588-.56-1.123-1.211-1.555-1.971l-.099-.178a2.25 2.25 0 0 0-2.096-1.059A12.06 12.06 0 0 1 4.205 15c-.035.472-.053.947-.053 1.463v1.372A2.25 2.25 0 0 0 4.5 19.5h2.25C15.284 19.5 22 12.784 22 4.5c0-.828-.672-1.5-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 4.5v2.25Z" /></svg>;

// Renombramos la función para que coincida con el propósito y el archivo si este es el Dashboard de Portería.
// Si este archivo se usa para OTRO DashboardV2, entonces mantén el nombre original.
// Por ahora, asumiré que este ES tu dashboard de portería principal.
function DashboardPorteria() { // <-- CAMBIO DE NOMBRE SUGERIDO para claridad
  // Módulos para el Puesto de Vigilancia con rutas en español
  const modulosPorteria = [
    {
      nombre: 'Registro de Visitantes',
      icono: <IdentificationIcon />,
      ruta: '/porteria/registro-visitantes', // <-- NUEVA RUTA
      descripcion: 'Registrar y consultar entradas y salidas de visitantes.'
    },
    {
      nombre: 'Recepción de Paquetería',
      icono: <ArchiveBoxIcon />,
      ruta: '/porteria/recepcion-paqueteria', // <-- NUEVA RUTA
      descripcion: 'Registrar paquetes recibidos y entregados a residentes.'
    },
    {
      nombre: 'Reporte de Incidentes',
      icono: <ExclamationTriangleIcon />,
      ruta: '/porteria/reporte-incidentes', // <-- NUEVA RUTA
      descripcion: 'Documentar cualquier novedad o incidente de seguridad.'
    },
    {
      nombre: 'Bitácora de Recorridos',
      icono: <MapPinIcon />,
      ruta: '/porteria/bitacora-recorridos', // <-- NUEVA RUTA
      descripcion: 'Registrar puntos de control y novedades durante los recorridos.'
    },
    {
      nombre: 'Contactos de Emergencia',
      icono: <PhoneIcon />,
      ruta: '/porteria/contactos-emergencia', // <-- NUEVA RUTA
      descripcion: 'Acceder rápidamente a números de emergencia y administración.'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBarTemporal /> {/* Esta es la Navbar que ya usabas */}
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Puesto de Vigilancia
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulosPorteria.map((modulo) => (
            <Link // <-- CAMBIO: de <a> a <Link>
              key={modulo.nombre}
              to={modulo.ruta} // <-- CAMBIO: de href a to, usando la nueva 'ruta'
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-start"
            >
              {modulo.icono}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {modulo.nombre}
                </h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {modulo.descripcion}
                </p>
              </div>
            </Link> // <-- CAMBIO: cierra <Link>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notificaciones Importantes</h2>
          <p className="text-gray-600">
            Aquí se podrían mostrar alertas urgentes o comunicados.
          </p>
        </div>
      </main>
    </div> 
  );
}

export default DashboardPorteria; 