"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { apiDelete, apiGet, apiPost } from "@/utils/api";
import { ToastMessage } from "@/components/ui/toast";
import SidebarDashboard from "@/app/components/Sidebar";
import ProtectedRoute from "@/app/context/ProtectedRoute";

export default function CentersPage() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null, matchMode: "contains" },
    description: { value: null, matchMode: "contains" },
    address: { value: null, matchMode: "contains" },
    phone: { value: null, matchMode: "contains" },
    email: { value: null, matchMode: "contains" },
    active: { value: null, matchMode: "equals" },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    active: true,
  });

  useEffect(() => {
    fetchCenters();
  }, [page, limit]);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const response = await apiGet(
        `/adoption-centers?page=${page}&limit=${limit}`,
      );
      setCenters(response.data.body.data);
      setTotalRecords(response.data.body.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching centers:", error);
      setLoading(false);
    }
  };

  const deleteCenter = async (id) => {
    try {
      await apiDelete(`/adoption-centers/${id}`);
      fetchCenters();
    } catch (error) {
      console.error("Error deleting center:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      console.log(data);
      return;
      const response = await apiPost(
        `/adoption-centers/${selectedCenter.id}`,
        selectedCenter,
      );
      setToastData({
        message: response.data.message,
        type: "success",
        onClose: () => setToastData(null),
      });
      setVisibleDialog(false);
      fetchCenters();
    } catch (error) {
      console.error("Error saving center:", error);
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.active ? "Activo" : "Inactivo"}
        severity={rowData.active ? "success" : "danger"}
        rounded
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-outlined p-button-secondary"
          tooltip="Editar"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-outlined p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: "top" }}
          onClick={() => deleteCenter(rowData.id)}
        />
      </div>
    );
  };

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setLimit(event.rows);
  };

  const header = (
    <>
      {toastData && (
        <ToastMessage
          message={toastData.message}
          type={toastData.type}
          onClose={toastData.onClose}
        />
      )}
      <div className="flex flex-col pb-4 space-y-4">
        <h2 className="text-3xl font-bold m-0">Centros de Adopción</h2>

        <div className="flex justify-end">
          <div className="flex items-center">
            <i className="pi pi-search mr-2 justify-end" />
            <InputText
              type="search"
              placeholder="Buscar centros..."
              onInput={(e) =>
                setFilters({
                  ...filters,
                  global: { value: e.target.value, matchMode: "contains" },
                })
              }
              className="p-inputtext-sm"
              style={{ minWidth: "250px" }}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex bg-slate-100">
      <ProtectedRoute>
        <SidebarDashboard />
        <main className="flex-1 overflow-auto">
          <div className="card p-2 shadow-2 border-round-lg">
            <DataTable
              header={header}
              value={centers}
              paginator
              rows={limit}
              first={(page - 1) * limit}
              totalRecords={totalRecords}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} centros"
              filters={filters}
              filterDisplay="row"
              stripedRows
              removableSort
              className="p-datatable-sm"
              emptyMessage="No se encontraron centros de adopción"
              style={{ width: "100%" }}
              loading={loading}
              lazy
              onPage={onPageChange}
            >
              {/* FIXME: Remove this when we have a proper ID */}
              <Column
                field="id"
                header="ID"
                sortable
                style={{ width: "80px" }}
              />
              <Column
                field="name"
                header="Nombre"
                sortable
                style={{ minWidth: "150px" }}
              />
              <Column
                field="description"
                header="Descripción"
                sortable
                style={{ minWidth: "200px" }}
              />
              <Column
                field="address"
                header="Dirección"
                sortable
                style={{ minWidth: "200px" }}
              />
              <Column
                field="phone"
                header="Teléfono"
                sortable
                style={{ width: "150px" }}
              />
              <Column
                field="email"
                header="Email"
                sortable
                style={{ minWidth: "200px" }}
              />
              <Column
                field="active"
                header="Estado"
                body={statusBodyTemplate}
                sortable
                style={{ width: "120px" }}
              />
              <Column
                body={actionBodyTemplate}
                header="Acciones"
                style={{ width: "150px" }}
                exportable={false}
              />
            </DataTable>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}
