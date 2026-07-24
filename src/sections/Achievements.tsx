import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Mic, Award, ScrollText, Code2, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

const categoryConfig: Record<string, { icon: typeof Trophy; color: string; label: string }> = {
  hackathon: { icon: Trophy, color: 'text-neon-blue', label: 'Hackathon' },
  competition: { icon: Medal, color: 'text-neon-purple', label: 'Competition' },
  'coding-contest': { icon: Code2, color: 'text-neon-green', label: 'Coding Contest' },
  award: { icon: Award, color: 'text-neon-pink', label: 'Award' },
  scholarship: { icon: Star, color: 'text-yellow-500', label: 'Scholarship' },
  'public-speaking': { icon: Mic, color: 'text-orange-500', label: 'Public Speaking' },
  leadership: { icon: Users, color: 'text-cyan-500', label: 'Leadership' },
  research: { icon: ScrollText, color: 'text-neon-cyan', label: 'Research' },
};

export default function Achievements() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Achievements" subtitle="Milestones & recognition" />

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((achievement, index) => {
            const config = categoryConfig[achievement.category] || { icon: Trophy, color: 'text-dark-200', label: 'Achievement' };
            const Icon = config.icon;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="game-card group p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                    <Icon size={24} className={config.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 ${config.color}`}>
                        {config.label}
                      </span>
                      <span className="text-dark-400 text-xs">{achievement.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-50 mb-2 group-hover:text-neon-blue transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-dark-200 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
