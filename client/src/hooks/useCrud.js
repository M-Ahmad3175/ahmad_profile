import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useCrud(service, reset) {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Data
  const loadData = async () => {
    try {
      setLoading(true);

      const response = await service.getAll();

      const singletonData =
        response?.data?.settings ??
        response?.data?.socialLinks ??
        response?.settings ??
        response?.socialLinks;

      const rawData =
        response?.data?.items ??
        response?.data?.certificates ??
        response?.data?.resumes ??
        response?.data?.messages ??
        response?.data?.experiences ??
        response?.data?.experience ??
        response?.data?.education ??
        response?.data?.educations ??
        response?.data?.projects ??
        response?.data?.skills ??
        response?.data?.data ??
        response?.items ??
        response?.certificates ??
        response?.resumes ??
        response?.messages ??
        response?.experiences ??
        response?.experience ??
        response?.education ??
        response?.educations ??
        response?.projects ??
        response?.skills ??
        response?.data ??
        response;

      if (Array.isArray(rawData)) {
        setData(rawData);
      } else if (singletonData && typeof singletonData === "object") {
        setData([singletonData]);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save (Create / Update)
  const save = async (formData) => {
    try {
      if (typeof service?.create !== "function" && typeof service?.update !== "function") {
        toast.error("Save operation is not supported for this module");
        return;
      }

      if (editingId) {
        if (typeof service?.update === "function") {
          await service.update(editingId, formData);
        } else {
          await service.create(formData);
        }

        toast.success("Updated Successfully");
      } else {
        await service.create(formData);

        toast.success("Created Successfully");
      }

      reset();

      setEditingId(null);

      loadData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation Failed"
      );
    }
  };

  // Edit
  const edit = (item) => {
    setEditingId(item._id);

    reset(item);
  };

  // Delete
  const remove = async (id) => {
    try {
      if (typeof service?.delete !== "function") {
        toast.error("Delete operation is not supported for this module");
        return;
      }

      await service.delete(id);

      toast.success("Deleted Successfully");

      loadData();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return {
    data,
    loading,
    editingId,
    save,
    edit,
    remove,
  };
}

export default useCrud;