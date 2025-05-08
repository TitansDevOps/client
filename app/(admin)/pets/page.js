"use client";
import MultiActionAreaCard from "@/components/petsCard";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useState, useEffect, useContext } from "react";
import { ToastContext } from "@/app/context/ToastContext";
import { apiGet, apiDelete } from "@/utils/api";
import Modal from "@/components/Modal";

const PetsPage = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const toastRef = useContext(ToastContext);

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
    setSelectedPet(pet);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deletePet(selectedPet);
    setDeleteModalOpen(false);
    setSelectedPet(null);
  };

  const showToast = (severity, message) => {
    toastRef.current?.show({
      severity,
      summary: severity === "success" ? "Éxito" : "Error",
      detail: message,
      life: 3000,
    });
  };

  const deletePet = async (pet) => {
    try {
      const response = await apiDelete(`/pets/${pet.id}`);
      if (response.status === 200) {
        showToast("success", "Mascota eliminada correctamente.");
        fetchPets();
      } else {
        showToast("error", "Error al eliminar la mascota.");
      }
    } catch (error) {
      showToast("error", "Ocurrió un error al eliminar la mascota.");
    }
  };

  return (
    <div>
      <Modal
        open={deleteModalOpen}
        title="Confirmar"
        onClose={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        type="danger"
        width="30%"
        height="30%"
      >
        <p>¿Estás seguro de eliminar a {selectedPet?.name}?</p>
      </Modal>
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
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
