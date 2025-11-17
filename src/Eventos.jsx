import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Eventos.css';

const TITLE_IMAGE_URL = "https://i.imgur.com/kmYbq6a.png";

const DATOS_EVENTOS = {
  'SURF': {
    texto: 'Producimos y apoyamos eventos de surf, skate y lo que se asocie a nuestro estilo de vida.',
    imagenPrincipal: 'https://i.imgur.com/kmYbq6a.png',
    imagenesSecundarias: [
      'https://f.fcdn.app/imgs/966ca3/laisla.com.uy/isl/9eda/webp/recursos/2486/0x0/eventos3.jpg',
      'https://f.fcdn.app/imgs/08461d/laisla.com.uy/isl/0978/webp/recursos/2485/0x0/eventos1.jpg',
      'https://f.fcdn.app/imgs/2c1b4d/laisla.com.uy/isl/ecb4/webp/recursos/2487/0x0/eventos2.jpg'
    ]
  },
  'SKATE': {
    texto: 'Producimos y apoyamos eventos de surf, skate y lo que se asocie a nuestro estilo de vida.',
    imagenPrincipal: 'https://i.imgur.com/kmYbq6a.png',
    imagenesSecundarias: [
      'https://f.fcdn.app/imgs/5da9f4/laisla.com.uy/isl/dbba/webp/recursos/2484/0x0/evento6.jpg',
      'https://i.imgur.com/u958QMP.jpeg',
      'https://i.imgur.com/gtRwYQP.jpeg'
    ]
  },
  'OTROS': {
    texto: 'Producimos y apoyamos eventos de surf, skate y lo que se asocie a nuestro estilo de vida.',
    imagenPrincipal: 'https://i.imgur.com/kmYbq6a.png',
    imagenesSecundarias: [
      'https://i.imgur.com/GOvla0R.jpeg',
      'https://i.imgur.com/LG0SjGv.jpeg',
      'https://i.imgur.com/QDJg4i7.jpeg'
    ]
  }
};

const EVENTO_INICIAL = 'SURF';

export default function Eventos() {
  const ref = useRef(null);
  const secondaryImagesRef = useRef(null);
  const [eventoActual, setEventoActual] = useState(EVENTO_INICIAL);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categorias = Object.keys(DATOS_EVENTOS);
  const datosActuales = DATOS_EVENTOS[eventoActual];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"],
  });

  const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);

  useEffect(() => {
    if (isTransitioning) return;

    const imagesContainer = secondaryImagesRef.current;
    if (!imagesContainer) return;

    const images = imagesContainer.querySelectorAll('.eventos-fade-in-image');
    if (!images.length) return;

    const STAGGER_MS = 150;
    images.forEach(img => img.classList.remove('visible'));

    const initialDelay = 50;
    images.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add('visible');
      }, initialDelay + (index * STAGGER_MS));
    });
  }, [eventoActual, isTransitioning]);

  const handleClickEvento = (categoria) => {
    if (categoria === eventoActual) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setEventoActual(categoria);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 10);
    }, 300);
  };

  return (
    <div className="eventos-contenedor-principal" ref={ref}>
      <motion.img
        src={TITLE_IMAGE_URL}
        alt="Título eventos"
        className="eventos-title"
        style={{ opacity: fadeOpacity, y: fadeY }}
      />

      <motion.div
        className="texto-eventos"
        style={{ opacity: fadeOpacity, y: fadeY }}
      >
        <p>{datosActuales.texto}</p>
      </motion.div>

      <motion.div
        className="eventos-btn"
        style={{ opacity: fadeOpacity, y: fadeY }}
      >
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`btn-eventos ${categoria === eventoActual ? 'active' : ''}`}
            onClick={() => handleClickEvento(categoria)}
          >
            {categoria}
          </button>
        ))}
      </motion.div>

      <div
        className={`galeria-eventos-secundaria ${isTransitioning ? 'hidden-gallery' : ''}`}
        ref={secondaryImagesRef}
      >
        {datosActuales.imagenesSecundarias.map((url, index) => (
          <img
            key={index}
            className="eventos-fade-in-image"
            src={url}
            alt={`Evento ${eventoActual} - Imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
