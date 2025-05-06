"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import CentersTable from "@/app/(admin)/adoption-centers/page";
import EditForm from "@/app/(admin)/adoption-centers/helpers/editForm";
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
      const response = await apiPost("/adoption-centers", formData);

      if (response.status !== 200) {
        showToast("error", "Error al crear centro");
        return;
      }

      const newCenterId = response.data.body.id;
      showToast("success", "Centro creado correctamente");

      router.push("/adoption-centers/" + newCenterId);
      setCreatedCenterId(newCenterId);
      return newCenterId;
    } catch (error) {
      showToast("error", "Error al crear centro");
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
      <CentersTable />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title="Crear Nuevo Centro"
        onClose={() => router.push("/adoption-centers")}
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
