import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;