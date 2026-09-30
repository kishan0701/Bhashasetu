import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Mic, BookOpen, Search, Users, Globe,
  ShieldCheck, Sparkles, ArrowRight, Zap, Heart, Map
} from 'lucide-react';
import { Link } from 'react-router-dom';

const coreObjectives = [
  { icon: Mic,        color: '#06B6D4', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.2)',   title: 'Voice Documentation',   desc: 'Recording phonetics, folk chants, and conversational nuances from elder speakers.' },
  { icon: BookOpen,   color: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  title: 'Oral Lore & Folklore',   desc: 'Preserving vanishing folktales, harvest songs, and ancestral stories.' },
  { icon: Search,     color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  title: 'Searchable Lexicon',     desc: 'Indexed, searchable regional vocabulary with standard Marathi translations.' },
  { icon: Users,      color: '#A855F7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.2)',  title: 'Community Co-Creation',  desc: 'Empowering elders and youth to document words unique to their homelands.' },
  { icon: ShieldCheck,color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   title: 'Linguistic Verification', desc: 'Authenticity through community reviews and academic vetting.' },
  { icon: Globe,      color: '#818CF8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)', title: 'Digital Cultural Equity', desc: 'Freely accessible to researchers, schools, and cultural learners worldwide.' },
];

const methodologySteps = [
  { step: '01', icon: Mic,     color: '#10B981', title: 'Community Fieldwork',     desc: 'Speakers record authentic dialect terms, stories, and songs via the mobile-friendly web recorder.' },
  { step: '02', icon: ShieldCheck, color: '#06B6D4', title: 'Linguistic Moderation', desc: 'Submissions are verified by elders and linguistic researchers for authentic pronunciation and origin.' },
  { step: '03', icon: BookOpen, color: '#A855F7', title: 'Permanent Preservation',  desc: 'Approved entries join the open-access digital archive with phonetic waveforms and geographic mapping.' },
];

const projectSpecs = [
  { label: 'Project',       value: 'BhashaSetu (भाषासेतू)' },
  { label: 'University',    value: 'Mumbai University CEP' },
  { label: 'Domain',        value: 'Regional Dialects & Oral Literature' },
  { label: 'Geographies',   value: 'Konkan · Khandesh · Vidarbha · Palghar' },
  { label: 'Stack',         value: 'React · TypeScript · Vite' },
  { label: 'License',       value: 'Open Cultural Commons' },
];

