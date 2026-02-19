import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';

interface Scene7BirthdayEndingProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

const Scene7_BirthdayEnding: React.FC<Scene7BirthdayEndingProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const content = storyContent.scenes.birthdayEnding;

  // Generate confetti
  useEffect(() => {
    if (isActive) {
      const newConfetti: Confetti[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#ffd700', '#ff6b9d', '#9333ea', '#3b82f6'][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 3
      }));
      
      setConfetti(newConfetti);
      
      setTimeout(() => setShowMessage(true), 1000);
      setTimeout(() => setShowVideo(true), 2500);
      setTimeout(() => setShowRestart(true), 4000);
    }
  }, [isActive]);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-gold via-yellow-600 to-romantic-dark" />

      {/* Confetti animation */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: `${piece.x}%`, 
              y: '-10%',
              rotate: piece.rotation,
              opacity: 0
            }}
            animate={{ 
              y: '110%',
              rotate: piece.rotation + 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: piece.delay,
              ease: "easeIn"
            }}
            className="absolute"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Birthday message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "backOut",
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="mb-12"
            >
              <motion.h1
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                    '0 0 40px rgba(255, 215, 0, 0.8)',
                    '0 0 20px rgba(255, 215, 0, 0.5)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-elegant text-white mb-6"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}
              >
                {content.message}
              </motion.h1>
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl sm:text-7xl md:text-8xl"
              >
                🎂
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video placeholder */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="relative max-w-md mx-auto">
                <div className="aspect-video bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 rounded-2xl border-4 border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                    >
                      <span className="text-3xl">▶️</span>
                    </motion.div>
                    <p className="text-white/80 text-sm font-serif">
                      {content.videoPlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restart button */}
        <AnimatePresence>
          {showRestart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 107, 157, 0.3)',
                    '0 0 40px rgba(255, 107, 157, 0.5)',
                    '0 0 20px rgba(255, 107, 157, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30"
              >
                ↻ Experience Again
              </motion.button>
              
              <p className="text-white/60 text-sm">
                Relive this magical journey
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient celebration effects */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-romantic-gold/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-romantic-pink/20 rounded-full blur-3xl"
      />
    </div>
  );
};

export default Scene7_BirthdayEnding;