const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_URL = {
  BASE: BASE_URL,
  SERVICES: `${BASE_URL}/api/services`,
  EQUIPMENT: `${BASE_URL}/api/equipment`,
  PROJECTS: `${BASE_URL}/api/projects`,
  AUTH: `${BASE_URL}/api/admin`,
};
