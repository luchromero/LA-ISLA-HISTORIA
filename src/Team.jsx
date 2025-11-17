"use client"

import "./Team.css"
import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react";

const TITLE_IMAGE_URL = "https://i.imgur.com/fegOO0M.png";

export default function Team() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.8"],
  });

 const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
 const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);
  
 
  return (
    <div className="team-container" ref={ref}>
      <motion.img
                  src={TITLE_IMAGE_URL}
                  alt="titulo Equipo"
                  className="team-title"
                      style={{
                          opacity: fadeOpacity,
                          y: fadeY,
                            }}
                      />
         <p className="team-texto">
          Todos los años realizamos 3 eventos internos que nos unen como equipo y nos refuerzan
nuestros orígenes y valores.
        </p> 

        
        <div>
        <img className="team-imagen" src="https://i.imgur.com/VabnlXy.png" alt="Equipo La Isla"/> 
        </div>
    </div>
  );
}