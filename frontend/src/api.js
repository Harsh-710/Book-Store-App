import axios from 'axios';

const api = axios.create({
  baseURL: 'https://book-store-api-pn71.onrender.com',   // The API (backend) URL
  // baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(function (req) {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;