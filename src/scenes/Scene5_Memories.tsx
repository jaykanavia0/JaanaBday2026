import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import ScrollableScene from '../components/ScrollableScene';
import SceneGuidance from '../components/SceneGuidance';

interface Scene5MemoriesProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene5_Memories: React.FC<Scene5MemoriesProps> = ({
  onNext,
  isActive
}) => {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const content = storyContent.scenes.memories;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowContent(true), 600);
    }
  }, [isActive]);

  // Auto-advance memories
  useEffect(() => {
    if (autoPlay && currentMemoryIndex < content.memoryItems.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMemoryIndex(prev => prev + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentMemoryIndex, autoPlay, content.memoryItems.length]);

  const currentMemory = content.memoryItems[currentMemoryIndex];

  return (
    <ScrollableScene>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900" />

        {/* Guidance */}
        {isActive && (
          <SceneGuidance
            message="Use arrows to navigate memories"
            icon="💕"
            position="top"
          />
        )}

        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}%`,
                y: '110%',
                opacity: 0
              }}
              animate={{
                y: '-10%',
                opacity: [0, 0.6, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-elegant text-white mb-2 sm:mb-4">
              {content.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-serif">
              {content.subtitle}
            </p>
          </motion.div>

          {/* Memory Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemoryIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-12"
            >
              <div className="relative">
                {/* Memory Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-white/20 overflow-hidden shadow-2xl">
                  {/* Photo Section — natural size with max height */}
                  <div className="relative bg-gradient-to-br from-romantic-pink/30 to-purple-600/30">
                    <img
                      src={currentMemory.imagePlaceholder}
                      alt={currentMemory.title}
                      className="block w-full max-h-[55vh] object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 sm:mb-6 bg-white/10 rounded-full flex items-center justify-center"
                        >
                          <span className="text-4xl sm:text-5xl">{currentMemory.emotion}</span>
                        </motion.div>
                        <p className="text-white/80 text-base sm:text-lg font-serif">{currentMemory.title}</p>
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-10 sm:w-14 h-10 sm:h-14 border-t-4 border-l-4 border-romantic-pink/50 rounded-tl-2xl" />
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-10 sm:w-14 h-10 sm:h-14 border-b-4 border-r-4 border-romantic-pink/50 rounded-br-2xl" />
                  </div>

                  {/* Content Section - Always visible */}
                  <div className="p-4 sm:p-8 lg:p-12">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl sm:text-2xl lg:text-3xl font-elegant text-white mb-2 sm:mb-4"
                    >
                      {currentMemory.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-base sm:text-lg text-white/90 font-serif leading-relaxed"
                    >
                      {currentMemory.description}
                    </motion.p>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 rounded-2xl sm:rounded-3xl blur-2xl -z-10" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            <button
              onClick={() => setCurrentMemoryIndex(Math.max(0, currentMemoryIndex - 1))}
              disabled={currentMemoryIndex === 0}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-lg sm:text-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
            >
              ←
            </button>

            {/* Progress Dots */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {content.memoryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMemoryIndex(index)}
                  className={`flex-shrink-0 transition-all duration-300 touch-manipulation ${index === currentMemoryIndex
                      ? 'w-6 sm:w-8 h-2 sm:h-3 bg-romantic-pink rounded-full'
                      : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/30 hover:bg-white/50 rounded-full'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentMemoryIndex(Math.min(content.memoryItems.length - 1, currentMemoryIndex + 1))}
              disabled={currentMemoryIndex === content.memoryItems.length - 1}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-lg sm:text-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
            >
              →
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs sm:text-sm font-serif transition-all duration-300 touch-manipulation"
            >
              {autoPlay ? '⏸ Pause' : '▶ Play'} Auto-advance
            </button>
          </div>

          {/* Continue Button */}
          {currentMemoryIndex === content.memoryItems.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center pb-4 sm:pb-0"
            >
              <button
                onClick={onNext}
                className="px-6 sm:px-8 py-3 text-base sm:text-lg font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30 touch-manipulation"
              >
                Continue →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </ScrollableScene>
  );
};

export default Scene5_Memories;