import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Search, Tag } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';

const allTags = ['All', ...Array.from(new Set(portfolioData.projects.flatMap((p) => p.tags)))];

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { ref, isInView } = useInView(0.1);

  const featuredProjects = portfolioData.projects.filter((p) => p.featured);
  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesTag = activeTag === 'All' || project.tags.includes(activeTag);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const nextFeatured = () => setFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
  const prevFeatured = () => setFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Projects" subtitle="Featured builds" />

        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative rounded-3xl overflow-hidden game-card corner-accent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2"
                >
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={featuredProjects[featuredIndex].image}
                      alt={featuredProjects[featuredIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800/90 lg:bg-gradient-to-l" />

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        featuredProjects[featuredIndex].status === 'completed'
                          ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                          : featuredProjects[featuredIndex].status === 'in-progress'
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                          : 'bg-dark-500/20 text-dark-300 border border-dark-500/30'
                      }`}>
                        {featuredProjects[featuredIndex].status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                      {featuredProjects[featuredIndex].title}
                    </h3>
                    <p className="text-dark-200 mb-6 leading-relaxed">
                      {featuredProjects[featuredIndex].description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProjects[featuredIndex].techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dark-200 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {featuredProjects[featuredIndex].features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-dark-200 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {featuredProjects[featuredIndex].githubUrl && (
                        <a
                          href={featuredProjects[featuredIndex].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-dark-50 hover:bg-white/10 transition-colors text-sm"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                      {featuredProjects[featuredIndex].liveUrl && (
                        <a
                          href={featuredProjects[featuredIndex].liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-green text-dark-950 font-medium text-sm"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevFeatured}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-dark-50 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextFeatured}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-dark-50 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/50 border border-white/10 text-dark-50 placeholder-dark-400 focus:outline-none focus:border-neon-blue/50 text-sm"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTag === tag
                  ? 'bg-gradient-to-r from-neon-blue to-neon-green text-dark-950 shadow-lg shadow-neon-blue/20 font-semibold'
                  : 'bg-white/5 text-dark-200 hover:text-dark-50 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Tag size={12} />
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="game-card group relative overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />

                  {/* Status */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed'
                        ? 'bg-neon-green/20 text-neon-green'
                        : project.status === 'in-progress'
                        ? 'bg-neon-blue/20 text-neon-blue'
                        : 'bg-dark-500/20 text-dark-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark-50 mb-2 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-200 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-dark-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-dark-300 text-xs">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-dark-200 hover:bg-white/10 hover:text-dark-50 transition-colors text-sm"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-colors text-sm"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
