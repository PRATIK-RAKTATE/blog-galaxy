import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Changed to framer-motion as it's the standard package
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px, but only if not dismissed
      if (!isDismissed) {
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl p-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRegisterClick}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Start Free Trial
              </button>
              
              <button
                onClick={handleClose}
                className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              14-day free trial • No credit card required
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}