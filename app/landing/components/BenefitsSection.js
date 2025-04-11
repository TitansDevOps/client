"use client";
import { motion } from "framer-motion";
import { PawPrint, Heart, ShieldCheck, Users } from "lucide-react"; // o usa tus propios íconos SVG

export default function EnhancedBenefitsSection() {
  const benefits = [
    {
      title: "Salvavidas Peludos",
      description:
        "Cada adopción libera espacio en refugios para ayudar a otro animal necesitado.",
      icon: <PawPrint className="text-purple-600" size={24} />,
      bgClass: "bg-purple-50",
      delay: 0.1,
    },
    {
      title: "Amor Garantizado",
      description:
        "Los animales adoptados muestran un agradecimiento y lealtad incomparables.",
      icon: <Heart className="text-red-500" size={24} />,
      bgClass: "bg-red-50",
      delay: 0.3,
    },
    {
      title: "Adopción Segura",
      description:
        "Todos nuestros animales tienen chequeo veterinario completo y esterilización.",
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      bgClass: "bg-blue-50",
      delay: 0.5,
    },
    {
      title: "Comunidad",
      description:
        "Acceso a nuestro grupo exclusivo de dueños con consejos y eventos especiales.",
      icon: <Users className="text-green-600" size={24} />, // Asegúrate de importar el ícono
      bgClass: "bg-green-50",
      delay: 0.7,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800"
        >
          Beneficios de Adoptar
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Descubre cómo cambiarás dos vidas: la de tu nueva mascota y la tuya.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: benefit.delay }}
              viewport={{ once: true }}
              className={`${benefit.bgClass} p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white`}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full mb-4 mx-auto shadow-md">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Ver historias de adopción
          </button>
        </motion.div>
      </div>
    </section>
  );
}
