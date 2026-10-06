import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Mic, Globe, BookOpen, Music2, Map,
  Info, BarChart2, Shield, ChevronRight, House
} from 'lucide-react';

const navLinks = [
  { label: 'Home',      href: '/',            icon: House,    desc: 'Back to main page' },
  { label: 'Explore',    href: '/explore',     icon: Globe,    desc: 'Regional languages & dialects' },
  { label: 'Stories',    href: '/stories',     icon: BookOpen, desc: 'Folk literature & oral tales' },
  { label: 'Audio',      href: '/audio',       icon: Music2,   desc: 'Live studio recordings' },
  { label: 'Map',        href: '/map',         icon: Map,      desc: 'Interactive dialect map' },
  { label: 'Impact',     href: '/dashboard',   icon: BarChart2,desc: 'Linguistic preservation data' },
  { label: 'About',      href: '/about',       icon: Info,     desc: 'Heritage mission & archive' },
];



export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080C14]/92 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.7)] border-b border-white/10'
            : 'bg-[#080C14]/80 backdrop-blur-xl border-b border-white/5'
        }`}
      >
        <div
          className="w-full px-4 sm:px-8 lg:px-12"
          style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}
        >
          <div className="flex items-center justify-between h-18 sm:h-20 gap-4">

            {/* ── Brand Logo ── */}
            <Link to="/" className="flex items-center gap-3.5 shrink-0 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] transition-all duration-300">
                  <img src="/logo.png" alt="BhashaSetu Logo" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#080C14] shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-white text-xl sm:text-[22px] tracking-tight group-hover:text-emerald-300 transition-colors">
                  Bhasha<span className="text-emerald-400">Setu</span>
                </div>
                <div className="text-xs text-emerald-400/90 font-medium tracking-wide flex items-center gap-1.5" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                  <span>भाषासेतु</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30 font-semibold">CEP</span>
                  <span className="hidden sm:inline text-slate-500">·</span>
                  <span className="hidden sm:inline text-slate-400 text-[11px]">Living Heritage</span>
                </div>
              </div>
            </Link>

            {/* ── Desktop Navigation Links (All 6 drawer/grid links directly on header) ── */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2.5 flex-1 justify-center max-w-4xl mx-auto">
              {navLinks.map(link => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative flex items-center gap-2 px-3.5 lg:px-4 py-2 lg:py-2.5 text-sm lg:text-[15px] font-semibold rounded-2xl transition-all duration-200 group ${
                      active
                        ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.22)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon
                      size={17}
                      className={`transition-colors ${
                        active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ── Right Actions: Contribute CTA, Moderator Panel, Hamburger Button ── */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Admin Shortcut (Desktop) */}
              <Link
                to="/admin"
                aria-label="Moderator panel"
                className="hidden md:flex p-2.5 text-slate-400 hover:text-emerald-300 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
                title="Moderator Panel"
              >
                <Shield size={18} />
              </Link>

              {/* Contribute CTA Button */}
              <Link
                to="/contribute"
                className="btn-primary text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <Mic size={15} />
                <span>Contribute</span>
              </Link>

              {/* ── 3-Line Hamburger Menu Button (Mobile & Small Screens) ── */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2.5 rounded-xl text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X size={22} className="text-emerald-400" /> : <Menu size={22} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── FULL ANDROID & MOBILE 3-LINE MENU DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-[100]">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm sm:max-w-md bg-[#080C14]/98 border-l border-emerald-500/20 shadow-[-20px_0_60px_rgba(0,0,0,0.95)] flex flex-col z-[101] overflow-hidden"
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                    <img src="/logo.png" alt="BhashaSetu" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-base leading-tight">
                      Bhasha<span className="text-emerald-400">Setu</span>
                    </div>
                    <div className="text-[11px] text-emerald-400/80 font-medium" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                      भाषासेतु · Navigation Menu
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Header Navigation
                </div>



                {navLinks.map(link => {
                  const active = isActive(link.href);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3.5 p-3.5 rounded-2xl transition-all border ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-500/35 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : 'bg-slate-900/50 hover:bg-slate-800/80 border-slate-800/60 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        active
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-emerald-400 group-hover:border-emerald-500/40'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm ${active ? 'text-emerald-300' : 'text-white'}`}>
                          {link.label}
                        </div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">
                          {link.desc}
                        </div>
                      </div>
                      <ChevronRight size={16} className={`shrink-0 ${active ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-white/10 bg-slate-950/80 space-y-2.5">
                <Link
                  to="/contribute"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-lg"
                >
                  <Mic size={16} />
                  <span>Contribute Your Voice</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Shield size={15} className="text-emerald-400" />
                  <span>Moderator Portal</span>
                </Link>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  Living Linguistic Heritage Archive of Maharashtra
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
