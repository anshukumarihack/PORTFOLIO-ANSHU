import { motion } from 'framer-motion';

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Jade orb — top-left */}
      <motion.div
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(61,214,200,0.10) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], x: [0, 40, 0], y: [0, -24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gold orb — bottom-right */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(242,166,90,0.09) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 1, 1.1], x: [0, -32, 0], y: [0, 28, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Faint center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(127,176,105,0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Coral accent — top-right */}
      <motion.div
        className="absolute -top-24 -right-24 w-[350px] h-[350px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(232,101,78,0.05) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.18, 1], x: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
