// src/pages/HomePage.jsx
import React from 'react';

// Importa los componentes separados
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection'; 
import Footer from './components/Footer'; // Si tienes un Footer

// Define la URL de la imagen de fondo
const backgroundImageUrl = '/images/bg-home.png'; // Verifica esta ruta

function HomePage() {
  return (
    // Contenedor principal de la página
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      {/* Contenedor que tendrá el fondo y agrupará las secciones */}
      <div
        className="flex-grow relative" // Ocupa el espacio restante
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 50, 0.6), rgba(0, 0, 50, 0.6)), url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' // Opcional: Efecto Parallax
        }}
      >
        {/* Renderiza la sección Hero */}
        <HeroSection />

        {/* Renderiza la sección Features */}
        <FeaturesSection />

        {/* Puedes añadir más secciones aquí que compartan el mismo fondo */}

      </div> 

      {/* Renderiza el Footer si lo tienes */}
      <Footer /> 

    </div>
  );
}

export default HomePage;