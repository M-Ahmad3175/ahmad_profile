import { useForm } from "react-hook-form";

import CrudPage from "../../components/crud/CrudPage";
import CrudForm from "../../components/crud/CrudForm";
import CrudTable from "../../components/crud/CrudTable";

import useCrud from "../../hooks/useCrud";
import projectService from "../../services/projectService";

function Projects() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const {
    data,
    editingId,
    save,
    edit,
    remove,
  } = useCrud(projectService, reset);

  const fields = [
    {
      name: "title",
      label: "Project Title",
      placeholder: "Portfolio CMS",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Project Description",
    },
    {
      name: "githubUrl",
      label: "GitHub URL",
      placeholder: "https://github.com/...",
    },
    {
      name: "liveUrl",
      label: "Live URL",
      placeholder: "https://...",
    },
  ];

  return (
    <div className="space-y-8">

      <CrudForm
        title={
          editingId
            ? "Edit Project"
            : "Add Project"
        }
        fields={fields}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={save}
        isSubmitting={isSubmitting}
      />

      <CrudTable
        columns={[
          "title",
          "githubUrl",
          "liveUrl",
        ]}
        data={data}
        onEdit={edit}
        onDelete={remove}
      />

    </div>
  );
}

export default Projects;