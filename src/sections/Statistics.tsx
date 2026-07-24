import { motion } from 'framer-motion';
import { FolderGit2, Briefcase, Award, Code2, GitCommit, Cpu, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { label: 'Projects',      value: portfolioData.stats.projects,         icon: FolderGit2, accent: 'jade'   },
  { label: 'Internships',   value: portfolioData.stats.internships,      icon: Briefcase,   accent: 'gold'   },
  { label: 'Certificates',  value: portfolioData.stats.certificates,     icon: Award,       accent: 'green'  },
  { label: 'Awards Won',    value: portfolioData.stats.problemsSolved,   icon: Code2,       accent: 'coral'  },
  { label: 'Members Led',   value: portfolioData.stats.githubCommits,     icon: GitCommit,   accent: 'mint'   },
  { label: 'Technologies',  value: portfolioData.stats.technologies,     icon: Cpu,         accent: 'gold'   },
  { label: 'Years Exp.',    value: portfolioData.stats.experienceYears,  icon: Clock,       accent: 'jade'   },
];

const accentMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  jade:  { text: 'text-neon-blue',   bg: 'bg-neon-blue/10',   border: 'border-neon-blue/25',   glow: 'rgba(61,214,200,0.15)'  },
  gold:  { text: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/25', glow: 'rgba(242,166,90,0.15)'  },
  green: { text: 'text-neon-green',  bg: 'bg-neon-green/10',  border: 'border-neon-green/25',  glow: 'rgba(127,176,105,0.15)' },
  coral: { text: 'text-neon-pink',   bg: 'bg-neon-pink/10',   border: 'border-neon-pink/25',   glow: 'rgba(232,101,78,0.15)'  },
  mint:  { text: 'text-neon-cyan',   bg: 'bg-neon-cyan/10',   border: 'border-neon-cyan/25',   glow: 'rgba(168,230,207,0.15)' },
};

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2500);
  const { isInView } = useInView(0.3);
  const accent = accentMap[stat.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="game-card corner-accent group relative p-6 text-center overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)` }}
      />

      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${accent.bg} border ${accent.border} mb-4 transition-transform group-hover:scale-110`}>
          <stat.icon size={24} className={accent.text} />
        </div>

        {/* Count */}
        <motion.div className="text-4xl md:text-5xl font-bold text-dark-50 mb-2 tabular-nums">
          {count.toLocaleString()}+
        </motion.div>

        {/* Label */}
        <div className="text-dark-300 text-sm font-medium tracking-wide">{stat.label}</div>

        {/* Mini XP bar */}
        <div className="mt-3 h-1 rounded-full bg-dark-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #3DD6C8, #F2A65A)' }}
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Statistics() {
  const { ref } = useInView(0.1);

  return (
    <section id="statistics" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="By The Numbers" subtitle="Impact in digits" />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
