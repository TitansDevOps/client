"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/utils/api";
import { ToastContext } from "@/app/context/ToastContext";
import SidebarC from "@/components/sidebar";

export default function AddAttributesPage() {
    const { id } = useParams();
    const router = useRouter();
    const toastRef = useContext(ToastContext);

    const [petType, setPetType] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    useEffect(() => {
        fetchPetType();
        fetchAttributes();
    }, []);

    const fetchPetType = async () => {
        try {
            const response = await apiGet(`/pets-types/${id}`);
            setPetType(response.data.body);
        } catch (error) {
            console.error("Error fetching pet type:", error);
        }
    };

    const fetchAttributes = async () => {
        try {
            const response = await apiGet("/attributes");
            setAttributes(response.data.body);
        } catch (error) {
            console.error("Error fetching attributes:", error);
        }
    };

    const handleAttributeChange = (attributeId) => {
        setSelectedAttributes((prevSelected) =>
            prevSelected.includes(attributeId)
                ? prevSelected.filter((id) => id !== attributeId)
                : [...prevSelected, attributeId]
        );
    };

    const handleSave = async () => {
        try {
            const payload = {
                name: petType.name,
                attributes: selectedAttributes.map((id) => ({ id })),
            };

            const response = await apiPost(`/pets-types/${id}/assign-attributes`, payload);

            if (response.status === 200) {
                showToast("success", "Atributos asignados correctamente");
                setTimeout(() => router.push("/pets-types"), 1500);
            } else {
                showToast("error", "Error al asignar atributos");
            }
        } catch (error) {
            showToast("error", "Error al asignar atributos");
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
        <SidebarC
            open={true}
            className="w-[40rem]"
            title={`Asignar Atributos a ${petType?.name || ""}`}
            onClose={() => router.push("/pets-types")}
            onSave={handleSave}
        >
            <div className="flex flex-col gap-4 mt-4">
                {attributes.map((attr) => (
                    <label key={attr.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedAttributes.includes(attr.id)}
                            onChange={() => handleAttributeChange(attr.id)}
                        />
                        {attr.name}
                    </label>
                ))}
            </div>
        </SidebarC>
    );
}
