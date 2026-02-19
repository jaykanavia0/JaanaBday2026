import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import ScrollableScene from '../components/ScrollableScene';
import SceneGuidance from '../components/SceneGuidance';

interface Scene3PhotoGalleryProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene3_PhotoGallery: React.FC<Scene3PhotoGalleryProps> = ({
  onNext,
  isActive
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  const content = storyContent.scenes.photoGallery;

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setShowContent(true), 600);
    }
  }, [isActive]);

  const nextPhoto = () => {
    if (currentPhotoIndex < content.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  const currentPhoto = content.photos[currentPhotoIndex];

  return (
    <ScrollableScene showScrollIndicator={viewMode === 'grid'}>
      <div className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />

        {/* Guidance */}
        {isActive && viewMode === 'grid' && (
          <SceneGuidance
            message="Tap photos to view in slideshow"
            icon="📸"
            position="top"
          />
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
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

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-6 sm:mb-8 space-x-2 sm:space-x-4"
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 sm:px-6 py-2 rounded-full font-serif text-sm sm:text-base transition-all duration-300 touch-manipulation ${viewMode === 'grid'
                ? 'bg-romantic-pink text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('slideshow')}
              className={`px-4 sm:px-6 py-2 rounded-full font-serif text-sm sm:text-base transition-all duration-300 touch-manipulation ${viewMode === 'slideshow'
                ? 'bg-romantic-pink text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
            >
              Slideshow
            </button>
          </motion.div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {content.photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setCurrentPhotoIndex(index);
                    setViewMode('slideshow');
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl border-4 border-white/20 group-hover:border-romantic-pink/50 transition-all duration-300">
                    {/* Photo Display - Portrait orientation */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 relative">
                      <img
                        src={photo.imagePlaceholder}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-3xl">📸</span>
                          </div>
                          <p className="text-white/70 text-sm font-serif">{photo.caption}</p>
                        </div>
                      </div>
                    </div>

                    {/* Always visible caption - Mobile friendly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-4 sm:p-6">
                      <div className="w-full">
                        <p className="text-white font-serif text-sm sm:text-base mb-1 sm:mb-2">{photo.caption}</p>
                        {photo.date && (
                          <p className="text-white/70 text-xs sm:text-sm">📅 {photo.date}</p>
                        )}
                        {photo.location && (
                          <p className="text-white/70 text-xs sm:text-sm">📍 {photo.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Slideshow View */}
          {viewMode === 'slideshow' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-12"
            >
              <div className="relative text-center">
                {/* Main Photo */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border-4 border-white/30 inline-block"
                  >
                    <div className="relative bg-gradient-to-br from-romantic-pink/20 to-purple-600/20">
                      <img
                        src={currentPhoto.imagePlaceholder}
                        alt={currentPhoto.caption}
                        className="block max-h-[65vh] w-auto mx-auto"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-4xl">📸</span>
                          </div>
                          <p className="text-white/80 text-base font-serif">{currentPhoto.caption}</p>
                        </div>
                      </div>
                    </div>

                    {/* Photo Info Overlay - Always visible */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 sm:p-8">
                      <p className="text-white font-serif text-base sm:text-xl mb-1 sm:mb-2">{currentPhoto.caption}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-white/70 text-xs sm:text-sm space-y-1 sm:space-y-0">
                        {currentPhoto.date && <span>📅 {currentPhoto.date}</span>}
                        {currentPhoto.location && <span>📍 {currentPhoto.location}</span>}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Mobile friendly */}
                <button
                  onClick={prevPhoto}
                  disabled={currentPhotoIndex === 0}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
                >
                  ←
                </button>
                <button
                  onClick={nextPhoto}
                  disabled={currentPhotoIndex === content.photos.length - 1}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation"
                >
                  →
                </button>

                {/* Photo Counter */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm">
                  {currentPhotoIndex + 1} / {content.photos.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-2 mt-4 sm:mt-6 overflow-x-auto pb-2">
                {content.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${index === currentPhotoIndex
                      ? 'bg-romantic-pink w-6 sm:w-8'
                      : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center pb-4 sm:pb-0"
          >
            <button
              onClick={onNext}
              className="px-6 sm:px-8 py-3 text-base sm:text-lg font-serif text-white bg-gradient-to-r from-romantic-pink to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-romantic-pink/30 touch-manipulation"
            >
              Continue Our Story →
            </button>
          </motion.div>
        </div>
      </div>
    </ScrollableScene>
  );
};

export default Scene3_PhotoGallery;