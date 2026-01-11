import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, ArrowRight, Trophy, Users, MapPin, ListChecks, Search, Database, Terminal } from 'lucide-react';

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
  type: 'CREATE' | 'MANAGE';
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, icon: Icon, description, onClick, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Entrance animations per card type
  // Use any to bypass complex motion type inference issues with conditional variants
  const entranceAnim: any = type === 'CREATE' 
    ? {
        initial: { opacity: 0, rotate: -10, scale: 0.9 },
        animate: { 
          opacity: 1, 
          rotate: [0, 10, 0], 
          scale: 1,
          transition: { duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }
        }
      }
    : {
        initial: { opacity: 0, y: 100 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", bounce: 0.4, duration: 1.2 }
        }
      };

  return (
    <motion.div
      {...entranceAnim}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group cursor-pointer w-full md:w-[520px] min-h-[640px] bg-white border-[6px] border-[#1a1a1a] p-12 flex flex-col items-start justify-between overflow-hidden transition-all duration-300 ${
        isHovered 
          ? type === 'CREATE' ? 'brutalist-shadow-red translate-y-[-10px]' : 'brutalist-shadow-green translate-y-[-10px]'
          : 'brutalist-shadow'
      }`}
    >
      {/* Interactive Hover Preview: Create (Orbiting Icons) */}
      <AnimatePresence>
        {isHovered && type === 'CREATE' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[Users, MapPin, ListChecks, Trophy].map((IconComp, idx) => (
              <motion.div
                key={idx}
                className="absolute text-[#8b0000]"
                initial={{ rotate: idx * 90, x: 0, y: 0 }}
                animate={{ 
                  rotate: (idx * 90) + 360,
                  x: Math.cos((idx * 90) * (Math.PI / 180)) * 140,
                  y: Math.sin((idx * 90) * (Math.PI / 180)) * 140,
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                <div className="bg-white border-2 border-[#1a1a1a] p-3 rounded-lg shadow-lg">
                  <IconComp size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Hover Preview: Manage (Mini Table) */}
      <AnimatePresence>
        {isHovered && type === 'MANAGE' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.15, y: 0 }}
            className="absolute inset-0 pointer-events-none p-12 flex flex-col gap-4 overflow-hidden"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-8 h-8 bg-[#1a1a1a] rounded" />
                <div className="h-4 bg-[#1a1a1a] flex-grow rounded" />
                <div className="w-12 h-4 bg-[#1a1a1a] rounded" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        <div className={`p-8 inline-block brutalist-border mb-10 transition-colors duration-500 ${
          isHovered 
            ? type === 'CREATE' ? 'bg-[#8b0000] text-white' : 'bg-[#2d5a27] text-white'
            : 'bg-[#1a1a1a] text-white'
        }`}>
          <Icon size={72} strokeWidth={2.5} />
        </div>
        
        <h3 className="text-6xl font-black leading-[0.85] mb-10 tracking-tighter">
          {title.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              <span className={isHovered && i % 2 === 1 ? 'text-[#8b0000]' : ''}>{word}</span>
              <br/>
            </React.Fragment>
          ))}
        </h3>
        
        <p className="font-mono-system text-xl font-bold uppercase leading-tight max-w-[85%] border-l-8 border-[#1a1a1a] pl-6">
          // {description}
        </p>
      </div>

      <div className={`relative z-10 w-full flex items-center justify-between border-t-4 border-[#1a1a1a] pt-10 transition-all ${isHovered ? 'bg-cream-white' : ''}`}>
        <span className="text-3xl font-black tracking-widest italic">INITIALIZE_CORE</span>
        <motion.div
          animate={isHovered ? { x: [0, 15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        >
          <ArrowRight size={56} strokeWidth={4} />
        </motion.div>
      </div>

      {/* Pulsing Glow */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          boxShadow: isHovered 
            ? ["0 0 20px rgba(0,0,0,0)", "0 0 40px rgba(0,0,0,0.2)", "0 0 20px rgba(0,0,0,0)"]
            : ["0 0 0px rgba(0,0,0,0)", "0 0 0px rgba(0,0,0,0)", "0 0 0px rgba(0,0,0,0)"]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      />
    </motion.div>
  );
};