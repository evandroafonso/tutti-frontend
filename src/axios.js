import axios from "axios";
import router from "./router.js";
console.log(import.meta.env.VITE_API_BASE_URL)
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});
//axiosClient.interceptors.request.use((config) => {
//  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//  return config;
//});

axiosClient.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    router.push({name: 'Login'});
  }
  throw error;
})
console.log(import.meta.env.VITE_API_BASE_URL);
export default axiosClient;
