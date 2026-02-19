import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { TypeWriter, FloatingElement, PulseWrapper } from '../components/AnimationWrapper';
import ScrollableScene from '../components/ScrollableScene';

interface Scene1IntroProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene1_Intro: React.FC<Scene1IntroProps> = ({
  onNext,
  isActive
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = storyContent.scenes.intro;

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
      // Start title animation after a brief delay
      const titleTimer = setTimeout(() => {
        setShowTitle(true);
      }, 800);

      return () => clearTimeout(titleTimer);
    }
  }, [isActive]);

  // Handle title completion
  const handleTitleComplete = () => {
    // Show subtitle after title completes
    setTimeout(() => {
      setShowSubtitle(true);
    }, 500);
  };

  // Handle subtitle completion
  const handleSubtitleComplete = () => {
    // Show button after subtitle completes
    setTimeout(() => {
      setShowButton(true);
    }, 800);
  };

  // Generate floating particles (fewer on mobile for performance)
  const particleCount = isMobile ? 10 : 20;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    return (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
        }}
      >
        <FloatingElement
          duration={isMobile ? 4 : 3 + Math.random() * 2}
          delay={Math.random() * 2}
        >
          <div
            className={`${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-white rounded-full opacity-30`}
            style={{
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.5)'
            }}
          />
        </FloatingElement>
      </div>
    );
  });

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        {/* Animated particle background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles}
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-romantic-purple/20 to-black/40" />

        {/* Main content container */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Title with typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showTitle ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            {showTitle && (
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-elegant text-white leading-tight">
                <TypeWriter
                  text={content.title}
                  speed={isMobile ? 100 : 80}
                  onComplete={handleTitleComplete}
                  className="inline-block"
                />
              </h1>
            )}
          </motion.div>

          {/* Subtitle with typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showSubtitle ? 1 : 0,
              y: showSubtitle ? 0 : 20
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            {showSubtitle && (
              <p className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif text-white/90 leading-relaxed px-2">
                <TypeWriter
                  text={content.subtitle}
                  speed={isMobile ? 80 : 60}
                  onComplete={handleSubtitleComplete}
                  className="inline-block"
                />
              </p>
            )}
          </motion.div>

          {/* Start button with glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: showButton ? 1 : 0,
              scale: showButton ? 1 : 0.8
            }}
            transition={{
              duration: 0.8,
              ease: "backOut",
              scale: { type: "spring", stiffness: 300, damping: 30 }
            }}
          >
            {showButton && (
              <PulseWrapper intensity={isMobile ? 1.05 : 1.08}>
                <button
                  onClick={onNext}
                  className="group relative px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30 touch-manipulation"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 107, 157, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    minHeight: '48px', // Ensure touch-friendly size
                    minWidth: '120px'
                  }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-romantic-pink to-purple-600 opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300 blur-xl" />

                  {/* Button text */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="whitespace-nowrap">{content.startButtonText}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-lg sm:text-xl"
                    >
                      →
                    </motion.span>
                  </span>

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </button>
              </PulseWrapper>
            )}
          </motion.div>

          {/* Subtle hint text */}
          {showButton && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/50 font-light"
            >
              {isMobile ? 'Tap to begin' : 'Click to begin your journey'}
            </motion.p>
          )}
        </div>

        {/* Ambient light effects - reduced on mobile */}
        <div className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-64 h-64' : 'w-96 h-96'} bg-romantic-pink/10 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 right-1/4 ${isMobile ? 'w-48 h-48' : 'w-80 h-80'} bg-purple-500/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      </div>
    </ScrollableScene>
  );
};

export default Scene1_Intro;