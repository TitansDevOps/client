"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/utils/api";
import LayoutPage from "@/app/components/Layout";
import DynamicDataTable from "@/components/DynamicDataTable";
import { columns } from "@/app/(admin)/users/helpers/col-table";
import { Button } from "primereact/button";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const fetchUsers = async () => {
    try {
      const res = await apiGet("/users?page=" + page + "&limit=" + limit);
      setUsers(res.data.body.data);
      setTotalRecords(res.data.body.total);
    } catch (error) {}
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
    <LayoutPage>
      <DynamicDataTable
        title="Lista de Usuarios"
        placeholder="Buscar por nombre, email o dirección"
        data={users}
        columns={columns}
        totalRecords={totalRecords}
        rowActions={actionBodyTemplate}
        onPageChange={(e) => {
          setPage(e.page + 1);
          setLimit(e.rows);
        }}
      />
    </LayoutPage>
  );
}
