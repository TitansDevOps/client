import { LoginForm } from "@/components/login-form";
import VideoBackground from "@/components/video-background";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6"

export default function Login() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-between p-6 md:p-10">
      
      {/* 🔹 TEXTO TOTALMENTE A LA IZQUIERDA */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
        <h1 className="text-4xl font-bold text-white">Bienvenido a Huellas de Ángel!</h1>
        <p className="text-lg text-white mt-2">
          Inicia sesión y adopta tu ángel.
        </p>

       {/* 🔹 ICONOS DE REDES SOCIALES */}
       <div className="flex space-x-4 mt-4">
     
     
     
     
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-3xl hover:text-blue-800 transition duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-blue-400 text-3xl hover:text-blue-600 transition duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 text-3xl hover:text-pink-700 transition duration-300" />
          </a>
        </div>
        </div>

      {/* 🔹 FORMULARIO A LA DERECHA (SIN CAMBIOS) */}
      <div className="w-full max-w-sm ml-auto mr-20">
      <VideoBackground /> {/* 🔹 Video agregado */}
      <LoginForm />
      </div>
      
    </div>
  );
}
