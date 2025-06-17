// src/components/NotificationsDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Notificaciones temporales de ejemplo. En una app real, esto vendría de una API o un store.
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nueva Tarea Asignada', message: 'Se te ha asignado la tarea "Revisar reporte mensual".', read: false, time: 'Hace 5 min' },
    { id: 2, title: 'Mantenimiento Programado', message: 'El sistema estará en mantenimiento mañana a las 2 AM.', read: true, time: 'Hace 2 horas' },
    { id: 3, title: 'Recordatorio de Reunión', message: 'Tienes una reunión con el equipo de ventas en 30 minutos.', read: false, time: 'Hace 1 día' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Lógica para cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    // Aquí iría una llamada a la API para marcarla como leída en el backend.
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    // Aquí iría una llamada a la API.
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-1 rounded-full text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white relative"
        aria-label="Ver notificaciones"
      >
        <BellIcon className="h-7 w-7" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-red-500">
            <span className="sr-only">{unreadCount} notificaciones no leídas</span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">Notificaciones</p>
              {unreadCount > 0 && (
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
                  onClick={() => markAsRead(notif.id)}
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
            <Link to="/notifications" onClick={() => setIsOpen(false)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todas las notificaciones
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;