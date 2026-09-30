import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart2, Globe, Mic, BookOpen, Music2, Users,
  TrendingUp, CheckCircle, Award, MapPin, Star,
  ArrowUp, Zap
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie,
} from 'recharts';
import { languages, contributors, impactStats } from '../data/mockData';

/* ─── Animated Counter ───────────────────────────────── */
const Counter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({
  end, suffix = '', duration = 1600,
}) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  React.useEffect(() => {
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── Data ───────────────────────────────────────────── */
const monthlyData = [
  { month: 'Aug', words: 210, audio: 48, stories: 18 },
  { month: 'Sep', words: 340, audio: 72, stories: 27 },
  { month: 'Oct', words: 290, audio: 61, stories: 22 },
  { month: 'Nov', words: 460, audio: 95, stories: 34 },
  { month: 'Dec', words: 520, audio: 110, stories: 41 },
  { month: 'Jan', words: 480, audio: 88, stories: 38 },
  { month: 'Feb', words: 610, audio: 124, stories: 52 },
  { month: 'Mar', words: 720, audio: 143, stories: 60 },
];

const statusDistribution = [
  { name: 'Thriving', value: 2, color: '#10B981', fill: '#10B981' },
  { name: 'Stable', value: 2, color: '#3B82F6', fill: '#3B82F6' },
  { name: 'Vulnerable', value: 3, color: '#F59E0B', fill: '#F59E0B' },
  { name: 'Endangered', value: 2, color: '#EF4444', fill: '#EF4444' },
];

const kpiCards = [
  {
    label: 'Languages Documented',
    value: impactStats.languagesDocumented,
    icon: Globe,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/25',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)]',
    change: '+2 this quarter',
    trend: 'up',
  },
  {
    label: 'Words Collected',
    value: impactStats.wordsCollected,
    suffix: '+',
    icon: BarChart2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/25',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.18)]',
    change: '+124 this month',
    trend: 'up',
  },
  {
    label: 'Audio Recordings',
    value: impactStats.audioRecordings,
    suffix: '+',
    icon: Music2,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/25',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.18)]',
    change: '+18 this week',
    trend: 'up',
  },
  {
    label: 'Stories Archived',
    value: impactStats.storiesArchived,
    icon: BookOpen,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/25',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.18)]',
    change: '+6 this month',
    trend: 'up',
  },
  {
    label: 'Active Contributors',
    value: impactStats.contributors,
    icon: Users,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/25',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.18)]',
    change: '+34 this month',
    trend: 'up',
  },
  {
    label: 'Dialects Recorded',
    value: impactStats.dialectsRecorded,
    icon: Mic,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/25',
    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.18)]',
    change: '+3 this quarter',
    trend: 'up',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/98 border border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-xl text-xs">
        <p className="font-bold text-white mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: <span className="text-white">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ─── Component ──────────────────────────────────────── */
const DashboardPage: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-[0_0_20px_rgba(16,185,129,0.2)] tracking-wide uppercase">
              <TrendingUp size={13} className="text-emerald-400" /> Live Impact Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Our <span className="gradient-text">Impact</span> in Numbers
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Real-time metrics tracking BhashaSetu's journey to preserve Maharashtra's endangered linguistic heritage.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-page py-12 space-y-12">

        {/* ── KPI Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`card p-5 border ${kpi.bg} ${kpi.glow} flex flex-col gap-3`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.bg} border`}>
                  <Icon size={18} className={kpi.color} />
                </div>
                <div>
                  <div className={`text-2xl font-extrabold ${kpi.color} font-['Outfit'] tracking-tight leading-none`}>
                    <Counter end={kpi.value} suffix={kpi.suffix} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">{kpi.label}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <ArrowUp size={11} />
                  {kpi.change}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Monthly Growth Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 border border-white/6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Monthly Contributions</h2>
                <p className="text-xs text-slate-400 mt-0.5">Words, audio, and stories added per month</p>
              </div>
              <span className="badge badge-thriving flex items-center gap-1">
                <Zap size={10} /> Active
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="words" fill="#10B981" radius={[4, 4, 0, 0]} name="Words" />
                <Bar dataKey="audio" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Audio" />
                <Bar dataKey="stories" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Stories" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 mt-3 flex-wrap">
              {[{ color: '#10B981', label: 'Words' }, { color: '#06B6D4', label: 'Audio' }, { color: '#8B5CF6', label: 'Stories' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-6 border border-white/6"
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white">Language Health</h2>
              <p className="text-xs text-slate-400 mt-0.5">Status distribution across documented languages</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15,23,42,0.98)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {statusDistribution.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: s.color }} />
                    <span className="text-slate-400">{s.name}</span>
                  </div>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Trend Line ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-6 border border-white/6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Preservation Trend</h2>
            <p className="text-xs text-slate-400 mt-0.5">Cumulative growth in digital linguistic preservation</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="words" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 4, strokeWidth: 0 }} name="Words" />
              <Line type="monotone" dataKey="audio" stroke="#06B6D4" strokeWidth={2.5} dot={{ fill: '#06B6D4', r: 4, strokeWidth: 0 }} name="Audio" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Languages + Contributors Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top Languages by Words */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 border border-white/6"
          >
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Globe size={18} className="text-emerald-400" />
              Top Languages by Words
            </h2>
            <div className="space-y-3">
              {languages.slice(0, 7).sort((a, b) => b.wordCount - a.wordCount).map((lang, i) => {
                const max = languages[0].wordCount;
                const pct = Math.round((lang.wordCount / max) * 100);
                return (
                  <div key={lang.id}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-mono w-4">#{i + 1}</span>
                        <span className="text-slate-200 font-semibold">{lang.name}</span>
                        <span className="text-slate-500" style={{ fontFamily: 'Noto Sans Devanagari' }}>{lang.nativeName}</span>
                      </div>
                      <span className="font-bold text-emerald-400">{lang.wordCount.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #10B981, #06B6D4)` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-6 border border-white/6"
          >
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Award size={18} className="text-amber-400" />
              Top Contributors
            </h2>
            <div className="space-y-3">
              {contributors.slice(0, 6).sort((a, b) => b.contributions - a.contributions).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-emerald-500/25 transition-all">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 ${
                    i === 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                    i === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30' :
                    i === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-500/30' :
                    'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                  }`}>
                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin size={9} /> {c.region}
                      </span>
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="text-[10px] text-slate-400">{c.role}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-400">{c.contributions}</p>
                    <p className="text-[10px] text-slate-500">entries</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Achievement Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 border border-white/6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            <Star size={11} /> Project Milestones
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-8">BhashaSetu Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '🏆', title: 'Pioneer Archive', desc: '1st digital dialect archive in Maharashtra', color: 'text-amber-400', border: 'border-amber-500/25', bg: 'bg-amber-500/8' },
              { emoji: '🎙️', title: '500+ Voices', desc: 'Native speaker recordings captured', color: 'text-cyan-400', border: 'border-cyan-500/25', bg: 'bg-cyan-500/8' },
              { emoji: '🌏', title: '9 Dialects', desc: 'Regional varieties documented', color: 'text-emerald-400', border: 'border-emerald-500/25', bg: 'bg-emerald-500/8' },
              { emoji: '📖', title: '125+ Tales', desc: 'Oral stories saved for generations', color: 'text-purple-400', border: 'border-purple-500/25', bg: 'bg-purple-500/8' },
              { emoji: '👥', title: '800+ Community', desc: 'Active contributors nationwide', color: 'text-rose-400', border: 'border-rose-500/25', bg: 'bg-rose-500/8' },
              { emoji: '🏛️', title: 'CEP Recognized', desc: 'Mumbai University community project', color: 'text-indigo-400', border: 'border-indigo-500/25', bg: 'bg-indigo-500/8' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl p-4 border ${badge.border} ${badge.bg} flex flex-col items-center gap-2 text-center`}
              >
                <div className="text-3xl">{badge.emoji}</div>
                <p className={`text-xs font-bold ${badge.color}`}>{badge.title}</p>
                <p className="text-[10px] text-slate-500 leading-snug">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/20 p-8 sm:p-10 text-center"
        >
          <CheckCircle size={40} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-white mb-3">Join the Preservation Movement</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Every word you contribute becomes a permanent part of Maharashtra's digital linguistic heritage archive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contribute" className="btn-primary px-7 py-3">
              <Mic size={16} /> Start Contributing
            </a>
            <a href="/explore" className="btn-secondary px-7 py-3">
              <Globe size={16} /> Explore Languages
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DashboardPage;