import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const APP_SOURCE = "timetablely";

// API Path enum for different endpoints
export enum ApiPath {
  AUTH = "/auth",
  TIMETABLELY = "/timetablely/sync",
}

/**
 * Create axios instance with default configuration for timetablely app
 */
export const createApiClient = (
  token?: string,
  basePath: ApiPath = ApiPath.TIMETABLELY
): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: `${API_BASE_URL}${basePath}`,
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
 * Create auth API client (for /auth endpoints)
 */
export const createAuthApiClient = (): AxiosInstance => {
  return createApiClient(undefined, ApiPath.AUTH);
};

/**
 * Default API client instance
 * Use this for quick API calls
 */
export const apiClient = createApiClient();

/**
 * Auth API client for authentication endpoints
 */
export const authApi = createAuthApiClient();

/**
 * Get API client with authentication
 * @param token - JWT access token
 */
export const getAuthenticatedClient = (token: string): AxiosInstance => {
  return createApiClient(token);
};

export default apiClient;
