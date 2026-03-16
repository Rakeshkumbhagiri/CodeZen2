import axios from "axios";

const api = axios.create({
  baseURL: "https://codezen2-server.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// global error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;