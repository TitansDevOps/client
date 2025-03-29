"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import styles from "../styles/globals.css";
import { AuthForm, PasswordForm } from "./passwordForm";
import { EmailForm } from "./emailForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { ToastMessage } from "@/components/ui/toast";

export function RegisterForm({ className, ...props }) {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [toastData, setToastData] = useState(null);

  const handleSubmitPassword = (password) => {
    console.log("password", password);
    setRegisterForm({ ...registerForm, password });
  };

  const handleSubmitEmail = (email) => {
    console.log("email", email);
    setRegisterForm({ ...registerForm, email });
  };

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    registerForm.email,
  );
  const isFormValid = registerForm.password && isEmailValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    //FIXME::llamar al endpoint de registro de usuario - borrar el console.log el setToasData despues de validar la respuesta del request
    console.log(registerForm.email, registerForm.password);

    if (1 == 3) {
      setToastData({
        message: "Usuario registrado con éxito",
        type: "success",
        onClose: () => router.push("/login"),
      });
    } else {
      setToastData({
        message: "Error al registrar el usuario",
        type: "error",
        onClose: () => router.push("/login"),
      });
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
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">¡Registrate!</h1>
                <p className="text-balance text-muted-foreground">
                  ¡Registrate y adopta!
                </p>
              </div>
              <EmailForm onSubmit={handleSubmitEmail} />
              <PasswordForm onSubmit={handleSubmitPassword} />

              <Button
                type="submit"
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                Registrarme
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
  );
}
