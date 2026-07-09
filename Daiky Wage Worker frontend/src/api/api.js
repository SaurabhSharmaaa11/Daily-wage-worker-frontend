import axios from "axios";

const API = axios.create({
    baseURL: "https://daily-wage-labour-backend.onrender.com/api"
});

// This runs before EVERY request sent through API.
// If a token was saved in localStorage after login, attach it automatically.
// This means individual components (Attendance.jsx, PaymentTracking.jsx, etc.)
// never need to worry about tokens themselves.
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
