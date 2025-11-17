"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import "./Historia.css"

const TITLE_IMAGE_URL = "https://i.imgur.com/sOjIxmz.png";
const SECOND_IMAGE_URL ="https://i.imgur.com/RkmQ4Yv.png";

export default function Historia() {
  const ref = useRef(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  
  
  const imageX = useTransform(scrollYProgress, [0, 0.4], isSmallScreen ? ["0%", "0%"] : ["-45%", "6%"]);
  
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  
  
  
  const textX = useTransform(scrollYProgress, [0.3, 0.6], isSmallScreen ? ["0%", "0%"] : ["-50%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], isSmallScreen ? [1, 1] : [0, 1]);
  
  const title1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const title2Opacity = useTransform(scrollYProgress, [0.4, 0.7, 0.8], [0, 1, 0]);

  return (
    <div
      ref={ref}
      className="historia-section"
      style={{ marginBottom: '200px' }}
    >
      
      <motion.img
        src={TITLE_IMAGE_URL}
        alt="sobre nosotros Logo"
        className="historia-title historia-title-1"
        style={{
          opacity: title1Opacity,
        }}
      />

      <motion.img
        src={SECOND_IMAGE_URL}
        alt="LA ISLA SURFSHOP Logo"
        className="historia-title historia-title-2"
        style={{
          opacity: title2Opacity,
        }}
      />

      <div
        className="historia-content-wrapper"
      >
        <motion.p
          className="historia-text"
          style={{
            x: textX,
            opacity: textOpacity,
          }}
        >
          La Isla nace a partir de la historia de un surfista que, después de un largo viaje por Australia,
          quiso crear un espacio donde se pudieran encontrar todos los productos que reflejen el estilo de
          vida de los amantes del surf, los viajes y la vida al aire libre.
        </motion.p>

        <div className="historia-image-container">
          <motion.div className="historia-crossfade-wrapper">
            
            <motion.img
              src="https://i.imgur.com/g7Uuv5F.png"
              alt="Local animado de La Isla"
              className="historia-image-animated"
              style={{ 
                  x: imageX, 
                  scale: imageScale,
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}