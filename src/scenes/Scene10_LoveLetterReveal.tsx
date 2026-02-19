import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { TypeWriter } from '../components/AnimationWrapper';

interface Scene10LoveLetterRevealProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene10_LoveLetterReveal: React.FC<Scene10LoveLetterRevealProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const content = storyContent.scenes.loveLetterReveal;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowTitle(true), 600);
      setTimeout(() => setShowLetter(true), 1200);
    }
  }, [isActive]);

  const handleLineComplete = () => {
    if (currentLineIndex < content.letterContent.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 800);
    } else {
      setTimeout(() => setShowSignature(true), 1000);
      setTimeout(() => setShowButton(true), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900" />

      {/* Vintage paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/5 via-transparent to-amber-100/5" />

      {/* Floating love elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className="absolute text-red-300/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 20}px`
            }}
          >
            {['💕', '💖', '💝', '💗', '❤️'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.h1
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                    '0 0 30px rgba(255, 215, 0, 0.5)',
                    '0 0 20px rgba(255, 215, 0, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl sm:text-4xl lg:text-5xl font-elegant text-amber-100 mb-4"
              >
                {content.title}
              </motion.h1>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-5xl"
              >
                💌
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Love Letter */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="relative"
            >
              {/* Paper background */}
              <div className="relative bg-gradient-to-br from-amber-50/95 to-yellow-50/90 backdrop-blur-sm rounded-2xl border-4 border-amber-200/30 shadow-2xl p-8 sm:p-12 mx-auto max-w-3xl">
                {/* Paper texture lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="w-full h-px bg-blue-300 mb-6"
                      style={{ marginTop: `${i * 30 + 60}px` }}
                    />
                  ))}
                </div>

                {/* Letter content */}
                <div className="relative z-10">
                  {content.letterContent.map((line, index) => (
                    <AnimatePresence key={index}>
                      {index <= currentLineIndex && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                          className={`mb-6 ${index === 0 ? 'text-xl font-serif text-amber-900' : 'text-lg text-amber-800 leading-relaxed'}`}
                        >
                          <TypeWriter
                            text={line}
                            speed={index === 0 ? 100 : 50}
                            onComplete={index === currentLineIndex ? handleLineComplete : undefined}
                            className="font-serif"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}

                  {/* Signature */}
                  <AnimatePresence>
                    {showSignature && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-12 text-right"
                      >
                        <motion.p
                          animate={{ 
                            color: ['#92400e', '#dc2626', '#92400e']
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-xl font-serif italic"
                        >
                          {content.signature}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-amber-400/30 text-2xl">✿</div>
                <div className="absolute top-4 right-4 text-amber-400/30 text-2xl">✿</div>
                <div className="absolute bottom-4 left-4 text-amber-400/30 text-2xl">✿</div>
                <div className="absolute bottom-4 right-4 text-amber-400/30 text-2xl">✿</div>

                {/* Wax seal effect */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-4 border-red-700 flex items-center justify-center shadow-lg"
                >
                  <span className="text-red-100 text-xl">💕</span>
                </motion.div>
              </div>

              {/* Magical sparkles around the letter */}
              {showSignature && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 15 }, (_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, Math.random() * 60 - 30],
                        y: [0, Math.random() * 60 - 30]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                      }}
                      className="absolute text-amber-300/80"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: '16px'
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
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
              className="text-center mt-12"
            >
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(245, 158, 11, 0.3)',
                    '0 0 40px rgba(245, 158, 11, 0.5)',
                    '0 0 20px rgba(245, 158, 11, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-8 py-3 text-lg font-serif text-amber-900 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full border-2 border-amber-300 hover:border-amber-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30 shadow-lg"
              >
                Continue to Birthday Wishes →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene10_LoveLetterReveal;