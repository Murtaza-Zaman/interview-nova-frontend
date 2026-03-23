/**
 * @file frontend/src/services/interceptors.js
 * @description HTTP interceptor setup for auth headers, token refresh, and centralized error handling.
 */
import axiosInstance from "./axios";

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network / server not reachable
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: "Network error. Please try again.",
      });
    }

    const { status, data } = error.response;

    // Unauthorized
    if (status === 401) {
      const message = data?.message || "Unauthorized. Please login again.";

      return Promise.reject({ status, message });
    }

    // Other errors
    return Promise.reject({
      status,
      message: data?.message || "Something went wrong",
    });
  }
);