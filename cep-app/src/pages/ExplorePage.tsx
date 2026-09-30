import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, RotateCcw, X, Search } from 'lucide-react';
import { languages } from '../data/mockData';
import { LanguageCard } from '../components/LanguageCard';
import { useApp } from '../context/AppContext';
import { fuzzySearchList } from '../utils/fuzzySearch';

const regions = ['All Regions', 'Konkan', 'Vidarbha', 'Marathwada', 'Khandesh', 'Mumbai', 'Palghar'];
const categories = ['All', 'Language', 'Dialect', 'Variety'];
const statuses = ['All Statuses', 'Thriving', 'Stable', 'Vulnerable', 'Endangered'];

const ExplorePage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const [region, setRegion] = useState('All Regions');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All Statuses');

  // Filtered languages with optional searchQuery from header, plus region & status
  const filtered = useMemo(() => {
    let result = languages;

    // Apply Region filter
    if (region !== 'All Regions') {
      result = result.filter(lang => lang.region.toLowerCase().includes(region.toLowerCase()));
    }

    // Apply Category filter
    if (category !== 'All') {
      result = result.filter(lang => lang.category.toLowerCase() === category.toLowerCase());
    }

    // Apply Status filter
    if (status !== 'All Statuses') {
      result = result.filter(lang => lang.status.toLowerCase() === status.toLowerCase());
    }

    // Apply intelligent search if set from header
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      const scored = fuzzySearchList(
        result,
        q,
        lang => [
          lang.name,
          lang.nativeName,
          lang.region,
          lang.category,
          lang.description,
          ...lang.tags,
        ],
        45
      );
      return scored.map(s => s.item);
    }

    return result;
  }, [searchQuery, region, category, status]);

  const hasFilters = searchQuery || region !== 'All Regions' || category !== 'All' || status !== 'All Statuses';
  const clearAll = () => {
    setSearchQuery('');
    setRegion('All Regions');
    setCategory('All');
    setStatus('All Statuses');
  };

  return (
    <div className="page-wrapper">
      {/* ── Page Hero with Centered Content ── */}
      <div className="page-hero">
        <div
          className="container-page text-center"
          style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center w-full"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-[0_0_20px_rgba(16,185,129,0.2)] tracking-wide uppercase">
              <Globe size={13} className="text-emerald-400" /> Living Language Repository
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Explore Regional Languages
            </h1>
            <p
              className="text-slate-300 text-base sm:text-lg leading-relaxed text-center"
              style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', width: '100%' }}
            >
              Browse the diverse linguistic tapestry of Maharashtra with cultural context, vocabulary, and audio archives.
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="container-page py-10 sm:py-12 pattern-bg"
        style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}
      >
        {/* ── CLEAN RESPONSIVE REGION & STATUS FILTER BAR ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/5">
          {/* Region Tabs / Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 -my-1 w-full md:w-auto">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  region === r
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Category, Status & Reset */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto flex-wrap">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/25 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Search Query Tag (from header) */}
        {searchQuery && (
          <div className="flex items-center gap-2 mb-5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-xl w-fit text-xs text-emerald-300">
            <Search size={13} className="text-emerald-400" />
            <span>Search filter: <strong className="text-white font-semibold">"{searchQuery}"</strong></span>
            <button
              onClick={() => setSearchQuery('')}
              className="ml-1 p-0.5 rounded hover:bg-emerald-500/20 text-emerald-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search filter"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* Result Count Banner */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-slate-400">
            Cataloging <span className="font-bold text-white">{filtered.length}</span> of {languages.length} living dialects
          </p>
          {hasFilters && (
            <span className="text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
              Filtered View Active
            </span>
          )}
        </div>

        {/* Grid of Language Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((lang, i) => (
              <LanguageCard key={lang.id} language={lang} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="text-6xl mb-5 opacity-50">🔍</div>
            <h3 className="text-xl font-bold text-white mb-3">No dialects match your search</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Try typing a related spelling or click any trending dialect badge above</p>
            <button onClick={clearAll} className="btn-primary mx-auto cursor-pointer">Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;




