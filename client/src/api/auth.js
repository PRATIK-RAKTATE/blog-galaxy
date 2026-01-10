import axios from 'axios';

// 1. Ensure the variable name matches what you set in Netlify exactly
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// 2. Create a reusable instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This fixes the CORS credential error
});

// ================== Login API ==================
export const login = async (email, password) => {
  try {
    const res = await api.post(`/api/v1/auth/login`, { email, password });
    
    if (!res.data || !res.data.token || !res.data.user) {
      throw new Error('Invalid login response from server');
    }
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Login failed' };
  }
};

// ================== Register API ==================
export const register = async (user) => {
  try {
    const res = await api.post(`/api/v1/auth/register`, user);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Registration failed' };
  }
};


// ================== Forgot Password API ==================
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, { email });
    if (!res.data) {
      throw new Error('Invalid forgot-password response from server');
    }
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Forgot password failed' };
  }
};
