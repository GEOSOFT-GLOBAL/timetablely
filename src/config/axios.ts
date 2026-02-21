import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const APP_SOURCE = "timetablely";

/**
 * Create axios instance with default configuration for timetablely app
 */
export const createApiClient = (token?: string): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: `${API_BASE_URL}/timetablely/sync`,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "X-App-Source": APP_SOURCE,
    },
  };

  // Add authorization header if token is provided
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.create(config);
};

/**
 * Default API client instance
 * Use this for quick API calls
 */
export const apiClient = createApiClient();

/**
 * Get API client with authentication
 * @param token - JWT access token
 */
export const getAuthenticatedClient = (token: string): AxiosInstance => {
  return createApiClient(token);
};

export default apiClient;
