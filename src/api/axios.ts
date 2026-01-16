import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // 🔴 REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================
   Request Interceptor
====================== */
axiosInstance.interceptors.request.use(
  (config) => {
    // 🔐 NO token logic here (cookies handled by browser)
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   Response Interceptor
====================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized – session expired");

      // Optional: global logout / redirect
      // localStorage.clear();
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
