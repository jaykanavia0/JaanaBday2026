import React from 'react';
import './App.css';
import SceneManager from './components/SceneManager';
import AudioController from './components/AudioController';

function App() {
  return (
    <div className="App relative">
      {/* Audio Controller */}
      <AudioController autoPlay={true} />
      
      {/* Main Scene Manager */}
      <SceneManager />
    </div>
  );
}

export default App;