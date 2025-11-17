import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Colabos.css'

const TITLE_IMAGE_URL = "https://i.imgur.com/tXYshJl.png";


const DATOS_COLABOS = {
    'ARTE': {
        texto: 'Nos gusta fomentar artistas que compartan nuestra inspiración.',
        imagenPrincipal: 'https://i.imgur.com/g7Uuv5F.png',
        imagenesSecundarias: [
            'https://i.imgur.com/P9zILPP.png',
            'https://i.imgur.com/tFoVBi8.jpeg',
            'https://i.imgur.com/U6gkx8c.jpeg'
        ]
    },
    'VIAJES': {
        texto: 'Nos unimos a la agencia de viajes MANGO para ofrecer a nuestros clientes viajes que estén vinculados al estilo de vida que nos apasiona.',
        imagenPrincipal: 'https://i.imgur.com/g7Uuv5F.png', 
        imagenesSecundarias: [
            'https://i.imgur.com/N9byLLn.png',
            'https://i.imgur.com/I6IRih1.png',
            'https://i.imgur.com/sLMor4P.png'
        ]
    },
    'MÚSICA': {
        texto: 'La música siempre estuvo presente en nuestra historia. Nos gusta vincularnos con bandas que nos inspiran.',
        imagenPrincipal: 'https://i.imgur.com/g7Uuv5F.png', 
        imagenesSecundarias: [
            'https://i.imgur.com/OLrSauz.jpeg',
            'https://i.imgur.com/3um4yZj.jpeg',
            'https://i.imgur.com/rnIXexb.jpeg'
        ]
    },
    'ECOLOGÍA': {
        texto: 'Realizamos y apoyamos acciones que tengan que ver con la consciencia sobre el cuidado del medio ambiente.',
        imagenPrincipal: 'https://i.imgur.com/g7Uuv5F.png', 
        imagenesSecundarias: [
            'https://i.imgur.com/nAvH3T9.png',
            'https://i.imgur.com/z1KQjdA.png',
            'https://i.imgur.com/d0d8RFa.png'
        ]
    }
};

const CATEGORIA_INICIAL = 'ARTE';

export default function Colabos() {
  const ref = useRef(null);
  const secondaryImagesRef = useRef(null); 
  
  const [colaboActual, setColaboActual] = useState(CATEGORIA_INICIAL);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const datosActuales = DATOS_COLABOS[colaboActual];
  const categorias = Object.keys(DATOS_COLABOS);

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

    const images = imagesContainer.querySelectorAll('.colabos-fade-in-image');
    if (!images.length) return;

    const STAGGER_MS = 150;

    images.forEach(img => img.classList.remove('visible'));

    const initialDelay = 50; 

    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('visible');
        }, initialDelay + (index * STAGGER_MS)); 
    });

  }, [colaboActual, isTransitioning]);


  const handleClickColabo = (categoria) => {
    if (categoria === colaboActual) return;

    setIsTransitioning(true);

    setTimeout(() => {
        setColaboActual(categoria); 
        
        setTimeout(() => {
            setIsTransitioning(false);
        }, 10);
    }, 300);
  };

  return(
    <div className='colabos-contenedor-principal' ref={ref}>
        <motion.img
            src={TITLE_IMAGE_URL}
            alt="titulo Colabos"
            className="colabos-title"
            style={{
                opacity: fadeOpacity,
                y: fadeY,
            }}
        />
        
        <motion.div
            className='texto-colabos'
            style={{ opacity: fadeOpacity, y: fadeY }}
        >
            <p>{datosActuales.texto}</p>
        </motion.div>
        
        <motion.div 
            className='imagen-colabos'
            style={{ 
              opacity: fadeOpacity, 
              y: fadeY, 
              backgroundImage: `url(${datosActuales.imagenPrincipal})`
            }}
        >
        </motion.div>
        
        <div 
            className={`galeria-colabos-secundaria ${isTransitioning ? 'hidden-gallery' : ''}`}
            ref={secondaryImagesRef}
        >
            {datosActuales.imagenesSecundarias.map((url, index) => (
                <img 
                    key={index}
                    className='colabos-fade-in-image' 
                    src={url} 
                    alt={`Colaboración ${colaboActual} - Imagen ${index + 1}`} 
                />
            ))}
        </div>
        
        <motion.div 
        className='colabos-btn'
        style={{ opacity: fadeOpacity, y: fadeY }}
        >
            {categorias.map((categoria) => (
                <button
                    key={categoria}
                    className={`btn-colabos ${categoria === colaboActual ? 'active' : ''}`}
                    onClick={() => handleClickColabo(categoria)}
                >
                    {categoria}
                </button>
            ))}
            </motion.div>
        </div>
  )
}