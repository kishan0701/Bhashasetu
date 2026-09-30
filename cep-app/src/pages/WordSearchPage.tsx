import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Sparkles, X, Volume2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { words } from '../data/mockData';
import { fuzzySearchList } from '../utils/fuzzySearch';

const dialects = ['All', 'Malvani', 'Warli', 'Varhadi', 'Konkani', 'Ahirani', 'Bhili', 'Marathi'];

const WordSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [selectedDialect, setSelectedDialect] = useState('All');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Sync state if URL search param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams]);

  // Handle typing and update URL
  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // Perform fuzzy search with typo tolerance and phonetic matching
  const searchResults = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];

    const scored = fuzzySearchList(
      words,
      q,
      w => [w.word, w.meaning, w.pronunciation, w.languageId, w.exampleSentence, ...(w.relatedWords || [])],
      50 // threshold: allows spelling variations and typos
    );

    // Apply dialect filter if not 'All'
    if (selectedDialect === 'All') return scored;
    return scored.filter(res => res.item.languageId.toLowerCase() === selectedDialect.toLowerCase());
  }, [query, selectedDialect]);

  // Detect if top match is a related/fuzzy spelling
  const bestMatch = searchResults[0];
  const isFuzzyCorrection = useMemo(() => {
    if (!bestMatch || query.trim().length < 2) return null;
    const q = query.toLowerCase().trim();
    const word = bestMatch.item.word.toLowerCase();
    if (word !== q && bestMatch.score < 98 && bestMatch.score >= 60) {
      return bestMatch.item.word;
    }
    return null;
  }, [bestMatch, query]);

  // Voice pronunciation synthesis using Web Speech API
  const handlePronounce = (wordText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      // Try to find an Indian English or Hindi/Marathi voice
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang === 'mr-IN' || v.lang === 'hi-IN' || v.lang === 'en-IN');
      if (indianVoice) utterance.voice = indianVoice;

      setPlayingWord(wordText);
      utterance.onend = () => setPlayingWord(null);
      utterance.onerror = () => setPlayingWord(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const suggestions = ['Nakto', 'Tarpa', 'Sobit', 'Phugadi', 'Ghodi', 'Dhundhi', 'Gavat', 'Chav'];

  return (
    <div className="page-wrapper">
      {/* ─── Hero Header & Search Bar ────────────────────────────────────────── */}
      <div className="page-hero">
        <div className="container-page text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} className="text-emerald-400" />
              <span>Smart Phonetic Lexicon Search</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Dialect Lexicon & Word Search
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Search any vernacular word, proverb, or cultural expression with typo-tolerant and phonetic spelling recognition.
            </p>

            {/* ─── High-End Search Input Bar ─── */}
            <div className="max-w-2xl mx-auto" style={{ margin: '0 auto' }}>
              <div className="relative group">
                {/* Ambient glow around search bar */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-indigo-500/40 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300" />

                <div className="relative flex items-center bg-[#070C16] border border-slate-700/80 group-hover:border-cyan-500/60 rounded-2xl shadow-2xl transition-all">
                  <div className="pl-4 text-slate-400">
                    <Search size={20} className="text-cyan-400" />
                  </div>

                  <input
                    type="text"
                    value={query}
                    onChange={e => handleQueryChange(e.target.value)}
                    placeholder="Type in English or Marathi (e.g. Tarpa, Sobit, Nakto, Malvani)..."
                    className="w-full bg-transparent px-3.5 py-4 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-0 font-medium"
                    autoFocus
                  />

                  {query && (
                    <button
                      onClick={() => handleQueryChange('')}
                      className="p-2 mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions row */}
              <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                <span className="text-slate-400 text-xs font-semibold">Try searching:</span>
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => handleQueryChange(s)}
                    className="text-xs bg-slate-900/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 px-3 py-1 rounded-full border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer backdrop-blur-md"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Search Results & Dialect Filtering ────────────────────────────────── */}
      <div className="container-page py-10 pattern-bg">
        {/* Dialect Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {dialects.map(d => {
            const active = selectedDialect === d;
            return (
              <button
                key={d}
                onClick={() => setSelectedDialect(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  active
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {d === 'All' ? 'All Dialects' : d}
              </button>
            );
          })}
        </div>

        {/* Results Area */}
        {query.trim().length >= 2 ? (
          <div>
            {/* Header info & Typo suggestion banner */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="text-sm text-slate-400">
                Found <strong className="text-white font-mono">{searchResults.length}</strong> matching word{searchResults.length !== 1 ? 's' : ''} for "{query}"
              </div>

              {isFuzzyCorrection && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Sparkles size={12} className="text-cyan-400" />
                  <span>Related spelling match: <strong>"{isFuzzyCorrection}"</strong></span>
                </div>
              )}
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map(({ item: word, score }, i) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-2xl bg-[#090F1E]/90 border border-slate-800/90 hover:border-slate-700/90 transition-all shadow-md"
                  >
                    {/* Header: Word + Pronounce button + Dialect */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {word.word}
                          </h2>
                          <span className="text-sm text-cyan-300 font-mono italic">
                            /{word.pronunciation}/
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                            {word.languageId}
                          </span>
                          <span className="text-xs text-slate-400">
                            {word.partOfSpeech}
                          </span>
                          {score < 95 && (
                            <span className="text-[10px] text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                              Fuzzy match ({score}%)
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePronounce(word.word)}
                        aria-label={`Listen to pronunciation of ${word.word}`}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                          playingWord === word.word
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white'
                        }`}
                      >
                        <Volume2 size={14} className={playingWord === word.word ? 'animate-pulse' : ''} />
                        <span>{playingWord === word.word ? 'Speaking...' : 'Listen Audio'}</span>
                      </button>
                    </div>

                    {/* Meaning */}
                    <div className="mb-4">
                      <p className="text-slate-200 text-base leading-relaxed font-medium">
                        {word.meaning}
                      </p>
                    </div>

                    {/* Example sentence */}
                    <div className="bg-[#050811] rounded-xl p-4 mb-4 border border-slate-800/80">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Contextual Example</p>
                      <p className="text-slate-200 italic mb-1 text-sm font-medium">"{word.exampleSentence}"</p>
                      <p className="text-xs text-slate-400">— {word.exampleTranslation}</p>
                    </div>

                    {/* Related Words */}
                    {word.relatedWords && word.relatedWords.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                        <span className="text-[11px] text-slate-500 font-semibold uppercase">Related:</span>
                        {word.relatedWords.map(rw => (
                          <button
                            key={rw}
                            onClick={() => handleQueryChange(rw)}
                            className="text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-0.5 rounded-lg border border-cyan-500/20 transition-all cursor-pointer"
                          >
                            {rw}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
                <div className="text-5xl mb-3">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No exact word found for "{query}"
                </h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                  We searched with typo-tolerance and phonetic approximation across all regional glossaries, but this word has not been documented yet.
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <Link
                    to={`/contribute?word=${encodeURIComponent(query)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>Contribute "{query}" to Archive</span>
                  </Link>
                  <button
                    onClick={() => handleQueryChange('')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-3 opacity-30">📖</div>
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              Search by Vernacular Word, Meaning, or Dialect
            </h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Our intelligent search automatically matches spelling mistakes and phonetic variations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordSearchPage;
