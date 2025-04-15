"use client";
import { useState } from "react";
import { apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import CentersTable from "@/app/(admin)/adoption-centers/page";
import { useRouter } from "next/navigation";

import { Button } from "primereact/button";

export default function CreateCenter() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiPost("/adoption-centers", formData);
      router.push("/adoption-centers");
    } catch (error) {
      console.error("Error creating center:", error);
    }
  };

  return (
    <>
      <CentersTable />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title="Crear Nuevo Centro"
        onClose={() => router.push("/adoption-centers")}
        onSave={handleSubmit}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <Button type="submit" label="Crear" />
        </form>
      </SidebarC>
    </>
  );
}
