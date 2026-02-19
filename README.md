# Romantic Birthday Story 💕

A cinematic interactive birthday website designed as a story-based love letter adventure. Experience a romantic journey through **11 beautifully crafted scenes** with smooth animations, **10 photo integration points**, and emotional storytelling.

## ✨ Features

- **11 Interactive Scenes**: Each scene tells part of a romantic story (expanded from 7!)
- **Photo Gallery**: Grid and slideshow views with 6 photo placeholders
- **Memory Cards**: Auto-playing memories with floating hearts animation
- **Interactive Elements**: Flip cards, dreams, wishes, and love letter reveal
- **Cinematic Animations**: Smooth transitions using Framer Motion
- **Responsive Design**: Optimized for both mobile and desktop
- **Audio Control**: Background music with smooth fade transitions
- **Typing Effects**: Character-by-character text reveals
- **3D Animations**: Cards flip and rotate in 3D space
- **Romantic Aesthetic**: Dark, elegant design with soft glows and particles

## 🎬 Story Flow

1. **Intro**: Cinematic landing with typing animation
2. **Choice**: Interactive decision with personalized responses
3. **Photo Gallery** ⭐ NEW: Interactive grid/slideshow with 6 photos
4. **Things I Love** ✨ ENHANCED: 6 interactive cards (expanded from 4)
5. **Memories** ⭐ NEW: Auto-playing memory cards with 4 photos
6. **Things You Don't Know** ✨ ENHANCED: 8 chat-style messages (expanded from 5)
7. **Dreams Together** ⭐ NEW: Interactive future dreams
8. **Future Vision**: Minimal, emotional text reveal
9. **Love Letter** ⭐ NEW: Vintage letter with typewriter effect
10. **Birthday Wishes** ⭐ NEW: 6 personalized wishes with sparkles
11. **Birthday Ending**: Celebration with confetti and restart option

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd romantic-birthday-story
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## 📸 Photo Integration

### **10 Photo Placeholders Ready!**

The website now includes dedicated photo integration points:

**Photo Gallery (Scene 3)** - 6 photos:

- Grid view and slideshow mode
- Captions, dates, and locations
- Interactive navigation

**Memories (Scene 5)** - 4 photos:

- Auto-playing memory cards
- Emotion icons for each memory
- Beautiful 3D animations

### **How to Add Your Photos**

1. Create a `photos` folder in the `public` directory:

   ```
   public/photos/
   ```

2. Add your photos (JPG or PNG, recommended 1200-1600px width)

3. Update `src/content/storyContent.ts`:
   ```typescript
   imagePlaceholder: "/photos/your-photo.jpg";
   ```

📖 **Detailed Guide**: See `HOW_TO_ADD_PHOTOS.md` for complete instructions

## 🎨 Customization

### Story Content

Edit `src/content/storyContent.ts` to customize:

- Text content for all scenes
- Card messages and titles
- Button labels and captions

### Styling

- Colors: Update `tailwind.config.js` romantic color palette
- Fonts: Modify font families in the Tailwind config
- Animations: Adjust timing and effects in component files

### Images

Replace image placeholders in Scene 3 by:

1. Adding images to `public/assets/images/`
2. Updating the image source in `Scene3_Beginning.tsx`

### Audio

Add background music by:

1. Adding audio files to `public/assets/audio/`
2. Updating the audio source in `AudioController.tsx`

## 📱 Mobile Optimization

- Touch-friendly interactions (minimum 48px touch targets)
- Responsive typography scaling
- Optimized animations for mobile performance
- Reduced particle count on mobile devices
- Adaptive content and hints

## ♿ Accessibility

- Keyboard navigation support
- Focus management between scenes
- Reduced motion preferences support
- High contrast mode compatibility
- Screen reader friendly structure

## 🛠️ Tech Stack

- **React 18**: Modern functional components with hooks
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first styling with custom romantic theme
- **Framer Motion**: Smooth animations and transitions
- **Modern CSS**: Gradients, backdrop blur, and advanced effects

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AnimationWrapper.tsx
│   ├── AudioController.tsx
│   └── SceneManager.tsx
├── scenes/             # Individual story scenes
│   ├── Scene1_Intro.tsx
│   ├── Scene2_Choice.tsx
│   ├── Scene3_Beginning.tsx
│   ├── Scene4_ThingsILove.tsx
│   ├── Scene5_ThingsYouDontKnow.tsx
│   ├── Scene6_FutureVision.tsx
│   └── Scene7_BirthdayEnding.tsx
├── content/            # Story content configuration
│   └── storyContent.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── App.tsx             # Main application component
```

## 🎯 Performance Features

- Lazy loading of scene components
- Optimized re-renders with React.memo
- Efficient animation performance
- Mobile-specific optimizations
- Reduced motion support

## 💝 Perfect For

- Birthday surprises
- Anniversary celebrations
- Romantic gestures
- Special occasions
- Love letters
- Proposal stories

## 🔧 Development

### Available Scripts

- `npm start`: Runs the development server
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for personal use. Feel free to customize and adapt for your own romantic occasions!

---

Made with 💕 for creating magical moments
