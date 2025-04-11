import { Suspense } from "react";
import { ResetForm } from "@/app/components/auth/reset-form";

export default function ResetPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Suspense fallback={<div>Cargando formulario...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
