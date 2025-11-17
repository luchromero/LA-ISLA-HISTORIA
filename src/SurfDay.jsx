import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./SurfDay.css";

export default function SurfDay() {
  const [eventoActual, setEventoActual] = useState("SURF DAY");
  const [indiceCarrusel, setIndiceCarrusel] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const fadeY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const DATOS_EVENTOS = {
    "SURF DAY": {
      texto:
        "El “surf day” es un evento interno que hacemos hace más de 10 años, liderado por nuestro rider Luisma Iturria. Nos juntamos a compartir la pasión que dio comienzo a nuestra historia y disfrutar un día de playa y surfing.",
      imagenesSecundarias: [
        "https://f.fcdn.app/imgs/f3cca2/laisla.com.uy/isl/5181/webp/recursos/2495/0x0/surf1.jpg",
        "https://f.fcdn.app/imgs/83ca58/laisla.com.uy/isl/310a/webp/recursos/2496/0x0/surf2.jpg",
        "https://i.imgur.com/lDyVFLu.jpeg"
      ]
    },
    "SKATE DAY": {
      texto:
        "En 2023 empezamos a hacer el “skate day”, otro evento similar al surf day, pero sobre ruedas, liderado por nuestra rider Meghan Mc Cubbin.",
      imagenesSecundarias: [
        "https://i.imgur.com/7J6HT83.jpeg",
        "https://i.imgur.com/u958QMP.jpeg",
        "https://i.imgur.com/gtRwYQP.jpeg"
      ]
    },
    "ISLA DAY": {
      texto:
        "Este es un evento que surgió en 2021 con la idea de hacer un evento interno diferente, donde se pueda juntar todo el equipo, de todas las áreas, para escuchar, compartir y sugerir ideas nuevas que mejoren nuestro trabajo y comunicación.",
      imagenesSecundarias: [
        "https://i.imgur.com/cC0vqD6.jpeg",
        "https://i.imgur.com/kJidJ2p.jpeg",
        "https://i.imgur.com/YZmN8dx.jpeg"
      ]
    },
    TEAM: {
      texto:
        "Conocé a nuestros riders, el alma de la marca. Cada uno aporta su estilo y energía, representando los valores de La Isla dentro y fuera del agua.",
      imagenesSecundarias: [
        "https://f.fcdn.app/imgs/b5e54c/laisla.com.uy/isl/a16b/webp/recursos/1124/0x0/luisma2.jpg",
        "https://f.fcdn.app/imgs/fd0326/laisla.com.uy/isl/a127/webp/recursos/1135/0x0/nico2.jpg",
        "https://f.fcdn.app/imgs/a69759/laisla.com.uy/isl/7b0a/webp/recursos/1127/0x0/delfi2.jpg",
        "https://f.fcdn.app/imgs/c264f7/laisla.com.uy/isl/6357/webp/recursos/3257/0x0/roberto1.jpg",
        "https://f.fcdn.app/imgs/17521b/laisla.com.uy/isl/c41c/webp/recursos/1153/0x0/frame-2-11.jpg",
        "https://f.fcdn.app/imgs/ebf2d2/laisla.com.uy/isl/0122/webp/recursos/1157/0x0/ines1.jpg",
        "https://f.fcdn.app/imgs/d03858/laisla.com.uy/isl/78b7/webp/recursos/1622/0x0/luqui5.jpg",
        "https://f.fcdn.app/imgs/7ffc25/laisla.com.uy/isl/c01f/webp/recursos/3553/0x0/pedro3.jpg",
        "https://f.fcdn.app/imgs/b39308/laisla.com.uy/isl/6232/webp/recursos/2740/0x0/santiago-3.jpg"
      ]
    }
  };

  const categorias = Object.keys(DATOS_EVENTOS);
  const evento = DATOS_EVENTOS[eventoActual];
  const totalSlides = Math.max(1, Math.ceil(evento.imagenesSecundarias.length / 3));

  const handleClickEvento = (categoria) => {
    setEventoActual(categoria);
    setIndiceCarrusel(0);
  };

  const siguiente = () =>
    setIndiceCarrusel((prev) => (prev + 1) % totalSlides);
  const anterior = () =>
    setIndiceCarrusel((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getGrupoDeTres = () => {
    const start = indiceCarrusel * 3;
    return evento.imagenesSecundarias.slice(start, start + 3);
  };

  return (
    <div ref={containerRef} className="surfday-container">
      <motion.div className="surfday-contenido" style={{ opacity: fadeOpacity, y: fadeY }}>
        <div className="surfday-botones">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`surf-btn ${categoria === eventoActual ? "active" : ""}`}
            onClick={() => handleClickEvento(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
        <div className="surfday-texto">
          <p>{evento.texto}</p>
        </div>
      </motion.div>

      

      <div className="galeria-container">
        {eventoActual === "TEAM" ? (
          <div className="team-carrusel">
            <button onClick={anterior} className="btn-carrusel" aria-label="Anterior">‹</button>
            <div className="carrusel-imagenes">
              {getGrupoDeTres().map((img, index) => (
                <img key={index} src={img} alt={`rider-${index}`} />
              ))}
            </div>
            <button onClick={siguiente} className="btn-carrusel" aria-label="Siguiente">›</button>
          </div>
        ) : (
          <div className="galeria-simple">
            {evento.imagenesSecundarias.map((img, index) => (
              <img key={index} src={img} alt={`foto-${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
