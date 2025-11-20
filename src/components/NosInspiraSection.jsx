import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import tituloNosInspira from '../assets/Titulares/nosInspira.png';
import imagenMusica from '../assets/imagenesMusica/imagenMusica.jpg';
import viajes1 from '../assets/fotosViajes/viajes (1).jpg';
import viajes2 from '../assets/fotosViajes/viajes (2).jpg';
import viajes3 from '../assets/fotosViajes/viajes (3).jpg';
import viajes4 from '../assets/fotosViajes/viajes (4).jpg';
import viajes5 from '../assets/fotosViajes/viajes (5).jpg';
import viajes6 from '../assets/fotosViajes/viajes (6).jpg';

const NosInspiraSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startOffsetRef = useRef(0);

  const categories = {
    arte: {
      text: 'El arte nos inspira a crear, a expresar y a conectar con emociones profundas. Cada obra es una ventana a nuevas perspectivas.',
      images: [
        'https://f.fcdn.app/imgs/65a73e/laisla.com.uy/isl/5125/webp/wysiwyg/1/1280x0/1759507021069.png',
        'https://f.fcdn.app/imgs/0fd462/laisla.com.uy/isl/fe38/webp/recursos/2492/0x0/acciones1.jpg',
        'https://f.fcdn.app/imgs/d71abe/laisla.com.uy/isl/f91e/webp/recursos/2488/0x0/acciones6.jpg'
      ]
    },
    viajes: {
      text: 'Nos unimos a la agencia de viajes MANGO para ofrecer a nuestros clientes viajes que estén vinculados al estilo de vida que nos apasiona.',
      images: [
        viajes1,
        viajes2,
        viajes3,
        viajes4,
        viajes5,
        viajes6
      ]
    },
    musica: {
      text: 'La música siempre estuvo presente en nuestra historia. Nos gusta vincularnos con bandas que nos inspiran',
      images: [
        'https://i.imgur.com/OLrSauz.jpeg',
        'https://i.imgur.com/3um4yZj.jpeg',
        imagenMusica
      ]
    },
    ecologia: {
      text: 'Realizamos y apoyamos acciones que tengan que ver con la consciencia sobre el cuidado del medio ambiente',
      images: [
        'https://i.imgur.com/nAvH3T9.png',
        'https://i.imgur.com/d0d8RFa.png',
        'https://i.imgur.com/z1KQjdA.png'
      ]
    }
  };

  // Recopilar todas las imágenes para el carrusel inicial
  const allImages = Object.values(categories).flatMap(category => category.images);

  // Animación continua del carrusel
  useEffect(() => {
    // Resetear offset cuando cambia la categoría
    setCarouselOffset(0);

    if (isDragging) {
      return; // Pausar cuando está siendo arrastrado
    }

    if (!selectedCategory) {
      // Carrusel con todas las imágenes
      const imageWidth = 400 + 24;
      const totalWidth = allImages.length * imageWidth;

      const interval = setInterval(() => {
        setCarouselOffset(prev => {
          const newOffset = prev - 0.5;
          // Cuando llegamos al final del primer set, resetear al inicio del primer set
          if (newOffset <= -totalWidth) {
            return newOffset + totalWidth;
          }
          return newOffset;
        });
      }, 16);

      return () => clearInterval(interval);
    } else {
      // Carrusel con imágenes de la categoría seleccionada
      const images = categories[selectedCategory]?.images || [];
      if (images.length === 0) return;

      const imageWidth = 400 + 24;
      const totalWidth = images.length * imageWidth;

      const interval = setInterval(() => {
        setCarouselOffset(prev => {
          const newOffset = prev - 0.5;
          // Cuando llegamos al final del primer set, resetear al inicio del primer set
          if (newOffset <= -totalWidth) {
            return newOffset + totalWidth;
          }
          return newOffset;
        });
      }, 16);

      return () => clearInterval(interval);
    }
  }, [selectedCategory, isDragging, allImages.length]);

  const categoryNames = ['arte', 'viajes', 'musica', 'ecologia'];

  return (
    <section
      id="nos-inspira"
      ref={ref}
      className="py-12"
    >
      <div className="w-full max-w-7xl mx-auto px-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30,
          }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <img src={tituloNosInspira} alt="Nos inspira" className="mb-6 h-12 w-auto object-contain" />
        </motion.div>

        {/* Botones de categorías */}
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          {selectedCategory && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setSelectedCategory(null);
                setCarouselOffset(0);
              }}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Ver todos
            </motion.button>
          )}
          {categoryNames.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                setSelectedCategory(selectedCategory === category ? null : category);
                setCarouselOffset(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize border-2 ${
                selectedCategory === category
                  ? 'shadow-lg scale-105'
                  : 'bg-transparent hover:shadow-md'
              }`}
              style={selectedCategory === category 
                ? { backgroundColor: '#2f5592', color: 'white', borderColor: '#2f5592' } 
                : { color: '#2f5592', borderColor: '#2f5592', backgroundColor: 'transparent' }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Carrusel inicial o contenido de la categoría seleccionada */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="all-carousel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="w-full overflow-hidden rounded-lg cursor-grab active:cursor-grabbing select-none" style={{ userSelect: 'none' }}>
                <motion.div
                  className="flex gap-6 items-center"
                  drag="x"
                  dragConstraints={{ left: -Infinity, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => {
                    setIsDragging(true);
                    startOffsetRef.current = carouselOffset;
                  }}
                  onDrag={(event, info) => {
                    const newOffset = startOffsetRef.current + info.offset.x;
                    setCarouselOffset(newOffset);
                  }}
                  onDragEnd={() => {
                    setIsDragging(false);
                    const imageWidth = 400 + 24;
                    const totalWidth = allImages.length * imageWidth;
                    if (carouselOffset <= -totalWidth) {
                      setCarouselOffset(carouselOffset + totalWidth);
                    }
                  }}
                  style={{ 
                    x: carouselOffset,
                    willChange: 'transform' 
                  }}
                  transition={{ duration: 0, ease: "linear" }}
                >
                  {/* Imágenes originales */}
                  {allImages.map((image, index) => (
                    <div
                      key={`original-${index}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`Inspiración ${index + 1}`}
                        className="h-48 md:h-96 w-auto object-contain rounded-lg"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                  {/* Duplicar imágenes para efecto infinito */}
                  {allImages.map((image, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`Inspiración ${index + 1}`}
                        className="h-48 md:h-96 w-auto object-contain rounded-lg"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="w-full overflow-hidden rounded-lg cursor-grab active:cursor-grabbing select-none" style={{ userSelect: 'none' }}>
                <motion.div
                  className="flex gap-6 items-center"
                  drag="x"
                  dragConstraints={{ left: -Infinity, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => {
                    setIsDragging(true);
                    startOffsetRef.current = carouselOffset;
                  }}
                  onDrag={(event, info) => {
                    const newOffset = startOffsetRef.current + info.offset.x;
                    setCarouselOffset(newOffset);
                  }}
                  onDragEnd={() => {
                    setIsDragging(false);
                    const images = categories[selectedCategory]?.images || [];
                    const imageWidth = 400 + 24;
                    const totalWidth = images.length * imageWidth;
                    if (carouselOffset <= -totalWidth) {
                      setCarouselOffset(carouselOffset + totalWidth);
                    }
                  }}
                  style={{ 
                    x: carouselOffset,
                    willChange: 'transform' 
                  }}
                  transition={{ duration: 0, ease: "linear" }}
                >
                  {/* Imágenes originales */}
                  {categories[selectedCategory].images.map((image, index) => (
                    <div
                      key={`original-${index}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`${selectedCategory} ${index + 1}`}
                        className="h-48 md:h-96 w-auto object-contain rounded-lg"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                  {/* Duplicar imágenes para efecto infinito */}
                  {categories[selectedCategory].images.map((image, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`${selectedCategory} ${index + 1}`}
                        className="h-48 md:h-96 w-auto object-contain rounded-lg"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NosInspiraSection;

