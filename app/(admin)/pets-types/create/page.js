"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import PetsTypesTable from "@/app/(admin)/pets-types/page";
import { ToastContext } from "@/app/context/ToastContext";
import { Layout } from "lucide-react";
import LayoutPage from "@/app/components/Layout";
import PetsTypesPage from "@/app/(admin)/pets-types/page";

export default function CreatePetType() {
    const [createPetTypeId, setcreatePetTypeId] = useState(null);
    const toastRef = useContext(ToastContext);
    const router = useRouter();

    const initialFormData = {
        name: "",
        description: "",
    };

    const handleSubmit = async (formData) => {
        try {
            const response = await apiPost("/pets-types", formData);

            if (response.status !== 200) {
                showToast("error", "Error al crear tipo de mascota");
                return;
            }

            const newPetTypeId = response.data.body.id;
            showToast("success", "Tipo de mascota    creado correctamente");

            router.push("/pets-types/" + newPetTypeId);
            setcreatePetTypeId(newPetTypeId);
            return newPetTypeId;
        } catch (error) {
            showToast("error", "Error al crear tipo de mascota");
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
        <PetsTypesTable />
            <SidebarC
                open={true}
                className="w-[40rem]"
                title="Crear Nuevo Tipo De Mascota"
                onClose={() => router.push("/pets-types")}
                onSave={handleSubmit}
            ></SidebarC>
        </>
    );
}
