import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, User, Calendar } from 'lucide-react';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
}

export const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:shadow-[0_12px_32px_rgba(16,185,129,0.12)] transition-all p-5"
    >
      {/* Word & POS */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight">
            {word.word}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full font-medium">
              {word.partOfSpeech}
            </span>
            {word.verified && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <CheckCircle size={12} />
                Verified
              </span>
            )}
          </div>
        </div>
        <button
          aria-label={`Listen to pronunciation of ${word.word}`}
          className="flex items-center gap-1.5 text-xs bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 text-emerald-300 hover:text-white px-3 py-2 rounded-xl transition-all font-semibold shadow-sm"
        >
          <Play size={12} />
          Listen
        </button>
      </div>

      {/* Pronunciation */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 mb-3">
        <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">IPA Pronunciation</p>
        <p className="text-sm text-cyan-300 font-mono italic">/{word.pronunciation}/</p>
      </div>

      {/* Meaning */}
      <div className="mb-3">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Meaning</p>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">{word.meaning}</p>
      </div>

      {/* Example */}
      <div className="border-l-2 border-emerald-500/60 bg-emerald-500/5 rounded-r-xl pl-3.5 pr-2 py-2 mb-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Contextual Example</p>
        <p className="text-sm text-slate-200 italic mb-1">"{word.exampleSentence}"</p>
        <p className="text-xs text-slate-400">— {word.exampleTranslation}</p>
      </div>

      {/* Tags */}
      {word.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {word.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-800 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
        <span className="flex items-center gap-1">
          <User size={11} className="text-slate-500" />
          {word.contributor}
        </span>
        {word.verifiedBy && (
          <span className="text-emerald-400">By {word.verifiedBy}</span>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={11} className="text-slate-500" />
          {word.dateAdded}
        </span>
      </div>
    </motion.div>
  );
};

export default WordCard;
