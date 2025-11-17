import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Colaboraciones.css'

const TITLE_IMAGE_URL = "https://i.imgur.com/hkZTBJY.png";


export default function Colaboraciones() {
  const ref = useRef(null);
  const secondaryImagesRef = useRef(null); 

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"], 
  });

  const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);


  useEffect(() => {
  const images = secondaryImagesRef.current?.querySelectorAll('.colaboraciones-fade-in-image');
  if (!images?.length) return;

  const STAGGER_MS = 300;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * STAGGER_MS);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  images.forEach(img => observer.observe(img));

  return () => observer.disconnect();
}, []);

  return(
    <div className='contenedor-principal' ref={ref}>
       <motion.img
                          src={TITLE_IMAGE_URL}
                          alt="titulo Colaboraciones"
                          className="colaboraciones-title"
                          style={{
                              opacity: fadeOpacity,
                              y: fadeY,
                          }}
                      />
        
        <motion.div
            className='texto-colaboraciones'
            style={{ opacity: fadeOpacity, y: fadeY }}
        >
            <p>Realizamos colaboraciones con nuestras marcas, con diseños de edición limitada.</p>
        </motion.div>
        
        <motion.div 
            className='imagen-colaboraciones'
            style={{ opacity: fadeOpacity, y: fadeY }}
        >
        </motion.div>
        
        <div className='galeria-colaboraciones-secundaria' ref={secondaryImagesRef}>
            <img 
                className='colaboraciones-fade-in-image' 
                src='https://i.imgur.com/bhuvsWA.jpeg' 
                alt='Colab con Katin' 
            />
            <img 
                className='colaboraciones-fade-in-image' 
                src='https://i.imgur.com/pCBJMCp.jpeg' 
                alt='Colab con Katin' 
            />
            <img 
                className='colaboraciones-fade-in-image' 
                src='https://i.imgur.com/zHjMSY1.jpeg' 
                alt='Arte callejero con surfista' 
            />
        </div>
    </div>
  )
}