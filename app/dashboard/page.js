"use client";

import ProtectedRoute from "@/app/context/ProtectedRoute";
import SidebarDashboard from "@/app/components/Sidebar";

export default function App() {
  return (
    // <ProtectedRoute>
    <SidebarDashboard />

    // </ProtectedRoute>
  );
}
