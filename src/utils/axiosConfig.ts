import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCookie = (authToken: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${authToken}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    return lastPart ? lastPart.split(';')[0] : null;
  }
  return null;
};

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('authToken'); // Récupération du token depuis les cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;