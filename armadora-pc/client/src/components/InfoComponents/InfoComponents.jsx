import React from 'react';
import './InfoComponents.css'; // <--- Estilos separados correctamente

export default function InfoComponents() {
  const pcParts = [
    {
      name: 'Procesador (CPU)',
      description: 'Es el cerebro de la computadora. Se encarga de procesar todas las instrucciones y cálculos necesarios para que el sistema y los programas funcionen.'
    },
    {
      name: 'Placa Madre (Motherboard)',
      description: 'La tarjeta de circuito impreso principal que conecta y comunica todos los componentes entre sí (CPU, memoria RAM, tarjeta gráfica, almacenamiento).'
    },
    {
      name: 'Memoria RAM',
      description: 'Memoria de acceso aleatorio. Almacena temporalmente los datos de los programas que estás usando en el momento para un acceso ultrarrápido.'
    },
    {
      name: 'Tarjeta Gráfica (GPU)',
      description: 'Componente dedicado al procesamiento de imágenes, video y renderizado 3D. Es vital para gaming, edición y diseño gráfico.'
    },
    {
      name: 'Almacenamiento (SSD / HDD)',
      description: 'El lugar donde se guardan permanentemente tus archivos, sistema operativo y videojuegos de forma segura.'
    },
    {
      name: 'Fuente de Poder (PSU)',
      description: 'La encargada de transformar la corriente eléctrica del tomacorriente y suministrar la energía estable y segura que necesita cada pieza del PC.'
    }
  ];

  return (
    <div className="info-container">
      <div className="info-header">
        <h2>¿Qué hace cada componente?</h2>
        <p>Conoce las piezas fundamentales que conforman una computadora antes de empezar a armarla.</p>
      </div>

      <div className="components-grid">
        {pcParts.map((part, index) => (
          <div key={index} className="component-card">
            <h3>{part.name}</h3>
            <p>{part.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}