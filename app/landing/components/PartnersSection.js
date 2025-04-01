import Image from 'next/image';
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion';

export default function PartnersSection() {
  const partnerSliderRef = useRef(null);

  const partners = [
    { id: 1, name: "VetCare", img: "/partners/vetcare.svg" },
    { id: 2, name: "PetFood", img: "/partners/petfood.svg" },
    { id: 3, name: "AnimalLove", img: "/partners/animallove.svg" },
    { id: 4, name: "Paws", img: "/partners/paws.svg" },
    { id: 5, name: "HappyPets", img: "/partners/happypets.svg" },
    { id: 6, name: "WildHeart", img: "/partners/wildheart.svg" },
  ];

  const extendedPartners = [...partners, ...partners];

  useEffect(() => {
    if (!partnerSliderRef.current) return;

    const slider = partnerSliderRef.current;
    const originalWidth = slider.scrollWidth / 2;

    const animateSlider = () => {
      if (!slider) return;

      if (slider.scrollLeft >= originalWidth) {
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = 0;
      } else {
        slider.style.scrollBehavior = 'smooth';
        slider.scrollLeft += 1;
      }
    };

    const interval = setInterval(animateSlider, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="partners" 
      className="bg-white pt-16 pb-20 rounded-t-[80px] -mt-10 relative z-10 overflow-hidden"
    >
      {/* Elemento decorativo superior para mantener el redondeado */}
      <div className="absolute top-0 left-0 w-full h-20 bg-white -z-10 rounded-t-[80px]" />
      
      {/* Elementos decorativos de fondo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-10 right-1/4 w-48 h-48 bg-orange-400 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto px-4">
        {/* Título y descripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nuestros <span className="text-blue-600">Aliados</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empresas y organizaciones comprometidas con el bienestar animal
          </p>
        </motion.div>

        {/* Slider de partners infinito */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={partnerSliderRef}
            className="flex items-center gap-8 md:gap-12 overflow-x-auto hide-scrollbar py-4 px-4"
          >
            {extendedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-16 h-16 relative mr-4">
                  <Image
                    src={partner.img}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-gray-700 font-bold whitespace-nowrap">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sección de testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              quote: "Colaborar con AdoptaTuMascota nos ha permitido ayudar a más animales necesitados.",
              author: "María Gómez",
              role: "Directora de VetCare"
            },
            {
              quote: "Juntos hemos logrado encontrar hogares para cientos de mascotas abandonadas.",
              author: "Carlos Rodríguez",
              role: "CEO de PetFood"
            },
            {
              quote: "La pasión por el bienestar animal nos une en esta maravillosa causa.",
              author: "Laura Fernández",
              role: "Fundadora de Paws"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                <p className="text-blue-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 