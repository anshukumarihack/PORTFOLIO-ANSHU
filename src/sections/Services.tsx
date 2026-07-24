import { motion } from 'framer-motion';
import { Globe, Coffee, Brain, BarChart3, Server, Plug, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

const iconMap: Record<string, typeof Globe> = {
  globe: Globe,
  coffee: Coffee,
  brain: Brain,
  'bar-chart-3': BarChart3,
  server: Server,
  plug: Plug,
};

export default function Services() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Services" subtitle="What I can do for you" />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="game-card group relative p-6"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/5 group-hover:to-neon-purple/5 transition-all" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-5 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all">
                    <Icon size={28} className="text-neon-blue" />
                  </div>

                  <h3 className="text-xl font-bold text-dark-50 mb-3 group-hover:text-neon-blue transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-dark-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
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
