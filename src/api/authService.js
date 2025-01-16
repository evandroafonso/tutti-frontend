import axios from "axios";
import { API_BASE_URL } from "@/config";

export async function login(email, password) {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
}
