import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AUDIO_SRC = '/assets/music/pas de duex.mp3';

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const EnvelopeMusicCard: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [armDown, setArmDown] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.volume = volume;
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setArmDown(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setArmDown(true);
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setArmDown(false);
  };

  const handleVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolume(value);
  };

  return (
    <motion.div
      className="music-card music-card--vintage"
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        zIndex: 1200,
        pointerEvents: 'auto',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      <div className="music-card__top">
        <div className={`music-card__disc ${isPlaying ? 'is-playing' : ''}`}>
          <div className="music-card__disc-center" />
        </div>
        <div className={`music-card__arm ${armDown ? 'arm-down' : ''}`} />
      </div>

      <div className="music-card__meta">
        <span className="music-card__time">{formatTime(currentTime)}</span>
        <div className="music-card__title">Pas de Deux</div>
        <div className="music-card__subtitle">For my majestic lady</div>
      </div>

      <div className="music-card__controls">
        <button type="button" className="music-card__btn" onClick={stopAudio} aria-label="Stop">
          ■
        </button>
        <button type="button" className="music-card__btn play" onClick={togglePlay} aria-label="Play">
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button type="button" className="music-card__btn" onClick={() => handleVolume(Math.min(volume + 0.1, 1))}>
          ＋
        </button>
        <button type="button" className="music-card__btn" onClick={() => handleVolume(Math.max(volume - 0.1, 0))}>
          －
        </button>
      </div>

      <div className="music-card__slider">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => handleVolume(Number(event.target.value))}
          aria-label="Volume"
        />
      </div>
    </motion.div>
  );
};

export default EnvelopeMusicCard;
