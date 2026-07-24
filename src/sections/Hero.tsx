import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Code, BookOpen, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ParticleBackground from '../components/ParticleBackground';

export default function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % portfolioData.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, url: portfolioData.socialLinks.find((s) => s.platform === 'GitHub')?.url || '#', label: 'GitHub' },
    { icon: Linkedin, url: portfolioData.socialLinks.find((s) => s.platform === 'LinkedIn')?.url || '#', label: 'LinkedIn' },
    { icon: Mail, url: portfolioData.socialLinks.find((s) => s.platform === 'Email')?.url || '#', label: 'Email' },
    { icon: Code, url: portfolioData.socialLinks.find((s) => s.platform === 'LeetCode')?.url || '#', label: 'LeetCode' },
    { icon: BookOpen, url: portfolioData.socialLinks.find((s) => s.platform === 'Medium')?.url || '#', label: 'Medium' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Background */}
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-transparent to-dark-950 z-[1]" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Greeting — quest badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="quest-badge">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-dark-100">Hi, I'm{' '}</span>
          <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent text-shadow-glow">
            {portfolioData.name}
          </span>
        </motion.h1>

        {/* Tagline with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-12 mb-8"
        >
          <motion.p
            key={currentTagline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-dark-200 font-mono"
          >
            <span className="text-neon-blue opacity-70">—</span>{' '}
            {portfolioData.taglines[currentTagline]}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-neon-blue ml-0.5"
            >
              |
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto text-dark-300 text-lg mb-10 leading-relaxed"
        >
          B.Tech CSE student at Vel Tech University (CGPA 9.03) specialising in AI/ML and full-stack development.
          IEEE WIE Chairperson, NASA Space Apps mentor, and national award-winning project lead.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {/* View Resume */}
          <motion.a
            href={portfolioData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-neon-blue/40 text-dark-50 font-semibold hover:bg-neon-blue/10 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={18} />
            View Resume
          </motion.a>

          <motion.a
            href={portfolioData.resumeUrl}
            download="Anshukumari_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-green text-dark-950 font-semibold shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download Resume
          </motion.a>
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-dark-50 font-semibold hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-dark-50 font-semibold hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
            <ExternalLink size={18} />
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-dark-50 hover:bg-white/10 hover:border-neon-blue/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-dark-400"
          >
            <span className="text-xs font-mono">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-dark-400 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
