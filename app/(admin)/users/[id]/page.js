"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { apiGet, apiPut, getEnv, apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import UsersPage from "@/app/(admin)/users/page";
import { ToastContext } from "@/app/context/ToastContext";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import CustomTabView from "@/components/CustomTabView";
import { Envelope, MapPin, Phone, User } from "phosphor-react";
import { Pencil } from "lucide-react";

export default function UserDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action") || "show";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const toastRef = useContext(ToastContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiGet(`/users/${id}`);
        setUsers(response.data.body);
      } catch (error) {
        showToast("error", "Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  const handleSave = async (formData) => {
    try {
      await apiPut(`/users/${id}`, formData);
      router.push("/users");
      showToast("success", "Usuario actualizado correctamente");
    } catch (error) {
      showToast("error", "Error al actualizar el usuario");
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
      <UsersPage />
      <SidebarC
        open={true}
        className="w-[30rem]"
        title={action === "edit" ? "Editar Usuario" : "Detalle del Usuario"}
        onClose={() => router.push("/users")}
        onSave={action === "edit" ? handleSave : null}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : action === "edit" ? (
          <EditForm users={users} onSave={handleSave} />
        ) : (
          <DetailView users={users} />
        )}
      </SidebarC>
    </>
  );
}

function DetailView({ users }) {
  const tabs = [
    {
      label: "Información General",
      content: (
        <div className="space-y-3 text-sm">
          <h3 className="text-2xl font-semibold">{users.fullName}</h3>
          <p className="text-gray-600">{users.description}</p>

          <div className="space-y-2 pt-4">
            <label className="block mb-1 font-medium">Dirección</label>
            <p className="flex items-center gap-2">
              <MapPin size={20} /> {users.address}
            </p>
            <label className="block mb-1 font-medium">Teléfono</label>
            <p className="flex items-center gap-2">
              <Phone size={20} /> {users.phone}
            </p>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <p className="flex items-center gap-2">
              <Envelope size={20} /> {users.email}
            </p>
            <label className="block mb-1 font-medium">Rol</label>
            <p className="flex items-center gap-2">
              <User size={20} /> {users.role}
            </p>
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
      route: "/users/" + users.id + "?action=edit",
    },
  ];

  return <CustomTabView tabs={tabs} />;
}

function EditForm({ users, onSave }) {
  const [formData, setFormData] = useState(users);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const backendUrl = getEnv();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async (formData) => {
    onSave(formData);
  };

  const tabs = [
    {
      label: "Información General",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <InputText
              className="w-full"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rol</label>
            <InputTextarea
              rows={3}
              className="w-full"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Dirección</label>
              <InputText
                className="w-full"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Teléfono</label>
              <InputText
                className="w-full"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <InputText
                className="w-full"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit(formData);
        }}
        className="flex flex-col min-h-[calc(100vh-70px)] pb-4"
      >
        <div className="flex-grow">
          <CustomTabView tabs={tabs} />
        </div>

        <div className="mt-auto pt-4">
          <Button
            type="submit"
            label="Guardar cambios"
            className="w-full h-9 bg-blue-500 text-white font-bold"
          />
        </div>
      </form>

      {isPreviewOpen && fileToPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {fileToPreview.fullName || fileToPreview.filename}
              </h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className="flex justify-center">
              {fileToPreview.webPath?.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img
                  src={`${backendUrl}/${fileToPreview.webPath}`}
                  alt="Preview"
                  className="max-w-full max-h-[70vh]"
                />
              ) : (
                <div className="p-8 text-center">
                  <i className="pi pi-file text-4xl text-gray-400 mb-2"></i>
                  <p>Vista previa no disponible</p>
                  <a
                    href={`${backendUrl}/${fileToPreview.webPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Descargar archivo
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
