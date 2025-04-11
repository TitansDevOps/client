"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPost } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/components/ui/toast";
import styles from "../../../styles/globals.css";

import { useAuth } from "@/app/context/AuthContext";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsFormValid(emailRegex.test(email) && password.length > 0);
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) setHasSubmitted(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email) && password.length > 0;

    if (!isValid && !toastData) {
      setToastData({
        message: "Por favor ingresa un email válido y una contraseña.",
        type: "error",
        onClose: () => setToastData(null),
      });
      return;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiPost("/auth/login", { email, password });

      if (response.status === 200) {
        login(response.data.body.token);
        setToastData({
          message: response.data.message,
          type: "success",
          onClose: () => {
            router.push("/dashboard");
          },
        });
      } else {
        setToastData({
          message: response.data.message,
          type: "error",
          onClose: () => setToastData(null),
        });
      }
    } catch (error) {
      setToastData({
        message: "Error al iniciar sesión. Intente nuevamente.",
        type: "error",
        onClose: () => setToastData(null),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {toastData && (
        <ToastMessage
          message={toastData.message}
          type={toastData.type}
          onClose={toastData.onClose}
        />
      )}
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    hasSubmitted && !isFormValid && email.length > 0
                      ? "border-red-500"
                      : ""
                  }
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={
                      hasSubmitted && !isFormValid && email.length > 0
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-sm"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </Button>
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
