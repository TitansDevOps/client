"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [toastData, setToastData] = useState(null);

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
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold m-0">Centros de Adopción</h2>
        <div className="flex flex-column sm:flex-row gap-3">
          <Button
            label="Nuevo Centro"
            icon="pi pi-plus"
            className="p-button-sm p-button-raised"
            onClick={() => setVisibleDialog(true)}
          />
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              type="search"
              placeholder="Buscar centros..."
              onInput={(e) => setGlobalFilter(e.target.value)}
              className="p-inputtext-sm w-full"
              style={{ minWidth: "250px" }}
            />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex">
      <ProtectedRoute>
        <SidebarDashboard />
        <main className="flex-1 ml-16 overflow-auto">
          <div className="card p-4 shadow-2 border-round-lg">
            {header}

            <DataTable
              value={centers}
              paginator
              rows={limit}
              first={(page - 1) * limit}
              totalRecords={totalRecords}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} centros"
              globalFilter={globalFilter}
              stripedRows
              removableSort
              className="p-datatable-sm"
              emptyMessage="No se encontraron centros de adopción"
              style={{ width: "100%" }}
              loading={loading}
              lazy
              onPage={onPageChange}
            >
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

            <Dialog
              header="Nuevo Centro de Adopción"
              visible={visibleDialog}
              style={{ width: "50vw" }}
              onHide={() => setVisibleDialog(false)}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            >
              <div className="p-fluid grid">
                <div className="field col-12">
                  <label htmlFor="name">Nombre</label>
                  <InputText id="name" />
                </div>
                <div className="field col-12">
                  <label htmlFor="description">Descripción</label>
                  <InputText id="description" />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="address">Dirección</label>
                  <InputText id="address" />
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="phone">Teléfono</label>
                  <InputText id="phone" />
                </div>
                <div className="field col-12">
                  <label htmlFor="email">Email</label>
                  <InputText id="email" />
                </div>
                <div className="field col-12 flex justify-content-end gap-3 mt-4">
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    className="p-button-text"
                    onClick={() => setVisibleDialog(false)}
                  />
                  <Button
                    label="Guardar"
                    icon="pi pi-check"
                    autoFocus
                    className="p-button-raised"
                    onClick={() => handleSave(formData)}
                  />
                </div>
              </div>
            </Dialog>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}
