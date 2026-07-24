import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootLines = [
  'Initializing portfolio engine',
  'Loading skill tree',
  'Calibrating experience modules',
  'Rendering project showcase',
  'System ready',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 80);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 900);
          return 100;
        }
        return Math.min(prev + Math.random() * 2.8 + 0.4, 100);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const lineIndex = Math.min(Math.floor((progress / 100) * bootLines.length), bootLines.length - 1);
    setCurrentLine(lineIndex);
  }, [progress]);

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-950 scanlines"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />

      {/* Hex grid accent */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(61,214,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,214,200,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)',
      }} />

      <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-lg">

        {/* Logo mark — hexagonal emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-neon-blue/30"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-xl border border-neon-purple/20"
              animate={{ rotate: [360, 270, 180, 90, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-2xl font-bold tracking-[0.1em] text-dark-50">AK</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.12em] text-dark-50 uppercase select-none">
            Anshukumari Kumar
          </h1>
        </motion.div>

        {/* XP-style progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-full"
        >
          <div className="relative h-2 bg-dark-700 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3DD6C8 0%, #7FB069 50%, #F2A65A 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            {/* Glow tip */}
            <motion.div
              className="absolute top-0 h-full w-8 rounded-full blur-sm"
              style={{ left: `${progress}%`, background: 'rgba(61,214,200,0.6)' }}
            />
          </div>
        </motion.div>

        {/* Boot log + counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="flex items-center justify-between w-full font-mono"
        >
          <span className="text-neon-blue text-xs tracking-wide flex items-center gap-1">
            <ChevronRight size={12} className="animate-pulse" />
            {bootLines[currentLine]}
          </span>
          <span className="text-dark-500 text-xs tabular-nums">
            {String(Math.floor(progress)).padStart(3, '0')}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
