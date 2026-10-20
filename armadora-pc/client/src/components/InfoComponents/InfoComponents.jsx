import React, { useState } from 'react';
import './InfoComponents.css';

// Base de datos de información extensa e imágenes de referencia para cada componente
const detailedData = {
  cpu: {
    title: "Procesador (CPU)",
    icon: "🖥️",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop",
    summary: "El cerebro de tu ordenador, encargado de ejecutar las instrucciones y cálculos del sistema.",
    deepDive: "El CPU (Central Processing Unit) procesa millones de operaciones por segundo. Su rendimiento se mide por la cantidad de núcleos, hilos (threads) y su velocidad de reloj (GHz). Un procesador con más núcleos maneja mucho mejor la multitarea pesada, el diseño 3D, la edición de video y los videojuegos modernos.",
    specs: [
      "Núcleos e Hilos: Más núcleos = mejor multitarea.",
      "Velocidad de Reloj: Mide la rapidez de procesamiento por ciclo.",
      "Socket: Debe coincidir exactamente con el de la placa madre."
    ],
    tip: "Si vas a jugar o renderizar, invierte en un buen procesador, ya que es el único componente que no se puede actualizar fácilmente sin cambiar también la placa madre."
  },
  motherboard: {
    title: "Placa Madre (Motherboard)",
    icon: "🔌",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    summary: "La tarjeta de circuito impreso central que conecta y comunica todos los componentes entre sí.",
    deepDive: "La placa madre alberga el socket del procesador, las ranuras para la memoria RAM, los puertos PCIe para la tarjeta gráfica y los conectores para el almacenamiento y la fuente de poder. También incluye los puertos USB traseros y la tarjeta de sonido/red integrada.",
    specs: [
      "Chipset y Socket: Determinan la compatibilidad con el procesador.",
      "Ranuras de expansión: Para tarjetas gráficas y NVMe.",
      "Formato (ATX, Micro-ATX): Define el tamaño físico y el gabinete compatible."
    ],
    tip: "Elige una placa madre con buenas fases de poder y disipación si planeas usar componentes de gama alta."
  },
  ram: {
    title: "Memoria RAM",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800&auto=format&fit=crop",
    summary: "Memoria de acceso aleatorio que almacena temporalmente los datos de los programas en ejecución.",
    deepDive: "A diferencia del disco duro, la RAM es sumamente rápida pero volátil (se borra al apagar el equipo). Permite que el procesador acceda de forma instantánea a la información de las aplicaciones que tienes abiertas en el momento.",
    specs: [
      "Capacidad (8GB, 16GB, 32GB): Cuanto más tengas, más aplicaciones abiertas podrás mantener sin ralentizaciones.",
      "Velocidad (MHz): Determina la tasa de transferencia de datos.",
      "Generación (DDR4, DDR5): Debe ser compatible con tu placa madre."
    ],
    tip: "Para gaming y uso multitarea actual, 16GB de RAM es el estándar recomendado hoy en día."
  },
  gpu: {
    title: "Tarjeta Gráfica (GPU)",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
    summary: "Procesa y renderiza gráficos, imágenes y videos para mostrarlos en tu monitor.",
    deepDive: "La tarjeta gráfica dedicada cuenta con su propio procesador y memoria VRAM independientes. Es el componente más crítico para videojuegos, modelado 3D, inteligencia artificial y edición de video avanzada.",
    specs: [
      "VRAM (Memoria de video): Esencial para texturas en alta resolución (4K/1080p).",
      "Consumo energético: Suelen requerir fuentes de poder potentes y conectores dedicados.",
      "Sistema de refrigeración: Con ventiladores dobles o triples para evitar el calentamiento."
    ],
    tip: "Asegúrate de que tu gabinete tenga espacio suficiente en largo para alojar la tarjeta gráfica que elijas."
  },
  storage: {
    title: "Almacenamiento (SSD / HDD)",
    icon: "💾",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
    summary: "Guarda permanentemente tu sistema operativo, archivos, juegos y aplicaciones.",
    deepDive: "Existen dos tipos principales: los discos mecánicos tradicionales (HDD), que son económicos pero lentos, y las unidades de estado sólido (SSD NVMe/SATA), que cargan el sistema operativo en segundos y abren programas de forma instantánea.",
    specs: [
      "SSD NVMe M.2: Los más rápidos del mercado actual.",
      "Capacidad (500GB, 1TB, 2TB): Espacio disponible para tus archivos.",
      "Velocidades de lectura/escritura."
    ],
    tip: "Instala siempre tu sistema operativo en un SSD; la diferencia de velocidad frente a un disco duro antiguo es abismal."
  },
  psu: {
    title: "Fuente de Poder (PSU)",
    icon: "🔌",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop",
    summary: "Convierte la corriente alterna de la pared en corriente continua estable para alimentar el PC.",
    deepDive: "Es el corazón energético del sistema. Una fuente de mala calidad puede dañar componentes costosos ante un apagón o suba de tensión. Debe elegirse calculando la suma de vatios (watts) que consumen la tarjeta gráfica, el procesador y el resto de piezas.",
    specs: [
      "Potencia en Vatios (W): 500W, 650W, 750W, etc.",
      "Certificación (80 Plus Bronze, Gold): Mide la eficiencia energética.",
      "Modularidad (Full/Semi modular): Facilita la gestión de cables en el gabinete."
    ],
    tip: "Nunca escatimes presupuesto en la fuente de poder; una fuente confiable protege todo tu hardware."
  }
};

export default function InfoComponents() {
  const [selectedComponentKey, setSelectedComponentKey] = useState(null);

  const activeComponent = selectedComponentKey ? detailedData[selectedComponentKey] : null;

  if (activeComponent) {
    return (
      <div className="component-detail-container">
        <button className="btn-back" onClick={() => setSelectedComponentKey(null)}>
          ← Volver al listado
        </button>

        <div className="detail-header">
          <div className="detail-header-text">
            <span className="detail-icon">{activeComponent.icon}</span>
            <h2>{activeComponent.title}</h2>
          </div>
        </div>

        <div className="detail-banner">
          <img 
            src={activeComponent.image} 
            alt={activeComponent.title} 
            className="detail-img"
          />
        </div>

        <p className="detail-summary"><strong>Resumen:</strong> {activeComponent.summary}</p>
        
        <div className="detail-section">
          <h3>¿Cómo funciona y por qué es importante?</h3>
          <p>{activeComponent.deepDive}</p>
        </div>

        <div className="detail-section">
          <h3>Características clave a tener en cuenta:</h3>
          <ul>
            {activeComponent.specs.map((spec, index) => (
              <li key={index}>📌 {spec}</li>
            ))}
          </ul>
        </div>

        <div className="detail-tip">
          <h4>💡 Consejo útil:</h4>
          <p>{activeComponent.tip}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-components-container">
      <h2>📚 Conoce los Componentes de una PC</h2>
      <p className="info-subtitle">Haz clic en cualquier componente para ver su información detallada e imágenes de referencia.</p>

      <div className="components-grid">
        {Object.entries(detailedData).map(([key, item]) => (
          <div 
            key={key} 
            className="component-card"
            onClick={() => setSelectedComponentKey(key)}
          >
            <div className="card-image-wrapper">
              <img src={item.image} alt={item.title} className="card-img" />
              <span className="card-badge-icon">{item.icon}</span>
            </div>
            <div className="card-body">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="card-link">Ver información extensa →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}