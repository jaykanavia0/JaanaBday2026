import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';

interface Scene6FutureVisionProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene6_FutureVision: React.FC<Scene6FutureVisionProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const content = storyContent.scenes.futureVision;
  const words = content.text.split(' ');

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowText(true), 1000);
    }
  }, [isActive]);

  useEffect(() => {
    if (showText && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 400);

      return () => clearTimeout(timer);
    } else if (currentWordIndex >= words.length) {
      setTimeout(() => setShowButton(true), 2000);
    }
  }, [showText, currentWordIndex, words.length]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient shift */}
      <motion.div
        initial={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #7c2d12 50%, #0a0a0a 100%)' }}
        animate={{ 
          background: showText 
            ? 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #1f2937 100%)'
            : 'linear-gradient(135deg, #1e1b4b 0%, #7c2d12 50%, #0a0a0a 100%)'
        }}
        transition={{ duration: 3 }}
        className="absolute inset-0"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main text with word-by-word fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-white leading-tight">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index < currentWordIndex ? 1 : 0,
                  y: index < currentWordIndex ? 0 : 20,
                  scale: index < currentWordIndex ? 1 : 0.9
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: index * 0.1
                }}
                className="inline-block mr-3 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Emotional pause indicator */}
        {currentWordIndex >= words.length && !showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-white rounded-full mx-auto"
            />
          </motion.div>
        )}

        {/* Next button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <button
              onClick={onNext}
              className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300/30"
            >
              Continue to Celebration →
            </button>
          </motion.div>
        )}
      </div>

      {/* Subtle ambient effects */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"
      />
    </div>
  );
};

export default Scene6_FutureVision;