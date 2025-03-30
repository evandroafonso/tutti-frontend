import axios from "axios";
import router from "./router.js";
console.log(import.meta.env.VITE_API_BASE_URL)
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN: ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    console.log(error)
    alert(error.response.data.message);
    localStorage.removeItem("token");
    router.push({ name: "Login" });
  }
  throw error;
})
export default axiosClient;
