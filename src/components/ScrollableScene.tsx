import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollableSceneProps {
  children: ReactNode;
  className?: string;
  showScrollIndicator?: boolean;
}

const ScrollableScene: React.FC<ScrollableSceneProps> = ({
  children,
  className = '',
  showScrollIndicator = true
}) => {
  const [showIndicator, setShowIndicator] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 50) {
        setShowIndicator(false);
      }
    };

    const container = document.getElementById('scrollable-scene-container');
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id="scrollable-scene-container"
      className={`relative w-full h-screen overflow-y-auto overflow-x-hidden ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      {children}

      {/* Scroll indicator */}
      {showScrollIndicator && showIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="text-white/60 text-xs sm:text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              Scroll for more
            </div>
            <div className="text-white/60 text-2xl">
              ↓
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollableScene;
