const envApiUrl = import.meta.env.VITE_API_BASE_URL;

if (!envApiUrl) {
  throw new Error("Missing VITE_API_BASE_URL env variable");
}

export const API_BASE_URL = envApiUrl as string;

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`
} as const;
