import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import components
import FlowerConfetti from './components/LandingPage/FlowerConfetti';
import BirthdayMessage from './components/LandingPage/BirthdayMessage';
import MusicCard from './components/LandingPage/MusicCard';
import Envelope3D from './components/Envelope/Envelope3D';
import PhotoGallery from './components/PhotoGallery';
import AudioController from './components/Audio/AudioController';

gsap.registerPlugin(ScrollTrigger);

// Landing Page Component
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showEnvelope, setShowEnvelope] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setShowEnvelope(true), 3000);
      }
    });

    tl.fromTo('.landing-container', { opacity: 0 }, { opacity: 1, duration: 1 });

    return () => {
      tl.kill();
    };
  }, []);

  const handleOpenEnvelope = () => {
    navigate('/envelope');
  };

  return (
    <div className="landing-container min-h-screen relative">
      <FlowerConfetti />
      <BirthdayMessage />
      
      {showEnvelope && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={handleOpenEnvelope}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Patrick Hand, cursive' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💌 Open Your Special Message
          </motion.button>
        </motion.div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <MusicCard />
      </div>
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const location = useLocation();
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAudio(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' }
  };

  const pageTransition = { duration: 0.8 };

  const hideGlobalBg = location.pathname === '/envelope';

  return (
    <div className="App relative min-h-screen overflow-x-hidden">
      {!hideGlobalBg && <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 opacity-50 -z-10" />}

      {showAudio && <AudioController />}

      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-50/90 via-rose-50/90 to-pink-50/90 backdrop-blur-lg shadow-xl border-b border-pink-200/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center space-x-12">
            <motion.a
              href="/"
              className="group relative text-pink-700 hover:text-rose-600 font-dancing text-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">🌸 Home</span>
              <div className="absolute inset-0 bg-pink-200/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="/envelope"
              className="group relative text-pink-700 hover:text-rose-600 font-dancing text-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">💌 Message</span>
              <div className="absolute inset-0 bg-pink-200/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="/gallery"
              className="group relative text-pink-700 hover:text-rose-600 font-dancing text-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">📸 Gallery</span>
              <div className="absolute inset-0 bg-pink-200/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                key="landing"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <LandingPage />
              </motion.div>
            } />

            <Route path="/envelope" element={
              <motion.div
                key="envelope"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Envelope3D />
              </motion.div>
            } />

            <Route path="/gallery" element={
              <motion.div
                key="gallery"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PhotoGallery />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {location.pathname !== '/envelope' && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="relative py-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <motion.div 
                className="inline-flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl">💕</span>
                <p className="text-lg font-dancing text-pink-800 font-semibold">Made with love for my dearest Sanyu</p>
                <span className="text-2xl">💕</span>
              </motion.div>

              <motion.div 
                className="flex justify-center items-center space-x-2 text-pink-600/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <span className="text-lg">🌸</span>
                <span className="text-lg">🪷</span>
                <span className="text-lg">🌻</span>
                <span className="text-lg">🪻</span>
                <span className="text-lg">🌼</span>
                <span className="text-lg">💐</span>
              </motion.div>

              <motion.div 
                className="mt-4 text-xs text-pink-500/60 font-indie"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                © 2026 Birthday Wishes • Forever Yours⚘️
              </motion.div>
            </div>
          </div>
        </motion.footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
