import React from 'react';
import './AssemblyGuide.css';

export default function AssemblyGuide() {
  const steps = [
    {
      title: '1. Preparar la Placa Madre fuera del gabinete',
      description: 'Coloca la placa madre sobre su caja antiestática. Abre el socket del CPU, inserta el procesador con cuidado alineando el triángulo de orientación y cierra la palanca de fijación.'
    },
    {
      title: '2. Instalar la Memoria RAM y Almacenamiento M.2',
      description: 'Abre las pestañas de las ranuras RAM e inserta los módulos presionando con firmeza hasta escuchar un "click". Si usas un SSD M.2, insértalo a 30 grados y asegúralo con su tornillo.'
    },
    {
      title: '3. Montar el Cooler del Procesador',
      description: 'Aplica una pequeña gota de pasta térmica sobre el procesador (si el disipador no la trae preaplicada) y fija el sistema de refrigeración conectando el cable al puerto CPU_FAN.'
    },
    {
      title: '4. Instalar la Fuente de Poder y Montar la Placa Madre',
      description: 'Atornilla la fuente de poder en la parte inferior del gabinete. Luego coloca los separadores metálicos e instala la placa madre dentro del chasis ajustando sus tornillos.'
    },
    {
      title: '5. Conectar Cables y Tarjeta Gráfica (GPU)',
      description: 'Conecta la energía de la placa madre (24 pines) y CPU (8 pines). Inserta la GPU en la ranura PCIe superior y conecta sus cables PCIe de energía desde la fuente.'
    }
  ];

  return (
    <div className="guide-container">
      <div className="guide-header">
        <h2>🛠️ Guía Paso a Paso para Armar tu PC</h2>
        <p>Sigue estas instrucciones en orden para ensamblar tu computadora de forma segura.</p>
      </div>

      <div className="steps-list">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <span className="step-number">Paso {index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}