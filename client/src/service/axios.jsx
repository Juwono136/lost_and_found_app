// src/service/axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// In-memory token variable
let accessToken = null;
export const getAccessToken= () => accessToken

// Function to set the access token
export const setAccessToken = (token) => {
  accessToken = token; // Store in-memory
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`; // Update Axios headers
};

// Function to refresh the access token (must be defined)
export const refreshAccessToken = async () => {
  try {
      const response = await axios.post("http://localhost:5000/api/user/refresh_token", {}, { withCredentials: true });
      setAccessToken(response.data.access_token);
      console.log("access token: ", response.data.access_token)
      return response.data.access_token; // Return the new access token
  } catch (err) {
      console.error("Failed to refresh access token", err);
      throw err; // Re-throw to handle in the calling function
  }
};


axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getAccessToken();
        if (!token) {
            config.headers['Authorization'] = `Bearer ${await refreshAccessToken()}`;
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// Function to clear the access token
export const clearAccessToken = () => {
  accessToken = null;
  delete axiosInstance.defaults.headers['Authorization'];
};

export default axiosInstance;
