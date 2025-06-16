import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // This pulls from your .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;