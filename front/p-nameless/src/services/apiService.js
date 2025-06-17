// src/services/apiService.js

import useAuthStore from '../stores/authStore';

const API_URL = 'http://127.0.0.1:8000/api'; // URL base de tu API

// Función auxiliar para realizar peticiones autenticadas
const fetchWithAuth = async (endpoint, options = {}) => {
  // Obtenemos el token directamente del store de Zustand
  const token = useAuthStore.getState().token;

  // Preparamos las cabeceras por defecto
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers, // Permite sobreescribir o añadir cabeceras
  };

  // Si tenemos un token, lo añadimos a la cabecera de Autorización
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Construimos la petición final
  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  // Si la respuesta no es OK, intentamos parsear el error y lo lanzamos
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Intenta parsear JSON, si falla, devuelve objeto vacío
    throw new Error(errorData.message || `Error en la petición a ${endpoint}`);
  }

  // Si la respuesta es 204 No Content (común en deletes), no hay JSON que parsear
  if (response.status === 204) {
    return null;
  }

  // Devolvemos los datos de la respuesta en formato JSON
  return response.json();
};

// --- Definimos las funciones específicas para cada endpoint ---

// Obtener el perfil del usuario autenticado
export const fetchUserProfile = () => {
  return fetchWithAuth('auth/me', { method: 'POST' }); // Tu ruta 'me' es POST
};

// Ejemplo para una futura función: obtener tareas
// export const fetchTasks = () => {
//   return fetchWithAuth('tasks'); // Asume GET a /api/tasks
// };

// Ejemplo para crear una tarea
// export const createTask = (taskData) => {
//   return fetchWithAuth('tasks', {
//     method: 'POST',
//     body: JSON.stringify(taskData),
//   });
// };