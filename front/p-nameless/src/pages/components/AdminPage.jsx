// src/pages/DashboardPageV2.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- ¡NUEVO! Importar Link
import AdminBarTemporal from '../components/AdminBarTemporal';

// Tus iconos (sin cambios)
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-blue-500 group-hover:text-blue-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m0 0a9.949 9.949 0 0 0-7.721-4.243M15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-green-500 group-hover:text-green-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.34a.863.863 0 0 1 .294.626v16.068a.863.863 0 0 1-.294.626A3.001 3.001 0 0 1 8.25 21V3a3.001 3.001 0 0 1 2.09-.954Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.34a.863.863 0 0 1 .294.626v16.068a.863.863 0 0 1-.294.626a3.001 3.001 0 0 1-2.09-.954V3a3.001 3.001 0 0 1 2.09-.954Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12.75H21M5.25 6H16.5m-12.75 0h.008v.008H3.75V6Zm0 3.75h.008v.008H3.75v-.008Zm0 3.75h.008v.008H3.75V13.5Zm0 3.75h.008v.008H3.75v-.008Z" /></svg>;
const CalendarDaysIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-purple-500 group-hover:text-purple-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-yellow-500 group-hover:text-yellow-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const WrenchScrewdriverIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-red-500 group-hover:text-red-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.527-1.032.265-2.335-.757-2.862L8.278 7.81c-1.022-.526-2.335-.264-2.862.758L3 13.664l2.496 3.03M11.42 15.17 3 22.5M21 12c0 .864-.124 1.708-.36 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 6.75h.008v.008H12v-.008Z" /></svg>;
const ClipboardDocumentListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-indigo-500 group-hover:text-indigo-700 transition-colors duration-200"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.124M5.25 6h7.5a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-9A2.25 2.25 0 0 1 5.25 6Z" /></svg>;


function DashboardPageV2() {
  // Definimos los módulos con nombres y rutas en español
  const modulos = [
    { nombre: 'Gestión de Residentes', icono: <UserGroupIcon />, ruta: '/admin/gestion-residentes' },
    { nombre: 'Comunicados y Avisos', icono: <MegaphoneIcon />, ruta: '/admin/comunicados-avisos' },
    { nombre: 'Reserva de Áreas Comunes', icono: <CalendarDaysIcon />, ruta: '/admin/reserva-areas' },
    { nombre: 'Gestión de Pagos', icono: <CurrencyDollarIcon />, ruta: '/admin/gestion-pagos' },
    { nombre: 'Solicitudes de Mantenimiento', icono: <WrenchScrewdriverIcon />, ruta: '/admin/solicitudes-mantenimiento' },
    { nombre: 'Normativas y Documentos', icono: <ClipboardDocumentListIcon />, ruta: '/admin/normativas-documentos' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminBarTemporal />
      <main className="flex-grow container mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Panel de Administración
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((modulo) => (
            <Link // <-- CAMBIO: de <a> a <Link>
              key={modulo.nombre}
              to={modulo.ruta} // <-- CAMBIO: de href a to, y usando la nueva 'ruta'
              className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center"
            >
              {modulo.icono}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {modulo.nombre}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Acceder al módulo de {modulo.nombre.toLowerCase()}</p>
              </div>
            </Link> // <-- CAMBIO: cierra <Link>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas Rápidas</h2>
          <p className="text-gray-600">Aquí podrías mostrar un resumen de actividad...</p>
        </div>
      </main>
    </div>
  );
}

export default DashboardPageV2;