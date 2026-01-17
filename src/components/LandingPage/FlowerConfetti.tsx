import React, { useState, useEffect } from 'react';

interface Flower {
  id: number;
  emoji: string;
  left: number;
  fontSize: number;
  animationDuration: number;
  delay: number;
}

const FlowerConfetti: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    const flowerEmojis = ['🪷', '🌸', '🥀', '🌻', '🪻', '🌼', '💐'];
    const newFlowers: Flower[] = [];

    for (let i = 0; i < 35; i++) {
      newFlowers.push({
        id: i,
        emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        left: Math.random() * 100,
        fontSize: Math.random() * 35 + 25,
        animationDuration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      });
    }

    setFlowers(newFlowers);
  }, []);

  return (
    <div
      className="flower-layer"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999,
        overflow: 'hidden',
      }}
    >
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="flower-confetti"
          style={{
            position: 'absolute',
            left: `${flower.left}%`,
            top: '-10vh',
            fontSize: `${flower.fontSize}px`,
            animation: `flower-fall ${flower.animationDuration}s linear ${flower.delay}s infinite`,
          }}
        >
          {flower.emoji}
        </div>
      ))}
    </div>
  );
};

export default FlowerConfetti;
