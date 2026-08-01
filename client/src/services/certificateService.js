import api from "./api";

const certificateService = {
  getAll: async () => (await api.get("/certificates")).data,

  create: async (data) => (await api.post("/certificates", data)).data,

  update: async (id, data) =>
    (await api.put(`/certificates/${id}`, data)).data,

  delete: async (id) =>
    (await api.delete(`/certificates/${id}`)).data,
};

export default certificateService;