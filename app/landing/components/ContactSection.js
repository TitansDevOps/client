'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import contact1 from '../assets/contact/contact1.jpg';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-white pt-20 pb-40 overflow-hidden rounded-b-[80px]"
    >
      {/* Forma decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-[100px] -z-10" />

      {/* Contenedor principal con más padding horizontal */}
      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Columna izquierda - Texto e imagen */}
          <div className="lg:w-1/2 relative">
            {/* Elementos gráficos decorativos */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1 }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl -z-10"
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sigamos en <span className="text-orange-500">Contacto!</span>
              </h2>

              <p className="text-gray-600 mb-10 max-w-lg text-lg leading-relaxed">
                ¿Tienes preguntas o necesitas ayuda? Contáctanos por correo,
                teléfono o mediante el formulario. ¡Estamos aquí para ayudarte a
                encontrar a tu compañero perfecto!
              </p>

              {/* Contenedor de imagen pegado al texto */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full mt-8 flex justify-center" // Añadido flex justify-center
              >
                <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-200 rounded-full opacity-20 -z-10" />
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-200 rounded-full opacity-20 -z-10" />

                <div
                  className="relative"
                  style={{ width: "100%", maxWidth: "600px" }}
                >
                  <Image
                    src={contact1}
                    alt="Persona con mascota"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-2xl relative border border-gray-100"
            >
              {/* Elementos decorativos */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-orange-200 rounded-full opacity-20 blur-md -z-10" />
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-blue-200 rounded-full opacity-20 blur-md -z-10" />

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo podemos ayudarte?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      Adopción
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2 px-4 bg-orange-50 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
                    >
                      Donación
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2 px-4 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      Otro
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Acepto recibir información sobre adopciones
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Enviar Mensaje
                </motion.button>
              </form>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Otras formas de contacto
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Email</h4>
                    <p className="text-blue-600">contacto@adoptamascotas.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Teléfono</h4>
                    <p className="text-blue-600">+323 356 3890</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Dirección</h4>
                    <p className="text-blue-600">Calle Mascotas 123, Bogotá</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
