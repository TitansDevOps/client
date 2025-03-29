"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import styles from "../styles/globals.css";
import { PasswordForm } from "./passwordForm";
import { useRouter } from "next/navigation";

export function ResetForm({ className, ...props }) {
  const router = useRouter();

  const [ResetForm, setResetForm] = useState({
    token: "",
    password: "",
  });

  const handleSubmitPassword = (password) => {
    console.log("password", password);
    setResetForm({ ...ResetForm, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //FIXME::llamar al endpoint de reseteo de contraseña - borrar el console.log
    console.log(ResetForm.token, ResetForm.password);
    router.push("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              <PasswordForm onSubmit={handleSubmitPassword} />
              <Button
                type="submit"
                className="w-full bg-orange-600 text-white hover:bg-orange-400"
                disabled={!ResetForm.password}
                onClick={handleSubmit}
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
