import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const api = axios.create({
    baseURL: "http://192.168.29.133:3000/api",
    timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
