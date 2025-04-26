"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { apiPost } from "@/utils/api";
import SidebarC from "@/components/sidebar";
import CentersTable from "@/app/(admin)/pets/page";
import { ToastContext } from "@/app/context/ToastContext";
import { Layout } from "lucide-react";
import LayoutPage from "@/app/components/Layout";
import PetsPage from "@/app/(admin)/pets/page";

export default function CreateCenter() {
  const [createdCenterId, setCreatedCenterId] = useState(null);
  const toastRef = useContext(ToastContext);
  const router = useRouter();

  const initialFormData = {
    name: "",
    description: "",
  };

  const handleSubmit = () => {};

  return (
    <>
      <div>
        <PetsPage/>
          <SidebarC
            open={true}
            className="w-[40rem]"
            title="Crear Nuevo Mascota"
            onClose={() => router.push("/pets")}
            onSave={handleSubmit}
          ></SidebarC>
      </div>
    </>
  );
}
