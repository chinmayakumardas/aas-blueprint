
import axios from 'axios';

// Normal backend axios
export const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.146:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});




