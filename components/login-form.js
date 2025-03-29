"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "../styles/globals.css";

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Alternar la visibilidad de la contraseña
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
                <p className="text-balance text-muted-foreground">
                  Inicia sesión y accede para más
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="/forgot"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Cambia entre "password" y "text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualiza la contraseña
                    required
                  />
                  {/* Botón para alternar la visibilidad de la contraseña */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
                  >
                    {showPassword ? "Ocultar" : "Ver"}{" "}
                    {/* Cambia el texto entre "Ver" y "Ocultar" */}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
              >
                Iniciar sesión
              </Button>
              {/* DOCUMENTAMOS EL BOTON DE INICIAR SESION CON GOOGLE */}
              {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  O continuar con
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Iniciar sesión con</span>
                </Button>
              </div> */}
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Registrate
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/perrogato.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
