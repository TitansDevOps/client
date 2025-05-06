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
    field: "adoption_center",
    header: "Centro de Adopción",
    sortable: true,
    style: { minWidth: "200px" },
  },
  {
    field: "pet_type",
    header: "Tipo de Mascota",
    sortable: true,
    style: { minWidth: "150px" },
  },
  {
    field: "active",
    header: "Estado",
    body: statusBodyTemplate,
    sortable: true,
    style: { width: "120px" },
  },
];
