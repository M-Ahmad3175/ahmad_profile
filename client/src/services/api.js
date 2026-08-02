import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://ahmad-portfolio-cms.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
