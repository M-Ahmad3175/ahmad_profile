import { useForm } from "react-hook-form";

import CrudForm from "../../components/crud/CrudForm";
import CrudTable from "../../components/crud/CrudTable";

import useCrud from "../../hooks/useCrud";
import experienceService from "../../services/experienceService";

function Experience() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      employmentType: "Full-time",
      currentlyWorking: false,
      technologies: "",
    },
  });

  const {
    data,
    editingId,
    save,
    edit,
    remove,
  } = useCrud(experienceService, reset);

  const handleExperienceSubmit = async (data) => {
    const payload = {
      ...data,
      technologies: typeof data.technologies === "string"
        ? data.technologies
            .split(",")
            .map((technology) => technology.trim())
            .filter(Boolean)
        : [],
      currentlyWorking: Boolean(data.currentlyWorking),
      displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
    };

    await save(payload);
  };

  const handleExperienceEdit = (experience) => {
    edit({
      ...experience,
      technologies: Array.isArray(experience.technologies)
        ? experience.technologies.join(", ")
        : "",
      currentlyWorking: Boolean(experience.currentlyWorking),
      displayOrder: experience.displayOrder ?? 0,
    });
  };

  const fields = [
    {
      name: "jobTitle",
      label: "Job Title",
      type: "text",
      required: true,
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      required: true,
    },
    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      options: [
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Internship", value: "Internship" },
        { label: "Contract", value: "Contract" },
        { label: "Freelance", value: "Freelance" },
        { label: "Remote", value: "Remote" },
        { label: "Other", value: "Other" },
      ],
      required: true,
      defaultValue: "Full-time",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
    },
    {
      name: "currentlyWorking",
      label: "Currently Working",
      type: "checkbox",
    },
    {
      name: "technologies",
      label: "Technologies",
      type: "textarea",
      placeholder: "React, Node.js, MongoDB",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ];

  const columns = [
    {
      key: "jobTitle",
      label: "Job Title",
      type: "text",
    },
    {
      key: "company",
      label: "Company",
      type: "text",
    },
    {
      key: "employmentType",
      label: "Type",
      type: "badge",
    },
    {
      key: "location",
      label: "Location",
      type: "text",
    },
  ];

  return (
    <div className="space-y-8">
      <CrudForm
        title={editingId ? "Edit Experience" : "Add Experience"}
        fields={fields}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={handleExperienceSubmit}
        isSubmitting={isSubmitting}
        submitLabel={editingId ? "Update Experience" : "Add Experience"}
      />

      <CrudTable
        columns={columns}
        data={data}
        onEdit={handleExperienceEdit}
        onDelete={remove}
      />
    </div>
  );
}

export default Experience;