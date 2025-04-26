import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('token');
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
        config.withCredentials = true;

    return config;
});

export const publicApi = axios.create({
    baseURL: BASE_URL,
});

