import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (email) => {
    const response = await api.post('/auth/login', { email });
    return response.data;
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
};

export default api;