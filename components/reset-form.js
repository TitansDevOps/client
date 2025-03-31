"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import styles from "../styles/globals.css";
import { PasswordForm } from "./passwordForm";
import { apiPost } from "@/utils/api";
import { ToastMessage } from "@/components/ui/toast";

export function ResetForm({ className, ...props }) {
  const router = useRouter(); // ✅ Ahora sí está definido
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [ResetForm, setResetForm] = useState({
    token: token || "",
    password: "",
  });

  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    if (token) {
      setResetForm((prev) => ({ ...prev, token }));
    }
  }, [token]);

  const handleSubmitPassword = (password) => {
    setResetForm((prev) => ({ ...prev, password }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiPost("/auth/reset-password", ResetForm);

      setToastData({
        message: response.data.message,
        type: response.status === 200 ? "success" : "error",
      });

      if (response.status === 200) {
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      setToastData({
        message: "Error al cambiar contraseña. Intente nuevamente",
        type: "error",
      });
    }
  };

  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {toastData && (
          <ToastMessage
            message={toastData.message}
            type={toastData.type}
            onClose={() => setToastData(null)}
          />
        )}
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
    </Suspense>
  );
}
