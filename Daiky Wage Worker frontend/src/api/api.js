import axios from "axios";

const API = axios.create({
  baseURL: "https://daily-wage-worker-backend.onrender.com/",
});

export default API;
