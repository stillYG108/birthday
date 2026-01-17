import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Letter from './Letter';
import EnvelopeMusicCard from './EnvelopeMusicCard';

const Envelope3D: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1️⃣ Crack wax seal
    gsap.to('.wax-seal', {
      scale: 1.4,
      rotation: 360,
      opacity: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
    });

    // 2️⃣ Lift the envelope flap
    gsap.to('.envelope-flap', {
      rotateX: -120,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'power2.inOut',
    });

    // 3️⃣ Slight envelope tilt for realism
    gsap.to('.envelope', {
      rotateY: -10,
      scale: 0.98,
      duration: 0.8,
    });

    // 4️⃣ Slide letter upward like real life
    setTimeout(() => {
      gsap.fromTo(
        '.letter-wrapper',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: -40,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'back.out(1.2)',
          onComplete: createFlowerBurst,
        }
      );
    }, 700);
  };

  const createFlowerBurst = () => {
    const flowers = ['🌸', '🪷', '🌻', '🪻', '🌼', '💐', '🌺', '🌷', '🌹', '🌵'];
    const container = document.createElement('div');
    container.className = 'flower-burst';

    // Get letter position for realistic burst origin
    const letterEl = document.querySelector('.letter-wrapper');
    const rect = letterEl?.getBoundingClientRect();
    if (rect) {
      container.style.left = `${rect.left + rect.width / 2}px`;
      container.style.top = `${rect.top + rect.height / 2}px`;
    }

    for (let i = 0; i < 80; i++) {
      const f = document.createElement('div');
      f.className = 'burst-flower';
      f.textContent = flowers[Math.floor(Math.random() * flowers.length)];

      // More natural spread with varied distances and angles
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 100 + Math.random() * 200;
      const delay = Math.random() * 0.1;
      const duration = 1.2 + Math.random() * 1;
      const scale = 0.8 + Math.random() * 1.5;

      f.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      f.style.setProperty('--ty', `${Math.sin(angle) * distance - 60}px`);
      f.style.setProperty('--delay', `${delay}s`);
      f.style.setProperty('--duration', `${duration}s`);
      f.style.setProperty('--scale', scale.toString());
      f.style.fontSize = `${18 + Math.random() * 12}px`;

      // Add rotation for more natural movement
      f.style.setProperty('--rotation', `${-180 + Math.random() * 360}deg`);

      container.appendChild(f);
    }

    document.body.appendChild(container);

    setTimeout(() => {
      container.remove();
    }, 2800);
  };

  return (
    <div className="envelope-page flex items-center justify-center min-h-screen relative">

      {/* Music Card - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <EnvelopeMusicCard />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl text-pink-700 mb-6 font-bold">
          Tap the Seal ✨
        </h2>

        <div ref={envelopeRef} className="relative" style={{ perspective: '1200px' }}>
          <motion.div
            className="envelope"
            onClick={handleEnvelopeClick}
            style={{
              width: '380px',
              height: '240px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
            }}
          >
            {/* FRONT ENVELOPE */}
            <div
              className="envelope-face envelope-front"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: "url('/assets/images/Coquette Envelope Sticker.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                border: '1px solid #d4a574',
                boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* FLAP */}
              <div className="envelope-flap" />

              <div className="text-center mt-16 font-serif text-brown-700">
                <div>To:</div>
                <div className="font-bold">My Dearest Sanyu</div>
              </div>

              <div className="wax-seal">💝</div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs opacity-70 absolute bottom-3 w-full text-center"
              >
                Click seal to open ✨
              </motion.div>
            </div>


            {/* LETTER COMES OUT */}
            <div className="letter-wrapper absolute w-full top-0 left-0 pointer-events-none">
              {isOpen && <Letter />}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope3D;
