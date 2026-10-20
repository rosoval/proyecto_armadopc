import React, { useState } from 'react';
import './AssemblyGuide.css';

const stepsData = [
  {
    id: 1,
    title: 'Paso 1: Desempaquetado y Preparación del Espacio',
    summary: 'Organiza una superficie limpia, amplia y libre de estática para sacar todos tus componentes.',
    description: 'Despeja una mesa grande de madera o vidrio. Abre con cuidado las cajas de cada componente y colócalos sobre sus respectivas cajas de cartón (nunca sobre alfombras ni directamente sobre las bolsas antiestáticas por fuera). Ten a mano un destornillador de estrella (Philips #2), iluminación adecuada y bandejas para organizar los tornillos.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=191s', // 3:11
    timeLabel: 'Minuto 3:11',
    tips: [
      'Guarda todas las cajas y manuales en caso de necesitar garantías más adelante.',
      'Evita usar ropa de lana o trabajar sobre superficies que acumulen electricidad estática.'
    ]
  },
  {
    id: 2,
    title: 'Paso 2: Instalación de la Fuente de Poder (PSU)',
    summary: 'Coloca la fuente de energía en la parte inferior del gabinete y asegura sus tornillos.',
    description: 'Retira los paneles laterales de tu gabinete. Toma la fuente de poder e introdúcela en el compartimento inferior. Orienta su ventilador hacia abajo (si el chasis tiene rejilla con filtro inferior) o hacia arriba según el diseño de tu gabinete. Fíjala a la parte trasera utilizando los cuatro tornillos correspondientes.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=1181s', // 19:41
    timeLabel: 'Minuto 19:41',
    tips: [
      'Si tu fuente es modular, conecta solo los cables que vayas a necesitar para evitar exceso de cables molestos.',
      'Deja los cables sueltos hacia el lado trasero del gabinete para mantener el orden.'
    ]
  },
  {
    id: 3,
    title: 'Paso 3: Instalación del Procesador (CPU)',
    summary: 'Monta el procesador en el zócalo de la placa madre antes de colocarla en el gabinete.',
    description: 'Coloca la placa madre sobre su propia caja de cartón. Levanta la palanca metálica del zócalo del CPU. Sostén el procesador por los bordes (sin tocar los contactos dorados inferiores). Busca el triángulo dorado impreso en una esquina del CPU y hazlo coincidir exactamente con el triángulo indicador del zócalo. Deja caer el procesador con suavidad sin hacer presión y baja la palanca hasta trabarla.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=244s', // 4:04
    timeLabel: 'Minuto 4:04',
    tips: [
      'El procesador debe encajar por su propio peso; jamás lo forces.',
      'Guarda la tapita plástica protectora del zócalo por si alguna vez necesitas tramitar garantía.'
    ]
  },
  {
    id: 4,
    title: 'Paso 4: Instalación de la Memoria RAM',
    summary: 'Inserta los módulos de memoria RAM en las ranuras correctas de la placa madre.',
    description: 'Abre los pestillos plásticos de los extremos de las ranuras DIMM de la memoria. Alinea la muesca central de tu memoria RAM con la pestaña divisoria de la ranura para asegurarte de que no quede al revés. Si usas 2 módulos, colócalos habitualmente en el 2° y 4° slot (A2 y B2) contando desde el procesador. Presiona con firmeza y de forma pareja en ambos extremos hasta escuchar un "clic" que indica que los pestillos cerraron solos.',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=572s', // 9:32
    timeLabel: 'Minuto 9:32',
    tips: [
      'Consulta el manual de tu placa madre para confirmar cuáles son los slots prioritarios (Dual Channel).',
      'Asegúrate de que ambos extremos queden firmemente asegurados.'
    ]
  },
  {
    id: 5,
    title: 'Paso 5: Instalación del Almacenamiento (M.2, SSD y HDD)',
    summary: 'Coloca los discos de estado sólido ultrarrápidos y los discos mecánicos tradicionales.',
    description: 'Para unidades M.2: insértalas en la ranura PCIe a unos 30 grados, bájalas y fíjalas con su tornillo o pestillo rápido (retirando antes el film protector del disipador de la placa). Para discos mecánicos (HDD) de 3.5 pulgadas y SSD SATA de 2.5 pulgadas: deslízalos en los compartimentos o bandejas dedicadas del gabinete y asegúralos con sus tornillos para evitar vibraciones.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=632s', // 10:32
    timeLabel: 'Minuto 10:32',
    tips: [
      'Utiliza el slot M.2 más cercano al procesador para instalar el sistema operativo.',
      'Los discos HDD tradicionales son ideales para guardar archivos pesados y multimedia.'
    ]
  },
  {
    id: 6,
    title: 'Paso 6: Montaje del Disipador del Procesador',
    summary: 'Aplica pasta térmica y coloca el enfriador para mantener bajas las temperaturas del CPU.',
    description: 'Si tu disipador no trae pasta térmica preaplicada, coloca una pequeña gota (tamaño de un grano de arroz) en el centro del procesador. Apoya el disipador alineando sus anclajes con los agujeros de la placa madre y aprieta los tornillos de manera cruzada y progresiva para repartir la presión uniformemente. Conecta el cable del ventilador al puerto marcado como CPU_FAN.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=764s', // 12:44
    timeLabel: 'Minuto 12:44',
    tips: [
      '¡No olvides retirar la pegatina plástica protectora que viene en la base de cobre del disipador!',
      'El conector CPU_FAN es obligatorio para que el sistema no marque error al encender.'
    ]
  },
  {
    id: 7,
    title: 'Paso 7: Montaje de la Placa Madre en el Gabinete',
    summary: 'Instala la placa madre ya equipada dentro del chasis del gabinete.',
    description: 'Verifica que los soportes metálicos (standoffs) estén bien ubicados en la bandeja del gabinete según el tamaño de tu placa. Coloca el escudo I/O trasero en el chasis (si no viene integrado). Introduce la placa madre inclinada con cuidado, alinea sus puertos con el protector trasero, apóyala sobre los soportes y atorníllala firmemente sin excederte en la fuerza.',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=958s', // 15:58
    timeLabel: 'Minuto 15:58',
    tips: [
      'Revisa que no quede ningún soporte metálico suelto debajo de la placa madre para evitar cortocircuitos.',
      'Sostén la placa de los bordes al ingresarla al gabinete.'
    ]
  },
  {
    id: 8,
    title: 'Paso 8: Conexión de Cables Internos y Panel Frontal',
    summary: 'Conecta la energía de la fuente, los discos y los botones del panel frontal.',
    description: 'Pasa los cables de la fuente por los orificios del gabinete. Conecta el cable principal ATX de 24 pines y el cable de energía del CPU de 8 pines. Si usas discos mecánicos o SSDs SATA, conéctales su cable de datos SATA hacia la placa y su cable de energía de la fuente. Conecta los cables del panel frontal (Power SW, Reset SW, USB, Audio) guiándote con el manual de la placa.',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=1419s', // 23:39
    timeLabel: 'Minuto 23:39',
    tips: [
      'Asegúrate de que los conectores principales hagan un "clic" al entrar por completo.',
      'El botón de encendido (Power SW) suele ir en los pines inferiores derechos del panel frontal.'
    ]
  },
  {
    id: 9,
    title: 'Paso 9: Instalación de la Tarjeta Gráfica (GPU)',
    summary: 'Coloca la tarjeta de video en su ranura PCIe y conéctala a la fuente de poder.',
    description: 'Retira las tapas metálicas traseras del gabinete que correspondan a las ranuras de expansión. Baja la pestaña de seguridad de la ranura PCIe superior x16. Inserta la tarjeta gráfica firmemente hasta que la pestaña trabe por sí sola. Atornilla el soporte de la GPU al chasis del gabinete y conéctale los cables de energía PCIe provenientes de la fuente.',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=1881s', // 31:21
    timeLabel: 'Minuto 31:21',
    tips: [
      'El cable de tu monitor (HDMI o DisplayPort) debe conectarse directamente a la tarjeta gráfica y nunca a la placa madre.',
      'Si tu tarjeta de video es grande y pesada, utiliza un soporte (anti-sag) para evitar doblar la ranura.'
    ]
  },
  {
    id: 10,
    title: 'Paso 10: Primer Encendido, BIOS y Cierre del Equipo',
    summary: 'Enciende la PC por primera vez, configura la BIOS, instala el sistema y cierra el gabinete.',
    description: 'Conecta el cable de corriente a la fuente, enciende su interruptor trasero y presiona el botón de encendido frontal. Presiona "Delete" o "F2" repetidamente para entrar a la BIOS, verifica que reconozca la memoria RAM y los discos, activa el perfil de memoria XMP/EXPO y configura el orden de arranque para instalar el sistema operativo desde un pendrive. Una vez todo funcione, apaga el equipo, ordena los cables con precintos y cierra los paneles.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=omrvbgiyyOQ&t=1990s', // 33:10
    timeLabel: 'Minuto 33:10',
    tips: [
      'El primer encendido en plataformas modernas puede demorar un par de minutos reconociendo componentes.',
      'Ordena bien los cables traseros para asegurar un buen flujo de aire y estética.'
    ]
  }
];

