"use client";
import LayoutUserPage from "@/app/components/LayoutUser";

export default function UserHomePage() {
  return (
    <LayoutUserPage>
      <div className="flex min-h-screen flex-col items-center justify-center md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <h1 className="text-2xl font-bold pb-[500px]">
            Bienvenido a la página de usuarios
          </h1>
        </div>
      </div>
    </LayoutUserPage>
  );
}
