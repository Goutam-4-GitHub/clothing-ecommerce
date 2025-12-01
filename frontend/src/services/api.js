import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-rvhu.onrender.com",
  withCredentials: true, // important for cookies (JWT)
});

export default api;
