'use client';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white py-4 shadow-sm" 
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          
          {/* Logo con animación sutil */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <motion.span 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="h-3 w-3 bg-red-500 rounded-full"
            />
            <span className="text-lg font-semibold text-gray-900">
              ADOPCIÓN DE MASCOTAS
            </span>
          </motion.div>

          {/* Menú con animaciones hover */}
          <nav className="hidden md:flex items-center space-x-8 ml-12">
            {['help', 'testimonials', 'about', 'contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`#${item}`}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item === 'help' && 'Cómo ayudar'}
                  {item === 'testimonials' && 'Historias'}
                  {item === 'about' && 'Nosotros'}
                  {item === 'contact' && 'Contacto'}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Botón animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-8"
          >
            <button className="flex items-center px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md hover:shadow-lg transition-all">
              Adoptar
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="ml-2" size={18} />
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}