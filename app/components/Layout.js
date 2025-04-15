"use client";
import { useState } from "react";
import SidebarDashboard from "@/app/components/Sidebar";
import ProtectedRoute from "@/app/context/ProtectedRoute";

export default function LayoutPage({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-[auto,1fr] min-h-screen bg-slate-50">
      <ProtectedRoute>
        <SidebarDashboard isOpenSidebar={setIsOpen} />
        <main
          className={` bg-slate-50 transition-all w-full duration-300 ${isOpen ? "ml-64" : "ml-16"}`}
        >
          {children}
        </main>
      </ProtectedRoute>
    </div>
  );
}
