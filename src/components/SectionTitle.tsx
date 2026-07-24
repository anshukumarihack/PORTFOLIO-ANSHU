import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div ref={ref} className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-2.5 mb-4 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.18em] uppercase border border-neon-blue/25 bg-neon-blue/5 text-neon-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-glow" />
            {subtitle}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-dark-50 leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.35 }}
        style={{ transformOrigin: align === 'center' ? 'center' : 'left' }}
        className={`relative h-[2px] w-20 mt-5 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple blur-sm opacity-50" />
      </motion.div>
    </div>
  );
}
