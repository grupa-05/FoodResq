import axios from 'axios';

const api = axios.create({
    baseURL: '', // Gol, deoarece folosim rewrite-ul din next.config.mjs
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;