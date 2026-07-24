import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, RotateCw, Star, Zap, Clock, Tag } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SectionTitle from '../components/SectionTitle';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';

const categories = ['All', 'Programming Languages', 'AI / ML', 'Web Development', 'Databases', 'Tools & DevOps'];

const skillLogos: Record<string, string> = {
  python: 'Py', java: 'Ja', javascript: 'JS', c: 'C', cpp: 'C++',
  sklearn: 'SK', pandas: 'Pa', numpy: 'Nu', transformers: 'NLP',
  react: 'Re', nodejs: 'No', express: 'Ex', tailwind: 'Tw', html: 'H5',
  mongodb: 'Mo', mysql: 'My', supabase: 'Su',
  git: 'Git', postman: 'Pm', figma: 'Fi', vercel: 'Ve',
};

function proficiencyToLevel(p: number): number {
  if (p >= 90) return 5;
  if (p >= 80) return 4;
  if (p >= 75) return 3;
  if (p >= 60) return 2;
  return 1;
}

const levelLabels: Record<number, string> = {
  1: 'Novice', 2: 'Apprentice', 3: 'Adept', 4: 'Expert', 5: 'Master',
};

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

function rarityFor(proficiency: number): Rarity {
  if (proficiency >= 90) return 'legendary';
  if (proficiency >= 85) return 'epic';
  if (proficiency >= 78) return 'rare';
  return 'common';
}

const rarityConfig: Record<Rarity, {
  border: string;
  glow: string;
  label: string;
  text: string;
  stampBg: string;
  starColor: string;
  sheen: string;
}> = {
  common: {
    border: 'border-dark-400/30',
    glow: 'rgba(122,145,141,0.15)',
    label: 'Common',
    text: 'text-dark-300',
    stampBg: 'from-dark-500/20 to-dark-600/20',
    starColor: 'text-dark-300',
    sheen: 'from-dark-300/5',
  },
  rare: {
    border: 'border-neon-blue/40',
    glow: 'rgba(61,214,200,0.2)',
    label: 'Rare',
    text: 'text-neon-blue',
    stampBg: 'from-neon-blue/20 to-neon-cyan/10',
    starColor: 'text-neon-blue',
    sheen: 'from-neon-blue/10',
  },
  epic: {
    border: 'border-neon-purple/45',
    glow: 'rgba(242,166,90,0.2)',
    label: 'Epic',
    text: 'text-neon-purple',
    stampBg: 'from-neon-purple/20 to-neon-pink/10',
    starColor: 'text-neon-purple',
    sheen: 'from-neon-purple/10',
  },
  legendary: {
    border: 'border-neon-pink/50',
    glow: 'rgba(232,101,78,0.25)',
    label: 'Legendary',
    text: 'text-neon-pink',
    stampBg: 'from-neon-pink/25 to-neon-purple/15',
    starColor: 'text-neon-pink',
    sheen: 'from-neon-pink/12',
  },
};

const categoryColors: Record<string, string> = {
  'Programming Languages': 'from-neon-blue/15 to-neon-green/10',
  'AI / ML': 'from-neon-purple/15 to-neon-pink/10',
  'Web Development': 'from-neon-green/15 to-neon-cyan/10',
  'Databases': 'from-neon-cyan/15 to-neon-blue/10',
  'Tools & DevOps': 'from-neon-pink/15 to-neon-purple/10',
};

