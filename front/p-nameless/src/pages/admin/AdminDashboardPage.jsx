// src/pages/AdminDashboardPage.jsx  <-- Sugiero renombrar el archivo si es posible

import React from 'react';
// Quitamos useNavigate y Link si no se usan directamente aquí
// La lógica de navegación y logout debería estar en la Navbar

// --- CORRECCIÓN DE LA IMPORTACIÓN ---
import AdminPage from '../components/AdminPage'; // Importación sin llaves {}

// --- CORRECCIÓN DEL NOMBRE DE LA FUNCIÓN ---
function AdminDashboardPage() {
  // La lógica de 'handleLogout' no debería vivir aquí,
  // sino en el componente que tiene el botón de logout (ej. LoggedInNavbar.jsx).
  // Al moverla, este componente se vuelve más simple y enfocado.

  return (
    // Asumo que AdminPage es un componente de layout o contenido
    // que quieres renderizar aquí.
    <AdminPage>
        {/* Aquí podrías pasarle hijos al componente AdminPage si está diseñado para eso,
            por ejemplo, las diferentes secciones del panel de admin. */}
        <h1 className="text-2xl font-bold">Contenido Principal del Admin Dashboard</h1>
        <p>Estadísticas, tablas, etc.</p>
    </AdminPage>
  );
}

// --- CORRECCIÓN DEL NOMBRE DE EXPORTACIÓN (para que coincida con la función) ---
export default AdminDashboardPage;