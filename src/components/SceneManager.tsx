import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneConfig, SceneProps } from '../types';

// Import all scene components
import Scene1_Intro from '../scenes/Scene1_Intro';
import Scene2_Choice from '../scenes/Scene2_Choice';
import Scene3_PhotoGallery from '../scenes/Scene3_PhotoGallery';
import Scene4_ThingsILove from '../scenes/Scene4_ThingsILove';
import Scene5_Memories from '../scenes/Scene5_Memories';
import Scene6_ThingsYouDontKnow from '../scenes/Scene6_ThingsYouDontKnow';
import Scene8_DreamsTogether from '../scenes/Scene8_DreamsTogether';
import Scene9_FutureVision from '../scenes/Scene9_FutureVision';
import Scene10_LoveLetter from '../scenes/Scene10_LoveLetter';
import Scene11_BirthdayWishes from '../scenes/Scene11_BirthdayWishes';
import Scene12_BirthdayEnding from '../scenes/Scene12_BirthdayEnding';

interface SceneManagerProps {
  initialScene?: number;
  onSceneChange?: (sceneNumber: number) => void;
}

interface UserChoices {
  scene2Choice?: string;
  [key: string]: any;
}

// Scene configuration
const sceneConfigs: SceneConfig[] = [
  {
    id: 1,
    name: 'intro',
    component: Scene1_Intro,
    backgroundStyle: 'bg-gradient-to-br from-romantic-dark via-romantic-purple to-black',
    duration: 0,
    allowBack: false
  },
  {
    id: 2,
    name: 'choice',
    component: Scene2_Choice,
    backgroundStyle: 'bg-gradient-to-br from-romantic-purple via-purple-900 to-black',
    duration: 0,
    allowBack: true
  },
  {
    id: 3,
    name: 'photoGallery',
    component: Scene3_PhotoGallery,
    backgroundStyle: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black',
    duration: 0,
    allowBack: true
  },
  {
    id: 4,
    name: 'thingsILove',
    component: Scene4_ThingsILove,
    backgroundStyle: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-romantic-dark',
    duration: 0,
    allowBack: true
  },
  {
    id: 5,
    name: 'memories',
    component: Scene5_Memories,
    backgroundStyle: 'bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900',
    duration: 0,
    allowBack: true
  },
  {
    id: 6,
    name: 'thingsYouDontKnow',
    component: Scene6_ThingsYouDontKnow,
    backgroundStyle: 'bg-gradient-to-br from-purple-800 via-pink-900 to-romantic-dark',
    duration: 0,
    allowBack: true
  },
  {
    id: 7,
    name: 'dreamsTogether',
    component: Scene8_DreamsTogether,
    backgroundStyle: 'bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900',
    duration: 0,
    allowBack: true
  },
  {
    id: 8,
    name: 'futureVision',
    component: Scene9_FutureVision,
    backgroundStyle: 'bg-gradient-to-br from-pink-900 via-purple-900 to-romantic-dark',
    duration: 0,
    allowBack: true
  },
  {
    id: 9,
    name: 'loveLetter',
    component: Scene10_LoveLetter,
    backgroundStyle: 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900',
    duration: 0,
    allowBack: true
  },
  {
    id: 10,
    name: 'birthdayWishes',
    component: Scene11_BirthdayWishes,
    backgroundStyle: 'bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900',
    duration: 0,
    allowBack: true
  },
  {
    id: 11,
    name: 'birthdayEnding',
    component: Scene12_BirthdayEnding,
    backgroundStyle: 'bg-gradient-to-br from-romantic-gold via-yellow-600 to-romantic-dark',
    duration: 0,
    allowBack: true
  }
];

// Scene transition animations (for future use)
// const sceneTransitions = {
//   initial: { opacity: 0, x: 100 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -100 }
// };

const SceneManager: React.FC<SceneManagerProps> = ({
  initialScene = 1,
  onSceneChange
}) => {
  const [currentScene, setCurrentScene] = useState(initialScene);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sceneHistory, setSceneHistory] = useState<number[]>([initialScene]);
  const [userChoices, setUserChoices] = useState<UserChoices>({});

  // Get current scene configuration
  const getCurrentSceneConfig = useCallback(() => {
    return sceneConfigs.find(config => config.id === currentScene) || sceneConfigs[0];
  }, [currentScene]);

  // Navigate to a specific scene
  const navigateToScene = useCallback((sceneNumber: number) => {
    if (sceneNumber < 1 || sceneNumber > sceneConfigs.length || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    
    // Add to history if moving forward
    if (sceneNumber > currentScene) {
      setSceneHistory(prev => [...prev, sceneNumber]);
    }

    setTimeout(() => {
      setCurrentScene(sceneNumber);
      setIsTransitioning(false);
      onSceneChange?.(sceneNumber);
    }, 250); // Half of transition duration
  }, [currentScene, isTransitioning, onSceneChange]);

  // Navigate to next scene
  const goToNextScene = useCallback(() => {
    const nextScene = currentScene + 1;
    if (nextScene <= sceneConfigs.length) {
      navigateToScene(nextScene);
    }
  }, [currentScene, navigateToScene]);

  // Navigate to previous scene
  const goToPreviousScene = useCallback(() => {
    const currentConfig = getCurrentSceneConfig();
    if (currentConfig.allowBack && sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop(); // Remove current scene
      const previousScene = newHistory[newHistory.length - 1];
      
      setSceneHistory(newHistory);
      navigateToScene(previousScene);
    }
  }, [getCurrentSceneConfig, sceneHistory, navigateToScene]);

  // Reset story to beginning
  const resetStory = useCallback(() => {
    setCurrentScene(1);
    setSceneHistory([1]);
    setUserChoices({});
    setIsTransitioning(false);
    onSceneChange?.(1);
  }, [onSceneChange]);

  // Store user choices for personalization
  const storeUserChoice = useCallback((key: string, value: any) => {
    setUserChoices(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Note: Scroll is managed per-scene by ScrollableScene component
  // No global scroll blocking needed

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextScene();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousScene();
          break;
        case 'Home':
          e.preventDefault();
          resetStory();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNextScene, goToPreviousScene, resetStory, isTransitioning]);

  const currentConfig = getCurrentSceneConfig();
  const CurrentSceneComponent = currentConfig.component;

  // Scene props
  const sceneProps: SceneProps = {
    onNext: goToNextScene,
    onPrevious: currentConfig.allowBack ? goToPreviousScene : undefined,
    isActive: !isTransitioning
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ${currentConfig.backgroundStyle}`}>
      {/* Scene transition container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="min-h-screen w-full flex items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CurrentSceneComponent 
            {...sceneProps}
          />
        </motion.div>
      </AnimatePresence>

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
          <div>Scene: {currentScene}/{sceneConfigs.length}</div>
          <div>History: {sceneHistory.join(' → ')}</div>
          <div>Transitioning: {isTransitioning ? 'Yes' : 'No'}</div>
        </div>
      )}

      {/* Navigation hints */}
      <div className="fixed bottom-4 right-4 text-white text-opacity-50 text-sm">
        <div>← → Navigate | Space: Next | Home: Reset</div>
      </div>
    </div>
  );
};

export default SceneManager;