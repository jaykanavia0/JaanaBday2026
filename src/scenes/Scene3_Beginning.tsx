import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { storyContent } from '../content/storyContent';
import AnimationWrapper from '../components/AnimationWrapper';

interface Scene3BeginningProps extends SceneProps {
  userChoices?: any;
  storeUserChoice?: (key: string, value: any) => void;
}

const Scene3_Beginning: React.FC<Scene3BeginningProps> = ({ 
  onNext, 
  isActive 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const content = storyContent.scenes.beginning;

  useEffect(() => {
    if (isActive) {
      // Simulate image loading
      const timer = setTimeout(() => {
        setImageLoaded(true);
        setTimeout(() => setShowCaption(true), 800);
        setTimeout(() => setShowButton(true), 1600);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Image container with elegant border */}
        <AnimationWrapper animation="scaleIn" trigger={imageLoaded}>
          <div className="relative mb-8 mx-auto max-w-md sm:max-w-lg lg:max-w-xl">
            <div className="relative overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-romantic-pink/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <p className="text-white/70 text-sm font-serif">{content.imagePlaceholder}</p>
                </div>
              </div>
              
              {/* Vignette effect around image */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
            </div>
          </div>
        </AnimationWrapper>

        {/* Caption */}
        <AnimationWrapper animation="fadeIn" trigger={showCaption}>
          <div className="mb-8">
            <p className="text-lg sm:text-xl lg:text-2xl font-serif text-white/90 leading-relaxed max-w-2xl mx-auto">
              {content.caption}
            </p>
          </div>
        </AnimationWrapper>

        {/* Next button */}
        <AnimationWrapper animation="slideUp" trigger={showButton}>
          <button
            onClick={onNext}
            className="px-8 py-3 text-lg font-serif text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300/30"
          >
            Continue Our Story →
          </button>
        </AnimationWrapper>
      </div>
    </div>
  );
};

export default Scene3_Beginning;