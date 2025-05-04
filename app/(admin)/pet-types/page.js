"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { apiDelete } from "@/utils/api";
import DynamicDataTable from "@/components/DynamicDataTable";
import Modal from "@/components/Modal";
import { columns } from "@/app/(admin)/pet-types/helpers/col-table";
import { fetchPetsTypes } from "@/app/(admin)/pet-types/helpers/data";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/app/context/ToastContext";

export default function PetsTypesPage() {
  const [petTypes, setPetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const router = useRouter();

  const toastRef = useContext(ToastContext);

  useEffect(() => {
    onLoadPage();
  }, [page, limit]);

  const onLoadPage = async () => {
    setLoading(true);
    const centers = await fetchPetsTypes(page, limit);
    setPetTypes(centers.data);
    setTotalRecords(centers.total);
    setLoading(false);
  };

  const handleDeleteClick = (centerId) => {
    setSelectedType(centerId);
    setDeleteModalOpen(true);
  };

  const showToast = (severity, message) => {
    toastRef.current?.show({
      severity,
      summary: severity === "success" ? "Éxito" : "Error",
      detail: message,
      life: 3000,
    });
  };

  const deleteType = async () => {
    try {
      const response = await apiDelete(`/pet-types/${selectedType}`);
      if (response.status === 200) {
        showToast("success", response.data.message);
        onLoadPage();
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", "Error al eliminar tipo de mascota");
    } finally {
      setDeleteModalOpen(false);
      setSelectedType(null);
    }
  };

  const handleShowClick = (centerId) => {
    router.push(`/pet-types/${centerId}?action=show`);
  };

  const handleEditClick = (centerId) => {
    router.push(`/pet-types/${centerId}?action=edit`);
  };

  const handleCreateClick = () => {
    router.push("/pet-types/create");
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" onClick={() => handleShowClick(rowData.id)} />
      <Button icon="pi pi-pencil" onClick={() => handleEditClick(rowData.id)} />
      <Button
        icon="pi pi-trash"
        onClick={() => handleDeleteClick(rowData.id)}
      />
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold py-4 px-4">Tipos de Mascotas</h1>
        <div className="flex justify-end">
          <Button
            icon="pi pi-plus"
            label="Crear Tipo"
            onClick={handleCreateClick}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
          />
        </div>
      </div>

      <DynamicDataTable
        data={petTypes}
        columns={columns}
        totalRecords={totalRecords}
        loading={loading}
        rowActions={actionBodyTemplate}
        onPageChange={(e) => {
          setPage(e.page + 1);
          setLimit(e.rows);
        }}
        ref={toastRef}
        onReload={onLoadPage}
      />

      <Modal
        open={deleteModalOpen}
        title="Confirmar"
        onClose={() => setDeleteModalOpen(false)}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={deleteType}
        type="danger"
        width="30%"
        height="30%"
      >
        <p>¿Estás seguro de eliminar este tipo de mascota?</p>
      </Modal>
    </div>
  );
}
