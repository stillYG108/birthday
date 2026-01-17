import React from 'react';
import { motion } from 'framer-motion';
import FlowerConfetti from './FlowerConfetti';

const BirthdayMessage: React.FC = () => {
  return (
    <div className="landing-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <FlowerConfetti />

      <div className="text-center relative z-10">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl max-w-4xl mx-4 shadow-lg">
          <motion.h1 
            className="vintage-title text-6xl md:text-7xl lg:text-8xl mb-4 text-pink-600"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Happiest Birthday 🎂
          </motion.h1>
          
          <motion.h2 
            className="vintage-subtitle text-3xl md:text-4xl lg:text-5xl mb-6 font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            My Half 💗
          </motion.h2>
          
          <motion.p 
            className="vintage-body text-xl md:text-2xl lg:text-3xl max-w-2xl mx-auto font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <strong>❤️ I love you so much Sanyuuuu biiiiiiiiiii ❤️</strong>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayMessage;
