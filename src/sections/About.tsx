import { motion } from 'framer-motion';
import { MapPin, Calendar, Languages, Award, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref: imageRef, isInView: imageInView } = useInView(0.2);
  const { ref: contentRef, isInView: contentInView } = useInView(0.2);

  const funFacts = [
    { label: 'Coffee Consumed', value: '1000+ cups' },
    { label: 'Lines of Code', value: '100k+' },
    { label: 'Bugs Fixed', value: '∞' },
    { label: 'All-nighters', value: '50+' },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Player profile" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo & Stats */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-blue/15 to-neon-purple/15 blur-2xl" />

              {/* Photo frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-dark-800/50 backdrop-blur-sm corner-accent">
                <img
                  src={portfolioData.about.photo}
                  alt={portfolioData.name}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(1.05) contrast(1.08) saturate(1.12)' }}
                />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-950/90 to-transparent">
                  <div className="flex items-center gap-2 text-sm text-dark-100">
                    <MapPin size={14} className="text-neon-blue" />
                    {portfolioData.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-100 mt-1">
                    <Calendar size={14} className="text-neon-blue" />
                    {portfolioData.availability}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-dark-800/90 backdrop-blur-sm border border-neon-blue/30 text-neon-blue text-sm font-medium"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Award size={14} className="inline mr-1" />
                Final Year
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
              Passionate about building{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                intelligent systems
              </span>
            </h3>

            <div className="space-y-4 text-dark-200 leading-relaxed">
              <p>{portfolioData.about.introduction}</p>
              <p>{portfolioData.about.careerObjective}</p>
              <p>
                <span className="text-dark-50 font-medium">Passion: </span>
                {portfolioData.about.passion}
              </p>
            </div>

            {/* Interests & Strengths */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="text-dark-50 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-neon-blue" />
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.about.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-dark-50 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-neon-purple" />
                  Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.about.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-sm"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-6">
              <h4 className="text-dark-50 font-semibold mb-3 flex items-center gap-2">
                <Languages size={16} className="text-neon-cyan" />
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.about.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun Facts — XP-style mini cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/20 transition-colors"
                >
                  <div className="text-neon-blue font-bold text-lg font-mono">{fact.value}</div>
                  <div className="text-dark-400 text-xs">{fact.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Download Resume */}
            <motion.a
              href={portfolioData.resumeUrl}
              download="Anshukumari_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 text-neon-blue font-medium hover:from-neon-blue/30 hover:to-neon-purple/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
