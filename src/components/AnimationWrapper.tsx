import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { AnimationConfig } from '../types';

interface AnimationWrapperProps {
  children: React.ReactNode;
  animation: AnimationConfig['type'];
  duration?: number;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
  trigger?: boolean;
}

interface TypeWriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

// Animation variants for different types
const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  slideUp: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "backOut",
        scale: { type: "spring", stiffness: 300, damping: 30 }
      }
    }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
};

// TypeWriter component for character-by-character text reveal
export const TypeWriter: React.FC<TypeWriterProps> = ({ 
  text, 
  speed = 50, 
  onComplete, 
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      )}
    </span>
  );
};

// Main AnimationWrapper component
const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animation,
  duration = 0.5,
  delay = 0,
  className = "",
  onAnimationComplete,
  trigger = true
}) => {
  // Custom duration override for variants
  const customVariants = React.useMemo(() => {
    const variants = { ...animationVariants[animation] };
    if (variants.visible && typeof variants.visible === 'object') {
      variants.visible = {
        ...variants.visible,
        transition: {
          ...variants.visible.transition,
          duration,
          delay
        }
      };
    }
    return variants;
  }, [animation, duration, delay]);

  // Performance optimization for mobile devices
  const reducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className={className}
          variants={customVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Stagger container for animating multiple children
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = "", staggerDelay = 0.2 }) => {
  const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Floating animation for particles
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}> = ({ children, className = "", duration = 3, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation for buttons
export const PulseWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 1.05 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: intensity,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;