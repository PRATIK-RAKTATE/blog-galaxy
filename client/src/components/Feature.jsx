import React from 'react';

const Features = () => {
  const featureData = [
    {
      badge: "BEYOND BASIC AI CHAT",
      title: "Advanced AI Writing Engine",
      desc: "Our specialized AI understands ROI, not just writing - it creates content that's factually accurate and SEO-optimized.",
      color: "text-blue-600",
    },
    {
      badge: "EVERYTHING IN ONE PLACE",
      title: "Complete Workflow Solution",
      desc: "From market research to content creation and publishing - manage your entire content workflow in one place.",
      color: "text-blue-600",
    },
    {
      badge: "THE BEST OF EVERYTHING",
      title: "Multiple AI Models",
      desc: "Access ChatGPT-4, Claude, and Gemini through one interface, optimized specifically for high-conversion content.",
      color: "text-purple-600",
    },
    {
      badge: "AI THAT LEARNS YOUR VOICE",
      title: "Brand Voice Mastery",
      desc: "Train our AI on your best content once, and it will perfectly match your brand voice in every piece it creates forever.",
      color: "text-orange-500",
    },
    {
      badge: "CONNECTS WITH EVERYTHING",
      title: "Seamless Integrations",
      desc: "Unlike basic tools, we integrate with WordPress, Google Analytics, and Ahrefs to make data-driven decisions.",
      color: "text-blue-500",
    },
    {
      badge: "INSIGHTS THAT DRIVE RESULTS",
      title: "Intelligent Data Analysis",
      desc: "Upload any document or data file and get strategic marketing recommendations that actually move the needle.",
      color: "text-purple-500",
    }
  ];

  return (
    <div className="bg-[#F8FAFF] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              
              {/* Badge */}
              <span className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${item.color}`}>
                {item.badge}
              </span>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-[#1A1A3F] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {item.desc}
              </p>

              {/* UI Mockup Placeholder */}
              <div className="mt-auto bg-gray-50 rounded-xl border border-gray-100 p-4 h-48 flex flex-col gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="h-12 bg-white rounded border border-gray-100 shadow-sm"></div>
                    <div className="h-12 bg-white rounded border border-gray-100 shadow-sm"></div>
                    <div className="h-12 bg-white rounded border border-gray-100 shadow-sm"></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-16">
            <button className="bg-[#3D52FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                Start Your Free Trial
            </button>
        </div>
      </div>
    </div>
  );
};

export default Features;