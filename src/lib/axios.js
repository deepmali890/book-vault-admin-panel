import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://book-vault-backend.onrender.com/api', // apna base URL yaha de
  withCredentials: true, // agar tu cookie based login use kar raha hai
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}` // Agar future me token lage to
  }
});

export default axiosInstance;
