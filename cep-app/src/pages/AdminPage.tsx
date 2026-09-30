import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, Clock, CheckCircle, XCircle, AlertCircle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { PendingContribution } from '../types';

const statusConfig = {
  pending: { label: 'Pending Review', color: 'bg-amber-500/15 text-amber-300 border border-amber-500/30', icon: Clock },
  approved: { label: 'Approved', color: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-rose-500/15 text-rose-300 border border-rose-500/30', icon: XCircle },
};

const typeLabels: Record<string, string> = {
  word: '📝 Word',
  phrase: '💬 Phrase',
  story: '📖 Story',
  audio: '🎙️ Audio',
  cultural: '🌾 Cultural',
};

const AdminPage: React.FC = () => {
  const { contributions, approveContribution, rejectContribution } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [preview, setPreview] = useState<PendingContribution | null>(null);

  const filtered = filter === 'all' ? contributions : contributions.filter(c => c.status === filter);

  const counts = {
    all: contributions.length,
    pending: contributions.filter(c => c.status === 'pending').length,
    approved: contributions.filter(c => c.status === 'approved').length,
    rejected: contributions.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen pt-16 bg-[#080C14] text-slate-100 pattern-bg">
      {/* Header */}
      <div className="page-hero pb-8">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <Shield size={20} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Moderator Command Center</h1>
          </div>
          <p className="text-slate-400 text-sm ml-13">Review, curate, and verify community submissions before publication into the live archive</p>
        </div>
      </div>

      <div className="container-page py-10 sm:py-12">
        {/* Filter Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {([
            { key: 'all', label: 'All Items', color: 'bg-slate-800 text-white border-slate-700' },
            { key: 'pending', label: 'Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
            { key: 'approved', label: 'Approved', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
            { key: 'rejected', label: 'Rejected', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
          ] as const).map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-2xl border p-4 text-center transition-all backdrop-blur-md ${
                filter === item.key
                  ? 'bg-slate-800/90 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2 text-sm font-bold border shadow-sm`}>
                {counts[item.key]}
              </div>
              <p className="text-sm font-semibold text-slate-200">{item.label}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contributions list */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-lg">
                {filter === 'all' ? 'All Community Submissions' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Queue (${counts[filter]})`}
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="text-5xl mb-3 opacity-60">📭</div>
                <p className="text-slate-400 font-medium">No {filter !== 'all' ? filter : ''} contributions in this view</p>
              </div>
            ) : (
              filtered.map(contribution => {
                const StatusIcon = statusConfig[contribution.status].icon;
                return (
                  <motion.div
                    key={contribution.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 p-5 backdrop-blur-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Type & status */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                            {typeLabels[contribution.type]}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 ${statusConfig[contribution.status].color}`}>
                            <StatusIcon size={11} />
                            {statusConfig[contribution.status].label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-white text-base mb-1 line-clamp-1">{contribution.title}</h3>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400">
                          <span className="text-emerald-400 font-medium">{contribution.language}</span>
                          <span>·</span>
                          <span>{contribution.region || 'Region not specified'}</span>
                          <span>·</span>
                          <span>by {contribution.contributor}</span>
                          <span>·</span>
                          <span>{contribution.dateSubmitted}</span>
                        </div>

                        {/* Rejection note */}
                        {contribution.status === 'rejected' && contribution.notes && (
                          <div className="mt-2.5 flex items-start gap-1.5 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
                            <AlertCircle size={13} className="mt-0.5 shrink-0 text-rose-400" />
                            {contribution.notes}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setPreview(contribution)}
                          aria-label="Preview contribution"
                          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>
                        {contribution.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approveContribution(contribution.id)}
                              aria-label="Approve contribution"
                              className="p-2 rounded-xl text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => rejectContribution(contribution.id, 'Rejected by moderator')}
                              aria-label="Reject contribution"
                              className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Sticky preview panel */}
          <div>
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl p-6 sticky top-24 backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-white text-base">Detail Inspection</h3>
                    <button onClick={() => setPreview(null)} className="text-slate-400 hover:text-white p-1">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Title</p>
                      <p className="font-semibold text-white">{preview.title}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Content Body</p>
                      <p className="text-slate-300 leading-relaxed bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs font-mono">{preview.content}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Language</p>
                        <p className="font-medium text-emerald-400">{preview.language}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Region</p>
                        <p className="font-medium text-slate-300">{preview.region || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Contributor</p>
                        <p className="font-medium text-slate-300">{preview.contributor}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Submitted</p>
                        <p className="font-medium text-slate-300">{preview.dateSubmitted}</p>
                      </div>
                    </div>
                    {preview.status === 'pending' && (
                      <div className="flex gap-2.5 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => { approveContribution(preview.id); setPreview(null); }}
                          className="btn-primary flex-1 py-2 text-xs"
                        >
                          <Check size={14} /> Approve & Publish
                        </button>
                        <button
                          onClick={() => { rejectContribution(preview.id); setPreview(null); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    )}
                    {preview.status === 'approved' && (
                      <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-3.5 py-2.5">
                        <CheckCircle size={16} className="text-emerald-400" />
                        Community Verified & Published to Archive
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-900/40 rounded-2xl border border-slate-800 p-8 text-center"
                >
                  <div className="text-4xl mb-3 opacity-60">👁️</div>
                  <p className="text-slate-400 text-sm">Select the preview eye icon on any contribution to inspect its contents</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;




