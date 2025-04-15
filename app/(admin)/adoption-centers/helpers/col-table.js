import { Tag } from "primereact/tag";

const statusBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.active ? "Activo" : "Inactivo"}
      severity={rowData.active ? "success" : "danger"}
      rounded
    />
  );
};

export const columns = [
  { field: "id", header: "ID", sortable: true, style: { width: "80px" } },
  {
    field: "name",
    header: "Nombre",
    sortable: true,
    style: { minWidth: "150px" },
    cellOnClick: () => {
      alert("Hola");
    },
  },
  {
    field: "description",
    header: "Descripción",
    sortable: true,
    style: { minWidth: "200px" },
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
    field: "active",
    header: "Estado",
    body: statusBodyTemplate,
    sortable: true,
    style: { width: "120px" },
  },
];
