import { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import CustomTabView from "@/components/CustomTabView";
import { AttributesForm } from "@/app/(admin)/pet-types/helpers/AttributesForm";
import { Eye, Pencil, Plus } from "lucide-react";

const ACTION_TYPES = {
  CREATE: "create",
  EDIT: "edit",
};

export default function EditForm({
  petType,
  onSave,
  onCancel,
  action = ACTION_TYPES.CREATE,
  fullScreen,
}) {
  const [name, setName] = useState(petType?.name || "");
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState(
    Array.isArray(petType?.attributes)
      ? petType?.attributes?.map((a) => a.id)
      : [] || [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);

  const openEditModal = (attribute) => {
    setEditingAttribute(attribute);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingAttribute(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    const response = await apiGet("/attributes?limit=10000");
    if (response.status !== 200) {
      return;
    }
    setAttributes(response.data.body.data);
  };

  const handleAttributeChange = (attributeId) => {
    setSelectedAttributes((prevSelected) =>
      prevSelected.includes(attributeId)
        ? prevSelected.filter((id) => id !== attributeId)
        : [...prevSelected, attributeId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      attributes: selectedAttributes.map((id) => ({ id })),
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleEditAttribute = (attribute) => {
    fullScreen(true);
    openEditModal(attribute);
  };

  const handleCreateAttribute = () => {
    fullScreen(true);
    openCreateModal();
  };

  const tabs = [
    {
      label: "Información General",
      content: (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del tipo de mascota
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Atributos
            </label>
            <button
              type="button"
              onClick={handleCreateAttribute}
              className="text-blue-600 flex items-center text-sm"
            >
              <Plus className="mr-1" size={16} /> Nuevo Atributo
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {attributes.map((attribute) => (
              <div
                key={attribute.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`attribute-${attribute.id}`}
                    checked={selectedAttributes.includes(attribute.id)}
                    onChange={() => handleAttributeChange(attribute.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`attribute-${attribute.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {attribute.name}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => handleEditAttribute(attribute)}
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <Pencil size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              {action === ACTION_TYPES.EDIT ? "Guardar cambios" : "Crear tipo"}
            </button>
          </div>
        </form>
      ),
    },
    action === ACTION_TYPES.EDIT
      ? {
          label: (
            <>
              <Eye size={20} />
            </>
          ),
          content: <></>,
          route: "/pet-types/" + petType?.id + "?action=show",
        }
      : null,
  ];

  return (
    <>
      <CustomTabView tabs={tabs} />
      <AttributesForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchAttributes}
        attribute={editingAttribute}
      />
    </>
  );
}
