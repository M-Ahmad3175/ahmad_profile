import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CrudPage from "../../components/crud/CrudPage";
import CrudForm from "../../components/crud/CrudForm";
import CrudTable from "../../components/crud/CrudTable";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const categoryOptions = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Database", value: "Database" },
    { label: "Programming", value: "Programming" },
    { label: "Tools", value: "Tools" },
    { label: "Other", value: "Other" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      category: "Frontend",
      proficiency: 0,
    },
  });

  const fields = [
    {
      name: "name",
      label: "Skill Name",
      placeholder: "React",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categoryOptions,
      required: true,
      defaultValue: "Frontend",
    },
    {
      name: "proficiency",
      label: "Proficiency",
      placeholder: "90",
      type: "number",
      required: true,
    },
  ];

  const loadSkills = async () => {
    try {
      const response = await getSkills();

      const skillsList = response?.data?.skills ?? response?.skills ?? response?.data ?? response;

      const normalizedSkills = Array.isArray(skillsList)
        ? skillsList.map((skill) => ({
            ...skill,
            category: skill.category || "Frontend",
            proficiency: skill.proficiency ?? skill.percentage ?? 0,
          }))
        : [];

      setSkills(normalizedSkills);
    } catch (error) {
      toast.error("Failed to load skills");
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        category: data.category || "Frontend",
        proficiency: Number(data.proficiency),
      };

      if (editingId) {
        await updateSkill(editingId, payload);

        toast.success("Skill Updated");
      } else {
        await createSkill(payload);

        toast.success("Skill Added");
      }

      reset();

      setEditingId(null);

      loadSkills();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.message ||
          "Operation Failed"
      );
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);

    reset({
      ...skill,
      category: skill.category || "Frontend",
      proficiency: skill.proficiency ?? skill.percentage ?? 0,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);

      toast.success("Skill Deleted");

      loadSkills();

    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="space-y-8">

      <CrudForm
        title={
          editingId
            ? "Edit Skill"
            : "Add Skill"
        }
        submitLabel={
          editingId
            ? "Update Skill"
            : "Add Skill"
        }
        fields={fields}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />

      <CrudTable
        columns={["name", "category", "proficiency"]}
        data={skills}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Skills;