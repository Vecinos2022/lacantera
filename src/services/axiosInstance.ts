import { addToast } from "@heroui/toast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    const errorMessage = error.response?.data?.message || "An error occurred";

    // Show a toast notification for errors
    addToast({
      title: "Error",
      description: errorMessage,
    });

    return Promise.reject(error);
  },
);

export default axiosInstance;
