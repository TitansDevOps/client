"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/utils/api";
import LayoutPage from "@/app/components/Layout";
import DynamicDataTable from "@/components/DynamicDataTable";
import { columns } from "@/app/(admin)/users/helpers/col-table";
import { Button } from "primereact/button";
import { ToastContext, ToastProvider } from "@/app/context/ToastContext";


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const toastRef = useContext(ToastContext);


  useEffect(() => {
    onLoadPage();
  }, [page, limit]);

  const onLoadPage = async () => {
    console.log("onLoadPage ejecutado");
    setLoading(true);
    const users = await fetchUsers(page, limit);
    if (users && users.data) {
      console.log("Usuarios obtenidos:", users.data);
      setUsers(users.data);
      setTotalRecords(users.total);
    } else {
      console.error("La respuesta no tiene la estructura esperada.");
    }
    setLoading(false);
  };
  
  const fetchUsers = async () => {
    try {
      const res = await apiGet("/users?page=" + page + "&limit=" + limit);
      console.log("Datos obtenidos:", res.data);
      return res.data.body;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      return { data: [], total: 0 };
    }
  };

  const handleShowClick = (userId) => {
    router.push(`/users/${userId}?action=show`);
  };

  const handleEditClick = (userId) => {
    router.push(`/users/${userId}?action=edit`);
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" onClick={() => handleShowClick(rowData.id)} />
      <Button icon="pi pi-pencil" onClick={() => handleEditClick(rowData.id)} />
    </div>
  );

  return (
      <DynamicDataTable
        title="Lista de Usuarios"
        placeholder="Buscar por nombre, email o dirección"
        data={users}
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
  );
}
