"use client" 

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Historia from "./Historia";
import Locales from "./Locales";
import Hoy from "./Hoy";
import Team from "./Team";
import FinalUno from "./FinalUno";
import FinalDos from "./FinalDos";
import LineaTiempo from "./LineaTiempo";
import Comienzo from './Comienzo';
import ImagenesInicio from './ImagenesInicio';
import Eventos from "./Eventos";
import SurfDay from './SurfDay'; 
import Colaboraciones from "./Colaboraciones";
import Colabos from "./Colabos";
import Marcas from "./Marcas";
import Valores from "./Valores";


const sectionToGroupMap = {
    'historia': 'historia',
    'imagenesinicio': 'historia',
    'comienzo': 'comienzo',
    'locales': 'desarrollo',
    'hoy': 'hoy',
    'team': 'nosotros',
    'eventos': 'cultura',
    'surfday': 'cultura',
    'colaboraciones': 'final',
    'colabos': 'final',
    'finaluno': 'final',
    'marcas': 'nosotros',
    'valores': 'nosotros',
};

const sectionIds = Object.keys(sectionToGroupMap);


export default function App() {
    const [activeGroup, setActiveGroup] = useState('historia');
    const sectionRefs = useRef({});


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { 
                        const groupId = sectionToGroupMap[entry.target.id];
                        if (groupId) {
                            setActiveGroup(groupId);
                        }
                    } 
                });
            },
            { 
                root: null,
                rootMargin: '-40% 0px -40% 0px', 
                threshold: 0
            }
        );

        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []); 
    

    return (
        <div className="main-layout-wrapper"> 
            
            <LineaTiempo activeGroup={activeGroup}/>
            
            <div className="contenido-principal">
            
                <section id="historia" className="section-wrapper">
                    <Historia />
                </section>
                
                <section id="imagenesinicio" className="section-wrapper">
                    <ImagenesInicio />
                </section>
                <section id="comienzo" className="section-wrapper">
                    <Comienzo />
                </section>

                <section id="locales" className="section-wrapper">
                    <Locales />
                </section>

                <section id="hoy" className="section-wrapper">
                    <Hoy />
                </section>

                <section id="team" className="section-wrapper">
                    <Team />
                </section>

                <section id="surfday" className="section-wrapper">
                    <SurfDay />
                </section>

                <section id="marcas" className="section-wrapper">
                    <Marcas />
                </section>

                <section id="eventos" className="section-wrapper">
                    <Eventos />
                </section>

                <section id="colabos" className="section-wrapper">
                    <Colabos />
                </section>

                <section id="colaboraciones" className="section-wrapper">
                    <Colaboraciones />
                </section>

                <section id="finaluno" className="section-wrapper">
                    <FinalUno />
                </section>

                <section id="finaldos" className="section-wrapper">
                    <FinalDos />
                </section>

                <section id="valores" className="valores-section">
                    <Valores />
                </section>

            </div>
        </div>
    );
}