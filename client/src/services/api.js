
import axios from 'axios';



const getBaseURL = () => {
  const rawUrl =
    import.meta.env.VITE_API_URL ||
    'https://roxiler-store-rating-backend.vercel.app/api';

  const cleanUrl = rawUrl.trim().replace(/\/+$/, '');

  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};



const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired authentication
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
