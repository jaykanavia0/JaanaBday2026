import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneGuidanceProps {
  message: string;
  icon?: string;
  autoHide?: boolean;
  hideDelay?: number;
  position?: 'top' | 'bottom' | 'center';
}

const SceneGuidance: React.FC<SceneGuidanceProps> = ({ 
  message, 
  icon = '👆',
  autoHide = true,
  hideDelay = 5000,
  position = 'bottom'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay]);

  const positionClasses = {
    top: 'top-20 sm:top-24',
    bottom: 'bottom-6 sm:bottom-8',
    center: 'top-1/2 -translate-y-1/2'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          transition={{ duration: 0.5 }}
          className={`fixed left-1/2 -translate-x-1/2 ${positionClasses[position]} z-40 pointer-events-none`}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-black/70 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20 shadow-lg"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-lg sm:text-xl"
              >
                {icon}
              </motion.span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {message}
              </span>
            </div>
          </motion.div>

          {/* Dismiss hint */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xs pointer-events-auto transition-colors"
          >
            ✕
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneGuidance;
