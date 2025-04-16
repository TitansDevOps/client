"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { apiGet, apiPut, getEnv } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import CentersTable from "@/app/(admin)/adoption-centers/page";
import { ToastContext } from "@/app/context/ToastContext";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import CustomTabView from "@/components/CustomTabView";
import { Galleria } from "primereact/galleria";
import {
  Envelope,
  Globe,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  WhatsappLogo,
  MapPin,
  Phone,
} from "phosphor-react";

export default function CenterDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action") || "show";
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const toastRef = useContext(ToastContext);

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
      showToast("success", "Centro actualizado correctamente");
    } catch (error) {
      console.error("Error updating center:", error);
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
  const backendUrl = getEnv();

  const images = (center?.files || []).map((file) => ({
    itemImageSrc: `${backendUrl}/${file.webPath}`,
    thumbnailImageSrc: `${backendUrl}/${file.webPath}`,
    alt: `Imagen ${file.id}`,
    title: file.filePath,
  }));
  const tabs = [
    {
      label: "Centro",
      content: (
        <div className="space-y-4 text-sm">
          <h3 className="text-2xl font-semibold">{center.name}</h3>
          <p className="text-gray-600">{center.description}</p>
        </div>
      ),
    },
    {
      label: "Información General",
      content: (
        <div className="space-y-4 text-sm">
          <h3 className="text-2xl font-semibold">{center.name}</h3>
          <p className="text-gray-600">{center.description}</p>

          <div className="space-y-2 pt-4">
            <label className="block mb-1 font-medium">Dirección</label>
            <p className="flex items-center gap-2">
              <MapPin size={20} /> {center.address}
            </p>
            <label className="block mb-1 font-medium">Teléfono</label>
            <p className="flex items-center gap-2">
              <Phone size={20} /> {center.phone}
            </p>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <p className="flex items-center gap-2">
              <Envelope size={20} /> {center.email}
            </p>
            <label className="block mb-1 font-medium">Sitio web</label>
            <p className="flex items-center gap-2">
              <Globe size={20} />
              <a
                href={center.website}
                target="_blank"
                className="text-blue-600 underline"
              >
                {center.website}
              </a>
            </p>

            <div className="flex flex-col space-y-3 pt-4">
              {center.facebook && (
                <a
                  href={`https://facebook.com/${center.facebook}`}
                  target="_blank"
                  className="text-blue-600 flex items-center gap-1"
                >
                  <FacebookLogo size={20} /> {center.facebook}
                </a>
              )}
              {center.instagram && (
                <a
                  href={`https://instagram.com/${center.instagram}`}
                  target="_blank"
                  className="text-pink-500 flex items-center gap-1"
                >
                  <InstagramLogo size={20} /> {center.instagram}
                </a>
              )}
              {center.twitter && (
                <a
                  href={`https://twitter.com/${center.twitter}`}
                  target="_blank"
                  className="text-blue-400 flex items-center gap-1"
                >
                  <TwitterLogo size={20} /> {center.twitter}
                </a>
              )}
              {center.youtube && (
                <a
                  href={`https://youtube.com/${center.youtube}`}
                  target="_blank"
                  className="text-red-600 flex items-center gap-1"
                >
                  <YoutubeLogo size={20} /> {center.youtube}
                </a>
              )}
              {center.whatsapp && (
                <a
                  href={`https://wa.me/${center.whatsapp}`}
                  target="_blank"
                  className="text-green-500 flex items-center gap-1"
                >
                  <WhatsappLogo size={20} /> {center.whatsapp}
                </a>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Archivos",
      content:
        images.length > 0 ? (
          <Galleria
            value={images}
            numVisible={3}
            style={{ maxWidth: "100%" }}
            showThumbnails={true}
            showItemNavigators
            showItemNavigatorsOnHover
            circular
            autoPlay
            transitionInterval={4000}
            item={(item) => (
              <img src={item.itemImageSrc} alt={item.alt} className="w-full" />
            )}
            thumbnail={(item) => (
              <img
                src={item.thumbnailImageSrc}
                alt={item.alt}
                className="max-h-8 object-cover rounded-md"
              />
            )}
          />
        ) : (
          <p className="text-gray-500">No hay archivos disponibles.</p>
        ),
    },
  ];

  return <CustomTabView tabs={tabs} />;
}

function EditForm({ center, onSave }) {
  const [formData, setFormData] = useState(center);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Nombre</label>
        <InputText
          className="w-full"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Descripción</label>
        <InputTextarea
          rows={3}
          className="w-full"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Dirección</label>
        <InputText
          className="w-full"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <InputText
            className="w-full"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <InputText
            className="w-full"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block mb-1 font-medium">Sitio web</label>
          <InputText
            className="w-full"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Facebook</label>
          <InputText
            className="w-full"
            value={formData.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Instagram</label>
          <InputText
            className="w-full"
            value={formData.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Twitter</label>
          <InputText
            className="w-full"
            value={formData.twitter}
            onChange={(e) => handleChange("twitter", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Youtube</label>
          <InputText
            className="w-full"
            value={formData.youtube}
            onChange={(e) => handleChange("youtube", e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Whatsapp</label>
          <InputText
            className="w-full"
            value={formData.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
          />
        </div>
      </div>

      <Button
        type="submit"
        label="Editar"
        className="w-full mt-4 h-9 bg-blue-500 text-white font-bold"
      />
    </form>
  );
}
