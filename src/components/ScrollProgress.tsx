import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #3DD6C8 0%, #7FB069 35%, #F2A65A 70%, #E8654E 100%)',
        boxShadow: '0 0 10px rgba(61,214,200,0.4), 0 0 20px rgba(61,214,200,0.15)',
      }}
    />
  );
}
