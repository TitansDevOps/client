  'use client';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
  import { useState, useEffect } from 'react';
  import PetCard from './PetCard';

  import dog1 from '../assets/pets/dog1.jpg';
  import cat1 from '../assets/pets/cat1.jpg';
  import rabbit1 from '../assets/pets/rabbit1.jpg';
  import dog2 from '../assets/pets/dog2.jpg';
  import cat2 from '../assets/pets/cat2.jpg';
  import rabbit2 from '../assets/pets/rabbit2.jpg';

  const pets = [
    {
      id: 1,
      name: "Luna",
      gender: "female",
      age: "2 años",
      breed: "Labrador",
      location: "Bogotá",
      image: dog1, // Usa la imagen importada
      type: "perro"
    },
    {
      id: 2,
      name: "Max",
      gender: "male",
      age: "3 años",
      breed: "Siamés",
      location: "Medellín",
      image: cat1,
      type: "gato"
    },
    {
      id: 3,
      name: "Bugs",
      gender: "male",
      age: "1 año",
      breed: "Conejo Holandés",
      location: "Cali",
      image: rabbit1,
      type: "conejo"
    },
    {
      id: 4,
      name: "Rocky",
      gender: "male",
      age: "4 años",
      breed: "Bulldog",
      location: "Barranquilla",
      image: dog2,
      type: "perro"
    },
    {
      id: 5,
      name: "Misty",
      gender: "female",
      age: "2 años",
      breed: "Persa",
      location: "Cartagena",
      image: cat2,
      type: "gato"
    },
    {
      id: 6,
      name: "Cotton",
      gender: "female",
      age: "8 meses",
      breed: "Conejo Enano",
      location: "Bucaramanga",
      image: rabbit2,
      type: "conejo"
    }
  ];


  export default function PetCardsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Handle touch para móviles
    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const difference = touchStart - touchEnd;
      if (difference > 50) nextPet(); // Deslizar izquierda
      if (difference < -50) prevPet(); // Deslizar derecha
      setTouchStart(null);
      setTouchEnd(null);
    };

    // Auto-avance optimizado
    useEffect(() => {
      if (!isAutoPlaying) return;
      const timer = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % pets.length);
      }, 5000);
      return () => clearTimeout(timer);
    }, [currentIndex, isAutoPlaying]);

    const nextPet = () => {
      setCurrentIndex(prev => (prev + 1) % pets.length);
    };

    const prevPet = () => {
      setCurrentIndex(prev => (prev - 1 + pets.length) % pets.length);
    };

    return (
      <section className="bg-gradient-to-b from-white to-blue-50 py-12 md:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
              Encuentra a tu <span className="text-blue-600">compañero</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Conoce a estos increíbles amigos que buscan un hogar
            </p>
          </motion.div>

          {/* Carrusel */}
          <div 
            className="relative max-w-xs md:max-w-md lg:max-w-2xl mx-auto"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Flechas de navegación (solo desktop) */}
            <button 
              onClick={prevPet}
              className="hidden md:block absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-gray-50 transition-colors"
              aria-label="Mascota anterior"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>

            {/* Contenedor de tarjetas */}
            <div className="overflow-hidden px-1">
              <div className="flex justify-center items-center h-[340px] md:h-[380px] relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  {/* Tarjeta anterior (semi-transparente) */}
                  <motion.div
                    key={`prev-${currentIndex}`}
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 0.6, x: -60, scale: 0.9 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute left-0 w-48 md:w-56 z-10"
                  >
                    <PetCard pet={pets[(currentIndex - 1 + pets.length) % pets.length]} />
                  </motion.div>

                  {/* Tarjeta principal */}
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="relative z-20 w-56 md:w-64"
                  >
                    <PetCard pet={pets[currentIndex]} isFeatured />
                  </motion.div>

                  {/* Tarjeta siguiente (semi-transparente) */}
                  <motion.div
                    key={`next-${currentIndex}`}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 0.6, x: 60, scale: 0.9 }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute right-0 w-48 md:w-56 z-10"
                  >
                    <PetCard pet={pets[(currentIndex + 1) % pets.length]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button 
              onClick={nextPet}
              className="hidden md:block absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-gray-50 transition-colors"
              aria-label="Siguiente mascota"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 md:mt-8 gap-1.5">
            {pets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-4 md:w-6' : 'bg-gray-300'}`}
                aria-label={`Ir a mascota ${index + 1}`}
              />
            ))}
          </div>

          {/* Botón CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-8 md:mt-10"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-lg text-sm md:text-base font-medium inline-flex items-center transition-colors shadow-sm hover:shadow-md">
              Ver más mascotas
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }