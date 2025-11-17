import React, { use, useState, useRef } from 'react';
import './Locales.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const TITLE_IMAGE_URL = "https://i.imgur.com/YMpoaol.png";

const DATOS_LOCALES = {
    '2001': [
        {
            imagenUrl: 'https://i.imgur.com/6rvV4uw.png',
            descripcion: 'La isla Shopping Tres Cruces: Esta tienda comenzó también como Islita chica en un corredor y con los años fue creciendo hasta su última reforma de 2025. Hoy es una de las tiendas más grandes con 88 mts.2'
        }
            ],
    '2003': [
        {
            imagenUrl: 'https://i.imgur.com/Z8j7NvT.png',
            descripcion: 'La isla 21 de Setiembre: Esta es nuestra tienda “outlet”, ofrece productos de verano e invierno todo el año, y también productos técnicos de surf y skate.'
        },
        {
            imagenUrl: 'https://i.imgur.com/CxvVP7f.png',
            descripcion: 'La isla Portones Shopping: Esta isla fue reformada y ampliada en 2024 quedando como la tienda más grande (con 176mts2) e insignia de La isla.'
        }
            ],
    '2006': [
        {
            imagenUrl: 'https://i.imgur.com/ktFsAe6.png',
            descripcion: 'La isla Punta Carretas Shopping: Esta tienda también fue creciendo con el tiempo y hoy en día es una de nuestras tiendas principales.'
        }
            ],
    '2008': [
        {
            imagenUrl: 'https://i.imgur.com/QdHyNtQ.png',
            descripcion: 'La isla Arocena: En un punto estratégico de Carrasco tiene un segundo piso cargado de producto técnico de surf y skate.'
        }
            ],
    '2013': [
        {
            imagenUrl: 'https://i.imgur.com/IrZXRQ8.png',
            descripcion: 'La isla Nuevocentro Shopping: Con la apertura de este shopping abrió una nueva isla'
        }
            ],
    '2014': [
        {
            imagenUrl: 'https://i.imgur.com/yPY3ZsO.png',
            descripcion: 'Web: En 2014 abrimos la tienda online que nos permitió enviar productos a todo el país. Desde el primer día buscamos destacarnos con los tiempos de entrega, cambios y la atención al cliente.'
        }
            ],
    '2017': [
        {
            imagenUrl: 'https://i.imgur.com/dSxoQ9H.png',
            descripcion: 'La isla Café: Inspirados en las cafeterías de California abrimos nuestro primer café, respetando el tamaño de la primera islita. ¡Con La isla Café comenzó un nuevo emprendimiento!'
        },
        {
            imagenUrl: 'https://i.imgur.com/wtXAd0d.png',
            descripcion: 'La isla Calle 20: Nuestra primera tienda en el Este, más cerca de las olas, en una de las calles principales de la península de Punta del Este.'
        }
            ],
    '2019': [
        {
            imagenUrl: 'https://i.imgur.com/TyJIUKR.png',
            descripcion: 'La isla Punta Shopping: Seguimos creciendo en el Este y abrimos una segunda tienda con más productos en el principal shopping de la ciudad.'
        }
            ],
    '2020': [
        {
            imagenUrl: 'https://i.imgur.com/HvMxWJH.png',
            descripcion: 'La isla La Barra: Nuestra tienda insignia del surf, cargada de productos técnicos elegido por especialistas.'
        }
            ],
    };

const ANIO_INICIAL = '2001';

export default function Locales() {

    const [localActual, setLocalActual] = useState(ANIO_INICIAL);
    const handleClickLocal = (anio) => {
        setLocalActual(anio);
    };

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "end 0.8"], 
    });

    const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
    const fadeY = useTransform(scrollYProgress, [0.1, 0.6], ["30px", "0px"]);

    const datosActuales = DATOS_LOCALES[localActual];
    const anios = Object.keys(DATOS_LOCALES);
    const isSingleImage = datosActuales.length === 1;

    return (
        <div className="locales-container" ref={ref}>
            <div className="locales-content">

                <motion.img
                        src={TITLE_IMAGE_URL}
                        alt="titulo Locales"
                        className="locales-title"
                        style={{
                          opacity: fadeOpacity,
                          y: fadeY,
                        }}
                      />

                <motion.div 
                className="locales-btn-column"
                style={{opacity: fadeOpacity, y: fadeY }}
                    >
                    {anios.map((anio) => (
                        <button
                            key={anio}
                            className={`btn-local ${anio === localActual ? 'active' : ''}`}
                            onClick={() => handleClickLocal(anio)}
                        >
                            {anio}
                        </button>
                    ))}
                </motion.div>

                <div className="locales-image-text-column">
                    {datosActuales.map((item, index) => (
                        <div key={localActual + '-' + index} 
                        className={`local-item-wrapper ${isSingleImage ? 'single-image-wrapper' : ''}`}>
                            
                            <img
                                src={item.imagenUrl}
                                alt={`Tienda de surf La Isla - Año ${localActual} - ${index + 1}`}
                                className={`local-image ${isSingleImage ? 'single-image-wrapper' : ''}`}
                            />
                            
                            <p className="locales-text-content">
                                {item.descripcion}
                            </p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}