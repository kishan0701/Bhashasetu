import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight, Globe, Mic, BookOpen, Music2, MapPin,
  ArrowRight, Play, Pause, Sparkles,
  TrendingUp, CheckCircle, Star, Users, Radio
} from 'lucide-react';
import { impactStats, stories, audioRecordings } from '../data/mockData';
import { StoryCard } from '../components/StoryCard';
import { AudioCard } from '../components/AudioCard';

/* ─── Animated Counter ─────────────────────────────── */
const Counter: React.FC<{ end: number; suffix?: string; prefix?: string; duration?: number }> = ({
  end, suffix = '', prefix = '', duration = 1800
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

/* ─── Language dot on visual ────────────────────────── */
const LangDot: React.FC<{ name: string; native: string; x: string; y: string; delay: number; color: string }> = ({
  name, native, x, y, delay, color
}) => (
  <motion.div
    className="absolute group cursor-pointer z-10"
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: 'spring', stiffness: 220, damping: 18 }}
  >
    <div className={`w-3.5 h-3.5 rounded-full ${color} ring-2 ring-white/50 shadow-[0_0_14px_rgba(16,185,129,0.9)]`} />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
      <div className="bg-slate-900/98 backdrop-blur-xl rounded-xl shadow-2xl px-3.5 py-2 text-center whitespace-nowrap border border-slate-700/80">
        <p className="text-[12px] font-bold text-white">{name}</p>
        <p className="text-[11px] text-emerald-400 mt-0.5" style={{ fontFamily: 'Noto Sans Devanagari' }}>{native}</p>
      </div>
    </div>
  </motion.div>
);

