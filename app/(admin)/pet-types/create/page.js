"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import PetsTypesPage from "@/app/(admin)/pet-types/page";
import EditForm from "@/app/(admin)/pet-types/helpers/EditForm";
import { ToastContext } from "@/app/context/ToastContext";

export default function CreateCenter() {
  const [createdCenterId, setCreatedCenterId] = useState(null);
  const toastRef = useContext(ToastContext);
  const router = useRouter();

  const initialFormData = {
    name: "",
    description: "",
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await apiPost("/pet-types", formData);
      if (response.status !== 200) {
        showToast("error", "Error al crear el tipo de mascota");
        return;
      }

      const newCenterId = response.data.body.id;
      showToast("success", response.data.message);
      router.push("/pet-types/" + newCenterId);
      setCreatedCenterId(newCenterId);
      return newCenterId;
    } catch (error) {
      showToast("error", "Error al crear el tipo de mascota");
    }
  };

  const showToast = (severity, message) => {
    toastRef.current?.show({
      severity,
      summary: severity === "success" ? "Éxito" : "Error",
      detail: message,
      life: 3000,
    });
  };

  return (
    <>
      <PetsTypesPage />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title="Crear Nuevo Tipo De Mascota"
        onClose={() => router.push("/pet-types")}
        onSave={handleSubmit}
      >
        <EditForm
          center={initialFormData}
          onSave={handleSubmit}
          action="create"
          createdCenterId={createdCenterId}
        />
      </SidebarC>
    </>
  );
}
