import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* ─── Modern Glowing Toast ─────────────────────────────── */
export const Toast: React.FC = () => {
  const { toast, showToast } = useApp();

  return (
    <AnimatePresence>
      {toast && toast.message && (
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl min-w-[280px] max-w-md border backdrop-blur-2xl ${
            toast.type === 'success'
              ? 'bg-slate-900/95 text-emerald-300 border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
              : toast.type === 'error'
              ? 'bg-slate-900/95 text-rose-300 border-rose-500/40 shadow-[0_10px_30px_rgba(244,63,94,0.3)]'
              : 'bg-slate-900/95 text-cyan-300 border-cyan-500/40 shadow-[0_10px_30px_rgba(6,182,212,0.3)]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle size={18} className="shrink-0 text-emerald-400" />}
          {toast.type === 'error' && <XCircle size={18} className="shrink-0 text-rose-400" />}
          {toast.type === 'info' && <Info size={18} className="shrink-0 text-cyan-400" />}
          <span className="text-sm font-medium flex-1 text-slate-100">{toast.message}</span>
          <button
            onClick={() => showToast('', toast.type)}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity p-0.5 text-slate-400 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── Premium Dark Footer ────────────────────────────── */
const footerLinks = {
  Explore: [
    { label: 'Languages', href: '/explore' },
    { label: 'Audio Archive', href: '/audio' },
    { label: 'Stories', href: '/stories' },
    { label: 'Language Map', href: '/map' },
    { label: 'Word Search', href: '/word-search' },
  ],
  Contribute: [
    { label: 'Add a Word', href: '/contribute' },
    { label: 'Share a Story', href: '/contribute' },
    { label: 'Record Audio', href: '/contribute' },
    { label: 'Submit a Phrase', href: '/contribute' },
    { label: 'Cultural Notes', href: '/contribute' },
  ],
  Platform: [
    { label: 'About BhashaSetu', href: '/about' },
    { label: 'Our Impact', href: '/dashboard' },
    { label: 'Moderator Panel', href: '/admin' },
  ],
};

export const Footer: React.FC = () => (
  <footer className="bs-footer">
    {/* Glowing top beam */}
    <div className="bs-footer-beam" />

    {/* Subtle background glow */}
    <div className="bs-footer-glow" />

    <div className="bs-footer-inner">

      {/* Main grid */}
      <div className="bs-footer-grid">

        {/* Brand col */}
        <div className="bs-footer-brand">
          <Link to="/" className="bs-footer-logo-link">
            <div className="bs-footer-logo-icon" style={{ overflow: 'hidden', background: 'none', padding: 0 }}>
              <img src="/logo.png" alt="BhashaSetu" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <span className="bs-footer-logo-name">
              Bhasha<span style={{ color: '#34d399' }}>Setu</span>
            </span>
          </Link>

          <p className="bs-footer-tagline">
            Preserving voices, words, and folklore of endangered regional dialects — a digital sanctuary for living linguistic heritage.
          </p>

          <div className="bs-footer-badge">
            <p className="bs-footer-badge-title">Mumbai University CEP Project</p>
            <p className="bs-footer-badge-sub">Digital Preservation of Regional Linguistic Heritage</p>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="bs-footer-col">
            <h4 className="bs-footer-col-heading">{section}</h4>
            <ul className="bs-footer-col-list">
              {links.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="bs-footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="bs-footer-divider" />

      {/* Bottom bar */}
      <div className="bs-footer-bottom">
        <p className="bs-footer-copyright">
          © {new Date().getFullYear()} BhashaSetu · Community Engagement Project
        </p>
        <p className="bs-footer-tagline-bottom">
          Open Digital Sanctuary for Endangered Dialects
        </p>
      </div>
    </div>

    <style>{`
      /* ── Footer Base ── */
      .bs-footer {
        background: #06090F;
        color: #94a3b8;
        border-top: 1px solid rgba(255,255,255,0.05);
        position: relative;
        overflow: hidden;
      }
      .bs-footer-beam {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent);
      }
      .bs-footer-glow {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 300px;
        background: radial-gradient(ellipse at top, rgba(16,185,129,0.04) 0%, transparent 70%);
        pointer-events: none;
      }
      .bs-footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 1.5rem 0;
      }

      /* ── Grid ── */
      .bs-footer-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 2.5rem;
        align-items: start;
      }

      /* ── Brand Column ── */
      .bs-footer-brand { grid-column: span 1; }
      .bs-footer-logo-link {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        text-decoration: none;
      }
      .bs-footer-logo-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: linear-gradient(135deg, #059669, #0891b2);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(16,185,129,0.25);
        flex-shrink: 0;
      }
      .bs-footer-logo-name {
        font-weight: 800;
        color: #fff;
        font-size: 20px;
        letter-spacing: -0.02em;
      }
      .bs-footer-tagline {
        font-size: 13px;
        line-height: 1.7;
        color: #64748b;
        margin-bottom: 20px;
      }
      .bs-footer-badge {
        background: rgba(15,23,42,0.8);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px;
        padding: 14px 16px;
      }
      .bs-footer-badge-title {
        font-size: 10px;
        color: #34d399;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        margin-bottom: 4px;
      }
      .bs-footer-badge-sub {
        font-size: 12px;
        color: #cbd5e1;
        font-weight: 500;
      }

      /* ── Link Columns ── */
      .bs-footer-col {}
      .bs-footer-col-heading {
        font-size: 11px;
        color: #34d399;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .bs-footer-col-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .bs-footer-link {
        font-size: 13px;
        color: #64748b;
        text-decoration: none;
        transition: color 0.2s;
        display: inline-block;
      }
      .bs-footer-link:hover { color: #34d399; }

      /* ── Divider & Bottom ── */
      .bs-footer-divider {
        height: 1px;
        background: rgba(255,255,255,0.06);
        margin: 3rem 0 0;
      }
      .bs-footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 28px;
        flex-wrap: wrap;
        gap: 10px;
      }
      .bs-footer-copyright {
        font-size: 12px;
        color: #475569;
      }
      .bs-footer-tagline-bottom {
        font-size: 12px;
        color: #34d399;
        opacity: 0.8;
      }

      /* ── TABLET (≤ 900px): 2-col layout, brand spans full width ── */
      @media (max-width: 900px) {
        .bs-footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .bs-footer-brand {
          grid-column: span 2;
        }
      }

      /* ── LARGE MOBILE (≤ 600px): 2-col links, brand full width ── */
      @media (max-width: 600px) {
        .bs-footer-inner {
          padding: 3rem 1rem 0;
        }
        .bs-footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .bs-footer-brand {
          grid-column: span 2;
        }
        .bs-footer-bottom {
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          padding: 16px 0 22px;
        }
      }

      /* ── SMALL MOBILE (≤ 380px): single column ── */
      @media (max-width: 380px) {
        .bs-footer-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .bs-footer-brand {
          grid-column: span 1;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
