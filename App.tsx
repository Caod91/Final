import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, LayoutGrid, Radio } from 'lucide-react';
import { WelcomeIntro } from './components/WelcomeIntro';
import { Header } from './components/Header';
import { ActionCard } from './components/ActionCard';
import { CreateTournament } from './components/CreateTournament';
import { ManageTournament } from './components/ManageTournament';
import { AppState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('INTRO');

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('tm_intro_seen');
    if (hasSeenIntro) {
      setView('WELCOME');
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('tm_intro_seen', 'true');
    setView('WELCOME');
  };

  const handleResetIntro = () => {
    localStorage.removeItem('tm_intro_seen');
    window.location.reload();
  };

  // Scoreboard "folding" transition
  // Use any to bypass complex motion type inference issues, specifically with cubic-bezier arrays
  const foldTransition: any = {
    initial: { 
      rotateX: 90, 
      opacity: 0, 
      transformOrigin: "top",
      backgroundColor: "#1a1a1a"
    },
    animate: { 
      rotateX: 0, 
      opacity: 1,
      backgroundColor: "transparent",
      transition: { 
        duration: 0.8, 
        ease: [0.87, 0, 0.13, 1] 
      }
    },
    exit: { 
      rotateX: -90, 
      opacity: 0, 
      transformOrigin: "bottom",
      transition: { 
        duration: 0.5, 
        ease: "easeIn" 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf5] relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pitch-marking opacity-5 pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {view === 'INTRO' && (
          <WelcomeIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {view !== 'INTRO' && (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header 
            currentView={view} 
            onNavigate={(v) => setView(v)} 
            onResetIntro={handleResetIntro}
          />
          
          <main className="flex-grow flex flex-col perspective-1000">
            <AnimatePresence mode="wait">
              {view === 'WELCOME' && (
                <motion.div 
                  key="welcome"
                  {...foldTransition}
                  className="w-full flex flex-col items-center justify-center p-8 md:p-16 gap-16 mt-8"
                >
                  <div className="w-full max-w-7xl flex flex-col md:flex-row items-end justify-between border-b-4 border-[#1a1a1a] pb-10">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <h2 className="text-[6rem] md:text-[10rem] font-black leading-none tracking-tighter text-[#1a1a1a]">
                        PLAYER_<br/><span className="text-[#8b0000]">READY</span>
                      </h2>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="max-w-md text-right flex flex-col items-end"
                    >
                      <div className="flex items-center gap-2 mb-4 text-[#8b0000] font-bold">
                        <Radio size={20} className="animate-pulse" />
                        <span className="text-sm tracking-widest uppercase">Live_Broadcast_System</span>
                      </div>
                      <p className="text-2xl font-black uppercase leading-tight mb-4 text-[#1a1a1a]/70">
                        Historical series protocols established. Select operational mode to begin management cycle.
                      </p>
                      <div className="bg-[#2d5a27] text-white px-4 py-2 inline-block font-mono-system text-xs font-bold brutalist-border">
                        LOGGED_IN_AS: MASTER_ADMIN // 001
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col xl:flex-row items-center justify-center gap-12 w-full max-w-7xl pb-20">
                    <ActionCard
                      type="CREATE"
                      title="CREATE TOURNAMENT"
                      icon={Trophy}
                      description="Deploy new championship formats, team rosters, and historic series cycles."
                      onClick={() => setView('CREATE')}
                    />
                    <ActionCard
                      type="MANAGE"
                      title="MANAGE TOURNAMENT"
                      icon={LayoutGrid}
                      description="Oversee active tournament nodes, update scorecards, and monitor live status."
                      onClick={() => setView('MANAGE')}
                    />
                  </div>
                </motion.div>
              )}

              {view === 'CREATE' && (
                <motion.div key="create" {...foldTransition} className="w-full">
                  <CreateTournament />
                </motion.div>
              )}

              {view === 'MANAGE' && (
                <motion.div key="manage" {...foldTransition} className="w-full">
                  <ManageTournament />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <footer className="p-10 border-t-4 border-[#1a1a1a] bg-white relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 cricket-ball rounded-full" />
                <span className="text-2xl font-black tracking-tighter uppercase">Test Match Manager // 2024</span>
              </div>
              <div className="flex gap-8 font-mono-system font-bold uppercase text-xs opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2d5a27]" />
                  <span>Connectivity: SECURE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8b0000]" />
                  <span>Encryption: AES_256</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;