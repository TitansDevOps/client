export default function Footer() {
  return (
    <footer className="bg-blue-100 pt-16 pb-6 relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-blue-100 -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
              <span className="font-bold text-lg text-gray-800">ADOPCIÓN DE MASCOTAS</span>
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              Conectamos animales que necesitan un hogar con personas dispuestas a brindarles amor y cuidados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full transform transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" fill="#3B5998" />
                </svg>
              </a>
              
              <a href="#" className="bg-white p-2 rounded-full transform transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 7.5h-1.5c-.54 0-1.02.36-1.02.77v1.73h2.5L16.5 14h-2v5h-2v-5H10v-2h2.5v-2c0-1.66 1.34-3 3-3H17v2.5z"
                    fill="#E4405F"
                  />
                </svg>
              </a>
              
              <a href="#" className="bg-white p-2 rounded-full transform transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.498 21.02h-11c-3.866 0-7-3.134-7-7v-4c0-3.866 3.134-7 7-7h11c3.866 0 7 3.134 7 7v4c0 3.866-3.134 7-7 7z"
                    fill="#25D366"
                  />
                  <path
                    d="M14.35 7.04c-.82-.42-1.74-.64-2.73-.64-3.31 0-6 2.69-6 6 0 1.06.28 2.06.77 2.93l-1.11 3.3 3.4-1.08c.84.46 1.8.72 2.83.72 3.31 0 6-2.69 6-6 0-1.06-.28-2.06-.77-2.93"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M12 17.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-7l-2 2-2-2-1 1 2 2-2 2 1 1 2-2 2 2 1-1-2-2 2-2-1-1z"
                    fill="#25D366"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div>
            <h3 className="text-gray-800 font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Mascotas Disponibles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Proceso de Adopción
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Historias de Éxito
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Donaciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Adopción de Mascotas. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 text-xs text-gray-700">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}