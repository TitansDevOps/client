"use client";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { apiGet, apiPut } from "@/utils/api";

export default function EditFormPet({ pet, onSave }) {
  const [formData, setFormData] = useState({
    name: pet?.name || "",
    description: pet?.description || "",
    active: pet?.active || false,
    adoptionCenterId: pet?.adoptionCenterId || null,
    petType: { id: pet?.petType?.id || null },
  });

  const [adoptionCenters, setAdoptionCenters] = useState([]);
  const [petTypes, setPetTypes] = useState([]);

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
      console.error("Error al obtener los centros de adopción", error);
    }
  };

  const fetchPetTypes = async () => {
    try {
      const response = await apiGet("/pet-types");
      const data = response.data.body.data || [];
      setPetTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los tipos de mascota", error);
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

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      active: e.checked,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.adoptionCenterId || !formData.petType.id) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
  
    const payload = {
      name: formData.name,
      description: formData.description,
      active: formData.active,
      adoptionCenterId: Number(formData.adoptionCenterId),
      petType: { id: Number(formData.petType.id) },
      attributeValues: formData.attributeValues || []
    };
  
    try {
      await apiPut(`/pets/${pet.id}`, payload);
      if (onSave) {
        onSave(payload);
      }
    } catch (error) {
      console.error("Error al actualizar la mascota", error);
      alert("Error al actualizar la mascota.");
    }
  };

  return (
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
        <label className="block mb-1 font-medium">Activo</label>
        <Checkbox
          inputId="active"
          checked={formData.active}
          onChange={handleCheckboxChange}
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

      <div className="pt-4">
        <Button type="button" label="Guardar Cambios" onClick={handleSubmit} className="w-full" />
      </div>
    </form>
  );
}
