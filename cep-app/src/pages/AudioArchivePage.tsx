import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mic, Search, X, Headphones, Radio, Music, Disc3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { audioRecordings } from '../data/mockData';
import { AudioCard } from '../components/AudioCard';
import { fuzzySearchList } from '../utils/fuzzySearch';

const dialectTabs = [
  { key: 'All',     label: 'All',      icon: '🎙️', color: '#10B981' },
  { key: 'Malvani', label: 'Malvani',  icon: '🌊', color: '#06B6D4' },
  { key: 'Warli',   label: 'Warli',    icon: '🌿', color: '#34D399' },
  { key: 'Varhadi', label: 'Varhadi',  icon: '🌾', color: '#F59E0B' },
  { key: 'Marathi', label: 'Marathi',  icon: '📜', color: '#818CF8' },
  { key: 'Bhili',   label: 'Bhili',    icon: '🏹', color: '#A78BFA' },
  { key: 'Konkani', label: 'Konkani',  icon: '🌴', color: '#2DD4BF' },
  { key: 'Ahirani', label: 'Ahirani', icon: '🏔️', color: '#FB923C' },
];


const AudioArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  const filtered = useMemo(() => {
    let pool = audioRecordings;
    if (selectedLang !== 'All') {
      pool = pool.filter(r => r.language.toLowerCase() === selectedLang.toLowerCase());
    }
    const q = searchQuery.trim();
    if (!q) return pool;

    const scored = fuzzySearchList(
      pool,
      q,
      r => [r.title, r.language, r.speakerName, r.location, r.description, r.category],
      48
    );
    return scored.map(s => s.item);
  }, [searchQuery, selectedLang]);

  const totalPlays = useMemo(() => audioRecordings.reduce((s, r) => s + r.plays, 0), []);
  const activeTab = dialectTabs.find(t => t.key === selectedLang) || dialectTabs[0];

  return (
    <div style={{ minHeight: '100vh', background: '#06090F' }}>

      {/* ── Immersive Hero Banner ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        background: 'linear-gradient(180deg, #0A0E1A 0%, #060912 100%)',
      }}>
        {/* Ambient Glow Blobs */}
        <div style={{
          position: 'absolute', top: '-80px', left: '10%',
          width: '500px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-60px', right: '5%',
          width: '400px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Decorative Sound Wave Lines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.06 }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 300" preserveAspectRatio="none">
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d={`M0,${140 + i * 12} Q360,${80 + i * 14} 720,${140 + i * 12} Q1080,${200 + i * 10} 1440,${140 + i * 12}`}
                fill="none"
                stroke={i % 2 === 0 ? '#06B6D4' : '#10B981'}
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            {/* Live Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '999px',
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
              color: '#67E8F9', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '20px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#EF4444',
                boxShadow: '0 0 8px rgba(239,68,68,0.8)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <Radio size={12} />
              Native Audio Archive · Maharashtra
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}>
              Live Studio{' '}
              <span style={{
                background: 'linear-gradient(135deg, #06B6D4, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Recordings
              </span>
            </h1>

            <p style={{
              color: '#94A3B8',
              fontSize: '15px',
              maxWidth: '560px',
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}>
              Authentic field recordings of folk songs, oral folklore, and native pronunciations — documented directly from community elders across Maharashtra.
            </p>

            {/* Stats Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {[
                { icon: <Disc3 size={14} />, value: audioRecordings.length, label: 'Recordings', color: '#10B981' },
                { icon: <Music size={14} />, value: dialectTabs.length - 1, label: 'Dialects', color: '#06B6D4' },
                { icon: <Headphones size={14} />, value: totalPlays.toLocaleString(), label: 'Total Plays', color: '#A78BFA' },
                { icon: <TrendingUp size={14} />, value: '97%', label: 'Verified', color: '#F59E0B' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '16px', fontFamily: 'monospace' }}>{stat.value}</span>
                  <span style={{ color: '#64748B', fontSize: '12px', fontWeight: 600 }}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-page" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* ── Search + Filter Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '28px',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, speaker, dialect, location…"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${searchQuery ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '12px',
                padding: '12px 40px',
                fontSize: '14px',
                color: '#E2E8F0',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '6px',
                  padding: '3px', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Dialect Filter Pills */}
          <div style={{
            display: 'flex', gap: '8px', overflowX: 'auto',
            paddingBottom: '4px', scrollbarWidth: 'none',
          }}>
            {dialectTabs.map(tab => {
              const active = selectedLang === tab.key;
              const count = tab.key === 'All'
                ? audioRecordings.length
                : audioRecordings.filter(r => r.language === tab.key).length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedLang(tab.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${active ? tab.color + '60' : 'rgba(255,255,255,0.07)'}`,
                    background: active ? `${tab.color}18` : 'rgba(255,255,255,0.03)',
                    color: active ? '#fff' : '#64748B',
                    fontSize: '12px', fontWeight: 700,
                    whiteSpace: 'nowrap', cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: active ? `0 0 12px ${tab.color}30` : 'none',
                  }}
                >
                  <span style={{ fontSize: '13px' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span style={{
                    padding: '1px 7px',
                    borderRadius: '999px',
                    background: active ? tab.color : 'rgba(255,255,255,0.06)',
                    color: active ? '#000' : '#64748B',
                    fontSize: '10px', fontWeight: 800,
                    minWidth: '20px', textAlign: 'center',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Result Count + Active Filter Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: activeTab.color,
              boxShadow: `0 0 8px ${activeTab.color}`,
              display: 'inline-block',
            }} />
            <span style={{ color: '#94A3B8', fontSize: '13px' }}>
              Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong>{' '}
              track{filtered.length !== 1 ? 's' : ''}{selectedLang !== 'All' ? ` · ${selectedLang}` : ''}
            </span>
          </div>
          {(searchQuery || selectedLang !== 'All') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedLang('All'); }}
              style={{
                color: '#F87171', fontSize: '12px', fontWeight: 700,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 10px', borderRadius: '8px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,113,113,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              Clear filters ×
            </button>
          )}
        </div>

        {/* ── Audio Grid ── */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
            gap: '16px',
          }}>
            {filtered.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <AudioCard recording={rec} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.08)',
            borderRadius: '20px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>🎙️</div>
            <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '6px', fontSize: '16px' }}>No recordings found</h3>
            <p style={{ color: '#475569', fontSize: '13px', marginBottom: '20px' }}>
              Try a different search term or remove the active filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedLang('All'); }}
              style={{
                padding: '10px 24px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#E2E8F0', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              Show All Recordings
            </button>
          </div>
        )}

        {/* ── Community Contribution Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '48px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.06) 50%, rgba(16,185,129,0.04) 100%)',
            border: '1px solid rgba(16,185,129,0.2)',
            padding: '32px',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px',
            width: '250px', height: '250px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '24px', flexWrap: 'wrap', position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, #059669, #0891b2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(16,185,129,0.3)',
              }}>
                <Mic size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '17px', marginBottom: '6px' }}>
                  Know an elder with traditional stories or songs?
                </h3>
                <p style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.6, maxWidth: '480px' }}>
                  Help preserve your mother tongue. Anyone can submit a voice recording directly through BhashaSetu — no equipment needed.
                </p>
              </div>
            </div>
            <Link
              to="/contribute"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669, #0891b2)',
                color: '#fff', fontWeight: 700, fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.3)';
              }}
            >
              <Mic size={16} />
              Contribute Your Voice
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        input::placeholder { color: #475569; }
        ::-webkit-scrollbar { height: 0; }
      `}</style>
    </div>
  );
};

export default AudioArchivePage;
