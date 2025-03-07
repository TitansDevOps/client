import { ForgotForm } from "@/components/forgot-form";
import VideoBackground from "@/components/video-background";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <VideoBackground /> {/* 🔹 Video agregado */}

      {/* 🔹 TEXTO TOTALMENTE A LA IZQUIERDA */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
        <h1 className="text-4xl font-bold text-white">Que descuido!</h1>
        <p className="text-lg text-white mt-2">
            Llena el formulario y recupera tu cuenta
        </p>
      </div>

      {/* 🔹 FORMULARIO A LA DERECHA */}
      <div className="w-full max-w-sm ml-auto mr-20">
        <ForgotForm />
      </div>
    </div>

  );
}
