import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000, // Extended timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

interface NormalizedError {
  message: string;
  status: number;
  code?: string;
  timestamp: string;
}

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add request ID for tracking
    config.headers['X-Request-Id'] = crypto.randomUUID();
    
    // Add timestamp
    config.headers['X-Request-Time'] = new Date().toISOString();
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  (error: AxiosError) => {
    const normalizedError: NormalizedError = {
      message: error.response?.data?.message as string || error.message || 'An unknown error occurred',
      status: error.response?.status || 500,
      code: error.code,
      timestamp: new Date().toISOString(),
    };

    // Handle specific error codes
    if (error.code === 'ECONNABORTED') {
      normalizedError.message = 'Request timeout. Please check your connection.';
    } else if (error.code === 'ENOTFOUND') {
      normalizedError.message = 'Network error. Please check your internet connection.';
    } else if (error.response?.status === 429) {
      normalizedError.message = 'Too many requests. Please wait a moment and try again.';
    } else if (error.response?.status === 503) {
      normalizedError.message = 'Service temporarily unavailable. Please try again later.';
    }

    console.error('[API Error]', normalizedError);
    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;
