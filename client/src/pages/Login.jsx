import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContext);

  // ✅ State
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Submit handler
  const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    axios.defaults.withCredentials = true;

    if (state === 'Sign Up') {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/auth/register`,
        { name, email, password }
      );

      if (data.success) {
        toast.success("Registration successful 🎉");
        setIsLoggedin(true);

        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        toast.error(data.message);
      }

    } else {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/auth/login`,
        { email, password }
      );

      if (data.success) {
        toast.success("Login successful ✅");
        setIsLoggedin(true);

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(data.message);
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      {/* Logo */}
      <div className="flex justify-center items-center p-3 border rounded bg-black text-white">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          width={50}
          alt="logo"
          className="cursor-pointer"
        />
        <p className="ml-2">BlogGalaxy</p>
      </div>

      {/* Card */}
      <div className="flex items-center justify-center mt-12">
        <div className="bg-slate-900 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300">
          <h1 className="pt-5 text-3xl font-semibold text-white text-center my-3">
            {state === 'Sign Up' ? 'Create account' : 'Login'}
          </h1>

          <p className="text-center text-sm mb-6">
            {state === 'Sign Up'
              ? 'Create your account'
              : 'Login to your account!'}
          </p>

          {/* Form */}
          <form onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-6 px-5">
              {state === 'Sign Up' && (
                <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                  <img src={assets.person} width={20} alt="person" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-white"
                    type="text"
                    placeholder="Enter full name"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.mail} width={20} alt="mail" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-white"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock} width={20} alt="lock" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-white"
                  type="password"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <p
              onClick={() => navigate('/reset-password')}
              className="mb-4 ml-5 mt-2 text-indigo-500 cursor-pointer text-sm"
            >
              Forgot password?
            </p>

            <button
              type="submit"
              className="w-10/12 ml-7 text-white font-medium py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 mb-5"
            >
              {state}
            </button>
          </form>

          {/* Toggle */}
          {state === 'Sign Up' ? (
            <p className="text-gray-400 text-center text-xs pb-5">
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="cursor-pointer underline text-blue-400"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs pb-5">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="cursor-pointer underline text-blue-400"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
