import api from "./api";

const resumeService = {
  getAll: async () => (await api.get("/resume")).data,

  create: async (data) =>
    (await api.post("/resume", data)).data,

  update: async (id, data) =>
    (await api.put(`/resume/${id}`, data)).data,

  delete: async (id) =>
    (await api.delete(`/resume/${id}`)).data,
};

export default resumeService;