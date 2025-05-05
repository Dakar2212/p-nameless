// src/pages/LoginPage.jsx

// 1. Importar React y Hooks necesarios
import React, { useState } from 'react'; // useState es el Hook para manejar el estado del componente
// import { useNavigate } from 'react-router-dom'; // Descomenta si ya configuraste React Router y quieres navegar después del login

// 2. Definir el Componente Funcional
// Los componentes en React moderno son usualmente funciones que retornan JSX.
function LoginPage() {
  // 3. Declarar el Estado para los Inputs
  // Usamos useState para "recordar" lo que el usuario escribe en los campos.
  // useState devuelve un array: [valorActual, funcionParaActualizarElValor]
  const [email, setEmail] = useState(''); // Estado para el campo email, inicia vacío
  const [password, setPassword] = useState(''); // Estado para el campo contraseña, inicia vacío

  // Descomenta si necesitas navegar:
  // const navigate = useNavigate(); 

  // 4. Crear Manejadores de Eventos
  // Esta función se ejecutará cada vez que el usuario escriba en el input de email.
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Actualiza el estado 'email' con el valor actual del input
  };

  // Esta función se ejecutará cada vez que el usuario escriba en el input de contraseña.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Actualiza el estado 'password' con el valor actual del input
  };

  // Esta función se ejecutará cuando el usuario envíe el formulario (click en el botón o Enter)
  const handleSubmit = (event) => {
    event.preventDefault(); // ¡Muy importante! Evita que la página se recargue al enviar el formulario.
    // Aquí pondrías la lógica real de login (llamar a una API, etc.)
    console.log('Intentando iniciar sesión con:');
    console.log('Email:', email);
    console.log('Password:', password);
    alert(`Login attempt with Email: ${email}`); // Mostramos una alerta simple por ahora

    // Aquí podrías navegar a otra página si el login es exitoso:
    // if (loginFueExitoso) {
    //   navigate('/dashboard'); // O la ruta que tengas definida
    // }
  };

  // 5. Retornar el JSX (la estructura HTML que se verá)
  // Usamos etiquetas HTML estándar pero con 'className' en lugar de 'class' para estilos CSS (Tailwind).
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centra el contenido */}
      <div className="p-8 bg-white shadow-md rounded-lg"> {/* Caja del formulario */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        
        {/* El formulario llama a handleSubmit cuando se envía */}
        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email} // El valor del input está LIGADO al estado 'email'
              onChange={handleEmailChange} // Llama a handleEmailChange cuando el valor cambia
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" // Clases Tailwind
              required // Hace el campo obligatorio en HTML5
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password} // El valor del input está LIGADO al estado 'password'
              onChange={handlePasswordChange} // Llama a handlePasswordChange cuando el valor cambia
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" // Clases Tailwind
              required // Hace el campo obligatorio en HTML5
            />
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300" // Clases Tailwind
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

// 6. Exportar el componente para poder usarlo en otros archivos (como App.jsx)
export default LoginPage;