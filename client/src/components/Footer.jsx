import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    // w-full ensures the background color and border span the entire screen
    <footer className="w-full bg-[#00040f] text-slate-400 py-16 px-6 sm:px-12 lg:px-24 border-t border-slate-800">
      
      {/* Container to keep content centered but restricted to a max-width */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Branding and Trust Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className="w-8" />
            <h2 className="text-white text-2xl font-bold uppercase tracking-tight">GravityWrite</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            Your AI Assistant for Content Creation, SEO & More. Start for Free!
          </p>
          
          {/* Social Icons - Circle Style */}
          <div className="flex gap-3">
            {['X', 'F', 'Y', 'I', 'L'].map((icon, idx) => (
              <div key={idx} className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-all cursor-pointer text-xs">
                {icon}
              </div>
            ))}
          </div>

          {/* Trust Badges Section */}
          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-1">
               <span className="text-[#00b67a] font-bold text-lg flex items-center gap-1">
                 <span className="text-xl">★</span> Trustpilot
               </span>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white text-[10px]">★</div>
                  ))}
               </div>
               <p className="text-xs mt-1">TrustScore 4.2 | 605 Reviews</p>
            </div>
            
            <div className="h-[1px] w-full bg-slate-800 max-w-[250px]"></div>

            <div className="flex flex-col gap-1">
               <span className="text-[#ff4f00] font-bold text-lg flex items-center gap-1">G2.com</span>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-5 h-5 bg-[#ff4f00] flex items-center justify-center text-white text-[10px]">★</div>
                  ))}
               </div>
               <p className="text-xs mt-1">G2Score 4.5 | 591 Reviews</p>
            </div>
          </div>
        </div>

        {/* Column 1: Company */}
        <div>
          <h3 className="text-white font-semibold mb-6">Company</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">About us</li>
            <li className="hover:text-white transition-colors cursor-pointer">Affiliate Program</li>
            <li className="hover:text-white transition-colors cursor-pointer">Influencer Program</li>
            <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Column 2: Tools */}
        <div>
          <h3 className="text-white font-semibold mb-6">Tools</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Social Media AI</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI Article Writer</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI Image Generator</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI Email Generator</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI Logo Generator</li>
            <li className="hover:text-white transition-colors cursor-pointer">AI Text Generator</li>
          </ul>
        </div>

        {/* Column 3: Use Cases & Support */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-white font-semibold mb-6">Use Cases</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Marketing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Social Media</li>
              <li className="hover:text-white transition-colors cursor-pointer">SEO</li>
              <li className="hover:text-white transition-colors cursor-pointer">Blogs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Live Webinar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Awards Badges at Bottom */}
      <div className="max-w-[1440px] mx-auto mt-16 flex flex-wrap gap-6 pt-10 border-t border-slate-900">
          <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col items-center w-20">
            <span className="text-[8px] font-bold text-orange-500">Leader</span>
            <span className="text-[8px] text-white">WINTER 2025</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col items-center w-20">
            <span className="text-[8px] font-bold text-purple-500">Leader</span>
            <span className="text-[8px] text-white">ASIA PACIFIC</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col items-center w-20">
            <span className="text-[8px] font-bold text-blue-500">Momentum</span>
            <span className="text-[8px] text-white">WINTER 2025</span>
          </div>
      </div>
    </footer>
  );
};

export default Footer;