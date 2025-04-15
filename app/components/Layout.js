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
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] min-h-screen bg-slate-50">
      <ProtectedRoute>
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
          className={`transition-all duration-300 bg-slate-50 min-h-screen ${
            isOpen ? "ml-64" : "ml-16 md:ml-16"
          }`}
        >
          {children}
        </main>
      </ProtectedRoute>
    </div>
  );
}
