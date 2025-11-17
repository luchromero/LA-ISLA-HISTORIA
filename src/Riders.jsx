import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Riders.css';

const RIDER_IMAGES = [
  'https://f.fcdn.app/imgs/5b74f5/laisla.com.uy/isl/a16b/webp/recursos/1124/500x500/luisma2.jpg',
  'https://f.fcdn.app/imgs/6459d8/laisla.com.uy/isl/833d/webp/recursos/1154/0x0/frame-2-12.jpg',
  'https://f.fcdn.app/imgs/a69759/laisla.com.uy/isl/7b0a/webp/recursos/1127/0x0/delfi2.jpg',
  'https://f.fcdn.app/imgs/6e9d46/laisla.com.uy/isl/a127/webp/recursos/1135/500x500/nico2.jpg',
  'https://f.fcdn.app/imgs/c264f7/laisla.com.uy/isl/6357/webp/recursos/3257/0x0/roberto1.jpg',
  'https://f.fcdn.app/imgs/f66605/laisla.com.uy/isl/1be8/webp/recursos/1158/0x0/ines2.jpg',
  'https://f.fcdn.app/imgs/d03858/laisla.com.uy/isl/78b7/webp/recursos/1622/0x0/luqui5.jpg',
  'https://f.fcdn.app/imgs/b39308/laisla.com.uy/isl/6232/webp/recursos/2740/0x0/santiago-3.jpg',
  'https://f.fcdn.app/imgs/7ffc25/laisla.com.uy/isl/c01f/webp/recursos/3553/0x0/pedro3.jpg',
];

const IMAGES_PER_SLIDE = 3;

export default function Riders() {
  const ref = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalSlides = Math.ceil(RIDER_IMAGES.length / IMAGES_PER_SLIDE);

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => {
      const next = prevIndex + IMAGES_PER_SLIDE;
      if (next >= RIDER_IMAGES.length) return 0;
      return next;
    });
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) => {
      const prev = prevIndex - IMAGES_PER_SLIDE;
      if (prev < 0) return (totalSlides - 1) * IMAGES_PER_SLIDE;
      return prev;
    });
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"],
  });
  const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);

  const slideIndex = currentImageIndex / IMAGES_PER_SLIDE;
  const trackTranslatePercent = slideIndex * 100;

  const trackWidthPercent = (RIDER_IMAGES.length / IMAGES_PER_SLIDE) * 100;

  return (
    <div className='riders-contenedor-principal' ref={ref}>
      <motion.div className='texto-riders' style={{ opacity: fadeOpacity, y: fadeY }}>
        <p>Nuestros riders: conocé al team.</p>
      </motion.div>

      <div className='galeria-riders-secundaria'>
        <div
          className='carousel-track'
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(-${trackTranslatePercent}%)`
          }}
        >
          {RIDER_IMAGES.map((imgUrl, index) => (
            <img
              key={index}
              className='riders-carousel-image'
              src={imgUrl}
              alt={`Rider ${index + 1}`}
            />
          ))}
        </div>

        <button className='carousel-button prev' onClick={goToPrev} aria-label="Anterior">
          {'‹'}
        </button>
        <button className='carousel-button next' onClick={goToNext} aria-label="Siguiente">
          {'›'}
        </button>
      </div>

      <div className='riders-btn'>
        <a href="https://laisla.com.uy/team-la-isla" target="_blank" rel="noopener noreferrer">
          <button className='btn-riders'>VER MÁS</button>
        </a>
      </div>
    </div>
  );
}
