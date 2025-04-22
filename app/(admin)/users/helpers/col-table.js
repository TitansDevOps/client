import { Tag } from "primereact/tag";

const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData.role} severity={"success"} rounded />;
};

export const columns = [
  { field: "id", header: "ID", sortable: true, style: { width: "80px" } },
  {
    field: "fullName",
    header: "Nombre",
    sortable: true,
    style: { minWidth: "150px" },
  },
  {
    field: "address",
    header: "Dirección",
    sortable: true,
    style: { minWidth: "200px" },
  },
  {
    field: "phone",
    header: "Teléfono",
    sortable: true,
    style: { width: "150px" },
  },
  {
    field: "email",
    header: "Email",
    sortable: true,
    style: { minWidth: "200px" },
  },
  {
    field: "role",
    header: "Role",
    body: statusBodyTemplate,
    sortable: true,
    style: { width: "120px" },
  },
];
