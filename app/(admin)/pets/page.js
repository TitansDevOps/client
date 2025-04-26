"use client";
import LayoutPage from "@/app/components/Layout";
import MultiActionAreaCard from "@/components/petsCard";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "primereact/button";
import { useState } from "react";

const PetsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isCreate = pathname === "/pets/create";

  const [createdPetId, setCreatedPetId] = useState(null);

  const handleCreateClick = () => {
    router.push("/pets/create");
  };

  const handleSubmit = async (formData) => {
    console.log("Mascota guardada:", formData);
    router.push("/pets");
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
        <MultiActionAreaCard />
      </div>
    </div>
  );
};

export default PetsPage;
