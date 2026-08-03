import api from "./api";

const messageService = {
  getAll: async () => (await api.get("/messages")).data,

  create: async (data) => (await api.post("/messages", data)).data,

  markRead: async (id) => (await api.patch(`/messages/${id}/read`)).data,

  markUnread: async (id) => (await api.patch(`/messages/${id}/unread`)).data,

  delete: async (id) =>
    (await api.delete(`/messages/${id}`)).data,
};

export default messageService;