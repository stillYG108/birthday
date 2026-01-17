import React, { useState, useEffect, useRef } from 'react';
import './VinylPlayer.css';

const VinylPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default
  const [volume, setVolume] = useState(50);
  const vinylRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = new Audio('/assets/music/yum3.mp3');
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (vinylRef.current) {
      if (isPlaying) {
        vinylRef.current.style.animation = 'vinylRotate 3s linear infinite';
      } else {
        vinylRef.current.style.animation = 'none';
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleVolumeUp = () => {
    const newVolume = Math.min(100, volume + 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleVolumeDown = () => {
    const newVolume = Math.max(0, volume - 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="vinyl-player-card">
      <div className="vinyl-player-container">
        {/* Vinyl Disc */}
        <div className="vinyl-section">
          <div 
            ref={vinylRef}
            className={`vinyl-disc ${isPlaying ? 'rotating' : ''}`}
          >
            <div className="vinyl-grooves">
              <div className="vinyl-reflection" />
            </div>
            <div className="vinyl-label">
              <div className="label-text">Sanuuu</div>
              <div className="label-subtitle">Birthday Song</div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="song-info">
            <h1 className="song-title">Glimpses of Sanuuu</h1>
            <p className="song-subtitle">Cherished Memories</p>
          </div>

          <div className="antique-divider" />

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="control-buttons">
            <button 
              className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlayPause}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            
            <button 
              className="control-btn stop-btn"
              onClick={handleStop}
            >
              ⏹
            </button>

            <div className="volume-controls">
              <button 
                className="control-btn volume-btn"
                onClick={handleVolumeDown}
              >
                🔉
              </button>
              <div className="volume-indicator">
                <div className="volume-bar">
                  <div 
                    className="volume-fill"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
              <button 
                className="control-btn volume-btn"
                onClick={handleVolumeUp}
              >
                🔊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylPlayer;
