"use client";
import LayoutPage from "@/app/components/Layout";
import MultiActionAreaCard from "@/components/petsCard";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import SidebarC from "@/components/sidebar";
import EditFormPet from "@/app/(admin)/pets/helpers/editFormPet";
import { apiGet } from "@/utils/api";

const PetsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCreate = pathname === "/pets/create";

  const [pets, setPets] = useState([]); // CORREGIDO: inicializa como arreglo vacío
  const [selectedPet, setSelectedPet] = useState(null);
  const [action, setAction] = useState("show"); // "show" o "edit"
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await apiGet("/pets");
      const data = response.data.body.data;
      setPets(Array.isArray(data) ? data : []); // CORREGIDO: siempre es array
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
      setPets([]); // Si hay error, deja pets como []
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

  // const handleSubmit = async (formData) => {
  //   console.log("Mascota guardada:", formData);
  //   setSidebarOpen(false);
  //   fetchPets(); // Refresca la lista después de editar
  // };

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
          {Array.isArray(pets) && pets.map((pet) => (
            <MultiActionAreaCard
              key={pet.id}
              pet={pet}
              onEdit={handleEdit}
              onDetails={handleDetails}
            />
          ))}
        </div>

        {/* <SidebarC
          open={sidebarOpen}
          className="w-[40rem]"
          title={action === "edit" ? "Editar Mascota" : "Detalle de la Mascota"}
          onClose={() => setSidebarOpen(false)}
          onSave={action === "edit" ? handleSubmit : null}
        >
          {selectedPet ? (
            action === "edit" ? (
              <EditFormPet pet={selectedPet} onSave={handleSubmit} />
            ) : (
              <div>
                <h2 className="text-xl font-bold">{selectedPet.name}</h2>
                <p><strong>Descripción:</strong> {selectedPet.description}</p>
                <p><strong>Centro:</strong> {selectedPet.adoptionCenter?.name || "Sin centro"}</p>
                <p><strong>Tipo:</strong> {selectedPet.petType?.name || "Sin tipo"}</p>
                <p><strong>Estado:</strong> {selectedPet.active ? "Activo" : "Inactivo"}</p>
              </div>
            )
          ) : (
            <p>Cargando...</p>
          )}
        </SidebarC> */}
      </div>
    </div>
  );
};

export default PetsPage;
