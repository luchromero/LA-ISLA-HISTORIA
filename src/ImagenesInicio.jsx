import { motion } from "framer-motion";
import "./ImagenesInicio.css"; 

export default function ImagenesInicio() {
  const images = [
    "https://i.imgur.com/IPAf0zU.png",
    "https://i.imgur.com/fGefWZA.png",
    "https://i.imgur.com/FoOpObc.png",
  ];

  return (
    <div className="carousel-container">
      <div className="image-track">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`img-${index}`}
            className="carousel-image"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: index * 0.15 
            }}
            viewport={{ once: true, amount: 0.9 }} 
          />
        ))}
      </div>
    </div>
  );
}