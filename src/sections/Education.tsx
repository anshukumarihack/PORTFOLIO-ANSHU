import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Star, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

export default function Education() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Education" subtitle="Academic journey" />

        <div ref={ref} className="space-y-8">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="game-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <GraduationCap size={28} className="text-neon-blue" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-dark-50">{edu.institution}</h3>
                      <div className="flex items-center gap-2 text-dark-400 text-sm">
                        <Calendar size={14} />
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>

                    <p className="text-neon-blue font-medium mb-1">{edu.degree}</p>
                    <p className="text-dark-200 text-sm mb-4">{edu.field}</p>

                    {edu.cgpa && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-medium mb-4">
                        <Star size={14} />
                        CGPA: {edu.cgpa}
                      </div>
                    )}

                    {/* Coursework */}
                    <div className="mb-4">
                      <h4 className="text-dark-50 font-medium text-sm mb-2 flex items-center gap-2">
                        <BookOpen size={14} className="text-neon-purple" />
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-dark-50 font-medium text-sm mb-2">Highlights</h4>
                      <ul className="space-y-1.5">
                        {edu.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-dark-200 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
