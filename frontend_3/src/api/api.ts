import axios from "axios";

const API_URL = "http://localhost:5000"; // Your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important for cookies to work
});

export default api;
