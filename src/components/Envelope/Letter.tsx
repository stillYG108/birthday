import React from 'react';
import { motion } from 'framer-motion';

const Letter: React.FC = () => {
  return (
    <motion.div
      className="vintage-letter love-letter"
      initial={{ y: 60 }}
      animate={{ y: -20 }}
      transition={{ duration: 1.2 }}
    >
      <div className="love-letter__title">
        My Dearest Sanyu
      </div>

      <div className="love-letter__body">
       ⚘️ Hey Priye 🌷,
         Pranipat 🌸 Devi 🌸
         Janma din ki aapko hardik shubhkamnaye 🌼🤍🌸
         I'm not going to wish that your work becomes easy 🌺 —
         because I already know you are going to slay it with ease, my lady 🌸🌷✨
      </div>

      <div className="love-letter__signature">Forever yours ⚘️❤️</div>
    </motion.div>
  );
};

export default Letter;
