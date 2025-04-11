"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsSection({ isVisible }) {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos animados */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          transition: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-20 right-10 md:right-20 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 -z-10 blur-xl md:blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
          transition: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="absolute bottom-20 left-10 md:left-20 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-20 -z-10 blur-xl md:blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Contenido de texto */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">
                Sobre <span className="text-blue-600">Nosotros</span>
                <span className="text-orange-500">.</span>
              </h2>

              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                En AdoptaTuMascota, creemos que cada mascota merece un hogar
                lleno de amor y cada persona merece la compañía de un amigo
                fiel. No somos un refugio, sino un puente que conecta a los
                animales rescatados con familias dispuestas a brindarles un
                hogar.
              </p>

              {/* Estadísticas */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 flex items-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-3 md:p-4 rounded-lg mr-4 shadow-md">
                  <span className="font-bold text-sm md:text-base">
                    ¡GRACIAS!
                  </span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold text-2xl md:text-3xl block">
                    100+
                  </span>
                  <span className="text-orange-500 text-sm md:text-base">
                    Familias felices
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Galería de imágenes */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[300px] md:h-[400px] w-full"
            >
              {/* Imagen principal */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 left-0 w-full h-[65%] md:h-[70%] rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/about-1.jpg"
                  alt="Mascotas felices"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Imagen secundaria */}
              <motion.div
                whileHover={{ x: -5 }}
                className="absolute bottom-0 left-0 w-[45%] md:w-[40%] h-[30%] rounded-xl overflow-hidden shadow-lg border-2 border-white"
              >
                <Image
                  src="/about-2.jpg"
                  alt="Familia con mascota"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 20vw"
                />
              </motion.div>

              {/* Recuadro de estadística */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-0 right-0 w-[45%] md:w-[40%] h-[25%] bg-orange-500 rounded-xl flex flex-col items-center justify-center shadow-lg border-2 border-white"
              >
                <span className="text-white font-bold text-2xl md:text-3xl">
                  100+
                </span>
                <span className="text-white text-sm md:text-base">
                  Adopciones
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
