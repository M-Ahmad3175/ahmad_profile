import api from "./api";

// Login API
export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);

  return response.data;
};

// Logout API
export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};