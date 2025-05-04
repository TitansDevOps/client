"use client";
import { useState, useEffect } from "react";
import SidebarDashboard from "@/app/components/Sidebar";
import ProtectedRoute from "@/app/context/ProtectedRoute";

export default function LayoutPage({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-slate-50 w-full">
      <ProtectedRoute allowedRoles={["admin", "operator"]}>
        <div className={`fixed md:static z-10`}>
          <SidebarDashboard isOpenSidebar={setIsOpen} />
        </div>

        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-0"
            onClick={() => setIsOpen(false)}
          />
        )}

        <main
          className={`relative transition-all duration-300 bg-slate-50 min-h-screen ${
            isOpen ? "md:ml-64" : "md:ml-16"
          } overflow-x-hidden`}
        >
          <div className="w-full max-w-[calc(100vw-64px)]">{children}</div>
        </main>
      </ProtectedRoute>
    </div>
  );
}
