import Spline from "@splinetool/react-spline";

function Hero3D() {
  return (
    <div className="relative w-full h-full">
      {/* 3D Model */}
      <Spline scene="https://prod.spline.design/8xhoBA2LnKFszH2b/scene.splinecode" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-start justify-start pointer-events-none pt-5 pl-5">
        <div className="absolute inset-0 flex justify-between items-start p-8 md:p-12 pointer-events-none">
          {/* Top Left */}
          {/* Top Left */}
          <h1
            className="text-[5vw] md:text-[3vw] font-black tracking-tighter leading-none select-none
               bg-gradient-to-br from-violet-500 via-purple-400 to-sky-400 
               bg-clip-text text-transparent uppercase"
          >
            Explore Blogs
          </h1>

          {/* Top Right */}
          <h1
            className="text-[5vw] md:text-[3vw] font-black tracking-tighter leading-none select-none
               bg-gradient-to-br from-violet-500 via-purple-400 to-sky-400 
               bg-clip-text text-transparent uppercase"
          >
            Create Blog
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Hero3D;