/* ─── Language scroll ticker ─────────────────────────── */
const LanguageTicker: React.FC = () => {
  const items = ['मराठी', 'मालवणी', 'वऱ्हाडी', 'कोंकणी', 'अहिराणी', 'वारली', 'भिली', 'Marathi', 'Malvani', 'Varhadi', 'Konkani', 'Warli', 'Bhili', 'Ahirani'];
  const tripled = [...items, ...items, ...items];
  return (
    <div className="ticker-wrap py-4 border-y border-white/5 bg-[#060910]/80 backdrop-blur-sm">
      <div className="ticker-inner">
        {tripled.map((item, i) => (
          <span key={i} className="text-sm font-semibold text-emerald-400/70 flex items-center gap-3.5 shrink-0">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 inline-block shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          </span>
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [homeAudioFilter, setHomeAudioFilter] = useState('All');
  const heroAudioRef = useRef<HTMLAudioElement | null>(null);

  const filteredHomeAudio = useMemo(() => {
    if (homeAudioFilter === 'All') return audioRecordings.slice(0, 4);
    const matched = audioRecordings.filter(r => r.language.toLowerCase() === homeAudioFilter.toLowerCase());
    return matched.length > 0 ? matched : audioRecordings.slice(0, 4);
  }, [homeAudioFilter]);

  useEffect(() => {
    // Hero sample audio — local Varhadi Harvest Ovi folk song
    heroAudioRef.current = new Audio('/audio/a3_harvest_ovi.mp3');
    heroAudioRef.current.loop = false;
    heroAudioRef.current.volume = 0.85;
    heroAudioRef.current.addEventListener('ended', () => setPlaying(false));
    heroAudioRef.current.addEventListener('error', () => setPlaying(false));
    return () => {
      heroAudioRef.current?.pause();
    };
  }, []);

  const toggleHeroAudio = () => {
    const audio = heroAudioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // Force reload if ended or not started
      if (audio.ended || audio.readyState === 0) audio.load();
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const langDots = [
    { name: 'Marathi', native: 'मराठी', x: '50%', y: '50%', delay: 0.5, color: 'bg-emerald-400' },
    { name: 'Malvani', native: 'मालवणी', x: '28%', y: '65%', delay: 0.7, color: 'bg-cyan-400' },
    { name: 'Varhadi', native: 'वऱ्हाडी', x: '70%', y: '48%', delay: 0.9, color: 'bg-amber-400' },
    { name: 'Warli', native: 'वारली', x: '38%', y: '34%', delay: 1.1, color: 'bg-rose-400' },
    { name: 'Konkani', native: 'कोंकणी', x: '22%', y: '52%', delay: 1.3, color: 'bg-teal-400' },
    { name: 'Ahirani', native: 'अहिराणी', x: '44%', y: '72%', delay: 1.5, color: 'bg-purple-400' },
    { name: 'Bhili', native: 'भिली', x: '60%', y: '30%', delay: 1.7, color: 'bg-indigo-400' },
  ];

  const featureCards = [
    {
      icon: Globe,
      emoji: '🌏',
      title: 'Explore Languages',
      desc: 'Browse living regional languages and dialects with vocabulary, idiomatic phrases, and cultural dossiers.',
      href: '/explore',
      accent: '#10B981',
      bg: 'bg-emerald-500/12 border-emerald-500/25',
      iconCls: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    },
    {
      icon: Music2,
      emoji: '🎵',
      title: 'Audio Archive',
      desc: 'Listen to native-speaker recordings of words, proverbs, folk songs and oral narratives.',
      href: '/audio',
      accent: '#06B6D4',
      bg: 'bg-cyan-500/12 border-cyan-500/25',
      iconCls: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
    },
    {
      icon: BookOpen,
      emoji: '📖',
      title: 'Stories & Folklore',
      desc: 'Read oral histories, legends and ancient tales documented directly from regional storytellers.',
      href: '/stories',
      accent: '#8B5CF6',
      bg: 'bg-purple-500/12 border-purple-500/25',
      iconCls: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
    },
    {
      icon: Mic,
      emoji: '🎙️',
      title: 'Contribute',
      desc: 'Know a local term, proverb, or tale? Submit it directly into the digital sanctuary queue.',
      href: '/contribute',
      accent: '#FB7185',
      bg: 'bg-rose-500/12 border-rose-500/25',
      iconCls: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
    },
    {
      icon: MapPin,
      emoji: '🗺️',
      title: 'Language Map',
      desc: "Explore Maharashtra's geographical linguistic distribution on an interactive open-source map.",
      href: '/map',
      accent: '#FBBF24',
      bg: 'bg-amber-500/12 border-amber-500/25',
      iconCls: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    },
    {
      icon: TrendingUp,
      emoji: '📊',
      title: 'Our Impact',
      desc: 'Real-time analytics tracking words preserved, recordings archived, and active contributors.',
      href: '/dashboard',
      accent: '#818CF8',
      bg: 'bg-indigo-500/12 border-indigo-500/25',
      iconCls: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 w-full overflow-x-hidden">

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden pt-16 pattern-bg w-full">
        {/* Ambient Glowing Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-emerald-500/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-indigo-500/4 rounded-full blur-[160px]" />
        </div>

        {/* Grid dots overlay */}
        <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" aria-hidden />

        <div className="container-xl relative z-10 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full mb-7 backdrop-blur-md"
              >
                <Sparkles size={12} className="text-emerald-400" />
                Mumbai University CEP · Digital Linguistic Sanctuary
              </motion.div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[66px] xl:text-[72px] font-extrabold leading-[1.06] text-white mb-6 tracking-tight">
                Every Language<br />
                <span className="gradient-text">Carries a Universe.</span>
              </h1>

              <p className="text-[17px] sm:text-[18px] text-slate-300 leading-relaxed mb-9 max-w-lg">
                Discover, document, and preserve the endangered regional languages, dialects, and living voices that carry Maharashtra's rich cultural memory.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3.5 mb-10">
                <Link to="/explore" className="btn-primary text-[15px] px-6 py-3.5">
                  <Globe size={18} />
                  Explore Languages
                  <ChevronRight size={16} />
                </Link>
                <Link to="/contribute" className="btn-secondary text-[15px] px-6 py-3.5">
                  <Mic size={18} className="text-emerald-400" />
                  Contribute Your Voice
                </Link>
              </div>

              {/* Audio preview chip */}
              <button
                onClick={toggleHeroAudio}
                className="flex items-center gap-4 bg-slate-900/70 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-left hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all group max-w-sm backdrop-blur-md w-full sm:w-auto"
                aria-label="Sample audio recording"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 shadow-md transition-all ${playing ? 'shadow-[0_0_24px_rgba(16,185,129,0.7)]' : ''}`}>
                  {playing
                    ? <Pause size={18} className="text-white" />
                    : <Play size={18} className="text-white ml-0.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Sample Oral Archive</p>
                  <p className="text-[12px] text-slate-400 mt-0.5 font-medium">Lavani Folk Song · Maharashtra</p>
                </div>
                {playing && (
                  <div className="flex items-end gap-[3px] h-6 ml-auto shrink-0">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="w-[3px] bg-cyan-400 rounded-full animate-waveform"
                        style={{ height: '20px', animationDelay: `${i * 0.12}s`, boxShadow: '0 0 6px rgba(6,182,212,0.8)' }}
                      />
                    ))}
                  </div>
                )}
              </button>
            </motion.div>

            {/* Right: Cosmic Celestial Rings Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Rotating Rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin-slow" />
                <div className="absolute inset-[12px] rounded-full border border-cyan-500/15" style={{ animation: 'spin-slow 28s linear infinite reverse' }} />
                <div className="absolute inset-8 rounded-full border border-cyan-500/18 bg-slate-900/40 backdrop-blur-2xl" />
                <div className="absolute inset-16 rounded-full border border-indigo-500/18 bg-gradient-to-tr from-emerald-950/30 via-slate-900/60 to-cyan-950/30" />

                {/* Center Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                      भाषा
                    </div>
                    <div className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Heritage Archive</div>
                  </div>
                </div>

                {/* Dialect markers */}
                {langDots.map((d, i) => <LangDot key={i} {...d} />)}

                {/* Floating Glass Badge — New Recording */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 bg-slate-900/92 rounded-2xl shadow-2xl p-4 border border-emerald-500/30 backdrop-blur-xl min-w-[160px]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">New Recording</p>
                  </div>
                  <p className="text-sm font-bold text-white">Tarpa Chant</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">📍 Palghar, Warli</p>
                </motion.div>

                {/* Floating Glass Badge — Word Documented */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute -bottom-4 -left-6 bg-slate-900/92 rounded-2xl shadow-2xl p-4 border border-amber-500/30 backdrop-blur-xl min-w-[160px]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 bg-amber-400 rounded-full" />
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Word Documented</p>
                  </div>
                  <p className="text-sm font-bold text-white">"Nakto"</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Malvani · Petrichor</p>
                </motion.div>

                {/* Floating Glass Badge — Contributors */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute top-1/2 -left-8 -translate-y-1/2 bg-slate-900/92 rounded-2xl shadow-2xl p-3.5 border border-indigo-500/30 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-indigo-400" />
                    <p className="text-[10px] text-indigo-300 font-bold">38 Contributors</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── LANGUAGE TICKER ──────────────────────────────── */}
      <LanguageTicker />

      {/* ─── STATS STRIP ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/5 bg-gradient-to-r from-[#0D1626] via-[#0A1020] to-[#0D1626] py-16 w-full">
        {/* Glow accents */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-32 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-32 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { end: impactStats.languagesDocumented, label: 'Languages', sub: 'Documented', icon: '🌐' },
              { end: impactStats.dialectsRecorded, label: 'Dialects', sub: 'Recorded', icon: '🗣️' },
              { end: impactStats.wordsCollected, label: 'Words', sub: 'Collected', suffix: '+', icon: '📝' },
              { end: impactStats.storiesArchived, label: 'Stories', sub: 'Preserved', icon: '📖' },
              { end: impactStats.audioRecordings, label: 'Audio Tracks', sub: 'Archived', suffix: '+', icon: '🎵' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center px-2 group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-extrabold stat-number mb-1.5 tracking-tight">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-slate-200 text-sm font-semibold">{stat.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE CARDS ECOSYSTEM ──────────────────────── */}
      <section className="py-24 sm:py-32 pattern-bg w-full">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              <Globe size={12} /> Integrated Heritage Platform
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              A Complete Digital Sanctuary
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore, listen, read, and contribute — empowering communities to safeguard their living tongue for generations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featureCards.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`card p-7 group border ${feat.bg} hover:border-opacity-60`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${feat.iconCls}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-white text-[17px] mb-2 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{feat.desc}</p>
                  <Link
                    to={feat.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 group-hover:gap-3 transition-all duration-200"
                  >
                    Launch Module <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED STORIES ─────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#060910] border-t border-white/5 w-full">
        <div className="container-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-5">
            <div>
              <div className="section-label text-emerald-400 mb-3">
                <BookOpen size={12} /> Folk Tales & Oral Lore
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Featured Narratives
              </h2>
              <p className="text-slate-400 mt-3 max-w-lg text-sm sm:text-base leading-relaxed">
                Authentic oral stories documented from storytellers across Maharashtra's diverse regions.
              </p>
            </div>
            <Link to="/stories" className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 hover:gap-3 transition-all shrink-0">
              View All Stories <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {stories.slice(0, 3).map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED AUDIO ───────────────────────────────── */}
      <section className="py-24 sm:py-32 pattern-bg border-t border-white/5 w-full relative">
        <div className="container-xl">
          {/* Studio Console Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-3.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <Radio size={13} className="text-cyan-400" />
                <span>Native Speaker Voices · 48kHz Studio Archive</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Live Studio <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Recordings</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
                Immerse yourself in authentic voice recordings, oral hymns, and folklore narrated by elder native speakers across Maharashtra's living linguistic traditions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Link
                to="/audio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-white text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
              >
                <span>Explore All {audioRecordings.length} Recordings</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Studio Dialect Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {[
              { key: 'All', label: 'All Audio', icon: '🎙️', count: audioRecordings.length },
              { key: 'Malvani', label: 'Malvani', icon: '🌊', count: audioRecordings.filter(r => r.language === 'Malvani').length },
              { key: 'Warli', label: 'Warli', icon: '🌿', count: audioRecordings.filter(r => r.language === 'Warli').length },
              { key: 'Varhadi', label: 'Varhadi', icon: '🌾', count: audioRecordings.filter(r => r.language === 'Varhadi').length },
              { key: 'Marathi', label: 'Marathi', icon: '📜', count: audioRecordings.filter(r => r.language === 'Marathi').length },
              { key: 'Bhili', label: 'Bhili', icon: '🏹', count: audioRecordings.filter(r => r.language === 'Bhili').length },
              { key: 'Konkani', label: 'Konkani', icon: '🌴', count: audioRecordings.filter(r => r.language === 'Konkani').length },
            ].map(tab => {
              const active = homeAudioFilter.toLowerCase() === tab.key.toLowerCase();
              return (
                <button
                  key={tab.key}
                  onClick={() => setHomeAudioFilter(tab.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/25 to-emerald-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Audio Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredHomeAudio.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <AudioCard recording={rec} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL STRIP ────────────────────────────── */}
      <section className="py-24 bg-[#060910] border-t border-white/5 w-full">
        <div className="container-xl">
          {/* Testimonial Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
              <Star size={12} className="fill-amber-400 text-amber-400" /> Community Echoes
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Preserving What Words Cannot Replace
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-2.5">
              Reflections from elder speakers, university researchers, and cultural guardians preserving their mother tongues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'BhashaSetu preserved words my grandmother used that I had forgotten. This platform is a miracle.', name: 'Meena Naik', role: 'Community Member, Malvan', stars: 5 },
              { quote: 'As a linguist, the quality and cultural accuracy of the documentation here is extraordinary.', name: 'Dr. Ramesh Shet', role: 'Linguist & Verifier, Sindhudurg', stars: 5 },
              { quote: 'The Warli oral archive will ensure our children know where they came from. Invaluable work.', name: 'Sakharam Gamit', role: 'Warli Elder & Folk Artist', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 sm:p-7 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/90 transition-all rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                </div>
                <div className="pt-4 border-t border-slate-800/70">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #060910 0%, #080C14 40%, #0a1628 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Large background glow orbs */}
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container-xl" style={{ position: 'relative', zIndex: 10, padding: '6rem 1.5rem 7rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}
          >
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: '999px', padding: '6px 16px', marginBottom: '28px' }}>
              <CheckCircle size={13} style={{ color: '#34d399' }} />
              <span style={{ color: '#6ee7b7', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Active Linguistic Revival Movement</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight" style={{ marginBottom: '20px', lineHeight: 1.1 }}>
              Know a Dialect Word<br />
              <span style={{ background: 'linear-gradient(90deg, #34d399, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>or Story?</span>
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.7, marginBottom: '44px', maxWidth: '540px', margin: '0 auto 44px' }}>
              Every word you document becomes a permanent beacon in our open heritage archive.
              Together, we ensure no voice fades in silence.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <Link to="/contribute" className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>
                <Mic size={18} />
                Submit Word or Oral Story
              </Link>
              <Link to="/word-search" className="btn-secondary" style={{ fontSize: '15px', padding: '14px 32px' }}>
                Search Word Lexicon <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '56px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
              {[{val:'312', lbl:'Words Archived'},{val:'38', lbl:'Contributors'},{val:'7', lbl:'Dialects Saved'}].map(s => (
                <div key={s.lbl} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.val}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', letterSpacing: '0.05em' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;




