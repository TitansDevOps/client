"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/context/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard 🎉</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </ProtectedRoute>
  );
}
