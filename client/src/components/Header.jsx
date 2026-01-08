import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <header className="flex flex-col items-center mt-20 px-4 text-center">
      {/* Small Badge */}
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1 rounded-full text-indigo-600 text-sm font-medium mb-6">
        <span>✨ New: AI Content Generator 2.0</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 max-w-3xl leading-tight">
        The Future of Writing is <br />
        <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          Powered by Intelligence
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-gray-500 max-w-xl text-lg">
        Create, edit, and publish high-quality blog posts in seconds. Our AI understands your voice and handles the SEO for you.
      </p>

      {/* Call to Action */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-all">
          Get Started Free
        </button>
        <button className="border border-gray-300 px-10 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all">
          Explore Blogs
        </button>
      </div>

      {/* Optional: App Preview Image placeholder */}
      <div className="mt-16 w-full max-w-4xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
         <div className="bg-gray-100 h-64 sm:h-96 flex items-center justify-center text-gray-400">
            [ Dashboard Preview Placeholder ]
         </div>
      </div>
    </header>
  );
};

export default Header;