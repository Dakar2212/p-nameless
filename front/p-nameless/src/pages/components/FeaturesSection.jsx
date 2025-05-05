// src/components/FeaturesSection.jsx
import React from 'react';
// Importa los íconos que usaremos (outline style)
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon, // Alternativa para Banco
  ArchiveBoxIcon,     // Alternativa para Paqueteria
  UserGroupIcon,      // Alternativa para Control Acceso
  WrenchScrewdriverIcon, // Alternativa para Mantenimientos
  ChatBubbleLeftRightIcon, // Alternativa para Mensajeria
  CalendarDaysIcon,    // Alternativa para Reserva
} from '@heroicons/react/24/outline';

// Datos de las características para mapear fácilmente
const features = [
  { name: 'Planillas', icon: DocumentTextIcon },
  { name: 'Gastos comunes', icon: CurrencyDollarIcon },
  { name: 'Banco', icon: BuildingOfficeIcon },
  { name: 'Paqueteria', icon: ArchiveBoxIcon },
  { name: 'Control de acceso', icon: UserGroupIcon },
  { name: 'Mantenimientos', icon: WrenchScrewdriverIcon },
  { name: 'Mensajeria', icon: ChatBubbleLeftRightIcon },
  { name: 'Reserva de instalaciones', icon: CalendarDaysIcon },
];

function FeaturesSection() {
  return (
    // Usamos py-16 o py-20 para darle espacio vertical
    <section className="py-20 px-4"> 
      <div className="container mx-auto text-center">
        {/* Título y Descripción */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Controla la gestión de tu edificio con el Software líder del mercado
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          E-Admin te brinda todo lo que necesitas para tener la administración de tu residencia o edificio online.
        </p>
        <p className="text-md md:text-lg text-gray-300 max-w-4xl mx-auto mb-16">
          Desde tus gastos comunes, planillas, mensajería, informes y control de acceso hasta la notificación de encomiendas y la reservas de instalaciones.
        </p>

        {/* Cuadrícula de Características */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-12">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center">
              {/* Ícono */}
              <feature.icon 
                className="h-16 w-16 md:h-20 md:w-20 text-white mb-3" 
                aria-hidden="true" 
              />
              {/* Nombre de la Característica */}
              <h3 className="text-md md:text-lg font-medium text-white">
                {feature.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;