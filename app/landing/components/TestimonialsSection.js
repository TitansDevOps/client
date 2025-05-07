'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import avatar1 from '../assets/testimonials/1.jpg';
import avatar2 from '../assets/testimonials/2.jpg';  
import avatar3 from '../assets/testimonials/3.jpg';
import avatar4 from '../assets/testimonials/4.jpg';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Adoptar a Luna fue lo mejor que nos pasó. Se adaptó increíblemente rápido y llena nuestro hogar de alegría.",
      author: "María González",
      role: "Dueña de Luna",
      avatar: avatar1, // Cambiado de src a avatar para consistencia
    },
    {
      id: 2,
      quote: "El proceso de adopción fue muy profesional. Nos guiaron en cada paso y hoy tenemos un compañero fiel.",
      author: "Carlos Martínez",
      role: "Dueño de Max",
      avatar: avatar2, // Cambiado de img a avatar
    },
    {
      id: 3,
      quote: "No me arrepiento para nada de haber adoptado. La conexión con mi perro es algo que no se puede explicar.",
      author: "Ana Rodríguez",
      role: "Dueña de Toby",
      avatar: avatar3, // Cambiado de img a avatar
    },
    {
      id: 4,
      quote: "Después de adoptar a Mimi, entendí el verdadero significado del amor incondicional. Recomiendo adoptar 100%.",
      author: "Jorge Sánchez",
      role: "Dueño de Mimi",
      avatar: avatar4, // Cambiado de img a avatar
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-rotación de testimonios
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    clearInterval(intervalRef.current);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Historias que nos inspiran
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Descubre lo que dicen familias que han encontrado a su compañero
          perfecto
        </p>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonios en stack vertical con animación */}
          <div ref={testimonialsRef} className="overflow-hidden h-96 relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="bg-blue-50 p-8 rounded-xl shadow-md h-full flex flex-col">
                  <Quote className="text-blue-400 mb-4" size={24} />
                  <p className="text-lg italic text-gray-700 mb-6 flex-grow">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-200"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                      <p className="text-sm text-blue-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de navegación */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
          >
            <ChevronLeft className="text-blue-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
          >
            <ChevronRight className="text-blue-600" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  clearInterval(intervalRef.current);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
