import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, Calendar, Award, Code, FileText, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

const typeColors: Record<string, string> = {
  internship: 'bg-neon-blue/15 text-neon-blue border-neon-blue/25',
  freelance: 'bg-neon-purple/15 text-neon-purple border-neon-purple/25',
  'open-source': 'bg-neon-green/15 text-neon-green border-neon-green/25',
  leadership: 'bg-neon-pink/15 text-neon-pink border-neon-pink/25',
  volunteer: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/25',
  teaching: 'bg-orange-500/15 text-orange-500 border-orange-500/25',
  research: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/25',
};

const typeIcons: Record<string, typeof Briefcase> = {
  internship: Briefcase,
  freelance: Briefcase,
  'open-source': Code,
  leadership: Award,
  volunteer: Award,
  teaching: Award,
  research: Code,
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState<string | null>(null);
  const { ref, isInView } = useInView(0.1);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Experience" subtitle="Quest log" />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue via-neon-green to-neon-purple opacity-30" />

          {portfolioData.experiences.map((exp, index) => {
            const Icon = typeIcons[exp.type] || Briefcase;
            const isExpanded = expandedId === exp.id;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative mb-8 md:mb-12 ${isLeft ? 'md:pr-[50%]' : 'md:pl-[50%]'}`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-6 w-4 h-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-green border-4 border-dark-950 z-10 ${
                  isLeft ? 'left-4 md:left-1/2 md:-translate-x-1/2' : 'left-4 md:left-1/2 md:-translate-x-1/2'
                }`} />

                {/* Card */}
                <div className={`ml-12 md:ml-0 ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                  <motion.div
                    className="game-card p-6 cursor-pointer"
                    onClick={() => toggleExpand(exp.id)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[exp.type] || 'bg-dark-500/15 text-dark-300 border-dark-500/25'}`}>
                            <Icon size={10} />
                            {exp.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-dark-50 mb-1">{exp.title}</h3>
                        <p className="text-neon-blue font-medium mb-2">{exp.company}</p>

                        <div className="flex items-center gap-2 text-dark-400 text-sm mb-3">
                          <Calendar size={14} />
                          {exp.startDate} - {exp.endDate}
                        </div>

                        <p className="text-dark-200 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1"
                      >
                        <ChevronDown size={20} className="text-dark-400" />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10">
                            {/* Achievements */}
                            <div className="mb-4">
                              <h4 className="text-dark-50 font-medium text-sm mb-2 flex items-center gap-2">
                                <Award size={14} className="text-neon-purple" />
                                Key Achievements
                              </h4>
                              <ul className="space-y-1.5">
                                {exp.achievements.map((achievement) => (
                                  <li key={achievement} className="flex items-start gap-2 text-dark-200 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1.5 flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-dark-50 font-medium text-sm mb-2 flex items-center gap-2">
                                <Code size={14} className="text-neon-blue" />
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {exp.certificateUrl && (
                              <button
                                onClick={() => setShowCertificate(exp.certificateUrl!)}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-sm font-medium hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all"
                              >
                                <FileText size={16} />
                                View Certificate
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl h-[85vh] bg-dark-800 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <h3 className="text-dark-50 font-semibold flex items-center gap-2">
                  <FileText size={18} className="text-neon-purple" />
                  Internship Certificate
                </h3>
                <button
                  onClick={() => setShowCertificate(null)}
                  className="text-dark-300 hover:text-dark-50 transition-colors p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              <iframe
                src={showCertificate}
                title="Internship Certificate"
                className="flex-1 w-full bg-white"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
