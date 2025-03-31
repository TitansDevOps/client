"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard 🎉</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Login
      </button>
    </div>
  );
}
