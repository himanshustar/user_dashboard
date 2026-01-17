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
  (response) => {
    // 🔹 unwrap API response
    return {
      ...response,
      data: response.data?.data ?? response.data,
      message: response.data?.message,
    };
  },
  (error) => {
    const normalizedError = {
      status: error.response?.status,
      message:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      raw: error,
    };

    // Optional global handling
    if (normalizedError.status === 401) {
      console.error("Unauthorized - session expired");
    }

    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;
