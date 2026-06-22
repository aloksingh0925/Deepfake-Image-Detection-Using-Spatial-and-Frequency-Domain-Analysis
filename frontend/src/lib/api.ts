import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);
