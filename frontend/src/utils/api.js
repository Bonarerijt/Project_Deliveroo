import axios from 'axios';

// Handle environment variable - use placeholder if not set
// This allows the frontend to deploy even without backend
const getApiUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  // If URL is empty, undefined, or looks like a secret reference, use placeholder
  if (!envUrl || envUrl.trim() === '' || envUrl.startsWith('@vercel_secret')) {
    console.warn('REACT_APP_API_URL not set - API calls will fail until backend is deployed');
    return 'https://placeholder-api.example.com';
  }
  return envUrl;
};

const API_BASE_URL = getApiUrl();

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method && config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Force page reload to trigger auth context update
      window.location.reload();
    }
    
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`API Error: ${error.response && error.response.status} ${error.config && error.config.url}`, error.response && error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;