import api from "./api";

const settingsService = {
  getAll: async () => (await api.get("/settings")).data,

  create: async (data) =>
    (await api.put("/settings", data)).data,

  update: async (id, data) =>
    (await api.put("/settings", data)).data,
};

export default settingsService;