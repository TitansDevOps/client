import { useState, useEffect } from "react";
import { apiPost, apiPut } from "@/utils/api";
import Modal from "@/components/Modal";

function AttributesForm({ isOpen, onClose, onSuccess, attribute }) {
  const [name, setName] = useState("");
  const [allowedValues, setAllowedValues] = useState([""]);

  useEffect(() => {
    if (attribute) {
      setName(attribute.name || "");
      setAllowedValues(attribute.allowedValues || [""]);
    } else {
      setName("");
      setAllowedValues([""]);
    }
  }, [attribute]);

  const handleChangeValue = (index, value) => {
    const newValues = [...allowedValues];
    newValues[index] = value;
    setAllowedValues(newValues);
  };

  const handleAddValue = () => {
    setAllowedValues([...allowedValues, ""]);
  };

  const handleRemoveValue = (index) => {
    setAllowedValues(allowedValues.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = {
      name,
      allowedValues: allowedValues.filter((v) => v.trim() !== ""),
    };

    if (attribute?.id) {
      await apiPut(`/attributes/${attribute.id}`, data);
    } else {
      await apiPost("/attributes", data);
    }
    onSuccess();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      onCancel={handleClose}
      title={attribute ? "Editar Atributo" : "Nuevo Atributo"}
      onConfirm={handleSubmit}
    >
      <div className="flex items-center justify-center min-h-screen p-4 space-x-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            className="mt-1 block w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valores Permitidos
          </label>
          {allowedValues.map((val, i) => (
            <div key={i} className="flex space-x-2 mt-1">
              <input
                type="text"
                className="flex-1 border rounded p-2"
                value={val}
                onChange={(e) => handleChangeValue(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveValue(i)}
                className="text-red-500"
              >
                🗑
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddValue}
            className="text-blue-600 mt-2"
          >
            + Añadir valor
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { AttributesForm };
