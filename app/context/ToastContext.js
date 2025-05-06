// contexts/ToastContext.js
"use client";
import { createContext, useRef } from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  return (
    <ToastContext.Provider value={toastRef}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
}
