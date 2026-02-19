# 🎵 How to Add Background Music

## Quick Setup Guide

### Step 1: Prepare Your Music File

1. **Choose your song** - Pick a romantic birthday song (MP3 format recommended)
2. **Optimize the file**:
   - Format: MP3 or OGG
   - Bitrate: 128-192 kbps (good quality, reasonable file size)
   - File size: Keep under 5MB for fast loading

### Step 2: Add Music to Your Project

1. **Create the audio folder** in your project:

   ```
   public/
   └── audio/
       └── background-music.mp3
   ```

2. **Copy your music file** to `public/audio/background-music.mp3`

### Step 3: Music is Already Configured!

The AudioController is already set up to play your music automatically:

- ✅ Path configured: `/audio/background-music.mp3`
- ✅ Auto-play enabled
- ✅ Loops continuously
- ✅ Volume set to 30% (adjustable with slider)
- ✅ Fade in/out effects

## 🎛️ Music Controls

### For Users:

- **Play/Pause button**: Top right corner of the website
- **Volume slider**: Hover over the play button to adjust volume
- **Auto-play**: Music starts automatically after first user interaction

### For Developers:

**Change the music file:**

```typescript
// In src/components/AudioController.tsx (line ~38)
audio.src = "/audio/your-song-name.mp3";
```

**Change default volume:**

```typescript
// In src/App.tsx
<AudioController autoPlay={true} volume={0.5} />  // 50% volume
```

**Disable auto-play:**

```typescript
// In src/App.tsx
<AudioController autoPlay={false} />
```

## 📁 File Structure

```
public/
└── audio/
    └── background-music.mp3  ← Your music file goes here
```

## 🎵 Recommended Songs

For a romantic birthday website, consider:

- Instrumental romantic music
- Soft piano melodies
- Acoustic love songs
- Birthday-themed romantic songs
- Gentle background music (not too loud or distracting)

## 🔧 Troubleshooting

### Music doesn't play?

1. **Check file location**: Ensure file is at `public/audio/background-music.mp3`
2. **Check file name**: Must be exactly `background-music.mp3` (or update the code)
3. **Check file format**: Use MP3 or OGG format
4. **Browser autoplay policy**: Music will only play after user clicks something (this is normal browser behavior)

### Music is too loud/quiet?

1. **Use the volume slider**: Hover over the play button
2. **Change default volume**: Edit `volume={0.3}` in `src/App.tsx`

### Want to use a different file name?

Update the path in `src/components/AudioController.tsx`:

```typescript
audio.src = "/audio/your-custom-name.mp3";
```

## 🌐 For Deployment (Render)

The music file will work automatically when deployed because:

- ✅ Path is relative (`/audio/...`)
- ✅ File is in the `public` folder
- ✅ Public folder is served statically

Just make sure your music file is committed to your repository!

## 💡 Tips

1. **Test locally first**: Run `npm start` and test the music
2. **Check file size**: Large files slow down loading
3. **Consider licensing**: Use royalty-free music or music you have rights to
4. **Mobile friendly**: Music works on mobile devices too
5. **User control**: Always provide play/pause controls (already included!)

## 🎼 Free Music Resources

- **YouTube Audio Library**: Free music for creators
- **Incompetech**: Royalty-free music
- **Bensound**: Free music for creative projects
- **Free Music Archive**: Various free music
- **Pixabay Music**: Free music downloads

---

**Your music is ready to play! Just add your file to `public/audio/background-music.mp3`** 🎵💕
