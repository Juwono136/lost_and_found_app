import axios from "axios";
import { getAccessToken } from "./axios";

const baseURL = "http://localhost:5000/api/user";

const userApi = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to include access token in headers

userApi.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (!token) {
      config.headers["Authorization"] = `Bearer ${await refreshAccessToken()}`;
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get user info
export const getUserInfo = async () => {
  try {
    const response = await userApi.get("/user_infor");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await userApi.get("/all_infor");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all user info:", error);
    throw error;
  }
};

export default userApi;
