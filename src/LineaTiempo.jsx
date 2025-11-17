import React from "react";
import './LineaTiempo.css';

const IMAGE_URLS = [
    "https://i.imgur.com/LP7BU2B.png", // Historia (Inicio) - 1997  -> [0]
    "https://i.imgur.com/gI0qpvh.png", // Comienzo - 1999              -> [1]
    "https://i.imgur.com/AER99Km.png", // Desarrollo - tiendas - 2001... -> [2]
    "https://i.imgur.com/htaMi7Y.png", // Cultura Isleña - hoy         -> [3]
    "https://i.imgur.com/4LhybGu.png", // Equipo - equipo              -> [4]
    "https://i.imgur.com/XK9XFbE.png", // Nosotros - nuestras marcas   -> [5]
    "https://i.imgur.com/SDGB186.png", // Eventos - eventos            -> [6]
    "https://i.imgur.com/a4FeMiu.png", // Nos inspira - nos inspira    -> [7]
    "https://i.imgur.com/kdafaGC.png", // Final - colaboraciones       -> [8]
];

const timelineGroups = [
    { id: 'historia', label: '1997', targetIds: ['historia'], imgUrl: IMAGE_URLS[0] },
    { id: 'comienzo', label: '1999', targetIds: ['imagenesinicio', 'comienzo'], imgUrl: IMAGE_URLS[1] },
    { id: 'desarrollo', label: 'Tiendas', targetIds: ['locales'], imgUrl: IMAGE_URLS[2] },
    { id: 'cultura', label: 'Hoy', targetIds: ['hoy'], imgUrl: IMAGE_URLS[3] },
    { id: 'equipo', label: 'Equipo', targetIds: ['team'], imgUrl: IMAGE_URLS[4] },
    { id: 'nosotros', label: 'Nuestras Marcas', targetIds: ['marcas'], imgUrl: IMAGE_URLS[5] },
    { id: 'eventos', label: 'Eventos', targetIds: ['eventos'], imgUrl: IMAGE_URLS[6] },
    { id: 'nos inspira', label: 'Nos inspira', targetIds: ['colabs'], imgUrl: IMAGE_URLS[7] },
    { id: 'final', label: 'Colaboraciones', targetIds: ['colaboraciones'], imgUrl: IMAGE_URLS[8] },
];

export default function LineaTiempo({ activeGroup }) {
    return (
        <aside className="timeline-container">
            <div className="timeline-linea"></div>
            
            <nav className="timeline-nav">
                {timelineGroups.map((group, index) => (
                    <a
                        key={group.id}
                        href={`#${group.targetIds[0]}`}
                        className={`timeline-item ${activeGroup === group.id ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            const targetId = group.targetIds[0];
                            
                            const element = document.getElementById(targetId);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                            
                            window.history.pushState(null, null, `#${targetId}`);
                        }}
                    >
                        <div className="timeline-dot"></div>
                        
                        <img 
                            src={group.imgUrl} 
                            alt={group.label} 
                            className={`timeline-label-img img-${index}`}
                        />
                        
                    </a>
                ))}
            </nav>
        </aside>
    );
}