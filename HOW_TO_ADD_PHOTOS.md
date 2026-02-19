# 📸 How to Add Your Photos

## Quick Start Guide

### Step 1: Prepare Your Photos

1. **Collect your photos** - Gather 10 special photos you want to include
2. **Resize them** (recommended):
   - Width: 1200-1600px for best quality
   - Format: JPG or PNG
   - Keep file sizes under 2MB each for fast loading

3. **Create a photos folder**:
   ```
   public/
   └── photos/
       ├── photo1.jpg
       ├── photo2.jpg
       ├── photo3.jpg
       └── ... (up to 10 photos)
   ```

### Step 2: Add Photos to the Project

**Option A: Using the public folder (Recommended)**

1. Create a `photos` folder inside the `public` folder
2. Copy your photos into `public/photos/`
3. Your photos will be accessible at `/photos/photo1.jpg`

**Option B: Using the src folder**

1. Create a `photos` folder inside the `src` folder
2. Import photos in your content file
3. Reference them directly

### Step 3: Update the Content File

Open `src/content/storyContent.ts` and update the photo paths:

#### For Photo Gallery (Scene 3)

```typescript
photoGallery: {
  title: "Our Beautiful Journey",
  subtitle: "Every photo tells a story, every moment a memory...",
  photos: [
    {
      id: "photo1",
      imagePlaceholder: "/photos/our-first-date.jpg", // ← Change this
      caption: "The beginning of something magical",
      date: "January 15, 2023",
      location: "Central Park"
    },
    {
      id: "photo2",
      imagePlaceholder: "/photos/beach-sunset.jpg", // ← Change this
      caption: "Your laugh in this moment captured my heart",
      date: "March 20, 2023",
      location: "Malibu Beach"
    },
    // ... update all 6 photos
  ]
}
```

#### For Memories (Scene 5)

```typescript
memories: {
  title: "Our Precious Memories",
  subtitle: "Moments that made us who we are...",
  memoryItems: [
    {
      title: "First Kiss",
      description: "Time stood still, and I knew my life had changed forever",
      imagePlaceholder: "/photos/first-kiss.jpg", // ← Change this
      emotion: "💕"
    },
    // ... update all 4 memories
  ]
}
```

### Step 4: Customize Captions and Details

Make each photo personal by updating:

- **caption**: A romantic or meaningful description
- **date**: When the photo was taken
- **location**: Where it happened
- **title**: For memory items
- **description**: Longer story for memories

### Example: Complete Photo Entry

```typescript
{
  id: "photo1",
  imagePlaceholder: "/photos/paris-trip.jpg",
  caption: "The moment I knew I wanted to travel the world with you",
  date: "June 10, 2023",
  location: "Paris, France"
}
```

## 🎨 Photo Recommendations

### Photo Gallery (6 photos)

1. **First Photo Together** - Where it all began
2. **Candid Moment** - Natural, genuine happiness
3. **Adventure Photo** - Exploring together
4. **Intimate Moment** - Just the two of you
5. **Celebration** - Birthday, anniversary, or special occasion
6. **Recent Photo** - Your current happiness

### Memories (4 photos)

1. **Romantic Moment** - First kiss, proposal, etc.
2. **Quiet Intimacy** - Late night talks, cozy moments
3. **Fun & Laughter** - Dancing, being silly together
4. **Comfort & Support** - Being there for each other

## 🖼️ Image Placeholder Component

If you don't have photos yet, the placeholders will show:

- A camera icon 📸
- The placeholder text you specify
- A beautiful gradient background

This means you can:

- Launch the website without photos first
- Add photos gradually
- Test the experience before adding real images

## 🔧 Advanced: Using Actual Images

### Method 1: Direct Path (Easiest)

```typescript
imagePlaceholder: "/photos/my-photo.jpg";
```

### Method 2: Import (Type-safe)

```typescript
// At the top of storyContent.ts
import photo1 from "../photos/photo1.jpg";
import photo2 from "../photos/photo2.jpg";

// Then use:
imagePlaceholder: photo1;
```

### Method 3: External URL

```typescript
imagePlaceholder: "https://your-image-host.com/photo.jpg";
```

## 📱 Responsive Images

The website automatically handles:

- Different screen sizes
- Retina displays
- Mobile optimization
- Lazy loading

Just provide high-quality images and the site will optimize them!

## 🎭 Styling the Image Display

### Current Styles:

- **Aspect Ratio**: 4:3 for gallery, 16:9 for memories
- **Border**: Elegant white border with glow
- **Effects**: Vignette, hover animations
- **Transitions**: Smooth fades and slides

### To Change Styles:

Edit the scene files:

- `src/scenes/Scene3_PhotoGallery.tsx` - Gallery styles
- `src/scenes/Scene5_Memories.tsx` - Memory card styles

## 🚀 Quick Test

1. Add one photo to `public/photos/test.jpg`
2. Update the first photo entry:
   ```typescript
   imagePlaceholder: "/photos/test.jpg";
   ```
3. Save and refresh the browser
4. Navigate to Scene 3 to see your photo!

## 💡 Tips

- **Use consistent naming**: photo1.jpg, photo2.jpg, etc.
- **Backup originals**: Keep copies of your original photos
- **Test on mobile**: Check how photos look on different devices
- **Optimize file size**: Use tools like TinyPNG or ImageOptim
- **Consider privacy**: Only use photos you're comfortable sharing

## 🎨 Photo Editing Suggestions

Before adding photos, consider:

- **Brightness**: Slightly brighten for better visibility
- **Contrast**: Enhance to make subjects pop
- **Crop**: Focus on the important parts
- **Filter**: Apply a consistent style across all photos
- **Remove distractions**: Crop out unwanted elements

## 📝 Checklist

- [ ] Collect 10 special photos
- [ ] Resize and optimize images
- [ ] Create `public/photos/` folder
- [ ] Copy photos to the folder
- [ ] Update `storyContent.ts` with photo paths
- [ ] Customize captions and dates
- [ ] Test in browser
- [ ] Check on mobile device
- [ ] Share with your loved one! 💕

---

Need help? Check the main README.md or ENHANCEMENTS.md for more details!
