"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link'; // Importar Link desde next/link
import styles from '../styles/globals.css';

export function RegisterForm({
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para almacenar la confirmación
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Estado para la validación de la contraseña
  const [isPasswordMatch, setIsPasswordMatch] = useState(true); // Estado para verificar si las contraseñas coinciden

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // Alternar la visibilidad de la contraseña
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState); // Alternar la visibilidad de la confirmación
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(passwordRegex.test(newPassword)); // Validar la contraseña
    setIsPasswordMatch(newPassword === confirmPassword); // Verificar si las contraseñas coinciden
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatch(newConfirmPassword === password); // Verificar si las contraseñas coinciden
  };

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email); // Validación de correo electrónico

  const isFormValid = password && confirmPassword && isEmailValid && isPasswordValid && isPasswordMatch; // Verificar si el formulario es válido

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">¡Registrate!</h1>
                <p className="text-balance text-muted-foreground">
                  ¡Registrate y adopta!
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Cambia entre "password" y "text"
                    value={password}
                    onChange={handlePasswordChange} // Actualiza la contraseña
                    required
                    minLength={8}
                  />
                  {/* Botón para alternar la visibilidad de la contraseña */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                {!isPasswordValid && (
                  <p className="text-red-500 text-xs">La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} // Cambia entre "password" y "text"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} // Actualiza la confirmación de la contraseña
                    required
                  />
                  {/* Botón para alternar la visibilidad de la confirmación */}
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
                  >
                    {showConfirmPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                {!isPasswordMatch && (
                  <p className="text-red-500 text-xs">Las contraseñas no coinciden.</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
                disabled={!isFormValid} // Deshabilitar el botón si el formulario no es válido
              >
              <Link href="/login" passHref>
                  Registrarme
              </Link>
              </Button>
              {/* DOCUMENTAR REGISTRO DE SESION CON GOOGLE*/}
              {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  O registrarme con
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
                  <span className="sr-only">Registrate con</span>
                </Button>
              </div> */}
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
