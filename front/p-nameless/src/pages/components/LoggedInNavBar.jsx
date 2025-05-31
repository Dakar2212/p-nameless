import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, UserIcon, Cog6ToothIcon, BellIcon } from '@heroicons/react/24/outline'; // Añadido BellIcon

function LoggedInNavbar() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false); // Nuevo estado para notificaciones
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);
  const notificationsRef = useRef(null); // Nuevo ref para el dropdown de notificaciones

  // Notificaciones temporales de ejemplo
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva Tarea Asignada', message: 'Se te ha asignado la tarea "Revisar reporte mensual".', read: false, time: 'Hace 5 min' },
    { id: 2, title: 'Mantenimiento Programado', message: 'El sistema estará en mantenimiento mañana a las 2 AM.', read: true, time: 'Hace 2 horas' },
    { id: 3, title: 'Recordatorio de Reunión', message: 'Tienes una reunión con el equipo de ventas en 30 minutos.', read: false, time: 'Hace 1 día' },
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Lógica para cerrar los dropdowns si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownRef, notificationsRef]);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    setNotificationsOpen(false); // Cierra el de notificaciones si está abierto
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
    setUserDropdownOpen(false); // Cierra el de usuario si está abierto
  };

  const handleLogoutClick = async () => {
    await logout(); // Llama a la función de logout del store 
    console.log('Cerrando sesión...');
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    // En una app real, aquí harías una llamada a la API para marcarla como leída
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };


  return (
    <nav className="bg-blue-600 shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-xl font-bold text-white">E-Admin Dashboard</span>
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
          <Link to="/tasks" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Tareas</Link>
          <Link to="/reports" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Reportes</Link>
        </div>

        {/* Contenedor para los iconos de la derecha (Notificaciones y Perfil) */}
        <div className="flex items-center space-x-3">
          {/* Botón de Notificaciones */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={toggleNotifications}
              className="p-1 rounded-full text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white relative"
              aria-label="Ver notificaciones"
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
            >
              <BellIcon className="h-7 w-7" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-red-500">
                  <span className="sr-only">{unreadNotificationsCount} notificaciones no leídas</span>
                </span>
              )}
            </button>
            {/* Panel Desplegable de Notificaciones */}
            {isNotificationsOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 max-h-96 overflow-y-auto"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="notifications-menu-button"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Notificaciones</p>
                    {unreadNotificationsCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Marcar todas como leídas
                      </button>
                    )}
                  </div>
                </div>
                <div className="py-1">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 ${!notif.read ? 'bg-blue-50' : ''}`}
                        onClick={() => markAsRead(notif.id)} // O podría navegar a la notificación
                      >
                        <p className={`text-sm font-semibold ${!notif.read ? 'text-gray-800' : 'text-gray-600'}`}>{notif.title}</p>
                        <p className={`text-xs ${!notif.read ? 'text-gray-700' : 'text-gray-500'}`}>{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 px-4 py-3">No tienes notificaciones nuevas.</p>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200 text-center">
                  <Link to="/notifications" onClick={() => setNotificationsOpen(false)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Ver todas las notificaciones
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Menú de Usuario (Dropdown) */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={toggleUserDropdown}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              aria-expanded={isUserDropdownOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Abrir menú de usuario</span>
              <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
            </button>
            {isUserDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <Link
                  to="/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Mi Perfil
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </nav>
  );
}

export default LoggedInNavbar;