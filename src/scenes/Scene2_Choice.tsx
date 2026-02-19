import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { TypeWriter, PulseWrapper } from '../components/AnimationWrapper';
import SceneGuidance from '../components/SceneGuidance';
import ScrollableScene from '../components/ScrollableScene';

interface Scene2ChoiceProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene2_Choice: React.FC<Scene2ChoiceProps> = ({
  onNext,
  isActive,
  storeUserChoice
}) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const content = storyContent.scenes.choice;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation sequence
  useEffect(() => {
    if (isActive) {
      // Show question after a brief delay
      const questionTimer = setTimeout(() => {
        setShowQuestion(true);
      }, 600);

      return () => clearTimeout(questionTimer);
    }
  }, [isActive]);

  // Handle question completion
  const handleQuestionComplete = () => {
    // Show buttons after question completes
    setTimeout(() => {
      setShowButtons(true);
    }, 800);
  };

  // Handle choice selection
  const handleChoice = (choice: string, index: number) => {
    setSelectedChoice(choice);

    // Store user choice for personalization
    storeUserChoice?.('scene2Choice', choice);
    storeUserChoice?.('scene2ChoiceIndex', index);

    // Proceed to next scene after a brief delay
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        {/* Continuation of dark aesthetic with subtle gradient shift */}
        <div className="absolute inset-0 bg-gradient-to-br from-romantic-purple via-purple-900 to-black" />

        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs for ambiance */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-romantic-pink/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"
          />
        </div>

        {/* Main content container */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Question with typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showQuestion ? 1 : 0,
              y: showQuestion ? 0 : 30
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 sm:mb-16"
          >
            {showQuestion && (
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-white leading-tight">
                <TypeWriter
                  text={content.question}
                  speed={isMobile ? 100 : 70}
                  onComplete={handleQuestionComplete}
                  className="inline-block"
                />
              </h1>
            )}
          </motion.div>

          {/* Choice buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButtons ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12"
          >
            {showButtons && content.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + (index * 0.2),
                  ease: "backOut"
                }}
              >
                <PulseWrapper intensity={index === 0 ? 1.05 : 1.08}>
                  <button
                    onClick={() => handleChoice(option, index)}
                    disabled={selectedChoice !== null}
                    className={`
                    group relative px-8 sm:px-12 py-4 sm:py-6 
                    text-lg sm:text-xl md:text-2xl font-serif text-white 
                    rounded-2xl border-2 transition-all duration-500 
                    focus:outline-none focus:ring-4 focus:ring-opacity-50 
                    touch-manipulation overflow-hidden
                    ${selectedChoice === option
                        ? 'bg-gradient-to-r from-romantic-pink to-purple-600 border-white/60 scale-105'
                        : selectedChoice !== null
                          ? 'bg-gray-600/30 border-gray-500/30 opacity-50'
                          : index === 0
                            ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-purple-300/30 hover:border-purple-300/60 focus:ring-purple-300'
                            : 'bg-gradient-to-r from-romantic-pink/40 to-purple-600/40 border-romantic-pink/30 hover:border-romantic-pink/60 focus:ring-romantic-pink'
                      }
                  `}
                    style={{
                      minHeight: '60px',
                      minWidth: isMobile ? '280px' : '320px',
                      boxShadow: selectedChoice === option
                        ? '0 0 40px rgba(255, 107, 157, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : selectedChoice === null
                          ? `0 0 20px ${index === 0 ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 107, 157, 0.2)'}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                          : 'none'
                    }}
                  >
                    {/* Spotlight effect */}
                    <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${index === 0
                        ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20'
                        : 'bg-gradient-to-r from-romantic-pink/20 to-purple-500/20'
                      }
                  `} />

                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="whitespace-nowrap">{option}</span>

                      {/* Different animations for each button */}
                      {index === 0 ? (
                        // Gentle pulse for "Yes"
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-2xl"
                        >
                          💫
                        </motion.span>
                      ) : (
                        // Rotation and scale for "Definitely Yes"
                        <motion.span
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-2xl"
                        >
                          ✨
                        </motion.span>
                      )}
                    </span>

                    {/* Selection confirmation effect */}
                    {selectedChoice === option && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-romantic-pink/30 to-purple-600/30 rounded-2xl"
                      />
                    )}

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </button>
                </PulseWrapper>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle hint text */}
          {showButtons && !selectedChoice && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 sm:mt-12 text-sm sm:text-base text-white/60 font-light"
            >
              {isMobile ? 'Tap your choice' : 'Choose your response'}
            </motion.p>
          )}

          {/* Selection feedback */}
          {selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 sm:mt-12"
            >
              <p className="text-lg sm:text-xl text-romantic-pink font-serif">
                Perfect choice... ✨
              </p>
            </motion.div>
          )}
        </div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>
    </ScrollableScene>
  );
};

export default Scene2_Choice;