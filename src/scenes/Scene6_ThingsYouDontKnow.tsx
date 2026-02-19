import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { TypeWriter } from '../components/AnimationWrapper';
import ScrollableScene from '../components/ScrollableScene';

interface Scene5ThingsYouDontKnowProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene5_ThingsYouDontKnow: React.FC<Scene5ThingsYouDontKnowProps> = ({
  onNext,
  isActive
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [completedMessages, setCompletedMessages] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);

  const content = storyContent.scenes.thingsYouDontKnow;

  useEffect(() => {
    if (isActive && currentMessageIndex < content.messages.length) {
      // Show typing indicator
      setShowTyping(true);

      // After 2 seconds, show the message
      const timer = setTimeout(() => {
        setShowTyping(false);
        setCompletedMessages(prev => [...prev, content.messages[currentMessageIndex]]);

        // Move to next message after another 2 seconds
        setTimeout(() => {
          if (currentMessageIndex < content.messages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1);
          } else {
            // All messages complete, show button
            setTimeout(() => setShowButton(true), 1000);
          }
        }, 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActive, currentMessageIndex, content.messages.length]);

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-900 to-romantic-dark" />

        {/* Soft background blur effect */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-elegant text-white text-center mb-12"
          >
            Things You Don't Know About Yourself
          </motion.h1>

          {/* Chat messages container */}
          <div className="space-y-6 mb-8">
            <AnimatePresence>
              {completedMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                    delay: index * 0.1
                  }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 sm:p-6 border border-white/10">
                    <TypeWriter
                      text={message}
                      speed={30}
                      className="text-white/90 text-base sm:text-lg leading-relaxed font-serif"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 sm:p-6 border border-white/10">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-2 h-2 bg-white/60 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next button */}
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
                  Continue →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollableScene>
  );
};

export default Scene5_ThingsYouDontKnow;