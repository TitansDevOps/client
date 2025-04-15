"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { apiDelete } from "@/utils/api";
import DynamicDataTable from "@/components/DynamicDataTable";
import Modal from "@/components/Modal";
import { columns } from "@/app/(admin)/adoption-centers/helpers/col-table";
import { fetchCenters } from "@/app/(admin)/adoption-centers/helpers/data";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/app/context/ToastContext";

export default function CentersTable() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const router = useRouter();

  const toastRef = useContext(ToastContext);

  useEffect(() => {
    onLoadPage();
  }, [page, limit]);

  const onLoadPage = async () => {
    setLoading(true);
    const centers = await fetchCenters(page, limit);
    setCenters(centers.data);
    setTotalRecords(centers.total);
    setLoading(false);
  };

  const handleDeleteClick = (centerId) => {
    setSelectedCenter(centerId);
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

  const deleteCenter = async () => {
    try {
      const response = await apiDelete(`/adoption-centers/${selectedCenter}`);
      if (response.status === 200) {
        showToast("success", "Centro eliminado correctamente");
        onLoadPage();
      } else {
        showToast("error", "Error al eliminar centro");
      }
    } catch (error) {
      console.error("Error deleting center:", error);
      showToast("error", "Error al eliminar centro");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCenter(null);
    }
  };

  const handleShowClick = (centerId) => {
    router.push(`/adoption-centers/${centerId}?action=show`);
  };

  const handleEditClick = (centerId) => {
    router.push(`/adoption-centers/${centerId}?action=edit`);
  };

  const handleCreateClick = () => {
    router.push("/adoption-centers/create");
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
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Centros de Adopción</h1>
        <Button
          icon="pi pi-plus"
          label="Crear Centro"
          onClick={handleCreateClick}
        />
      </div>

      <DynamicDataTable
        data={centers}
        columns={columns}
        totalRecords={totalRecords}
        loading={loading}
        rowActions={actionBodyTemplate}
        onPageChange={(e) => {
          setPage(e.page + 1);
          setLimit(e.rows);
        }}
        ref={toastRef}
      />

      <Modal
        open={deleteModalOpen}
        title="Confirmar"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteCenter}
        type="danger"
        width="30%"
        height="30%"
      >
        <p>¿Estás seguro de eliminar este centro?</p>
      </Modal>
    </>
  );
}
