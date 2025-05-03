const ACTION_TYPES = {
  CREATE: "create",
  EDIT: "edit",
};

export default function EditForm({
  petType,
  onSave,
  action = ACTION_TYPES.CREATE,
}) {
  return (
    <div>
      <h1>Edit Form</h1>
    </div>
  );
}
