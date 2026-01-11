import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeIntroProps {
  onComplete: () => void;
}

export const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // Ball starts rolling
      setTimeout(() => setStage(2), 2500),  // Ball settles / Logo form
      setTimeout(() => setStage(3), 4500),  // Sequence complete
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 3) {
      setTimeout(onComplete, 800);
    }
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfaf5] overflow-hidden">
      <div className="relative w-full max-w-7xl px-8 flex flex-col items-center justify-center">
        
        {/* The Rolling Ball & Trail */}
        <div className="relative w-full h-32 flex items-center overflow-visible">
          
          {/* Text that forms behind the ball */}
          <div className="absolute left-0 w-full flex items-center justify-center pointer-events-none">
            <motion.h1 
              className="text-4xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] flex whitespace-nowrap"
              initial={{ opacity: 1 }}
            >
              {"TEST MATCH TOURNAMENT MANAGER".split(" ").map((word, i) => (
                <span key={i} className="flex overflow-hidden">
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={`${i}-${j}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        delay: 0.5 + (i * 0.15) + (j * 0.05),
                        duration: 0.1
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="w-4">&nbsp;</span>
                </span>
              ))}
            </motion.h1>
          </div>

          {/* The Cricket Ball */}
          <motion.div
            initial={{ x: '-10vw', rotate: 0 }}
            animate={
              stage === 1 
                ? { x: '100vw', rotate: 1080 } 
                : stage >= 2 
                ? { x: '85vw', scale: 1.2, rotate: 1440 } 
                : {}
            }
            transition={{ 
              duration: 2, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 -translate-y-1/2 z-20 w-16 h-16 cricket-ball rounded-full border-2 border-white flex items-center justify-center overflow-hidden"
          >
             {/* Stitches on the ball */}
             <div className="w-full h-[2px] bg-white opacity-40 rotate-90" />
             <div className="absolute w-full h-[2px] bg-white opacity-40 top-[45%]" />
             <div className="absolute w-full h-[2px] bg-white opacity-40 top-[55%]" />
          </motion.div>
        </div>

        {/* Logo reveal at the end */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="bg-[#8b0000] text-white p-4 brutalist-border brutalist-shadow-red transform -rotate-2">
              <span className="text-2xl font-black italic">PRO_SYSTEM_V1</span>
            </div>
            <motion.div 
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 font-mono-system text-xs font-bold uppercase opacity-60"
            >
              [ INITIALIZING_LEAGUE_MODULES ]
            </motion.div>
          </motion.div>
        )}

      </div>
      
      {/* Pitch markings in background */}
      <div className="absolute inset-0 pitch-marking pointer-events-none" />
    </div>
  );
};