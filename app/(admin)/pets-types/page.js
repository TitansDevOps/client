"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiPost } from "@/utils/api";
import { ToastContext } from "@/app/context/ToastContext";
import SidebarC from "@/components/sidebar";

export default function CreatePetType() {
    const [attributes, setAttributes] = useState([]);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const toastRef = useContext(ToastContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const attributeId = searchParams.get("attributeId");

    const initialFormData = {
        name: "",
        description: "",
        attributeId: attributeId || "",
    };

    const fetchAttributes = async () => {
        // Aquí iría la lógica para obtener todos los atributos disponibles
        const response = await apiPost("/attributes");
        setAttributes(response.data.body);
    };

    useEffect(() => {
        if (attributeId) {
            fetchAttributes();
        }
    }, [attributeId]);

    const handleSubmit = async (formData) => {
        try {
            const response = await apiPost("/pets-types", formData);

            if (response.status !== 200) {
                showToast("error", "Error al crear tipo de mascota");
                return;
            }

            showToast("success", "Tipo de mascota creado correctamente");
            router.push("/pets-types");
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
        <SidebarC
            open={true}
            className="w-[40rem]"
            title="Crear Nuevo Tipo De Mascota"
            onClose={() => router.push("/pets-types")}
            onSave={handleSubmit}
        >
            <div>
                <label htmlFor="name">Nombre del Tipo de Mascota</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ej. Perro, Gato"
                />

                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Descripción del tipo de mascota"
                    required
                />

                <label htmlFor="attributeId">Selecciona Atributo</label>
                <select
                    id="attributeId"
                    name="attributeId"
                    onChange={(e) => setSelectedAttribute(e.target.value)}
                    value={selectedAttribute || attributeId}
                    required
                >
                    {attributes.map((attribute) => (
                        <option key={attribute.id} value={attribute.id}>
                            {attribute.name}
                        </option>
                    ))}
                </select>
            </div>
        </SidebarC>
    );
}
