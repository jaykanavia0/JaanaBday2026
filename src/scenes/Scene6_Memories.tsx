import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';

interface Scene6MemoriesProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene6_Memories: React.FC<Scene6MemoriesProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const content = storyContent.scenes.memories;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowTitle(true), 600);
      setTimeout(() => setShowMemories(true), 1200);
    }
  }, [isActive]);

  // Auto-advance through memories
  useEffect(() => {
    if (showMemories && autoPlay) {
      const timer = setInterval(() => {
        setCurrentMemoryIndex(prev => {
          const next = (prev + 1) % content.memoryItems.length;
          if (next === 0) {
            setAutoPlay(false);
            setTimeout(() => setShowButton(true), 1000);
          }
          return next;
        });
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [showMemories, autoPlay, content.memoryItems.length]);

  const handleMemoryClick = (index: number) => {
    setCurrentMemoryIndex(index);
    setAutoPlay(false);
    if (!showButton) {
      setTimeout(() => setShowButton(true), 1000);
    }
  };

  const currentMemory = content.memoryItems[currentMemoryIndex];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900" />

      {/* Floating memory particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 12}px`
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-elegant text-white mb-4">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif">
                {content.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Memory Display */}
        <AnimatePresence>
          {showMemories && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                key={currentMemoryIndex}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 sm:p-12 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Memory Image */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square bg-gradient-to-br from-romantic-pink/30 to-purple-600/30 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl"
                      >
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                              <span className="text-3xl">{currentMemory.emotion}</span>
                            </div>
                            <p className="text-white/80 text-sm font-serif">
                              {currentMemory.imagePlaceholder}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Floating emotion */}
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 text-4xl"
                      >
                        {currentMemory.emotion}
                      </motion.div>
                    </div>

                    {/* Memory Content */}
                    <div className="text-center md:text-left">
                      <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-elegant text-romantic-pink mb-4"
                      >
                        {currentMemory.title}
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90 text-lg leading-relaxed font-serif"
                      >
                        {currentMemory.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memory Navigation */}
        <AnimatePresence>
          {showMemories && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex justify-center space-x-4">
                {content.memoryItems.map((memory, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleMemoryClick(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                      ${currentMemoryIndex === index 
                        ? 'border-romantic-pink bg-romantic-pink/20 shadow-lg shadow-romantic-pink/30' 
                        : 'border-white/30 hover:border-white/50 bg-white/5'
                      }
                    `}
                  >
                    <span className="text-xl">{memory.emotion}</span>
                    
                    {/* Progress ring for current memory */}
                    {currentMemoryIndex === index && autoPlay && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-romantic-pink"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, ease: "linear" }}
                        style={{
                          background: `conic-gradient(from 0deg, transparent 0deg, #ff6b9d 360deg)`
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Auto-play indicator */}
              {autoPlay && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4 text-white/60 text-sm"
                >
                  Reliving our memories... Click any memory to pause
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <button
                onClick={onNext}
                className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300/30"
              >
                Continue Our Journey →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene6_Memories;