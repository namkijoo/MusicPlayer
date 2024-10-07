import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default axiosInstance;
