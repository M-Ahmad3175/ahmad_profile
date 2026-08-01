import api from "./api";

const messageService = {
  getAll: async () => (await api.get("/messages")).data,

  create: async (data) => (await api.post("/messages", data)).data,

  delete: async (id) =>
    (await api.delete(`/messages/${id}`)).data,
};

export default messageService;