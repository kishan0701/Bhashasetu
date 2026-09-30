import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, User, Clock, CheckCircle, Headphones, BookOpen } from 'lucide-react';
import { stories, audioRecordings } from '../data/mockData';
import { AudioCard } from '../components/AudioCard';

const thumbnailGradients: Record<string, string> = {
  ocean: 'from-blue-600/80 via-teal-600/60 to-slate-900',
  field: 'from-amber-500/80 via-orange-600/60 to-slate-900',
  forest: 'from-emerald-600/80 via-teal-700/60 to-slate-900',
  coast: 'from-cyan-600/80 via-blue-700/60 to-slate-900',
};

const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const story = stories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#080C14] text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-white mb-2">Narrative Not Found</h2>
          <Link to="/stories" className="text-emerald-400 hover:underline">← Back to Stories Archive</Link>
        </div>
      </div>
    );
  }

  const relatedAudio = audioRecordings.filter(a => a.languageId === story.languageId).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pattern-bg">
      {/* Hero Header with guaranteed navbar clearance and centered container */}
      <div
        className={`relative overflow-hidden bg-gradient-to-b ${thumbnailGradients[story.thumbnail] || 'from-teal-900/80 via-slate-900 to-[#080C14]'} text-white border-b border-white/10 shadow-2xl`}
        style={{ paddingTop: '108px', paddingBottom: '48px' }}
      >
        {story.coverImage && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={story.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-25 filter blur-md scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/70 via-[#080C14]/85 to-[#080C14]" />
          </div>
        )}
        <div
          className="container-page relative z-10"
          style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
        >
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-white/90 hover:text-white text-xs sm:text-sm mb-6 transition-all backdrop-blur-sm"
          >
            <ChevronLeft size={16} /> Back to Stories Archive
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                <MapPin size={12} className="text-emerald-300" />
                {story.region}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-md border border-emerald-500/30">
                {story.language}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                <Clock size={12} />
                {story.readTime} min read
              </span>
              {story.hasAudio && (
                <span className="flex items-center gap-1 bg-cyan-500/25 border border-cyan-500/40 px-2.5 py-1 rounded-md text-cyan-200 font-medium">
                  <Headphones size={12} />
                  Audio Track Included
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2.5 tracking-tight leading-tight">
              {story.title}
            </h1>
            <p className="text-lg sm:text-2xl text-emerald-300/90 italic mb-5 font-serif">{story.titleTranslation}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <User size={14} className="text-emerald-400" />
                {story.contributor}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">{story.contributorRole}</span>
              {story.verified && (
                <>
                  <span className="text-slate-500">·</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle size={13} /> Community Verified
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reader Layout - Centered with max-w-1200 */}
      <div
        className="container-page py-10 sm:py-14"
        style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-8 space-y-6">
            {story.coverImage && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-[260px] sm:h-[360px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium text-white/90">{story.title} — {story.region}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                    Cultural Lore
                  </span>
                </div>
              </motion.div>
            )}
            {/* Original Native Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-slate-900/80 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl rounded-2xl"
            >
              <div className="flex items-center gap-2.5 mb-6 pb-3.5 border-b border-slate-800">
                <BookOpen size={20} className="text-emerald-400" />
                <h2 className="font-bold text-white text-lg sm:text-xl">Original Narrative ({story.language})</h2>
              </div>
              <div className="space-y-5">
                {story.content.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="text-slate-200 leading-relaxed text-base sm:text-lg font-medium"
                    style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Translation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-cyan-950/20 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl rounded-2xl"
            >
              <h2 className="font-bold text-cyan-300 text-base sm:text-lg mb-4 pb-2.5 border-b border-cyan-500/20">
                English / Universal Translation
              </h2>
              <div className="space-y-4">
                {story.contentTranslation.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Cultural Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card bg-emerald-950/20 border border-emerald-500/30 p-6 sm:p-7 backdrop-blur-xl rounded-2xl"
            >
              <h3 className="font-bold text-emerald-300 mb-2.5 text-base">Cultural Context & Ritual Usage</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{story.culturalContext}</p>
            </motion.div>

            {/* Related Audio */}
            {relatedAudio.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                id="audio"
                className="pt-2"
              >
                <h3 className="font-bold text-white mb-4 text-base sm:text-lg flex items-center gap-2">
                  <Headphones size={18} className="text-cyan-400" />
                  Accompanying Studio Audio
                </h3>
                <div className="grid gap-4">
                  {relatedAudio.map(rec => (
                    <AudioCard key={rec.id} recording={rec} compact />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="card bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl rounded-2xl shadow-xl">
              <h3 className="font-bold text-white mb-4 text-xs uppercase tracking-wider text-emerald-400">
                Story Metadata
              </h3>
              <dl className="space-y-3.5 text-xs sm:text-sm">
                {[
                  { label: 'Dialect', value: story.language },
                  { label: 'Region', value: story.region },
                  { label: 'Category', value: story.category },
                  { label: 'Est. Read Time', value: `${story.readTime} min` },
                  { label: 'Date Added', value: story.dateAdded },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 last:border-0 last:pb-0">
                    <dt className="text-slate-400">{item.label}</dt>
                    <dd className="font-semibold text-slate-100 capitalize">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card bg-gradient-to-br from-slate-900/90 to-slate-950 border border-emerald-500/20 p-6 backdrop-blur-xl rounded-2xl shadow-xl">
              <h3 className="font-bold text-white mb-2 text-sm">Oral Heritage Attribution</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                This narrative is preserved as part of the community-led digital documentation movement under Mumbai University CEP.
              </p>
              <Link to="/contribute" className="btn-primary w-full py-2.5 text-xs justify-center font-semibold">
                Share Another Oral Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;




