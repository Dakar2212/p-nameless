// src/pages/RegisterPage.jsx (o renombra tu LoginPageV2.jsx)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importa íconos necesarios
import { ArrowRightIcon, BuildingOfficeIcon, UserIcon, EnvelopeIcon, LockClosedIcon, IdentificationIcon, PhoneIcon, PhotoIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../stores/authStore'; // Asegúrate de que la ruta sea correcta

// URL de la imagen de fondo (ajústala a tu ruta real en /public)
const backgroundImageUrl = '/images/background-houses.jpg';
// Número de WhatsApp para soporte (¡Reemplázalo con el número real!)
const whatsappSupportNumber = '573001234567'; // Ejemplo: código de país + número

// Ícono de WhatsApp (sin cambios)
function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-7 h-7">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 221.9-99.6 221.9-222 .1-59.3-23.1-115-64.9-157zm-157 .9c101.1 0 183.3 82.1 183.3 183.2 0 52.4-21.2 100.5-56.6 135.8l-10.1 9.9-69.3 18.1-71.1-17.6-10.8-10.5c-34.4-33.7-53.7-79.1-53.7-127.2 0-101.1 82.1-183.2 183.2-183.2zM223.9 118.9c-59.6 0-107.9 48.4-107.9 108 0 29.7 12.2 56.8 32.5 76.6l5.6 5.5-20.3 53.3 54.4-19.8 6.1 5.7c22.5 17.1 49.1 26.7 77.7 26.7 59.7 0 108-48.4 108-108 0-59.7-48.4-108-108-108zm-48.7 144.8c-2.8-.9-16.9-8.3-19.5-9.3s-4.5-1.5-6.4 1.5c-1.9 3-7.4 9.3-9 11.1s-3.3 1.9-6.1 1.1c-2.8-.8-11.9-4.4-22.7-14.1s-18.2-21.7-20.3-25.4c-2.1-3.7-.2-5.7 1.3-7.4s3-2.2 4.5-3.4c1.5-1.2 1.9-2.1 2.8-3.7s.4-2.8-.2-3.7c-.6-.9-6.4-15.4-8.7-21.1s-4.7-5.1-6.4-5.1c-1.7 0-3.7-.2-5.5-.2s-4.8 1.1-7.4 5.7c-2.6 4.6-10 12.3-10 29.9s10.2 34.7 11.7 37.1c1.5 2.4 20.1 30.8 49.2 43.4 21.8 9.3 30.8 8.3 36.5 7.9 5.7-.4 16.9-6.9 19.3-13.6s2.4-12.4 1.6-13.6c-.8-1.2-2.8-.9-5.5-.9z" />
    </svg>
  );
}

function RegisterPage() { // Cambiado el nombre de la función
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    documento_identidad: '',
    telefono: '',
    foto_perfil: null, // Para el archivo de imagen
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
 
  const navigate = useNavigate();

  const registerAction = useAuthStore(state => state.register);
  const isLoading = useAuthStore(state => state.isLoading);


  
  const handleChange = (e) => {
    if (e.target.name === 'foto_perfil') {
      setFormData({ ...formData, foto_perfil: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Usamos los nombres de las funciones de estado que sí existen: setError y setSuccessMessage
    setError(null);
    setSuccessMessage('');

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('email', formData.email);
    dataToSend.append('password', formData.password);
    dataToSend.append('password_confirmation', formData.password_confirmation);
    dataToSend.append('documento_identidad', formData.documento_identidad);
    dataToSend.append('telefono', formData.telefono);
    if (formData.foto_perfil) {
      dataToSend.append('foto_perfil', formData.foto_perfil);
    }

    try {
      const responseData = await registerAction(dataToSend);

      setSuccessMessage(responseData.message || '¡Registro exitoso!');
      setFormData({ 
          name: '', email: '', password: '', password_confirmation: '',
          documento_identidad: '', telefono: '', foto_perfil: null,
      });

    } catch (error) {
      // Usamos setError para mostrar el error que viene del store.
      setError(error.message || 'No se pudo conectar con el servidor.');
    }
};

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(200, 220, 255, 0.3), rgba(200, 200, 255, 0.3)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-blue-100 bg-opacity-80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg text-center"> {/* Ajustado max-w-lg para más espacio */}
        
        <div className="flex flex-col items-center mb-4">
          <BuildingOfficeIcon className="h-12 w-12 md:h-14 md:w-14 text-blue-700 mb-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">E-Admin</h1>
        </div>

        {/* Títulos del Formulario */}
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Crear Cuenta</h2>
        <p className="text-sm text-gray-600 mb-5">Ingresa tus datos para registrarte</p>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4"> {/* Añadido space-y-4 para espaciado entre campos */}
          
          {/* Nombre Completo */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nombre Completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>
          
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Documento de Identidad */}
          <div>
            <input
              type="text"
              name="documento_identidad"
              placeholder="Documento de Identidad"
              value={formData.documento_identidad}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>
          
          {/* Contraseña */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirmar Contraseña"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Foto de Perfil */}
          <div className="text-left">
            <label htmlFor="foto_perfil" className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil (opcional)</label>
            <input
              type="file"
              name="foto_perfil"
              id="foto_perfil"
              onChange={handleChange}
              accept="image/*" // Aceptar solo imágenes
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          {/* Mensajes de error y éxito */}
          {error && <p className="text-red-500 text-sm -mb-2">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm -mb-2">{successMessage}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-md mt-2"
          >
            <span>{isLoading ? 'Registrando...' : 'Registrarme'}</span>
            {!isLoading && <ArrowRightIcon className="h-5 w-5"/>}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Inicia Sesión
          </Link> 
        </p>
      </div>

      <a
        href={`https://wa.me/${whatsappSupportNumber}?text=Hola%2C%20necesito%20ayuda%20con%20el%20registro%20en%20E-Admin.`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition duration-300 transform hover:scale-110"
        aria-label="Contactar Soporte por WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

export default RegisterPage; // Cambiado el nombre de exportación