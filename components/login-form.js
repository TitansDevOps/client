"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({ className, ...props }) {
  const searchParams = useSearchParams();
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);
  const [showRecoverAlert, setShowRecoverAlert] = useState(false);

  useEffect(() => {
    // 🔹 Si viene de registro exitoso, muestra la alerta por 3 segundos
    if (searchParams.get("register") === "success") {
      setShowRegisterAlert(true);
      setTimeout(() => {
        setShowRegisterAlert(false);
      }, 3000);
    }

    // 🔹 Si viene de recuperación de contraseña, muestra la alerta hasta que el usuario la cierre
    if (searchParams.get("recovery") === "success") {
      setShowRecoverAlert(true);
    }
  }, [searchParams]);

  return (
    <div className="relative z-10 p-6 rounded-lg bg-transparent mr-24">
      {/* 🔹 Alerta de "Registro Exitoso" (desaparece en 3 segundos) */}
      {showRegisterAlert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">Registro exitoso. Ahora puedes iniciar sesión.</p>
        </div>
      )}

      {/* 🔹 Alerta de "Revisa tu correo" (el usuario puede cerrarla) */}
      {showRecoverAlert && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white p-4 rounded-lg shadow-md text-center flex items-center">
          <p className="text-lg font-semibold">Revisa tu correo para cambiar tu contraseña.</p>
          <button 
            onClick={() => setShowRecoverAlert(false)} 
            className="ml-4 text-white font-bold bg-transparent border-none text-xl"
          >
            ✖
          </button>
        </div>
      )}

      <Card className="w-[400px] bg-transparent text-blue-800">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  className="bg-white text-black border border-neutral-300 rounded-md px-3 py-2" 
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="/forgot" 
                    className="ml-auto inline-block text-sm text-blue-800 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-white text-black border border-neutral-300 rounded-md px-3 py-2" 
                />
              </div>

              {/* 🔹 Botón de Login */}
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-neutral-300">
                Login
              </Button>

              {/* 🔹 Botón de Google */}
              <Button variant="outline" className="w-full">
                <FcGoogle size={24} />
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-blue-800">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
