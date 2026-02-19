import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';

interface Scene12BirthdayEndingProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const Scene12_BirthdayEnding: React.FC<Scene12BirthdayEndingProps> = ({
  onNext,
  isActive
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showMainText, setShowMainText] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const content = storyContent.scenes.birthdayEnding;

  useEffect(() => {
    if (isActive) {
      const hearts: FloatingHeart[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 10 + Math.random() * 5,
        size: 16 + Math.random() * 18
      }));

      setFloatingHearts(hearts);

      setTimeout(() => setShowMessage(true), 800);
      setTimeout(() => setShowMainText(true), 2200);
      setTimeout(() => setShowRestart(true), 4800);
    }
  }, [isActive]);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Rich multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#2d1147] to-[#0f0a1a]" />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-transparent to-purple-900/20" />

      {/* Subtle floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110%', opacity: 0 }}
            animate={{
              y: '-15%',
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
              filter: 'drop-shadow(0 0 8px rgba(255, 150, 200, 0.4))'
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Soft sparkle dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 6,
              repeat: Infinity,
              repeatDelay: Math.random() * 4
            }}
            className="absolute w-1 h-1 bg-pink-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px rgba(255, 200, 220, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Ambient orbs */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[15%] w-40 sm:w-56 h-40 sm:h-56 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[15%] right-[15%] w-36 sm:w-48 h-36 sm:h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* ─── Main content ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">

        {/* Birthday greeting */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center mb-6 sm:mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl mb-4"
              >
                🎂
              </motion.div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl text-white/90 tracking-wide leading-relaxed"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                }}
              >
                {content.message}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glassmorphism card with the main message */}
        <AnimatePresence>
          {showMainText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="w-full mb-6 sm:mb-8"
            >
              <div
                className="relative bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-white/[0.12] p-8 sm:p-10 md:p-12 text-center overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 rounded-3xl" />

                <div className="relative z-10">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl sm:text-2xl md:text-3xl text-pink-200/90 mb-4 sm:mb-5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontStyle: 'italic',
                      letterSpacing: '0.03em',
                    }}
                  >
                    I love you so much
                  </motion.h2>

                  {/* Thin separator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="w-24 sm:w-32 h-[1px] mx-auto mb-4 sm:mb-5 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"
                  />

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 120
                    }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-5 sm:mb-6"
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontWeight: 400,
                      textShadow: '0 0 30px rgba(255, 182, 193, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    Jaana!
                  </motion.h1>

                  {/* Elegant emoji row */}
                  <div className="flex justify-center items-center space-x-4 sm:space-x-6 text-xl sm:text-2xl">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✦
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-pink-300"
                    >
                      ♥
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      ✦
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="text-pink-300"
                    >
                      ♥
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      ✦
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Restart button — elegant and contained */}
        <AnimatePresence>
          {showRestart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-auto"
            >
              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base text-white/90 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/[0.15] hover:bg-white/[0.14] hover:border-white/[0.25] transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-pink-400/30 touch-manipulation"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>↻</span>
                  <span>Relive Our Story</span>
                </span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/40 text-xs mt-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  letterSpacing: '0.04em'
                }}
              >
                Experience this magical journey again
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene12_BirthdayEnding;