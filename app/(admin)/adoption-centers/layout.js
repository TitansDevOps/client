// app/(admin)/adoption-centers/layout.js
"use client";
import { usePathname } from "next/navigation";
import LayoutPage from "@/app/components/Layout";
import { ToastProvider } from "@/app/context/ToastContext";

export default function AdoptionCentersLayout({ children, table }) {
  const pathname = usePathname();
  const isBaseRoute = pathname === "/adoption-centers";

  return (
    <ToastProvider>
      <LayoutPage>
        {isBaseRoute ? (
          children
        ) : (
          <>
            {table}
            {children}
          </>
        )}
      </LayoutPage>
    </ToastProvider>
  );
}
