import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import ScrollableScene from '../components/ScrollableScene';

interface Scene8DreamsTogetherProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene8_DreamsTogether: React.FC<Scene8DreamsTogetherProps> = ({
  onNext,
  isActive
}) => {
  const [showContent, setShowContent] = useState(false);
  const [revealedDreams, setRevealedDreams] = useState<Set<number>>(new Set());

  const content = storyContent.scenes.dreamsTogether;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowContent(true), 600);
    }
  }, [isActive]);

  const handleDreamClick = (index: number) => {
    setRevealedDreams(prev => new Set([...Array.from(prev), index]));
  };

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900" />

        {/* Animated stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 5,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-elegant text-white mb-2 sm:mb-4">
              {content.title}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {content.dreams.map((dream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => handleDreamClick(index)}
                className="cursor-pointer group touch-manipulation"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-2 border-white/20 p-4 sm:p-6 lg:p-8 hover:border-romantic-pink/50 transition-all duration-300 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: revealedDreams.has(index) ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4"
                  >
                    {dream.icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-elegant text-white mb-2 sm:mb-3">{dream.title}</h3>
                  <motion.p
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: revealedDreams.has(index) ? 1 : 0.7
                    }}
                    className="text-white/80 font-serif leading-relaxed text-sm sm:text-base"
                  >
                    {dream.description}
                  </motion.p>

                  {revealedDreams.has(index) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-romantic-pink rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-base sm:text-xl">✓</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {revealedDreams.size === content.dreams.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center pb-4 sm:pb-0"
            >
              <button
                onClick={onNext}
                className="px-6 sm:px-8 py-3 text-base sm:text-lg font-serif text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 touch-manipulation"
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

export default Scene8_DreamsTogether;