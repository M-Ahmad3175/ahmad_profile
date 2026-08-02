import axios from "axios";

const getApiBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_BASE_URL || "https://ahmad-portfolio-cms.onrender.com/api/v1";
  const trimmed = rawUrl.replace(/\/+$|^\s+|\s+$/g, "");
  if (trimmed.endsWith("/api/v1")) {
    return trimmed;
  }
  return `${trimmed.replace(/\/+$/g, "")}/api/v1`;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

export default api;
