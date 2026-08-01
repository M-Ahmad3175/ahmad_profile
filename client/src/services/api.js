// Central Axios configuration for the entire application.
// Every API request will use this instance.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",

  // IMPORTANT:
  // Our backend stores JWT inside an HttpOnly cookie.
  // This allows the browser to automatically send the cookie.
  withCredentials: true,
});

export default api;