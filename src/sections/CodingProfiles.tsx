import { motion } from 'framer-motion';
import { Github, Code, Trophy, Flame, GitCommit, Users, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const platformConfig: Record<string, { icon: typeof Github; color: string; gradient: string }> = {
  GitHub: { icon: Github, color: 'text-dark-50', gradient: 'from-gray-600 to-gray-800' },
  LeetCode: { icon: Code, color: 'text-yellow-500', gradient: 'from-yellow-600 to-orange-600' },
  Codeforces: { icon: Trophy, color: 'text-blue-500', gradient: 'from-blue-600 to-cyan-600' },
  GeeksforGeeks: { icon: Code, color: 'text-green-500', gradient: 'from-green-600 to-emerald-600' },
};

function StatCard({ label, value, icon: Icon, delay }: { label: string; value: number; icon: typeof Trophy; delay: number }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="game-card text-center p-4 rounded-xl"
    >
      <Icon size={20} className="mx-auto mb-2 text-neon-blue" />
      <div className="text-2xl font-bold text-dark-50">{count.toLocaleString()}</div>
      <div className="text-dark-400 text-xs">{label}</div>
    </motion.div>
  );
}

export default function CodingProfiles() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="coding-profiles" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Coding Profiles" subtitle="Problem solving journey" />

        {/* Overall Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard label="Problems Solved" value={portfolioData.stats.problemsSolved} icon={Code} delay={0} />
          <StatCard label="GitHub Commits" value={portfolioData.stats.githubCommits} icon={GitCommit} delay={0.1} />
          <StatCard label="Technologies" value={portfolioData.stats.technologies} icon={Trophy} delay={0.2} />
          <StatCard label="Experience (Years)" value={portfolioData.stats.experienceYears} icon={Flame} delay={0.3} />
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.codingProfiles.map((profile, index) => {
            const config = platformConfig[profile.platform] || { icon: Code, color: 'text-dark-200', gradient: 'from-gray-600 to-gray-800' };
            const Icon = config.icon;

            return (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="game-card group relative p-6"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Icon size={28} className={config.color} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-50 group-hover:text-neon-blue transition-colors">
                        {profile.platform}
                      </h3>
                      <p className="text-dark-400 text-sm">@{profile.username}</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-dark-400 group-hover:text-dark-50 transition-colors" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {profile.stats.problemsSolved !== undefined && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-neon-blue font-bold">{profile.stats.problemsSolved}</div>
                      <div className="text-dark-400 text-xs">Problems</div>
                    </div>
                  )}
                  {profile.stats.rating !== undefined && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-neon-purple font-bold">{profile.stats.rating}</div>
                      <div className="text-dark-400 text-xs">Rating</div>
                    </div>
                  )}
                  {profile.stats.streak !== undefined && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-neon-green font-bold">{profile.stats.streak}</div>
                      <div className="text-dark-400 text-xs">Streak</div>
                    </div>
                  )}
                  {profile.stats.contributions !== undefined && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-neon-cyan font-bold">{profile.stats.contributions}</div>
                      <div className="text-dark-400 text-xs">Contributions</div>
                    </div>
                  )}
                  {profile.stats.followers !== undefined && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-neon-pink font-bold">{profile.stats.followers}</div>
                      <div className="text-dark-400 text-xs">Followers</div>
                    </div>
                  )}
                  {profile.stats.badges && profile.stats.badges.length > 0 && (
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-yellow-500 font-bold">{profile.stats.badges.length}</div>
                      <div className="text-dark-400 text-xs">Badges</div>
                    </div>
                  )}
                </div>

                {/* Badges */}
                {profile.stats.badges && profile.stats.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.stats.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
