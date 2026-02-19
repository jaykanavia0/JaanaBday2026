import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import { TypeWriter } from '../components/AnimationWrapper';
import ScrollableScene from '../components/ScrollableScene';

interface Scene10LoveLetterProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene10_LoveLetter: React.FC<Scene10LoveLetterProps> = ({
  onNext,
  isActive
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const content = storyContent.scenes.loveLetterReveal;

  useEffect(() => {
    if (isActive && currentLineIndex < content.letterContent.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (currentLineIndex >= content.letterContent.length) {
      setTimeout(() => setShowSignature(true), 1000);
      setTimeout(() => setShowButton(true), 2500);
    }
  }, [isActive, currentLineIndex, content.letterContent.length]);

  return (
    <ScrollableScene showScrollIndicator={false}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900" />

        {/* Vintage paper texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1IiAvPjwvc3ZnPg==')] opacity-30" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg shadow-2xl p-5 sm:p-8 md:p-12 border-4 border-amber-200"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            {/* Letter Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 pb-6 border-b-2 border-amber-300"
            >
              <h1 className="text-3xl sm:text-4xl font-elegant text-amber-900 mb-2">
                {content.title}
              </h1>
              <div className="flex justify-center space-x-2">
                <span className="text-2xl">💌</span>
                <span className="text-2xl">💕</span>
                <span className="text-2xl">💌</span>
              </div>
            </motion.div>

            {/* Letter Content */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 min-h-[200px] sm:min-h-[400px]">
              {content.letterContent.slice(0, currentLineIndex + 1).map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`font-serif leading-relaxed ${index === 0
                    ? 'text-xl text-amber-900 font-semibold'
                    : 'text-lg text-amber-800'
                    }`}
                >
                  <TypeWriter
                    text={line}
                    speed={30}
                    className="inline-block"
                  />
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            {showSignature && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-right mt-12 pt-6 border-t-2 border-amber-300"
              >
                <p className="text-2xl font-elegant text-amber-900 italic">
                  {content.signature}
                </p>
              </motion.div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400 opacity-50" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400 opacity-50" />
          </motion.div>

          {/* Continue Button */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-8"
            >
              <button
                onClick={onNext}
                className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300"
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

export default Scene10_LoveLetter;