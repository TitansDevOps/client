"use client";
import MultiActionAreaCard from "@/components/petsCard";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import SidebarC from "@/components/sidebar";
import { apiGet, apiDelete } from "@/utils/api";

const PetsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCreate = pathname === "/pets/create";

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [action, setAction] = useState("show");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await apiGet("/pets");
      const data = response.data.body.data;
      setPets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
      setPets([]);
    }
  };

  const handleCreateClick = () => {
    router.push("/pets/create");
  };

  const handleDetails = (pet) => {
    router.push(`/pets/${pet.id}?action=show`);
  };

  const handleEdit = (pet) => {
    router.push(`/pets/${pet.id}?action=edit`);
  };

  const handleDelete = async (pet) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar a "${pet.name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await apiDelete(`/pets/${pet.id}`);
      if (response.status === 200) {
        alert("Mascota eliminada correctamente.");
        fetchPets();
      } else {
        alert("Error al eliminar la mascota.");
      }
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
      alert("Ocurrió un error al eliminar la mascota.");
    }
  };

  return (
    <div>
      <div className="card p-4 shadow-2 border-round-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Mascotas</h1>
          <Button
            icon="pi pi-plus"
            label="Crear Mascota"
            onClick={handleCreateClick}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          {pets.map((pet) => (
            <MultiActionAreaCard
              key={pet.id}
              pet={pet}
              onEdit={handleEdit}
              onDetails={handleDetails}
              onDelete={handleDelete} // <-- asegurado aquí
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
