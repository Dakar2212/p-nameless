// src/stores/authStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Para persistir el estado

// URL base de tu API Laravel
const API_URL = 'http://127.0.0.1:8000/api/auth';

const useAuthStore = create(
  persist( // Usamos persist para guardar el estado en localStorage y mantener la sesión
    (set, get) => ({
      // Estado inicial
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Acción para el Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || data.error || 'Error al iniciar sesión.');
          }

          // Login exitoso
          set({
            token: data.access_token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          // Opcional: Guardar el token en localStorage si no usas el middleware persist
          // localStorage.setItem('authToken', data.access_token);
          // localStorage.setItem('authUser', JSON.stringify(data.user));

          return data; // Devuelve los datos para manejo adicional si es necesario
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
          });
          throw error; // Lanza el error para que el componente lo pueda capturar
        }
      },

      // Acción para el Registro (similar a tu handleRegister anterior)
      register: async (userData) => { // userData es un objeto FormData
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
              // NO establezcas 'Content-Type' aquí cuando uses FormData,
              // el navegador lo hará automáticamente con el boundary correcto.
              'Accept': 'application/json',
            },
            body: userData, // userData ya es un objeto FormData
          });

          const data = await response.json();

          if (!response.ok) {
            let errorMessage = data.message || 'Ocurrió un error en el registro.';
            if (data.errors) {
              const errorsArray = Object.values(data.errors).flat();
              errorMessage = errorsArray.join(' ');
            }
            throw new Error(errorMessage);
          }

          // Registro exitoso
          set({ isLoading: false, error: null });
          // Opcional: Si tu API de registro devuelve un token y datos de usuario para auto-login:
          // set({ token: data.access_token, user: data.user, isAuthenticated: true, isLoading: false });
          // localStorage.setItem('authToken', data.access_token);
          // localStorage.setItem('authUser', JSON.stringify(data.user));
          return data; // Devuelve los datos para un mensaje de éxito, etc.
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Acción para el Logout
      logout: async () => {
        set({ isLoading: true });
        const token = get().token; // Obtener el token actual del store

        try {
          if (token) {
            console.log(token)
            await fetch(`${API_URL}/logout`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              },
            });
          }
        } catch (error) {
          // Incluso si el logout de la API falla, limpiamos el estado local
          console.error('Error en el logout de la API, limpiando localmente:', error);
        } finally {
          // Limpiar estado y localStorage independientemente del resultado de la API
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          // Opcional: Limpiar localStorage si no usas el middleware persist
          // localStorage.removeItem('authToken');
          // localStorage.removeItem('authUser');
        }
      },
      
      // Acción para establecer el token (útil si se maneja fuera o se refresca)
      setToken: (token) => {
        set({ token });
      },

      // Acción para establecer el usuario (útil después de un fetch al perfil)
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      // Acción para inicializar el estado desde localStorage (si no se usa persist)
      // o para verificar el token actual con el backend
      checkAuth: async () => {
        // Esta función es más útil si no usas el middleware `persist` para el token.
        // Con `persist`, el token y el usuario ya se cargan desde localStorage.
        // Lo que podrías hacer aquí es validar el token contra el endpoint '/me'
        const token = get().token;
        if (token) {
          set({ isLoading: true });
          try {
            const response = await fetch(`${API_URL}/me`, {
              method: 'POST', // o GET, según tu API
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              },
            });
            if (!response.ok) {
              // Si el token no es válido, desloguear
              throw new Error('Token inválido o expirado');
            }
            const user = await response.json();
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error) {
            console.error("Error al verificar token:", error);
            // El token no es válido, limpiar
            get().logout(); // Llama a la acción de logout para limpiar todo
          }
        }
      }
    }),
    {
      name: 'auth-storage', // nombre del item en localStorage
      storage: createJSONStorage(() => localStorage), // (opcional) por defecto usa localStorage
      // partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }), // Guarda solo estas partes
    }
  )
);

export default useAuthStore;