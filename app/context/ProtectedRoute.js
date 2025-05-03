"use client";
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.user.role)
      ) {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, router]);

  if (loading) return <p>Cargando...</p>;

  return user ? children : null;
}
