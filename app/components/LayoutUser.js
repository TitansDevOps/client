"use client";
import ProtectedRoute from "@/app/context/ProtectedRoute";

export default function LayoutUserPage({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-50 w-full">
      <ProtectedRoute allowedRoles={["user"]}>
        <main className={"relative transition-all duration-300 bg-slate-50"}>
          <div className="w-full max-w-[calc(100vw)]">{children}</div>
        </main>
      </ProtectedRoute>
    </div>
  );
}
