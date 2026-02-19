# Design Document

## Overview

The Romantic Birthday Story website is designed as an immersive, cinematic interactive experience that transforms a birthday wish into a story-based love letter adventure. The system uses React with Framer Motion to create smooth, emotional transitions between seven carefully crafted scenes, each designed to build romantic tension and emotional connection.

## Architecture

### Component Architecture

```
App
├── SceneManager (State management & scene transitions)
├── AudioController (Background music management)
├── AnimationWrapper (Reusable animation components)
└── Scenes/
    ├── Scene1_Intro
    ├── Scene2_Choice
    ├── Scene3_Beginning
    ├── Scene4_ThingsILove
    ├── Scene5_ThingsYouDontKnow
    ├── Scene6_FutureVision
    └── Scene7_BirthdayEnding
```

### State Management

- **Current Scene**: Tracks active scene (1-7)
- **Animation State**: Manages transition states and loading
- **Audio State**: Controls background music on/off
- **User Choices**: Stores user interactions for personalization
- **Content State**: Manages dynamic content loading and display

### Technology Stack

- **React 18+**: Functional components with hooks
- **Framer Motion**: All animations and transitions
- **Tailwind CSS**: Styling and responsive design
- **React Hooks**: useState, useEffect, useCallback for state management

## Components and Interfaces

### SceneManager Component

**Purpose**: Central orchestrator for scene transitions and state management

**Props Interface**:

```typescript
interface SceneManagerProps {
  initialScene?: number;
  onSceneChange?: (sceneNumber: number) => void;
}
```

**Key Methods**:

- `navigateToScene(sceneNumber: number)`: Handles scene transitions
- `getCurrentScene()`: Returns current active scene
- `resetStory()`: Returns to beginning

### AnimationWrapper Component

**Purpose**: Provides reusable animation patterns

**Animation Types**:

- `fadeIn`: Smooth opacity transition
- `slideUp`: Vertical slide with fade
- `typeWriter`: Character-by-character text reveal
- `scaleIn`: Scale from 0 to 1 with bounce
- `staggerChildren`: Sequential child animations

### AudioController Component

**Purpose**: Manages background music and sound effects

**Features**:

- Toggle button with smooth fade in/out
- Persistent across scene changes
- Volume control
- Mute/unmute functionality

### Scene Components

Each scene follows a consistent interface pattern:

```typescript
interface SceneProps {
  onNext: () => void;
  onPrevious?: () => void;
  isActive: boolean;
}
```

## Data Models

### Scene Configuration

```typescript
interface SceneConfig {
  id: number;
  name: string;
  component: React.ComponentType<SceneProps>;
  backgroundStyle: string;
  duration: number;
  allowBack: boolean;
}
```

### Content Models

```typescript
interface StoryContent {
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
    thingsILove: {
      cards: Array<{
        title: string;
        hiddenMessage: string;
      }>;
    };
    thingsYouDontKnow: {
      messages: string[];
    };
    futureVision: {
      text: string;
    };
    birthdayEnding: {
      message: string;
      videoPlaceholder?: string;
    };
  };
}
```

## Scene-by-Scene Design

### Scene 1: Intro (Landing Screen)

**Visual Design**:

- Dark gradient background (deep purple to black)
- Subtle animated particles (floating dots with opacity changes)
- Centered typography with elegant serif font
- Typing animation for main text
- Glowing start button with hover effects

**Animations**:

- Text appears with typewriter effect (0.05s per character)
- Start button fades in after text completion
- Particle background continuously animates
- Button hover: scale(1.05) with glow increase

### Scene 2: Choice Interaction

**Visual Design**:

- Continuation of dark aesthetic
- Question text with elegant typography
- Two buttons with different subtle animations
- Soft spotlight effect on buttons

**Interactions**:

- Both buttons lead forward but with different micro-animations
- "Yes" button: gentle pulse effect
- "Definitely Yes" button: slight rotation + scale
- Choice affects subtle personalization in later scenes

### Scene 3: Our Beginning

**Visual Design**:

- Image container with elegant border/frame effect
- Caption area below with romantic typography
- Soft vignette effect around image
- Animated reveal from center outward

**Layout**:

- Responsive image container (maintains aspect ratio)
- Caption with fade-in animation
- Next button appears after image loads

### Scene 4: Things I Love About You

**Visual Design**:

- Grid layout of interactive cards (2x2 on desktop, 1x4 on mobile)
- Cards with subtle shadow and border
- Hover effects reveal hidden content
- Staggered appearance animation

**Interactions**:

- Cards appear one by one with 0.2s delay
- Hover/click reveals hidden message with flip animation
- Each card has unique color accent
- Progress indicator shows revealed cards

### Scene 5: Things You Don't Know About Yourself

**Visual Design**:

- Chat-style message bubbles
- Messages appear from left side
- Typing indicator before each message
- Soft background blur effect

**Animations**:

- Typing indicator (3 dots bouncing)
- Messages slide in from left
- Text appears with typewriter effect
- 2-second pause between messages

### Scene 6: Future Vision

**Visual Design**:

- Minimal, clean aesthetic
- Large, elegant typography
- Slow fade transitions
- Subtle background gradient shift

**Animations**:

- Text fades in word by word
- Background slowly lightens
- Gentle scale animation on text
- Long pause for emotional impact

### Scene 7: Birthday Ending

**Visual Design**:

- Celebratory but elegant design
- Subtle confetti animation (golden particles)
- Large birthday message
- Video embed placeholder with play button
- Restart story option

**Animations**:

- Confetti falls gently (not overwhelming)
- Text appears with celebration effect
- Video placeholder with hover effects
- Restart button with subtle pulse

## Error Handling

### Animation Failures

- Fallback to CSS transitions if Framer Motion fails
- Graceful degradation for older browsers
- Loading states for slow connections

### Content Loading

- Placeholder content while loading
- Error boundaries for component failures
- Retry mechanisms for failed loads

### Audio Issues

- Silent fallback if audio fails to load
- User notification for audio permission issues
- Graceful handling of autoplay restrictions

## Testing Strategy

### Component Testing

- Unit tests for each scene component
- Animation state testing
- User interaction testing
- Responsive design testing

### Integration Testing

- Scene transition flows
- Audio controller integration
- State persistence across scenes
- Cross-browser compatibility

### User Experience Testing

- Mobile device testing
- Performance on slower devices
- Accessibility compliance
- Emotional impact assessment

## Performance Considerations

### Optimization Strategies

- Lazy loading of scene components
- Image optimization and preloading
- Animation performance monitoring
- Memory management for long sessions

### Loading Strategy

- Progressive scene loading
- Critical CSS inlining
- Asset preloading for smooth transitions
- Efficient re-renders with React.memo

## Responsive Design

### Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Adaptive Features

- Typography scaling
- Touch-friendly interactions on mobile
- Optimized animations for mobile performance
- Landscape/portrait orientation handling

## Accessibility

### WCAG Compliance

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

### Inclusive Design

- Alternative text for images
- Focus management between scenes
- Audio descriptions for visual elements
- Skip navigation options
