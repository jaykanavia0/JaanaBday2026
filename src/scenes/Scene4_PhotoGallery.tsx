import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';

interface Scene4PhotoGalleryProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene4_PhotoGallery: React.FC<Scene4PhotoGalleryProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [viewedPhotos, setViewedPhotos] = useState<Set<number>>(new Set());

  const content = storyContent.scenes.photoGallery;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowTitle(true), 600);
      setTimeout(() => setShowPhotos(true), 1200);
    }
  }, [isActive]);

  useEffect(() => {
    if (viewedPhotos.size === content.photos.length) {
      setTimeout(() => setShowButton(true), 1000);
    }
  }, [viewedPhotos.size, content.photos.length]);

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setViewedPhotos(prev => new Set([...prev, index]));
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % content.photos.length;
    setCurrentPhotoIndex(nextIndex);
    setViewedPhotos(prev => new Set([...prev, nextIndex]));
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? content.photos.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setViewedPhotos(prev => new Set([...prev, prevIndex]));
  };

  const currentPhoto = content.photos[currentPhotoIndex];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black" />

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className="absolute text-romantic-pink/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
              fontSize: `${Math.random() * 10 + 15}px`
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-elegant text-white mb-4">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif">
                {content.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Photo Display */}
        <AnimatePresence>
          {showPhotos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative max-w-2xl mx-auto">
                {/* Main photo container */}
                <motion.div
                  key={currentPhotoIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-4xl">📸</span>
                        </div>
                        <h3 className="text-white text-lg font-serif mb-2">
                          {currentPhoto.imagePlaceholder}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {currentPhoto.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Photo metadata */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-romantic-pink font-serif text-lg mb-2">
                      {currentPhoto.caption}
                    </p>
                    <div className="flex justify-center space-x-6 text-white/60 text-sm">
                      <span>📅 {currentPhoto.date}</span>
                      <span>📍 {currentPhoto.location}</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Navigation arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo thumbnails */}
        <AnimatePresence>
          {showPhotos && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-4">
                {content.photos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    onClick={() => handlePhotoClick(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                      ${currentPhotoIndex === index 
                        ? 'border-romantic-pink shadow-lg shadow-romantic-pink/30' 
                        : 'border-white/20 hover:border-white/40'
                      }
                    `}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-romantic-pink/30 to-purple-600/30 flex items-center justify-center">
                      <span className="text-xs">📷</span>
                    </div>
                    
                    {/* Viewed indicator */}
                    {viewedPhotos.has(index) && (
                      <div className="absolute top-1 right-1 w-3 h-3 bg-romantic-pink rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm">
                  {viewedPhotos.size} of {content.photos.length} memories explored
                </p>
              </div>
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
              className="text-center"
            >
              <button
                onClick={onNext}
                className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30"
              >
                Continue Our Story →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene4_PhotoGallery;