export default function AssemblyGuide() {
  const [selectedStep, setSelectedStep] = useState(null);

  if (selectedStep) {
    return (
      <div className="assembly-guide-container">
        <button className="btn-back" onClick={() => setSelectedStep(null)}>
          ← Volver a todos los pasos
        </button>

        <div className="step-detail-container">
          <div className="step-detail-header">
            <span className="step-number">Paso 0{selectedStep.id} de 10</span>
            <h2>{selectedStep.title}</h2>
          </div>

          <p className="step-description">{selectedStep.description}</p>

          <div className="media-container">
            <div className="media-box">
              <h4>📸 Imagen de referencia</h4>
              <img src={selectedStep.image} alt={selectedStep.title} className="detail-img" />
            </div>

            <div className="media-box">
              <h4>🎥 Video demostrativo ({selectedStep.timeLabel})</h4>
              <div className="video-card-box">
                <p>
                  Este video se abrirá directamente en YouTube en el minuto exacto correspondiente a este paso.
                </p>
                <a 
                  href={selectedStep.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-youtube"
                >
                  ▶ Ver video en YouTube ({selectedStep.timeLabel})
                </a>
              </div>
            </div>
          </div>

          <div className="tips-box">
            <h4>💡 Consejos clave y advertencias</h4>
            <ul>
              {selectedStep.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="assembly-guide-container">
      <h2>🛠️ Guía Paso a Paso para Armar tu PC</h2>
      <p className="assembly-subtitle">
        Tutorial secuencial definitivo en 10 etapas lógicas. Haz clic en cualquier paso para ver los detalles, imágenes y enlaces directos al video en sus minutos exactos.
      </p>

      <div className="steps-grid">
        {stepsData.map((step) => (
          <div key={step.id} className="step-card" onClick={() => setSelectedStep(step)}>
            <span className="step-number">Paso {step.id < 10 ? `0${step.id}` : step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
            <span className="card-link">Ver paso a paso ({step.timeLabel}) →</span>
          </div>
        ))}
      </div>
    </div>
  );
}