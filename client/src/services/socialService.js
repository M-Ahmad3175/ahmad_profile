import api from "./api";

const socialService = {
  getAll: async () => (await api.get("/social-links")).data,
  create: async (data) => (await api.put("/social-links", data)).data,
  update: async (id, data) => (await api.put("/social-links", data)).data,
};

export default socialService;