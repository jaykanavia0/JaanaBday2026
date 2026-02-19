// Type definitions for the romantic birthday story

export interface SceneProps {
  onNext: () => void;
  onPrevious?: () => void;
  isActive: boolean;
}

export interface SceneConfig {
  id: number;
  name: string;
  component: React.ComponentType<SceneProps>;
  backgroundStyle: string;
  duration: number;
  allowBack: boolean;
}

export interface PhotoGalleryItem {
  id: string;
  imagePlaceholder: string;
  caption: string;
  date?: string;
  location?: string;
}

export interface MemoryItem {
  title: string;
  description: string;
  imagePlaceholder: string;
  emotion: string;
}

export interface StoryContent {
  scenes: {
    intro: {
      title: string;
      subtitle: string;
      startButtonText: string;
    };
    choice: {
      question: string;
      options: string[];
    };
    beginning: {
      imagePlaceholder: string;
      caption: string;
    };
    photoGallery: {
      title: string;
      subtitle: string;
      photos: PhotoGalleryItem[];
    };
    thingsILove: {
      cards: Array<{
        title: string;
        hiddenMessage: string;
      }>;
    };
    memories: {
      title: string;
      subtitle: string;
      memoryItems: MemoryItem[];
    };
    thingsYouDontKnow: {
      messages: string[];
    };
    dreamsTogether: {
      title: string;
      dreams: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
    futureVision: {
      text: string;
    };
    loveLetterReveal: {
      title: string;
      letterContent: string[];
      signature: string;
    };
    birthdayWishes: {
      title: string;
      wishes: string[];
    };
    birthdayEnding: {
      message: string;
      videoPlaceholder?: string;
    };
  };
}

export interface AnimationConfig {
  type: 'fadeIn' | 'slideUp' | 'typeWriter' | 'scaleIn' | 'staggerChildren';
  duration?: number;
  delay?: number;
  ease?: string;
}