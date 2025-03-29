"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'; // Importar Link desde next/link
import styles from '../styles/globals.css'

export function ResetForm({
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para almacenar la confirmación
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

  const isFormValid = password && confirmPassword && isPasswordValid && isPasswordMatch; // Verificar si el formulario es válido

  return (
    <div className={cn("flex flex-col gap-6", className )} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">¡Ya casi!</h1>
                <p className="text-balance text-muted-foreground">
                  Falta poco para recuperar tu cuenta
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Nueva contraseña</Label>
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
                  <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
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
                  Confirmar recuperación
                </Link>
              </Button>
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
  )
}
