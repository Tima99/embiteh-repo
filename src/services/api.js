import axios from "axios";

const api = axios.create({
    // Configure baseURL and other options
    baseURL: import.meta.env.VITE_BACKEND_API,
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (!error?.response) return Promise.reject("Try Again");

        const err = error?.response?.data;
        const isMsgError = (err?.message || err?.error)
        // Do something with response error
        return Promise.reject((isMsgError ? isMsgError  : err) || "Try Again");
    }
);

export default api;
