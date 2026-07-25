import axios from "axios";

export const api = axios.create({
  baseURL: "https://wallet-ledger-api-8icr.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
