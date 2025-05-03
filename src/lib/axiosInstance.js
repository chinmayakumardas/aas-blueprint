import axios from "axios";

// Dynamically choose the base URL
const getBaseUrl = () => {
  // Check if local URL is available (could be checked based on window or some condition)
  const isLocalAvailable = typeof window !== "undefined" && window.location.hostname === "localhost";

  return isLocalAvailable
    ? "http://192.168.0.146:8000/api" // Local URL
    : "https://your-live-api-url.com/api"; // Live URL
};

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Adjust this based on your authentication requirements
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication headers or log the request here
    const token = localStorage.getItem("token"); // Example token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Optionally log the request details
    console.log("Request sent to:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response (e.g., store data in global state or UI)
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect to login on 401)
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request. Redirecting to login...");
      // Redirect to login or handle the error here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
