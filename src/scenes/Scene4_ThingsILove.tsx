import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { StaggerContainer } from '../components/AnimationWrapper';
import ScrollableScene from '../components/ScrollableScene';

interface Scene4ThingsILoveProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene4_ThingsILove: React.FC<Scene4ThingsILoveProps> = ({
  onNext,
  isActive
}) => {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [showCards, setShowCards] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = storyContent.scenes.thingsILove;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowCards(true), 600);
    }
  }, [isActive]);

  useEffect(() => {
    if (revealedCards.size === content.cards.length) {
      setTimeout(() => setShowButton(true), 1000);
    }
  }, [revealedCards.size, content.cards.length]);

  const handleCardReveal = (index: number) => {
    setRevealedCards(prev => new Set([...prev, index]));
  };

  const cardColors = [
    'from-romantic-pink/40 to-purple-600/40 border-romantic-pink/30',
    'from-purple-600/40 to-indigo-600/40 border-purple-300/30',
    'from-indigo-600/40 to-blue-600/40 border-indigo-300/30',
    'from-blue-600/40 to-romantic-pink/40 border-blue-300/30'
  ];

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-romantic-dark" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-elegant text-white mb-12"
          >
            Things I Love About You
          </motion.h1>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCards ? 1 : 0 }}
            className="mb-8"
          >
            <div className="flex justify-center space-x-2">
              {content.cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${revealedCards.has(index) ? 'bg-romantic-pink' : 'bg-white/20'
                    }`}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm mt-2">
              {revealedCards.size} of {content.cards.length} revealed
            </p>
          </motion.div>

          {/* Cards grid */}
          <StaggerContainer
            className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6 sm:gap-8'} max-w-4xl mx-auto mb-8 sm:mb-12`}
            staggerDelay={0.2}
          >
            {showCards && content.cards.map((card, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleCardReveal(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                relative p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all duration-500
                bg-gradient-to-br ${cardColors[index % cardColors.length]}
                ${revealedCards.has(index) ? 'border-white/40' : 'border-white/20 hover:border-white/30'}
                min-h-[180px] sm:min-h-[200px] flex flex-col justify-center touch-manipulation
              `}>
                  {/* Card front */}
                  <AnimatePresence mode="wait">
                    {!revealedCards.has(index) ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-white mb-3 sm:mb-4">
                          {card.title}
                        </h3>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                          <span className="text-xl sm:text-2xl">💝</span>
                        </div>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {isMobile ? 'Tap to reveal' : 'Click to reveal'}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif text-romantic-pink mb-3 sm:mb-4">
                          {card.title}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                          {card.hiddenMessage}
                        </p>
                        <div className="mt-3 sm:mt-4">
                          <span className="text-lg sm:text-xl">✨</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Glow effect when revealed */}
                  {revealedCards.has(index) && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 blur-xl" />
                  )}
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Next button */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pb-4 sm:pb-0"
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

export default Scene4_ThingsILove;