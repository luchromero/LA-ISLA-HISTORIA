"use client"

import "./Hoy.css"
import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react";


const TITLE_IMAGE_URL = "https://i.imgur.com/pctfsDV.png";


export default function Hoy() {
 
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"],
  });

 const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
 const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);
  
  return (
    <div className="hoy-container" ref={ref}>
      <motion.img
            src={TITLE_IMAGE_URL}
            alt="titulo Hoy"
            className="hoy-title"
                style={{
                    opacity: fadeOpacity,
                    y: fadeY,
                      }}
                />
      <p className="hoy-texto">Hoy en día somos más de 100 personas que trabajamos en equipo para crear una experiencia
única y fomentar el estilo de vida que tanto nos apasiona.</p>
      <div className="hoy-imagenes">
        <iframe title="vimeo-player" 
                src="https://player.vimeo.com/video/1029262517?h=ac4a6ed669mute=1&autoplay=1&loop=1&background=1" 
                width="900" 
                height="550"
                frameborder="0" 
                referrerpolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowfullscreen>
        </iframe>
      </div>
    </div>
  );
}