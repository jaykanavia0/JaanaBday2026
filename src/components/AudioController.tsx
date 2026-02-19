import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControllerProps {
  className?: string;
  autoPlay?: boolean;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const AudioController: React.FC<AudioControllerProps> = ({
  className = "",
  autoPlay = false,
  volume = 0.3,
  onVolumeChange,
  onPlayStateChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    // Initialize audio with your background music
    const audio = new Audio();
    
    // Set audio properties
    audio.loop = true;
    audio.volume = currentVolume;
    audio.preload = 'auto';
    
    // Set your background music file path
    // Place your music file in public/audio/background-music.mp3
    audio.src = '/audio/background-music.mp3';
    
    audioRef.current = audio;

    // Audio event listeners
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Cleanup
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.pause();
    };
  }, [currentVolume]);

  // Handle autoplay after user interaction
  useEffect(() => {
    if (autoPlay && !isPlaying && !hasError) {
      // Delay autoplay to ensure user has interacted with the page
      const timer = setTimeout(() => {
        handlePlay();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoPlay, isPlaying, hasError]);

  // Smooth fade in/out function
  const fadeAudio = useCallback((targetVolume: number, duration: number = 1000) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeChange = targetVolume - startVolume;
    const steps = 50;
    const stepTime = duration / steps;
    const stepVolume = volumeChange / steps;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = startVolume + (stepVolume * currentStep);
      
      if (currentStep >= steps) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        
        // If fading to 0, pause the audio
        if (targetVolume === 0) {
          audio.pause();
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }
      } else {
        audio.volume = Math.max(0, Math.min(1, newVolume));
      }
    }, stepTime);
  }, [onPlayStateChange]);

  // Play audio with fade in
  const handlePlay = useCallback(async () => {
    if (!audioRef.current || hasError) return;

    try {
      const audio = audioRef.current;
      
      // Start with volume 0 for smooth fade in
      audio.volume = 0;
      
      await audio.play();
      setIsPlaying(true);
      onPlayStateChange?.(true);
      
      // Fade in to current volume
      fadeAudio(currentVolume, 800);
    } catch (error) {
      console.warn('Audio autoplay prevented by browser:', error);
      setHasError(true);
    }
  }, [currentVolume, fadeAudio, hasError, onPlayStateChange]);

  // Pause audio with fade out
  const handlePause = useCallback(() => {
    if (!audioRef.current) return;

    // Fade out then pause
    fadeAudio(0, 600);
  }, [fadeAudio]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setCurrentVolume(clampedVolume);
    
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = clampedVolume;
    }
    
    onVolumeChange?.(clampedVolume);
  }, [isPlaying, onVolumeChange]);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (autoPlay && !isPlaying && !hasError) {
        handlePlay();
      }
    };

    // Listen for first user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [autoPlay, isPlaying, hasError, handlePlay]);

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Volume slider */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg px-3 py-2"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={currentVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main audio control button */}
        <motion.button
          onClick={togglePlayPause}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
          onTouchStart={() => setShowVolumeSlider(true)}
          className="bg-black bg-opacity-50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-romantic-pink focus:ring-opacity-50 touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
              </svg>
            </motion.div>
          ) : hasError ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M12,17A1,1 0 0,1 11,16V14A1,1 0 0,1 12,13A1,1 0 0,1 13,14V16A1,1 0 0,1 12,17Z" />
            </svg>
          ) : isPlaying ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Status indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-2 -right-2 w-3 h-3 bg-romantic-pink rounded-full"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full h-full bg-romantic-pink rounded-full opacity-75"
          />
        </motion.div>
      )}

      {/* Custom slider styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff6b9d;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff6b9d;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AudioController;