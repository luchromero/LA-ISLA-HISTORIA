import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Comienzo.css";

export default function Comienzo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const firstOpacity = useTransform(scrollYProgress, [0.2, 0.6], [1, 0]);
  const firstY = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-15%"]);

  const secondOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.4, 0.8], ["15%", "0%"]);

  return (
    <section className="scroll-wrapper" ref={ref}>
      <div className="sticky-area">
        <motion.div
          className="panel panel-grid"
          style={{ opacity: firstOpacity, y: firstY }}
        >
          <div className="panel-text">
            <p>
              Nuestro primer local fue una isla de 6m² en el pasillo de
              Montevideo Shopping. La idea de surf shop no fue fácil en un
              espacio tan chico, pero un 12 de noviembre de 1999 logramos abrir
              nuestra primera tienda.
            </p>
          </div>
          <div className="panel-image">
            <img
              src="https://i.imgur.com/v1wdHHU.png"
              alt="Local de la isla animado"
            />
          </div>
        </motion.div>

        <motion.div
          className="panel panel-grid"
          style={{ opacity: secondOpacity, y: secondY }}
        >
          <div className="panel-image">
            <img
              src="https://i.imgur.com/7vkRVaY.png"
              alt="Tienda de surf La Isla"
            />
          </div>
          <div className="panel-text">
            <p>
              Aquella tiendita dio paso a su nombre ya que, al construirla,
              tanto él como los amigos que lo ayudaron se referían a ella como
              “La Isla”. Con los años, el equipo de LA ISLA fue creciendo y sus
              locales se fueron multiplicando y ampliando.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
