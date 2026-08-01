import { useForm } from "react-hook-form";

import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

import useCrud from "../../hooks/useCrud";

function CrudPage({ config }) {

  const {
    title,
    service,
    fields,
    columns,
  } = config;

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting,
    },
  } = useForm();

  const {
    data,
    editingId,
    save,
    edit,
    remove,
  } = useCrud(service, reset);

  const hasForm =
    Array.isArray(fields) &&
    fields.length > 0 &&
    typeof service?.create === "function";

  const canDelete = typeof service?.delete === "function";

  return (

    <div className="space-y-8">

      {hasForm && (
        <CrudForm
          title={
            editingId
              ? `Edit ${title}`
              : `Add ${title}`
          }
          submitLabel={
            editingId
              ? `Update ${title}`
              : `Add ${title}`
          }
          fields={fields}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={save}
          isSubmitting={isSubmitting}
        />
      )}

      <CrudTable
        columns={columns}
        data={data}
        onEdit={hasForm ? edit : undefined}
        onDelete={canDelete ? remove : undefined}
      />

    </div>

  );
}

export default CrudPage;