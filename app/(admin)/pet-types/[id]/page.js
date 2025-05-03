"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { apiGet, apiPost } from "@/utils/api";
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
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    fetchPetType();
  }, []);

  const fetchPetType = async () => {
    try {
      const response = await apiGet(`/pet-types/${id}`);
      console.log("response", response);
      console.log(response.data.body);
      setPetType(response.data.body);
    } catch (error) {
      console.error("Error fetching pet type:", error);
    }
    setLoading(false);
  };

  // const handleAttributeChange = (attributeId) => {
  //     setSelectedAttributes((prevSelected) =>
  //         prevSelected.includes(attributeId)
  //             ? prevSelected.filter((id) => id !== attributeId)
  //             : [...prevSelected, attributeId]
  //     );
  // };

  const handleSave = async () => {
    try {
      const payload = {
        name: petType.name,
        attributes: selectedAttributes.map((id) => ({ id })),
      };

      const response = await apiPost(
        `/pets-types/${id}/assign-attributes`,
        payload,
      );

      if (response.status === 200) {
        showToast("success", "Atributos asignados correctamente");
        setTimeout(() => router.push("/pets-types"), 1500);
      } else {
        showToast("error", "Error al asignar atributos");
      }
    } catch (error) {
      showToast("error", "Error al asignar atributos");
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
      <PetsTypesPage />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title={action === "edit" ? "Editar Centro" : "Detalle del Centro"}
        onClose={() => router.push("/pet-types")}
        onSave={action === "edit" ? handleSave : null}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : action === "edit" ? (
          <EditForm petType={petType} onSave={handleSave} />
        ) : (
          <DetailView type={petType} />
        )}
      </SidebarC>
    </>
  );
}

function DetailView({ type }) {
  // const backendUrl = getEnv();

  // const images = (petType?.files || []).map((file) => ({
  //   itemImageSrc: `${backendUrl}/${file.webPath}`,
  //   thumbnailImageSrc: `${backendUrl}/${file.webPath}`,
  //   alt: `Imagen ${file.id}`,
  //   title: file.filePath,
  // }));

  console.log("type", type);
  const tabs = [
    {
      label: "Información General",
      content: (
        <div className="space-y-3 text-sm">
          <h3 className="text-2xl font-semibold">{type?.name}</h3>
        </div>
      ),
    },
    //   {
    //     label: "Archivos",
    //     content:
    //       images.length > 0 ? (
    //         <Galleria
    //           value={images}
    //           numVisible={3}
    //           style={{ maxWidth: "100%" }}
    //           showThumbnails={true}
    //           showItemNavigators
    //           showItemNavigatorsOnHover
    //           circular
    //           autoPlay
    //           transitionInterval={4000}
    //           item={(item) => (
    //             <img src={item.itemImageSrc} alt={item.alt} className="w-full" />
    //           )}
    //           thumbnail={(item) => (
    //             <img
    //               src={item.thumbnailImageSrc}
    //               alt={item.alt}
    //               className="max-h-8 object-cover rounded-md"
    //             />
    //           )}
    //         />
    //       ) : (
    //         <p className="text-gray-500">No hay archivos disponibles.</p>
    //       ),
    //   },
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