function SkillPostcard({ skill, index, total, isFlipped, onFlip, isInView }: {
  skill: typeof portfolioData.skills[0];
  index: number;
  total: number;
  isFlipped: boolean;
  onFlip: () => void;
  isInView: boolean;
}) {
  const level = proficiencyToLevel(skill.proficiency);
  const rarity = rarityFor(skill.proficiency);
  const cfg = rarityConfig[rarity];
  const catGradient = categoryColors[skill.category] || 'from-dark-500/10 to-dark-600/10';

  // Deterministic rotation per card
  const rotation = useMemo(() => {
    const seed = skill.name.charCodeAt(0) + skill.name.length;
    return ((seed % 7) - 3) * 0.8;
  }, [skill.name]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="perspective-1000"
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ scale: 1.06, rotateZ: 0, y: -8 }}
      >
        {/* ── FRONT ── */}
        <div
          className={cn(
            'relative rounded-2xl overflow-hidden border-2 bg-dark-800/70 backdrop-blur-sm cursor-pointer',
            cfg.border
          )}
          style={{ transform: 'rotateZ(0deg)', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          onClick={onFlip}
        >
          {/* Rarity glow on hover */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${cfg.glow}, transparent 70%)` }}
          />

          {/* Category gradient bg */}
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none', catGradient)} />

          {/* Top bar: card number + rarity */}
          <div className="relative flex items-center justify-between px-3 pt-2.5">
            <span className="text-[10px] font-mono text-dark-400 tracking-wider">
              #{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
            <span className={cn('text-[10px] font-bold uppercase tracking-wider', cfg.text)}>
              {cfg.label}
            </span>
          </div>

          {/* Stamp area */}
          <div className="relative px-3 pt-2 pb-3">
            <div className="flex items-start gap-3">
              {/* Stamp */}
              <div className={cn(
                'relative w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0',
                cfg.stampBg
              )}>
                {/* Perforated edge effect */}
                <div className="absolute inset-0 rounded-lg border border-dashed border-white/15" />
                <span className={cn('font-bold text-base', cfg.text)}>
                  {skillLogos[skill.logo] || skill.name.slice(0, 2)}
                </span>
              </div>

              {/* Name + level */}
              <div className="flex-1 min-w-0">
                <h3 className="text-dark-50 font-semibold text-sm leading-tight truncate">
                  {skill.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="level-chip text-[10px] w-5 h-5">L{level}</span>
                  <span className="text-[10px] text-dark-300 font-medium">{levelLabels[level]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="relative px-3 pb-2">
            <div className="xp-bar h-1.5">
              <motion.div
                className="xp-bar-fill"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-dark-400 font-mono uppercase tracking-wider">XP</span>
              <span className={cn('text-[10px] font-mono font-bold tabular-nums', cfg.text)}>
                {skill.proficiency}%
              </span>
            </div>
          </div>

          {/* Stars for rarity */}
          <div className="relative flex items-center justify-center gap-0.5 pb-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={8}
                className={cn(
                  i < level ? cfg.starColor : 'text-dark-600',
                  i < level && 'fill-current'
                )}
              />
            ))}
          </div>

          {/* Flip hint */}
          <div className="relative flex items-center justify-center pb-2.5 gap-1 text-dark-500 text-[9px] font-mono uppercase tracking-wider">
            <RotateCw size={9} />
            Tap to flip
          </div>

          {/* Sheen sweep */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none',
            cfg.sheen
          )} />
        </div>

        {/* ── BACK ── */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl overflow-hidden border-2 bg-dark-800/80 backdrop-blur-sm cursor-pointer p-4 flex flex-col justify-between',
            cfg.border
          )}
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          onClick={onFlip}
        >
          {/* Postcard back lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-dark-100" />
            <div className="absolute left-1/2 top-4 bottom-4 w-px border-l border-dashed border-dark-100" />
          </div>

          {/* Stamp box */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-dark-400 tracking-wider">POSTCARD</span>
              <span className={cn('text-[10px] font-bold uppercase', cfg.text)}>{cfg.label}</span>
            </div>

            {/* "Address" area */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Tag size={11} className="text-neon-blue flex-shrink-0" />
                <span className="text-dark-200">{skill.category}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Zap size={11} className="text-neon-purple flex-shrink-0" />
                <span className="text-dark-200">{levelLabels[level]} · Level {level}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock size={11} className="text-neon-green flex-shrink-0" />
                <span className="text-dark-200">{skill.experience}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* "Message" area */}
            <div className="text-[11px] text-dark-300 leading-relaxed font-mono">
              <p className="mb-1">
                <span className="text-neon-blue">XP:</span> {skill.proficiency}/100
              </p>
              <p>
                <span className="text-neon-purple">Rank:</span> {cfg.label}
              </p>
            </div>
          </div>

          {/* Stars + flip hint */}
          <div className="relative">
            <div className="flex items-center justify-center gap-0.5 mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={8}
                  className={cn(
                    i < level ? cfg.starColor : 'text-dark-600',
                    i < level && 'fill-current'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 text-dark-500 text-[9px] font-mono uppercase tracking-wider">
              <RotateCw size={9} />
              Tap to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const { ref, isInView } = useInView(0.1);

  const filteredSkills = portfolioData.skills.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFlip = (name: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const collectedCount = portfolioData.skills.length;
  const legendaryCount = portfolioData.skills.filter((s) => rarityFor(s.proficiency) === 'legendary').length;
  const epicCount = portfolioData.skills.filter((s) => rarityFor(s.proficiency) === 'epic').length;
  const rareCount = portfolioData.skills.filter((s) => rarityFor(s.proficiency) === 'rare').length;

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Skill Postcards" subtitle="Collectible card set" />

        {/* Collection stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl bg-dark-800/40 border border-white/10"
        >
          <div className="flex items-center gap-2 text-sm">
            <Sparkles size={16} className="text-neon-blue" />
            <span className="text-dark-50 font-semibold">{collectedCount}</span>
            <span className="text-dark-400">collected</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-neon-pink" />
            <span className="text-dark-300">{legendaryCount} Legendary</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            <span className="text-dark-300">{epicCount} Epic</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-neon-blue" />
            <span className="text-dark-300">{rareCount} Rare</span>
          </div>
          <div className="ml-auto text-xs font-mono text-dark-400">
            {filteredSkills.length} showing
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/50 border border-white/10 text-dark-50 placeholder-dark-400 focus:outline-none focus:border-neon-blue/50 text-sm"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category
                  ? 'bg-gradient-to-r from-neon-blue to-neon-green text-dark-950 shadow-lg shadow-neon-blue/20 font-semibold'
                  : 'bg-white/5 text-dark-200 hover:text-dark-50 hover:bg-white/10 border border-white/10'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Postcard Grid */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillPostcard
                key={skill.name}
                skill={skill}
                index={index}
                total={filteredSkills.length}
                isFlipped={flippedCards.has(skill.name)}
                onFlip={() => toggleFlip(skill.name)}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 3D flip perspective */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}
