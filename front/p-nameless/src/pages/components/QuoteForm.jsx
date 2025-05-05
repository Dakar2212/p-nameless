// src/components/QuoteForm.jsx
import React, { useState } from 'react';

function QuoteForm() {
  // Estado simple para los campos (opcional por ahora, pero útil para después)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    cargo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío de los datos del formulario
    console.log('Datos del formulario:', formData);
    alert('Cotización enviada (simulado)');
  };

  return (
    // Contenedor azul con padding, sombra y bordes redondeados
    <div className="bg-blue-600 p-8 rounded-lg shadow-xl text-white w-full max-w-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Cotiza y mejora la administración en tu propiedad horizontal
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Grid para colocar los inputs en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          {/* Numero de telefono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-1">Numero de telefono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          {/* Correo Electronico */}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium mb-1">Correo Electronico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          {/* Selecciona tu cargo */}
          <div>
            <label htmlFor="cargo" className="block text-sm font-medium mb-1">Selecciona tu cargo</label>
            <select
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white bg-no-repeat bg-right pr-8" // appearance-none para estilo custom de flecha si quieres
              required
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }} // Flecha simple SVG como background
            >
              <option value="">-- Elige uno --</option>
              <option value="administrador">Administrador</option>
              <option value="residente">Residente</option>
              <option value="consejo">Miembro del Consejo</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300"
        >
          Pedir Cotizacion
        </button>
      </form>
    </div>
  );
}

export default QuoteForm;