const globalStats = [
  { value: '~780', label: 'Languages in India',     color: '#10B981' },
  { value: '400+', label: 'Vulnerable or at risk',  color: '#F59E0B' },
  { value: '1 in 10', label: 'Digitally archived',  color: '#06B6D4' },
  { value: '100%', label: 'Free & open access',     color: '#A855F7' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

const AboutPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#06090F' }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '7rem 0 4rem',
        background: 'linear-gradient(180deg, #080D1A 0%, #06090F 100%)',
        textAlign: 'center',
      }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-120px', left: '20%', width: '500px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-80px', right: '10%', width: '350px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container-page" style={{ position: 'relative' }}>
          <motion.div {...fadeUp(0)}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '999px',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
              color: '#6EE7B7', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '22px',
            }}>
              <GraduationCap size={13} />
              Mumbai University · Community Engagement Project
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 1.08, color: '#fff', marginBottom: '16px',
            }}>
              About{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>BhashaSetu</span>
            </h1>

            <p style={{ color: '#64748B', fontSize: '15px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.75 }}>
              A digital sanctuary dedicated to safeguarding the living voices, words, and folklore of Maharashtra's endangered linguistic heritage.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {['🏛️ Academic Foundation', '🎙️ Native Fieldwork', '🌐 Free & Open Access'].map(tag => (
                <span key={tag} style={{
                  padding: '6px 14px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8', fontSize: '12px', fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-page" style={{ paddingBottom: '5rem' }}>

        {/* ─── URGENCY STATS ─────────────────────────────────── */}
        <motion.section {...fadeUp(0)} style={{ padding: '4rem 0 3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              <Sparkles size={12} /> The Urgency
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Every Lost Language is an Irreplaceable Cosmos
            </h2>
            <p style={{ color: '#475569', fontSize: '14px', maxWidth: '440px', margin: '0 auto' }}>
              Centuries of wisdom, folk philosophy, and identity at risk of silent extinction.
            </p>
          </div>

          {/* Stats + narrative in two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            {globalStats.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} style={{
                padding: '24px 20px', borderRadius: '16px', textAlign: 'center',
                background: `${s.color}0A`, border: `1px solid ${s.color}30`,
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color, fontFamily: 'monospace', lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div style={{
            padding: '20px 24px', borderRadius: '14px',
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)',
            color: '#6EE7B7', fontSize: '14px', fontStyle: 'italic',
            lineHeight: 1.7, textAlign: 'center', maxWidth: '600px', margin: '0 auto',
          }}>
            "BhashaSetu was created to reverse this trajectory — one word, one recording, one story at a time."
          </div>
        </motion.section>

        {/* ─── DIVIDER ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 4rem' }} />

        {/* ─── CORE OBJECTIVES ──────────────────────────────── */}
        <motion.section {...fadeUp(0)} style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06B6D4', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              <Zap size={12} /> Mission & Goals
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              What We Aim to Achieve
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '14px' }}>
            {coreObjectives.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.06)} style={{
                  padding: '22px', borderRadius: '16px',
                  background: obj.bg, border: `1px solid ${obj.border}`,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', marginBottom: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${obj.color}20`, border: `1px solid ${obj.color}40`,
                  }}>
                    <Icon size={17} color={obj.color} />
                  </div>
                  <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{obj.title}</h3>
                  <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.65 }}>{obj.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── DIVIDER ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 4rem' }} />

        {/* ─── METHODOLOGY ──────────────────────────────────── */}
        <motion.section {...fadeUp(0)} style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#A855F7', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              Our Methodology
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              How BhashaSetu Works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
            {methodologySteps.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.step} {...fadeUp(i * 0.1)} style={{
                  padding: '24px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: '16px', right: '18px',
                    fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)',
                    fontFamily: 'monospace', lineHeight: 1,
                  }}>{m.step}</div>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', marginBottom: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${m.color}15`, border: `1px solid ${m.color}35`,
                  }}>
                    <Icon size={18} color={m.color} />
                  </div>
                  <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{m.title}</h3>
                  <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.7 }}>{m.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── DIVIDER ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 4rem' }} />

        {/* ─── PROJECT SPECS ────────────────────────────────── */}
        <motion.section {...fadeUp(0)} style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              Academic Framework
            </div>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Project Specifications
            </h2>
            <p style={{ color: '#475569', fontSize: '13px' }}>University of Mumbai · Community Engagement Programme</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '10px',
            padding: '24px',
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {projectSpecs.map((spec, i) => (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: '12px',
                background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '4px' }}>{spec.label}</div>
                <div style={{ fontSize: '13px', color: '#E2E8F0', fontWeight: 700 }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── DIVIDER ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 0 4rem' }} />

        {/* ─── CTA BANNER ───────────────────────────────────── */}
        <motion.section {...fadeUp(0)}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.07) 50%, rgba(16,185,129,0.05) 100%)',
            border: '1px solid rgba(16,185,129,0.2)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
          }}>
            {/* Corner glow */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              {/* Icon */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #059669, #0891b2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(16,185,129,0.35)',
              }}>
                <Heart size={24} color="#fff" />
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: '#10B981', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px',
              }}>
                <Sparkles size={11} /> Grassroots Preservation
              </div>

              <h2 style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 900, color: '#fff', letterSpacing: '-0.03em',
                lineHeight: 1.1, marginBottom: '12px',
              }}>
                Ready to Protect a<br />
                <span style={{
                  background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Living Dialect?</span>
              </h2>

              <p style={{ color: '#64748B', fontSize: '14px', maxWidth: '380px', margin: '0 auto 28px', lineHeight: 1.7 }}>
                Explore documented languages or contribute a word and voice recording from your own hometown.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  to="/explore"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 28px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #059669, #0891b2)',
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.35)'; }}
                >
                  <Map size={16} />
                  Explore Dialects
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/contribute"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 28px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#E2E8F0', fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'background 0.15s ease, border-color 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <Mic size={16} color="#10B981" />
                  Contribute Your Voice
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default AboutPage;
