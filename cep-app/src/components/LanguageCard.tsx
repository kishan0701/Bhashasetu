import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import type { Language } from '../types';

const statusConfig = {
  thriving:   { label: 'Thriving',   cls: 'badge-thriving',   dot: 'bg-emerald-400' },
  stable:     { label: 'Stable',     cls: 'badge-stable',     dot: 'bg-cyan-400' },
  vulnerable: { label: 'Vulnerable', cls: 'badge-vulnerable', dot: 'bg-amber-400' },
  endangered: { label: 'Endangered', cls: 'badge-endangered', dot: 'bg-rose-400' },
};

interface LanguageCardProps {
  language: Language;
  index?: number;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({ language, index = 0 }) => {
  const status = statusConfig[language.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card group overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:shadow-[0_12px_36px_rgba(16,185,129,0.15)] transition-all"
    >
      {/* Top Gradient Accent */}
      <div className={`h-1.5 bg-gradient-to-r ${language.gradient}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${language.gradient} flex items-center justify-center text-xl shadow-md shrink-0 border border-white/10`}>
              {language.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-[16px] leading-tight truncate group-hover:text-emerald-300 transition-colors">
                {language.name}
              </h3>
              <p className="text-[12px] text-emerald-400/90 mt-0.5 font-medium" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                {language.nativeName}
              </p>
            </div>
          </div>
          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold shrink-0 flex items-center gap-1.5 ${status.cls}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
            {status.label}
          </span>
        </div>

        {/* Region */}
        <div className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-3">
          <MapPin size={12} className="text-emerald-400 shrink-0" />
          <span className="truncate">{language.region}, {language.state}</span>
          <span className="ml-auto shrink-0 text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60 capitalize">
            {language.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-slate-300 line-clamp-2 mb-4 leading-relaxed">{language.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: language.wordCount, label: 'Words', bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' },
            { val: language.audioCount, label: 'Audio', bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' },
            { val: language.storyCount, label: 'Stories', bg: 'bg-purple-500/10 border-purple-500/20 text-purple-300' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl py-2.5 text-center border`}>
              <p className="text-sm font-bold">{s.val.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {language.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/language/${language.id}`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold rounded-xl hover:bg-emerald-500 hover:text-white transition-all group/btn shadow-sm"
          aria-label={`Explore ${language.name}`}
        >
          Explore {language.name}
          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default LanguageCard;
