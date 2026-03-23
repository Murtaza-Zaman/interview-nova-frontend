/**
 * @file frontend/src/services/axios.js
 * @description Shared Axios instance configuration for base URL and defaults.
 */
import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Increased timeout to 30s to allow for S3 uploads
  withCredentials: true,
});

export default axiosInstance;