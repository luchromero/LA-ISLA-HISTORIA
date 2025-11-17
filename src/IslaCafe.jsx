"use client"

import { useEffect, useRef } from "react"
import "./IslaCafe.css"

export default function IslaCafe() {
  const secondaryImagesRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('.fade-in-image');
            
            images.forEach((image, index) => {
              const delay = index * 0.3; 
              
              image.style.animationDelay = `${delay}s`; 
              image.classList.add('start-fade-in'); 
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (secondaryImagesRef.current) {
      observer.observe(secondaryImagesRef.current);
    }

    return () => {
      if (secondaryImagesRef.current) {
        observer.unobserve(secondaryImagesRef.current);
      }
    };
  }, []);

  return (
    <section className="isla-cafe-section">
      <div className="background-layer" />
      <div className="isla-cafe-arriba">
        <div className="text-container">
          <h1 className="cafe-title">LA ISLA CAFÉ</h1>
          <p className="cafe-text">
            En 2016, inspirados en las cafeterías de California, abrimos nuestro primer café, manteniendo el
            tamaño acogedor de la primera islita y creando un espacio pensado para disfrutar con tranquilidad.
          </p>
          <button className="ver-mas-button">
                Ver más
          </button>
        </div>
        <div className="imagen-isla-cafe">
          <img src="https://i.imgur.com/YnhAFmp.png" alt="Taza de café" />
        </div>
      </div>
      <div className="isla-cafe-galeria" ref={secondaryImagesRef}>
        <img className="fade-in-image" src="https://i.imgur.com/YYnJeuO.png" alt="merienda de la isla café" />
        <img className="fade-in-image" src="https://i.imgur.com/jwaKv48.png" alt="otra merienda de la isla café" />
        <img className="fade-in-image" src="https://i.imgur.com/FGkHsq3.png" alt="local de la isla café" />
      </div>
    </section>
  )
}