// src/components/HeroSection.jsx
import React from 'react';
// Asegúrate que la ruta de importación sea correcta desde /components
import QuoteForm from './QuoteForm'; 

function HeroSection() {
  return (
    // Usamos <section> y añadimos padding vertical y horizontal
    <section className="flex items-center justify-center px-8 sm:px-12 lg:px-16 py-16 md:py-24">
      {/* Contenedor principal de esta sección - SIN container mx-auto, con w-full */}
      <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Sección Izquierda (Texto) */}
        <div className="md:w-1/2 text-white text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Mejora la gestión y comunicación de tu condominio de forma simple, rápida y transparente
          </h1>
          <p className="text-lg lg:text-xl text-gray-200">
            Mejora la gestión y comunicación de tu apartamento y/o condominio de forma eficiente, segura y transparente.
          </p>
        </div>

        {/* Sección Derecha (Formulario) */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          {/* Renderizamos el componente del formulario */}
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;