"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiPost, apiGet, getEnv } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import { ToastContext } from "@/app/context/ToastContext";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function CreatePet() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: false,
    adoptionCenterId: null,
    petType: { id: null },
  });

  const [adoptionCenters, setAdoptionCenters] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const toastRef = useContext(ToastContext);
  const router = useRouter();
  const backendUrl = getEnv();

  useEffect(() => {
    fetchAdoptionCenters();
    fetchPetTypes();
  }, []);

  const fetchAdoptionCenters = async () => {
    try {
      const response = await apiGet("/adoption-centers");
      setAdoptionCenters(response.data.body.data || []);
    } catch (error) {
      showToast("error", "Error al obtener los centros de adopción");
    }
  };

  const fetchPetTypes = async () => {
    try {
      const response = await apiGet("/pet-types");
      setPetTypes(response.data.body.data || []);
    } catch (error) {
      showToast("error", "Error al obtener los tipos de mascota");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const newFiles = Array.from(e.target.files);
    if (!newFiles.length) return;

    const filesBase64 = await Promise.all(
      newFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          name: file.name,
          base64: base64.split(",")[1],
        };
      })
    );

    setPendingFiles((prev) => [...prev, ...filesBase64]);
    showToast("success", "Archivo(s) cargado(s) en memoria");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.adoptionCenterId || !formData.petType.id) {
      showToast("error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    const payload = {
      ...formData,
      adoptionCenterId: Number(formData.adoptionCenterId),
      petTypeId: Number(formData.petType.id),
    };

    try {
      const response = await apiPost("/pets", payload);
      const petId = response.data.body.id;

      if (pendingFiles.length > 0) {
        const uploadResponse = await apiPost("/file/upload-base64", {
          typeEntity: "PET",
          entityOwnerId: petId,
          files: pendingFiles,
        });

        if (uploadResponse.status !== 201) {
          showToast("error", "Error al subir los archivos");
          return;
        }
      }

      showToast("success", "Mascota creada correctamente");
      router.push("/pets");
    } catch (error) {
      showToast("error", "Error al crear la mascota");
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
      title="Crear Nueva Mascota"
      onClose={() => router.push("/pets")}
      onSave={handleSubmit}
    >
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <InputText
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <InputTextarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Centro de Adopción</label>
          <Dropdown
            value={formData.adoptionCenterId}
            options={adoptionCenters}
            optionLabel="name"
            optionValue="id"
            onChange={(e) => handleDropdownChange("adoptionCenterId", e.value)}
            placeholder="Selecciona un centro"
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tipo de Mascota</label>
          <Dropdown
            value={formData.petType.id}
            options={petTypes}
            optionLabel="name"
            optionValue="id"
            onChange={(e) => handleDropdownChange("petType", { id: e.value })}
            placeholder="Selecciona un tipo"
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Imagen / Archivo</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="block w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="pt-4">
          <Button type="button" label="Guardar Mascota" onClick={handleSubmit} className="w-full" />
        </div>
      </form>
    </SidebarC>
  );
}
