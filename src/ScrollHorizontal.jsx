"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import Eventos from './Eventos';
import SurfDay from './SurfDay';
import SkateDay from './SkateDay';
import Arte from "./Arte";

const totalSections = 3; 

export default function ScrollHorizontal() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`0vw`, `-${(totalSections - 1) * 100}vw`]
  );

  const scrollLength = (totalSections - 1) * 100;

  return (
    <div ref={containerRef} style={{ height: `${(totalSections - 1 ) * 100}vh` }}>
      <div className="prueba" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden"}}>
        <motion.div style={{ x, display: "flex", width: `${totalSections * 100}vw`, height: "100vh"}}>
          <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <Eventos /> </div>
          <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <SurfDay /> </div>
          <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <SkateDay /> </div>
        </motion.div>
      </div>
    </div>
  )
}