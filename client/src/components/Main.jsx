import React from 'react';
import { assets } from '../assets/assets';
import {  useNavigate } from 'react-router-dom';

const Main = () => {
  const logos = [
    assets.accenture, assets.comcast, assets.paypal, 
    assets.swiggy, assets.zomato, assets.unacademy, assets.hreme
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-white py-10 md:py-20 px-4 overflow-x-hidden">
      
      {/* --- Logo Slider Section --- */}
      <p className="text-center mb-6 md:mb-8 text-gray-500 font-medium uppercase tracking-widest text-[10px] md:text-xs">
        Trusted by popular brands
      </p>
      
      <div className="flex overflow-hidden w-full max-w-5xl mb-16 md:mb-24">
        <div className="flex animate-loop-scroll min-w-full shrink-0 items-center justify-around gap-8 md:gap-12 px-4">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt="logo" className="h-5 md:h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all max-w-none" />
          ))}
        </div>
        <div className="flex animate-loop-scroll min-w-full shrink-0 items-center justify-around gap-8 md:gap-12 px-4" aria-hidden="true">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt="logo" className="h-5 md:h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all max-w-none" />
          ))}
        </div>
      </div>

      {/* --- Hero Content Section --- */}
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-100 bg-purple-50 text-purple-600 text-[10px] md:text-sm font-semibold mb-6">
          <span>✨</span> AI-Blog Writer
        </div>

        {/* Main Title - Fixed for Mobile */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#1A1A3F] leading-tight md:leading-[1.1] mb-6 max-w-[90vw] md:max-w-none">
          AI Blog Writer That Beats 
          <span className="block md:inline"> Your Competition</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-xl leading-relaxed max-w-2xl mb-8 px-2">
          Our AI doesn't just write - it strategically crafts blog posts that search engines love and readers actually finish. 
          Input your topic and get a well-structured SEO optimized article.
        </p>

        {/* Call to Action Button */}
        <button onClick={() => navigate('/create')} className="w-full sm:w-auto bg-[#3D52FF] hover:bg-[#3245E6] text-white px-10 py-4 rounded-xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-200 active:scale-95">
          <span>✨</span> Create Your First Blog
        </button>
      </div>
    </div>
  );
};

export default Main;