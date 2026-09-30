import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, X } from 'lucide-react';
import { stories } from '../data/mockData';
import { StoryCard } from '../components/StoryCard';

const categories = ['All', 'Folk Tale', 'Oral History', 'Personal Memory', 'Legend', 'Proverb Story', 'Ritual Narrative'];
const categoryKeys: Record<string, string> = {
  'Folk Tale': 'folk-tale',
  'Oral History': 'oral-history',
  'Personal Memory': 'personal-memory',
  'Legend': 'legend',
  'Proverb Story': 'proverb-story',
  'Ritual Narrative': 'ritual-narrative',
};

const StoriesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = stories.filter(story => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || story.title.toLowerCase().includes(q)
      || story.language.toLowerCase().includes(q)
      || story.region.toLowerCase().includes(q)
      || story.summary.toLowerCase().includes(q);
    const matchCat = selectedCategory === 'All' || story.category === categoryKeys[selectedCategory];
    return matchSearch && matchCat;
  });

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero">
        <div className="container-page text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center w-full"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-[0_0_20px_rgba(168,85,247,0.2)] tracking-wide uppercase">
              <BookOpen size={13} className="text-purple-400" /> Living Oral Tradition
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Stories & Ancestral Oral Lore
            </h1>
            <p
              className="text-slate-300 text-base sm:text-lg leading-relaxed text-center"
              style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', width: '100%' }}
            >
              Traditional folk tales, spiritual legends, personal memories, and oral histories from regional storytellers across Maharashtra.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-page py-10 sm:py-12 pattern-bg">
        {/* Search + Category filters */}
        <div className="bg-slate-900/70 rounded-2xl border border-slate-800/80 shadow-xl p-3.5 sm:p-5 mb-6 backdrop-blur-xl">
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search folk tales, narratives, dialects, regions…"
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-purple-500 shadow-inner"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.25)] font-semibold'
                    : 'bg-slate-800/70 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-400">
            Archiving <span className="font-bold text-white">{filtered.length}</span> narrative{filtered.length !== 1 && 's'}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="text-5xl mb-4 opacity-60">📖</div>
            <h3 className="text-xl font-bold text-white mb-2">No narratives found</h3>
            <p className="text-slate-400 mb-6">Try searching with a different keyword or reset filters</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;




