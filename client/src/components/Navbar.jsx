import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <>
      {/* Top announcement banner */}
      <div className="sticky top-0 text-center  w-screen bg-[#A154F6] text-black text-center py-3 font-medium bg-gradient-to-r from-[#5346E5] to-[#A655F7]">
        Weekend Flash Sale is live - <a className='underline decoration-blue-300' href="https://www.blog-galaxy.netlify.app">Claim today</a>
      </div>

      {/* Main navbar */}
      <nav
        className="fixed top-[40px] w-full flex justify-between items-center
                   px-4 py-3 sm:px-24 bg-white z-50"
        aria-label="Primary"
        role="navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" aria-label="Blog Galaxy home">
          <img
            src={assets.logo}
            width={44}
            height={44}
            alt="Blog Galaxy logo"
            className="select-none"
          />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            BlogGalaxy
          </h1>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="/explore"
            className="text-sm px-4 py-2 rounded-full font-semibold
                       text-slate-700 hover:bg-slate-100 transition"
          >
            Explore Blogs
          </a>

          <a
            href="/login"
            className="flex items-center gap-2 border border-slate-400
                       rounded-full px-5 py-2 text-slate-800
                       hover:bg-slate-100 transition"
          >
            Login
            <img
              src={assets.arrow_icon}
              className="w-3"
              alt="arrow icon"
            />
          </a>
        </div>
      </nav>

      {/* Spacer to prevent content jump due to fixed navbar */}
      <div className="h-[96px]" />
    </>
  );
};

export default Navbar;
