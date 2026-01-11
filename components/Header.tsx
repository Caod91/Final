import React from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCcw, Cpu, Trophy } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: any) => void;
  onResetIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onResetIntro }) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full bg-[#fdfaf5] text-[#1a1a1a] flex flex-col z-30 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-stretch border-b-4 border-[#1a1a1a]">
        <div 
          className="bg-[#8b0000] text-white p-8 border-r-4 border-[#1a1a1a] flex flex-col items-start cursor-pointer hover:bg-[#2d5a27] transition-all duration-300 min-w-[320px]"
          onClick={() => onNavigate('WELCOME')}
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-10 h-10 cricket-ball rounded-full border-2 border-white" />
            <span className="font-mono-system font-black text-xl">TM_PRO</span>
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h1 className="text-4xl font-black tracking-tighter leading-none mb-1">TOURNAMENT</h1>
            <h2 className="text-2xl font-black tracking-tighter opacity-80 leading-none">MANAGER</h2>
          </motion.div>
        </div>
        
        <div className="flex-grow flex flex-col md:flex-row">
          <nav className="flex flex-grow bg-white text-[#1a1a1a]">
            <button 
              onClick={() => onNavigate('CREATE')}
              className={`flex-1 p-8 text-2xl font-black uppercase text-left border-r-4 border-[#1a1a1a] hover:bg-[#2d5a27] hover:text-white transition-all flex items-center gap-4 ${currentView === 'CREATE' ? 'bg-[#2d5a27] text-white' : ''}`}
            >
              <span className="font-mono-system text-xs opacity-40">MOD_01</span>
              CREATE_TOURNAMENT
            </button>
            <button 
              onClick={() => onNavigate('MANAGE')}
              className={`flex-1 p-8 text-2xl font-black uppercase text-left border-r-4 border-[#1a1a1a] hover:bg-[#2d5a27] hover:text-white transition-all flex items-center gap-4 ${currentView === 'MANAGE' ? 'bg-[#2d5a27] text-white' : ''}`}
            >
              <span className="font-mono-system text-xs opacity-40">MOD_02</span>
              MANAGE_TOURNAMENT
            </button>
          </nav>

          <div className="flex items-stretch bg-[#1a1a1a] divide-x-2 divide-white/20 px-4 text-white">
            <div className="flex flex-col justify-center px-6 font-mono-system text-[10px] font-bold text-[#2d5a27]">
              <span>SYS_STB: OPTIMAL</span>
              <span className="text-[#8b0000]">LIVE_FEED: ACTIVE</span>
            </div>
            <button
              onClick={onResetIntro}
              className="px-6 hover:bg-[#8b0000] transition-colors flex items-center gap-2"
            >
              <RotateCcw size={18} strokeWidth={3} />
              <span className="font-black text-[10px] hidden lg:inline">RELOAD_ANIM</span>
            </button>
            <button className="px-6 hover:bg-[#2d5a27] transition-colors">
              <Settings size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Pitch Marking Dotted Line */}
      <div className="pitch-line w-full" />
    </motion.header>
  );
};