import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 1. TOP BANNER - Responsive Font & Centering */}
      <div className="w-full bg-gradient-to-r from-[#5346E5] to-[#A655F7] text-white py-3 px-4 text-center text-xs sm:text-sm font-medium">
        Weekend Flash Sale is live - <a className='underline decoration-blue-300' href="#">Claim today</a>
      </div>

      {/* 2. MAIN NAV - Relative on mobile, Fixed on scroll if you prefer */}
      <nav
        className="w-full flex justify-between items-center px-6 md:px-24 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 sticky top-0"
      >
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-2">
          <img src={assets.logo} className="w-8 sm:w-11" alt="logo" />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            BlogGalaxy
          </h1>
        </a>

        {/* DESKTOP MENU - Hidden on Mobile (md:flex) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/explore" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
            Explore Blogs
          </a>
          <a href="/login" className="flex items-center gap-2 border border-slate-400 rounded-full px-6 py-2 text-slate-800 hover:bg-slate-50 transition">
            Login 
            <img src={assets.arrow_icon} className="w-3" alt="" />
          </a>
        </div>

        {/* MOBILE MENU BUTTON - Hidden on Desktop (md:hidden) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-900 focus:outline-none"
        >
          {/* Animated Hamburger Icon */}
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* MOBILE OVERLAY - Slides down when button clicked */}
        <div className={`
          absolute top-full left-0 w-full bg-white border-b shadow-xl flex flex-col p-6 gap-4 transition-all duration-300 md:hidden
          ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
        `}>
          <a href="/explore" className="text-lg font-medium py-2 border-b">Explore Blogs</a>
          <a href="/login" className="text-lg font-medium py-2 text-blue-600">Login</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;