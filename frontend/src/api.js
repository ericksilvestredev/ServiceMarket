import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
});

// Interceptor para adicionar o token JWT em todas as requisições (Fase 3/4)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
