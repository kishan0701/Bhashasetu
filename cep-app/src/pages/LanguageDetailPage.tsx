import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, ChevronLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { languages, words, phrases, stories, audioRecordings } from '../data/mockData';
import { WordCard } from '../components/WordCard';
import { AudioCard } from '../components/AudioCard';
import { StoryCard } from '../components/StoryCard';

const statusConfig = {
  thriving: { label: 'Thriving', color: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' },
  stable: { label: 'Stable', color: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' },
  vulnerable: { label: 'Vulnerable', color: 'bg-amber-500/15 text-amber-300 border border-amber-500/30' },
  endangered: { label: 'Endangered 🔴', color: 'bg-rose-500/15 text-rose-300 border border-rose-500/30' },
};

const tabs = ['Overview', 'Words', 'Phrases', 'Stories', 'Audio'];

const LanguageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');

  const language = languages.find(l => l.id === id);
  if (!language) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#080C14] text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Language Profile Not Found</h2>
          <Link to="/explore" className="text-emerald-400 hover:underline">← Return to Language Catalog</Link>
        </div>
      </div>
    );
  }

  const langWords = words.filter(w => w.languageId === id);
  const langPhrases = phrases.filter(p => p.languageId === id);
  const langStories = stories.filter(s => s.languageId === id);
  const langAudio = audioRecordings.filter(a => a.languageId === id);
  const status = statusConfig[language.status];

  return (
    <div className="page-wrapper">
      {/* Hero Dossier */}
      <div className={`bg-gradient-to-br ${language.gradient} text-white py-14 relative overflow-hidden shadow-2xl`}>
        <div className="container-page">
          <Link to="/explore" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft size={16} /> Back to Catalog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-xl border border-white/20">
              {language.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{language.name}</h1>
                <span className="text-2xl opacity-80 font-bold" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{language.nativeName}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold bg-black/30 border border-white/20 text-white backdrop-blur-md capitalize`}>
                  {language.category}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                <span className="flex items-center gap-1"><MapPin size={14} />{language.region}, {language.state}</span>
                <span className="flex items-center gap-1"><Users size={14} />{language.community} Community</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold backdrop-blur-md ${status.color}`}>{status.label}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-xl">
            {[
              { label: 'Words', value: language.wordCount },
              { label: 'Phrases', value: language.phraseCount },
              { label: 'Stories', value: language.storyCount },
              { label: 'Audio', value: language.audioCount },
            ].map(stat => (
              <div key={stat.label} className="text-center bg-black/25 backdrop-blur-md border border-white/10 rounded-xl py-3 px-2">
                <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/10 sticky top-16 z-40">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container-page py-10 sm:py-12 pattern-bg">
        {/* Overview Tab */}
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="card bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
                <h2 className="font-extrabold text-white text-2xl mb-4 tracking-tight">About {language.name}</h2>
                <p className="text-slate-300 leading-relaxed text-[15px]">{language.longDescription}</p>
              </div>
              <div className="card bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
                <h3 className="font-bold text-white text-lg mb-3">Linguistic Background</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{language.linguisticBackground}</p>
              </div>
              {language.status === 'endangered' && (
                <div className="flex items-start gap-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 backdrop-blur-md">
                  <AlertTriangle size={24} className="text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-rose-300 text-base mb-1">Critically Endangered Living Dialect</p>
                    <p className="text-sm text-slate-300 leading-relaxed">This dialect is severely threatened. Your contributions — vocabulary, recordings, and oral lore — are urgently needed to preserve it for future generations.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="card bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl">
                <h3 className="font-bold text-white mb-4 text-base">Quick Facts</h3>
                <dl className="space-y-3.5 text-sm">
                  {[
                    { label: 'Region', value: language.region },
                    { label: 'State', value: language.state },
                    { label: 'Community', value: language.community },
                    { label: 'Living Speakers', value: language.speakers.toLocaleString() },
                    { label: 'Contributors', value: language.contributors },
                    { label: 'Last Updated', value: language.lastUpdated },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 last:border-0">
                      <dt className="text-slate-400 text-xs">{item.label}</dt>
                      <dd className="font-semibold text-white text-right max-w-[60%]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl">
                <h3 className="font-bold text-white mb-3 text-sm">Dialect Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {language.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-800 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-md">#{tag}</span>
                  ))}
                </div>
              </div>

              <Link
                to="/contribute"
                className="btn-primary w-full py-3.5"
              >
                + Contribute to {language.name}
              </Link>
            </div>
          </motion.div>
        )}

        {/* Words Tab */}
        {activeTab === 'Words' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-white">{langWords.length} Words Documented</h2>
              <Link to="/contribute" className="text-sm font-semibold text-emerald-400 hover:underline">+ Add a Word</Link>
            </div>
            {langWords.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {langWords.map(word => <WordCard key={word.id} word={word} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-5xl mb-4 opacity-60">📝</div>
                <h3 className="text-lg font-bold text-white mb-2">No words recorded yet</h3>
                <p className="text-slate-400 mb-5">Be the pioneer contributor to document words for {language.name}</p>
                <Link to="/contribute" className="btn-primary">Add a Word</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Phrases Tab */}
        {activeTab === 'Phrases' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-white">{langPhrases.length} Phrases & Idioms</h2>
              <Link to="/contribute" className="text-sm font-semibold text-cyan-400 hover:underline">+ Add a Phrase</Link>
            </div>
            {langPhrases.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {langPhrases.map(phrase => (
                  <div key={phrase.id} className="card bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white italic">
                        "{phrase.phrase}"
                      </h3>
                      {phrase.verified && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold shrink-0">
                          <CheckCircle size={13} />Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2 font-mono">Pronunciation: <span className="text-cyan-300 italic">/{phrase.pronunciation}/</span></p>
                    <p className="text-sm text-slate-200 mb-3 font-medium">{phrase.meaning}</p>
                    <div className="bg-slate-950/70 rounded-xl p-3.5 text-xs text-slate-300 border border-slate-800">
                      <p className="font-semibold text-emerald-400 mb-1">Cultural Context</p>
                      {phrase.context}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-800">
                      <span className="bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">{phrase.category}</span>
                      <span>· {phrase.contributor}</span>
                      <span>· {phrase.dateAdded}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-5xl mb-4 opacity-60">💬</div>
                <h3 className="text-lg font-bold text-white mb-2">No phrases yet</h3>
                <Link to="/contribute" className="btn-primary">Add a Phrase</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Stories Tab */}
        {activeTab === 'Stories' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-white">{langStories.length} Traditional Stories</h2>
              <Link to="/contribute" className="text-sm font-semibold text-purple-400 hover:underline">+ Share a Story</Link>
            </div>
            {langStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {langStories.map(story => <StoryCard key={story.id} story={story} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-5xl mb-4 opacity-60">📖</div>
                <h3 className="text-lg font-bold text-white mb-2">No folklore archived yet</h3>
                <Link to="/contribute" className="btn-primary">Share a Folk Story</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Audio Tab */}
        {activeTab === 'Audio' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-white">{langAudio.length} Voice Recordings</h2>
              <Link to="/contribute" className="text-sm font-semibold text-cyan-400 hover:underline">+ Add Recording</Link>
            </div>
            {langAudio.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {langAudio.map(rec => <AudioCard key={rec.id} recording={rec} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-5xl mb-4 opacity-60">🎙️</div>
                <h3 className="text-lg font-bold text-white mb-2">No recordings yet</h3>
                <Link to="/contribute" className="btn-primary">Record Your Voice</Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LanguageDetailPage;




