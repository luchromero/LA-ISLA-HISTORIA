import './Valores.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TITLE_IMAGE_URL = "https://i.imgur.com/5B4KCMG.png";

const LINKS_MAP = {
    'Locales': 'https://laisla.com.uy/locales',
    'Team': 'https://laisla.com.uy/team-la-isla',
    'Noticias': 'https://laisla.com.uy/info',
    'Valores': 'https://laisla.com.uy/identidad',
    'La Isla Café': 'https://laisla.com.uy/laislacafe',
};

function ValorCard({ imgNormal, imgHover, titulo, texto, hoverClass, linkTo }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a 
            href={linkTo}
            className="valor-card-link"
            target="_blank" 
            rel="noopener noreferrer"
        >
            <div 
                className="valor-card"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="valor-card-img-wrapper">
                    <img 
                        className={`valor-card-img ${hoverClass}`}
                        src={hovered ? imgHover : imgNormal} 
                        alt={titulo} 
                        style={{
                            transition: 'transform 0.3s',
                            transform: hovered ? 'scale(1.08)' : 'scale(1)'
                        }}
                    />
                </div>
                <h2 className="valor-card-title">{titulo}</h2>
                <p className="valor-card-text">{texto}</p>
            </div>
        </a>
    );
}

export default function Valores() {

    const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } 
};

    const cardContainerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="valores-section">
            <motion.img
            src={TITLE_IMAGE_URL}
            alt="titulo valores"
            className="valores-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariants}
                />
            <motion.div 
                className="valores-cards"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardContainerVariants}
            >
                <motion.div variants={fadeUpVariants}>
                <ValorCard 
                    hoverClass="hover-img-autentico"
                    imgNormal='https://i.imgur.com/ZlisxCb.png'
                    imgHover='https://i.imgur.com/gtRyyXU.png'
                    titulo='Valores'
                    linkTo={LINKS_MAP['Valores']} 
                />
                </motion.div>

                <motion.div variants={fadeUpVariants}>
                <ValorCard 
                    hoverClass="hover-img-calidad"
                    imgNormal='https://i.imgur.com/9IyJy4U.png'
                    imgHover='https://i.imgur.com/51k0LSt.png'
                    titulo='Team'
                    linkTo={LINKS_MAP['Team']} 
                />
                </motion.div>

                <motion.div variants={fadeUpVariants}>
                <ValorCard 
                    hoverClass="hover-img-pasion"
                    imgNormal='https://i.imgur.com/f7r9NCv.png'
                    imgHover='https://i.imgur.com/rkdufyM.png'
                    titulo='Noticias'
                    linkTo={LINKS_MAP['Noticias']} 
                />
                </motion.div>

                <motion.div variants={fadeUpVariants}>
                <ValorCard 
                    hoverClass="hover-img-comunidad"
                    imgNormal='https://i.imgur.com/qky7rMU.png'
                    imgHover='https://i.imgur.com/0CHhirU.png'
                    titulo='Locales'
                    linkTo={LINKS_MAP['Locales']} 
                />
                </motion.div>

                <motion.div variants={fadeUpVariants}>
                <ValorCard 
                    hoverClass="hover-img-sostenibilidad"
                    imgNormal='https://i.imgur.com/CK1TtbI.png'
                    imgHover='https://i.imgur.com/7mIGwNo.png'
                    titulo='La Isla Café'
                    linkTo={LINKS_MAP['La Isla Café']} 
                />
                </motion.div>
                </motion.div>
            </div>
    );
}