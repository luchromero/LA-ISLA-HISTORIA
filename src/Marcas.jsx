import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Marcas.css'

const TITLE_IMAGE_URL = "https://i.imgur.com/Um2SuHe.png";


export default function Marcas() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"], 
  });

  const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);

  return(
    <div className='marcas-contenedor-principal' ref={ref}>
        <motion.img
                    src={TITLE_IMAGE_URL}
                    alt="titulo Marcas"
                    className="marcas-title"
                    style={{
                        opacity: fadeOpacity,
                        y: fadeY,
                    }}
                />

        <motion.div
            className='texto-marcas'
            style={{ opacity: fadeOpacity, y: fadeY }}
        >
            <p>Atentos a las tendencias, y con consciencia en la ecología, buscamos marcas innovadoras que
tengan historia y compartan nuestros valores.</p>
        </motion.div>
        
        <div className='galeria-marcas-secundaria'>
            <img 
            className='marcas-centro-image' 
            src="https://i.imgur.com/0ljsOKf.png" 
            alt="Bata y Belén"/>
        </div>
    </div>
  )
}