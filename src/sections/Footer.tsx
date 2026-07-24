import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const navLinks = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Contact', href: 'contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {portfolioData.name}
            </motion.div>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              {portfolioData.title} passionate about building intelligent systems and innovative solutions.
            </p>
            <div className="flex gap-3">
              {portfolioData.socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.platform}
                >
                  {social.platform === 'GitHub' && <Github size={16} />}
                  {social.platform === 'LinkedIn' && <Linkedin size={16} />}
                  {social.platform === 'Email' && <Mail size={16} />}
                  {social.platform === 'LeetCode' && <span className="text-xs font-bold">LC</span>}
                  {social.platform === 'Medium' && <span className="text-xs font-bold">M</span>}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-50 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => document.getElementById(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-dark-400 hover:text-neon-blue transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-dark-50 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="text-dark-400 hover:text-neon-blue transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={14} />
                  {portfolioData.email}
                </a>
              </li>
              <li className="text-dark-400 text-sm">
                {portfolioData.location}
              </li>
              <li className="text-dark-400 text-sm">
                {portfolioData.availability}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-dark-400 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-neon-pink" /> by {portfolioData.name}
          </p>
          <p className="text-dark-400 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
