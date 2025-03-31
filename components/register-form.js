"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

import styles from "../styles/globals.css";
import { PasswordForm } from "./passwordForm";
import { EmailForm } from "./emailForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { apiPost } from "@/utils/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { ToastMessage } from "@/components/ui/toast";

export function RegisterForm({ className, ...props }) {
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [toastData, setToastData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  const handleSubmitFullName = (e) => {
    const fullName = e.target.value;
    setRegisterForm({ ...registerForm, fullName });
  };

  const handleSubmitEmail = (email) => {
    setRegisterForm({ ...registerForm, email });
  };

  const handleSubmitPassword = (password) => {
    setRegisterForm({ ...registerForm, password });
  };

  const handleSubmitAddress = (e) => {
    const address = e.target.value;
    setRegisterForm({ ...registerForm, address });
  };

  const handleSubmitPhone = (e) => {
    const phone = e.target.value;
    setRegisterForm({ ...registerForm, phone });
  };

  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    registerForm.email,
  );
  useEffect(() => {
    const allFieldsFilled =
      registerForm.fullName &&
      registerForm.email &&
      registerForm.password &&
      registerForm.address &&
      registerForm.phone;

    if (allFieldsFilled && isEmailValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [registerForm, isEmailValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsFormValid(false);

    try {
      const response = await apiPost("/auth/register", registerForm);

      if (response.status === 201) {
        setToastData({
          message: response.data.message,
          type: "success",
          onClose: () => router.push("/login"),
        });
      } else {
        setIsFormValid(true);
        setToastData({
          message: response.data.message,
          type: "error",
          onClose: () => {},
        });
      }
    } catch (error) {
      setIsFormValid(true);
      setToastData({
        message: "Error al registrar el usuario. Inténtalo nuevamente.",
        type: "error",
        onClose: () => {},
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

              {/* Full Name */}
              <div className="grid gap-2">
                <Label htmlFor="fullname">Nombre completo</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Juan Pérez"
                  required
                  value={registerForm.fullName}
                  onChange={handleSubmitFullName}
                />
              </div>

              <EmailForm onSubmit={handleSubmitEmail} />
              <PasswordForm onSubmit={handleSubmitPassword} />

              {/* Address */}
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Calle 123, Ciudad"
                  required
                  value={registerForm.address}
                  onChange={handleSubmitAddress}
                />
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                  required
                  value={registerForm.phone}
                  onChange={handleSubmitPhone}
                />
              </div>

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
