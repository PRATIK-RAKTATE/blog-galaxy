import { motion } from 'motion/react';
// 1. IMPORT the logo for production stability
import logo from "../../src/assets/logo.png"; 

export function LoadingScreen({ theme }) {
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-white dark:bg-gray-950 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Logo Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* The main box */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden p-3 shadow-2xl">
              {/* 2. USE the imported logo variable */}
              <img 
                src={logo} 
                alt="BlogGalaxy Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            
            {/* Outer Gradient Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-[24px] z-[-1]"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.4), transparent)',
              }}
            />
          </motion.div>

          {/* Loading Text & Pulsing Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              BlogGalaxy AI
            </h2>
            <div className="flex gap-1.5 mt-1">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3] 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: delay 
                  }}
                  className={`w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}