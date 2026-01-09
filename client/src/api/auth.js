import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ================== Login API ==================
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
    // Expect backend to return { token, user }
    if (!res.data || !res.data.token || !res.data.user) {
      throw new Error('Invalid login response from server');
    }
    return res.data;
  } catch (err) {
    // Properly throw backend errors
    throw err.response?.data || { message: err.message || 'Login failed' };
  }
};

// ================== Register API ==================
export const register = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/auth/register`, user);
    // Only return if status is 200-299
    if (!res.data) {
      throw new Error('Invalid registration response from server');
    }
    return res.data;
  } catch (err) {
    // Throw backend error to frontend (e.g., duplicate email)
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
