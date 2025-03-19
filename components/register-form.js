"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

export function RegisterForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // 🔹 Validar contraseñas en tiempo real
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && value && password !== value) {
      setError("Las contraseñas no coinciden.");
    } else {
      setError("");
    }
  };

  // 🔹 Validar si todos los campos están completos
  const isFormValid = username && email && password && confirmPassword && !error;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Registro exitoso!");
    // 🔹 Redirige al login con un mensaje de éxito
    router.push("/login?register=success");
  };

  return (
    <div className="relative z-10 p-6 rounded-lg bg-transparent mr-24">
      <Card className="w-[400px] bg-transparent text-blue-800">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* 🔹 Nombre de usuario */}
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your username"
                  required
                  className="bg-white text-black border border-neutral-300 rounded-md px-3 py-1.5"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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

              {/* 🔹 Contraseña */}
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white text-black border border-neutral-300 rounded-md px-3 py-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 🔹 Confirmar Contraseña */}
              <div className="grid gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  className={`bg-white text-black border ${
                    error ? "border-red-500" : "border-neutral-300"
                  } rounded-md px-3 py-1.5`}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              {/* 🔹 Botón de Registro */}
              <Button
                type="submit"
                className={`w-full ${
                  isFormValid ? "bg-white text-blue-900 hover:bg-neutral-300" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Register
              </Button>

              {/* 🔹 Botón con icono de Google */}
              <Button variant="outline" className="w-full">
                <FcGoogle size={24} />
              </Button>
            </div>

            {/* 🔹 Texto para redirigir a Login */}
            <div className="mt-3 text-center text-sm text-blue-800">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
