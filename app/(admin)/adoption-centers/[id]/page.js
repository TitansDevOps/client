"use client";
import { Button } from "primereact/button";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import CentersTable from "@/app/(admin)/adoption-centers/page";

export default function CenterDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action") || "show";
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        setLoading(true);
        const response = await apiGet(`/adoption-centers/${id}`);
        setCenter(response.data.body);
      } catch (error) {
        console.error("Error fetching center:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenter();
  }, [id]);

  const handleSave = async (formData) => {
    try {
      await apiPut(`/adoption-centers/${id}`, formData);
      router.push("/adoption-centers");
    } catch (error) {
      console.error("Error updating center:", error);
    }
  };

  return (
    <>
      <CentersTable />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title={action === "edit" ? "Editar Centro" : "Detalle del Centro"}
        onClose={() => router.push("/adoption-centers")}
        onSave={action === "edit" ? handleSave : null}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : action === "edit" ? (
          <EditForm center={center} onSave={handleSave} />
        ) : (
          <DetailView center={center} />
        )}
      </SidebarC>
    </>
  );
}

function DetailView({ center }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{center.name}</h3>
      <div>
        <h4 className="font-medium">Descripción</h4>
        <p>{center.description}</p>
      </div>
    </div>
  );
}

function EditForm({ center, onSave }) {
  const [formData, setFormData] = useState(center);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <Button type="submit" label="Guardar" />
      </div>
    </form>
  );
}
