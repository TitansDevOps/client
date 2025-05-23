"use client";
import { usePathname } from "next/navigation";
import LayoutPage from "@/app/components/Layout";
import { ToastProvider } from "@/app/context/ToastContext";

export default function PetsLayout({ children, table }) {
  const pathname = usePathname();
  const isBaseRoute = pathname === "/pets";

  return (
    <ToastProvider>
      <LayoutPage>
        {isBaseRoute ? (
          <>
            {table}
            {children}
          </>
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
