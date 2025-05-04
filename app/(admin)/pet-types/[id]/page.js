"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { ToastContext } from "@/app/context/ToastContext";
import PetsTypesPage from "@/app/(admin)/pet-types/page";
import EditForm from "@/app/(admin)/pet-types/helpers/EditForm";
import SidebarC from "@/components/sidebar";
import CustomTabView from "@/components/CustomTabView";
import { Pencil } from "lucide-react";

export default function AddAttributesPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "show";
  const toastRef = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [petType, setPetType] = useState(null);
  const [sidebarFullScreen, setSidebarFullScreen] = useState(false);

  useEffect(() => {
    fetchPetType();
  }, []);

  const fetchPetType = async () => {
    try {
      const response = await apiGet(`/pet-types/${id}`);
      setPetType(response.data.body);
    } catch (error) {
      showToast("error", "Error al obtener el tipo de mascota");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const endpoint = action === "edit" ? `/pet-types/${id}` : "/pet-types";
      const method = action === "edit" ? apiPut : apiPost;

      const response = await method(endpoint, formData);

      if (response.status === 200) {
        showToast("success", "Tipo de mascota editado con éxito");
      } else {
        showToast("error", "Error al realizar la operación");
      }

      router.push(`/pet-types/${id}?action=show`);
      fetchPetType();
    } catch (error) {
      showToast("error", "Error al realizar la operación");
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

  const handleCancel = () => {
    router.push(`/pet-types/${id}?action=show`);
  };

  return (
    <>
      <PetsTypesPage />
      <SidebarC
        fullScreen={sidebarFullScreen}
        open={true}
        className="w-[30rem]"
        title={action === "edit" ? "Editar tipo" : "Detalle del tipo"}
        onClose={() => router.push("/pet-types")}
        onSave={action === "edit" ? handleSave : null}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : action === "edit" ? (
          <EditForm
            petType={petType}
            onSave={handleSave}
            action={action}
            onCancel={handleCancel}
            fullScreen={setSidebarFullScreen}
          />
        ) : (
          <DetailView type={petType} />
        )}
      </SidebarC>
    </>
  );
}

function DetailView({ type }) {
  const tabs = [
    {
      label: "Información General",
      content: (
        <div className="space-y-3 text-sm">
          <h3 className="text-2xl font-semibold">{type?.name}</h3>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Atributos:</span>
              <span className="text-sm text-gray-500">
                {type?.attributes.length}
              </span>
            </div>
            {type?.attributes.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {type.attributes.map((a) => (
                  <li key={a.name}>{a.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ),
    },
    {
      label: (
        <>
          <Pencil size={20} />
        </>
      ),
      content: <></>,
      route: "/pet-types/" + type?.id + "?action=edit",
    },
  ];

  return <CustomTabView tabs={tabs} />;
}
