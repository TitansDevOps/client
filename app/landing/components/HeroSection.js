'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" // ID esencial para el funcionamiento
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-100 relative overflow-hidden"
    >
      {/* Elementos decorativos animados */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-30 -z-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-100 rounded-full opacity-30 -z-10 blur-3xl"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Contenido de texto */}
          <div className="md:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Haz la diferencia, <span className="text-blue-600">adopta un amigo</span>.
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">
                Conectamos animales rescatados con hogares amorosos. Más de 1,000 mascotas esperan por una segunda oportunidad.
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-lg font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <span>Conoce nuestras mascotas</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* Contenido de imagen */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-xl"
            >
              <Image
                src="/hero-dog.png"
                alt="Perro esperando ser adoptado"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}