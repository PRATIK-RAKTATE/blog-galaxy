import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
        <h2 className="text-xl font-bold tracking-tight text-slate-800">AI-Blog</h2>
      </div>

      {/* Login Button */}
      <button className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 text-gray-800 transition-all">
        Login
        <img src={assets.arrow_icon} className="w-3" alt="arrow" />
      </button>
    </nav>
  );
};

export default Navbar;