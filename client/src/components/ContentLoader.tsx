import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const steps = [
  'Analyzing topic...',
  'Researching keywords...',
  'Generating outline...',
  'Writing content...',
  'Optimizing SEO...',
];

export function ContentLoader({ theme }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="py-8 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {steps[currentStep]}
          </span>
          <span className="text-gray-500 dark:text-gray-400">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          />
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: index <= currentStep ? 1 : 0.3,
              x: 0 
            }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-3"
          >
            {index < currentStep ? (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : index === currentStep ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            ) : (
              <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full flex-shrink-0" />
            )}
            <span className={`text-sm ${
              index <= currentStep 
                ? 'text-gray-900 dark:text-white font-medium' 
                : 'text-gray-400 dark:text-gray-600'
            }`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Typing Animation */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
        >
          <span>Writing</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ▊
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
