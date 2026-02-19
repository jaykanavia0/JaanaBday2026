import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import ScrollableScene from '../components/ScrollableScene';
import SceneGuidance from '../components/SceneGuidance';

interface Scene11BirthdayWishesProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene11_BirthdayWishes: React.FC<Scene11BirthdayWishesProps> = ({
  onNext,
  isActive
}) => {
  const [showContent, setShowContent] = useState(false);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  const content = storyContent.scenes.birthdayWishes;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowContent(true), 600);

      // Auto-reveal wishes one by one
      content.wishes.forEach((_, index) => {
        setTimeout(() => {
          setRevealedWishes(prev => {
            if (prev.includes(index)) return prev;
            return [...prev, index];
          });
        }, 1000 + (index * 1500));
      });

      // Show button after all wishes + extra delay
      const totalTime = 1000 + (content.wishes.length * 1500) + 1000;
      setTimeout(() => setShowButton(true), totalTime);
    }
  }, [isActive, content.wishes]);

  return (
    <ScrollableScene>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900" />

        {/* Guidance */}
        {isActive && revealedWishes.length < content.wishes.length && (
          <SceneGuidance
            message="Wishes are revealing automatically"
            icon="🌟"
            position="top"
          />
        )}

        {/* Floating wishes/sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}%`,
                y: '110%',
                opacity: 0,
                scale: 0
              }}
              animate={{
                y: '-10%',
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute text-3xl"
            >
              ✨
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-elegant text-white mb-4">
              {content.title}
            </h1>
            <div className="flex justify-center space-x-3 text-4xl">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎂
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎉
              </motion.span>
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🎁
              </motion.span>
            </div>
          </motion.div>

          <div className="space-y-6 mb-12">
            {content.wishes.map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100, rotateY: -90 }}
                animate={{
                  opacity: revealedWishes.includes(index) ? 1 : 0,
                  x: revealedWishes.includes(index) ? 0 : -100,
                  rotateY: revealedWishes.includes(index) ? 0 : -90
                }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-2 border-white/20 p-6 sm:p-8 hover:border-romantic-pink/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      animate={{
                        scale: revealedWishes.includes(index) ? [1, 1.3, 1] : 1,
                        rotate: revealedWishes.includes(index) ? [0, 360] : 0
                      }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-4xl flex-shrink-0"
                    >
                      🌟
                    </motion.div>
                    <p className="text-lg sm:text-xl text-white font-serif leading-relaxed flex-1">
                      {wish}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <p className="text-3xl sm:text-4xl font-elegant text-white mb-4">
                  Make a wish! 🎂
                </p>
                <p className="text-xl text-white/80 font-serif">
                  And may all your dreams come true...
                </p>
              </motion.div>

              <button
                onClick={onNext}
                className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30 touch-manipulation"
              >
                Continue to Celebration →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </ScrollableScene>
  );
};

export default Scene11_BirthdayWishes;