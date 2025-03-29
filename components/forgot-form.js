"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import styles from "../styles/globals.css";
import { EmailForm } from "./emailForm";
import { useRouter } from "next/navigation";

export function ForgotForm({ className, ...props }) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //FIXME::llamar a la función de validación de correo electrónico endpoint
    console.log("Email ingresado:", email);
    router.push("/reset");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">¡Que descuido!</h1>
                <p className="text-balance text-muted-foreground">
                  ¡Recupera tu contraseña!
                </p>
              </div>
              <EmailForm onSubmit={setEmail} />
              <Button
                type="submit"
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
              >
                Recuperar contraseña
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
