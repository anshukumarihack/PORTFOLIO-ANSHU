import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioData.testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioData.testimonials.length) % portfolioData.testimonials.length);
  };

  const current = portfolioData.testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Testimonials" subtitle="What people say" />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Quote icon */}
              <Quote size={48} className="mx-auto mb-6 text-neon-blue/30" />

              {/* Content */}
              <p className="text-xl md:text-2xl text-dark-200 leading-relaxed mb-8 italic">
                "{current.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-dark-50 font-bold text-lg">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-dark-50 font-semibold">{current.name}</div>
                  <div className="text-dark-400 text-sm">
                    {current.role} at {current.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {portfolioData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-neon-blue to-neon-purple'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
