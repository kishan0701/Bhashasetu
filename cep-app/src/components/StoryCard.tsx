import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Headphones, MapPin, User, Clock, CheckCircle, Play } from 'lucide-react';
import type { Story } from '../types';

const catConfig: Record<string, { emoji: string; label: string; color: string }> = {
  'folk-tale':       { emoji: '📖', label: 'Folk Tale',        color: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
  'oral-history':    { emoji: '🗣️', label: 'Oral History',     color: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' },
  'personal-memory': { emoji: '💭', label: 'Personal Memory',  color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  'legend':          { emoji: '⚡', label: 'Legend',           color: 'bg-rose-500/20 text-rose-300 border border-rose-500/30' },
  'proverb-story':   { emoji: '🌿', label: 'Proverb Story',    color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
  'ritual-narrative':{ emoji: '🕯️', label: 'Ritual Narrative', color: 'bg-slate-700/40 text-slate-300 border border-slate-600/40' },
};

const thumbGrad: Record<string, { grad: string; emoji: string }> = {
  ocean: { grad: 'from-blue-600/80 via-teal-600/60 to-slate-900',   emoji: '🌊' },
  field: { grad: 'from-amber-500/80 via-orange-600/60 to-slate-900', emoji: '🌾' },
  forest:{ grad: 'from-emerald-600/80 via-teal-700/60 to-slate-900', emoji: '🌲' },
  coast: { grad: 'from-cyan-600/80 via-blue-700/60 to-slate-900',    emoji: '🏖️' },
};

interface StoryCardProps { story: Story }

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cat = catConfig[story.category] || { emoji: '📖', label: story.category, color: 'bg-slate-800 text-slate-300 border border-slate-700' };
  const thumb = thumbGrad[story.thumbnail] || { grad: 'from-teal-600/80 to-slate-900', emoji: '📖' };

  const hasValidImage = Boolean(story.coverImage && !imageError);

  return (
    <div className="card group overflow-hidden flex flex-col bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] transition-all rounded-2xl">
      {/* Thumbnail */}
      <div className={`relative h-48 sm:h-52 bg-gradient-to-br ${thumb.grad} overflow-hidden shrink-0`}>
        {hasValidImage ? (
          <>
            <img
              src={story.coverImage}
              alt={story.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              loading="lazy"
            />
            {/* Top dark gradient overlay for crystal-clear badge contrast */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
            {/* Bottom dark gradient overlay for category pill and smooth transition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            {/* Large bg emoji */}
            <div className="absolute inset-0 flex items-center justify-center text-[80px] opacity-[0.2] select-none">
              {thumb.emoji}
            </div>
            {/* Devanagari watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/10 text-[56px] font-black select-none" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                कथा
              </span>
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {story.verified ? (
            <span className="flex items-center gap-1.5 bg-emerald-950/85 border border-emerald-500/50 backdrop-blur-md text-emerald-300 text-[11px] px-2.5 py-1 rounded-full font-semibold shadow-lg">
              <CheckCircle size={11} className="text-emerald-400" /> Verified
            </span>
          ) : <span />}
          {story.hasAudio && (
            <span className="flex items-center gap-1.5 bg-cyan-950/85 border border-cyan-500/50 backdrop-blur-md text-cyan-300 text-[11px] px-2.5 py-1 rounded-full font-semibold shadow-lg">
              <Headphones size={11} className="text-cyan-400" /> Audio
            </span>
          )}
        </div>

        {/* Category pill */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
          <span className={`backdrop-blur-md text-[11px] px-3.5 py-1 rounded-full font-semibold shadow-lg ${cat.color}`}>
            {cat.emoji} {cat.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Language + Region */}
        <div className="flex items-center gap-2 text-[12px] mb-2">
          <span className="font-semibold text-emerald-400">{story.language}</span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1 text-slate-400"><MapPin size={11} />{story.region}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-[16px] leading-snug mb-1 group-hover:text-emerald-300 transition-colors line-clamp-2">
          {story.title}
        </h3>
        <p className="text-[12px] text-slate-400 italic mb-3 line-clamp-1">{story.titleTranslation}</p>

        {/* Summary */}
        <p className="text-[13px] text-slate-300 line-clamp-3 mb-4 leading-relaxed flex-1">{story.summary}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[12px] text-slate-400 mb-4 border-t border-slate-800/80 pt-3">
          <span className="flex items-center gap-1.5"><User size={12} className="text-slate-500" />{story.contributor}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-slate-500" />{story.readTime} min read</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/stories/${story.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[13px] font-semibold rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
          >
            <BookOpen size={13} />
            Read Story
          </Link>
          {story.hasAudio && (
            <Link
              to={`/stories/${story.id}#audio`}
              aria-label="Listen to audio version"
              className="p-2.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 rounded-xl hover:bg-cyan-500 hover:text-white transition-all"
            >
              <Play size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
