"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { apiPost, apiGet } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import PetsTable from "@/app/(admin)/pets/page";
import { ToastContext } from "@/app/context/ToastContext";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function CreatePet() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: false,
    adoptionCenterId: null,
    petType: {id:null},
  });

  const [adoptionCenters, setAdoptionCenters] = useState([]);
  const [petTypes, setPetTypes] = useState([]);

  const toastRef = useContext(ToastContext);
  const router = useRouter();

  useEffect(() => {
    fetchAdoptionCenters();
    fetchPetTypes();
  }, []);

  const fetchAdoptionCenters = async () => {
    try {
      const response = await apiGet("/adoption-centers");
      const data = response.data.body.data || [];
      setAdoptionCenters(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast("error", "Error al obtener los centros de adopción");
    }
  };

  const fetchPetTypes = async () => {
    try {
      const response = await apiGet("/pet-types");
      const data = response.data.body.data || [];
      setPetTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast("error", "Error al obtener los tipos de mascota");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.adoptionCenterId || !formData.petType) {
      showToast("error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    const payload = {
      ...formData,
      adoptionCenterId: Number(formData.adoptionCenterId),
      petTypeId: Number(formData.petType.id),
    };

    console.log("Datos enviados:", payload); // Útil para depurar

    try {
      await apiPost("/pets", payload);
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
    <>
      <PetsTable />
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
              onChange={(e) => handleDropdownChange("petType", {id:e.value})}
              placeholder="Selecciona un tipo"
              className="w-full"
              required
            />
          </div>

          <div className="pt-4">
            <Button type="button" label="Guardar Mascota" onClick={handleSubmit} className="w-full" />
          </div>
        </form>
      </SidebarC>
    </>
  );
}
