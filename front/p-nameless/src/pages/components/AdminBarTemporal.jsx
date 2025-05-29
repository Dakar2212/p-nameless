import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon as ProfileUserIcon,
  Cog6ToothIcon as SettingsIcon, // Renombrado para claridad con Cog6ToothIcon del sidebar
  BellIcon,
  Bars3Icon,
  UsersIcon,
  ShieldCheckIcon,
  ArchiveBoxArrowDownIcon,
  XMarkIcon // Para el botón de cerrar el sidebar
} from '@heroicons/react/24/outline';

function LoggedInNavbar() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para el panel lateral
  const navigate = useNavigate();

  const userDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const sidebarRef = useRef(null); // Ref para el panel lateral

  // Notificaciones (sin cambios respecto a la versión anterior)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva Tarea Asignada', message: 'Revisar reporte mensual.', read: false, time: 'Hace 5 min' },
    { id: 2, title: 'Mantenimiento Programado', message: 'Sistema en mantenimiento mañana 2 AM.', read: true, time: 'Hace 2 horas' },
  ]);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      // Para el sidebar, el botón de hamburguesa está fuera del sidebarRef,
      // así que solo cerramos si el clic es fuera del sidebar Y no es el botón que lo abre/cierra.
      // El botón de cerrar (X) dentro del sidebar sí está contenido.
      // La forma más simple es cerrar el sidebar si el clic es en el backdrop (si lo tuviéramos)
      // o si es un clic en el documento que no sea el sidebar ni el botón de apertura.
      // Por ahora, si no está en sidebarRef y no es el botón, cerramos.
      const hamburgerButton = document.getElementById('hamburger-button'); // Necesitaremos ID en el botón
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && event.target !== hamburgerButton && !hamburgerButton?.contains(event.target) ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setUserDropdownOpen(false);
    setNotificationsOpen(false);
    setSidebarOpen(false);
  }

  const toggleUserDropdown = () => {
    setUserDropdownOpen(prev => !prev);
    setNotificationsOpen(false);
    setSidebarOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(prev => !prev);
    setUserDropdownOpen(false);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
    setUserDropdownOpen(false);
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    closeAllDropdowns();
    navigate('/login');
  };
  
  const markAsRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  const adminSidebarLinks = [
    { name: 'Gestión de Personal', path: '/admin/system-users', icon: <UsersIcon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-blue-500" /> },
    { name: 'Configuración General', path: '/admin/general-settings', icon: <SettingsIcon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-blue-500" /> },
    { name: 'Auditoría y Logs', path: '/admin/audit-logs', icon: <ShieldCheckIcon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-blue-500" /> },
    { name: 'Copias de Seguridad', path: '/admin/backups', icon: <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-blue-500" /> },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav className="bg-blue-600 shadow-md w-full sticky top-0 z-40"> {/* z-40 para estar debajo del sidebar */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Sección Izquierda: Botón de Hamburguesa y Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="hamburger-button" // ID para la lógica de cierre
              onClick={toggleSidebar}
              className="p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Abrir menú principal"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span className="text-xl font-bold text-white">Administrador</span>
            </Link>
          </div>

          {/* Enlaces de Navegación Principales (centrales) */}
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            {/* Otros enlaces principales */}
          </div>

          {/* Sección Derecha: Notificaciones y Menú de Usuario */}
          <div className="flex items-center space-x-3">
            {/* Botón de Notificaciones */}
            <div className="relative" ref={notificationsRef}>
              <button onClick={toggleNotifications} className="p-1 rounded-full text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white relative" aria-label="Ver notificaciones">
                <BellIcon className="h-7 w-7" />
                {unreadNotificationsCount > 0 && (<span className="absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-red-500"><span className="sr-only">{unreadNotificationsCount} notificaciones no leídas</span></span>)}
              </button>
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 max-h-96 overflow-y-auto" role="menu">
                  {/* Contenido del dropdown de notificaciones (sin cambios) */}
                  <div className="px-4 py-3 border-b"><div className="flex justify-between items-center"><p className="text-sm font-medium text-gray-700">Notificaciones</p>{unreadNotificationsCount > 0 && (<button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800">Marcar todas como leídas</button>)}</div></div>
                  <div className="py-1">{notifications.length > 0 ? notifications.map(notif => (<div key={notif.id} className={`px-4 py-3 hover:bg-gray-100 cursor-pointer border-b ${!notif.read ? 'bg-blue-50' : ''}`} onClick={() => markAsRead(notif.id)}><p className={`text-sm font-semibold ${!notif.read ? 'text-gray-800' : 'text-gray-600'}`}>{notif.title}</p><p className={`text-xs ${!notif.read ? 'text-gray-700' : 'text-gray-500'}`}>{notif.message}</p><p className="text-xs text-gray-400 mt-1">{notif.time}</p></div>)) : <p className="text-sm text-gray-500 px-4 py-3">No tienes notificaciones nuevas.</p>}</div>
                  <div className="px-4 py-2 border-t text-center"><Link to="/notifications" onClick={closeAllDropdowns} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver todas las notificaciones</Link></div>
                </div>
              )}
            </div>
            {/* Menú de Usuario */}
            <div className="relative" ref={userDropdownRef}>
              <button onClick={toggleUserDropdown} className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
              </button>
              {isUserDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20" role="menu">
                  {/* Contenido del dropdown de usuario (sin cambios) */}
                  <Link to="/profile" onClick={closeAllDropdowns} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><ProfileUserIcon className="h-5 w-5 mr-2 text-gray-500" />Mi Perfil</Link>
                  <Link to="/settings" onClick={closeAllDropdowns} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><SettingsIcon className="h-5 w-5 mr-2 text-gray-500" />Configuración</Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />Cerrar Sesión</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Panel Lateral (Sidebar) */}
      {/* Backdrop para cerrar el sidebar al hacer clic fuera */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" // Solo en móvil/tablet para que no interfiera con el clic fuera en escritorio si el sidebar no ocupa toda la altura
          onClick={toggleSidebar} 
          aria-hidden="true"
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="sidebar-title" className="text-lg font-semibold text-gray-700">
            Menú Principal Admin
          </h2>
          <button onClick={toggleSidebar} className="p-2 text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4">
          {adminSidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={toggleSidebar} // Cierra el sidebar al hacer clic en un enlace
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 group border-l-4 border-transparent hover:border-blue-500"
            >
              {React.cloneElement(link.icon, { className: `${link.icon.props.className} transition-colors duration-200`})}
              <span className="ml-3">{link.name}</span>
            </Link>
          ))}
        </nav>
        {/* Puedes agregar más contenido al sidebar aquí, como un footer */}
      </div>
    </>
  );
}

export default LoggedInNavbar;