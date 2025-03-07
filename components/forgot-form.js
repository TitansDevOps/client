"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Simulación del envío de correo (Aquí deberías llamar a tu backend)
    console.log("Se envió un correo de recuperación a:", email);

    // 🔹 Redirigir al login con un parámetro en la URL
    router.push("/login?recovery=success");
  };

  return (
    <div className="relative z-10 p-6 rounded-lg bg-transparent mx-auto mt-2">
      <Card className="w-[400px] bg-transparent text-blue-800">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Recover your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* 🔹 Correo */}
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white text-black border border-neutral-300 rounded-md px-3 py-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* 🔹 Botón de Recuperar */}
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-neutral-300">
                Recover
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
