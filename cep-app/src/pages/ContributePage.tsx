import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { languages } from '../data/mockData';

const types = [
  { id: 'word',     emoji: '📝', label: 'Add a Word',         desc: 'Know a local dialect word? Document it with meaning, pronunciation and context.', color: 'teal' },
  { id: 'phrase',   emoji: '💬', label: 'Add a Phrase',       desc: 'Share a traditional proverb, idiom, greeting or community expression.', color: 'blue' },
  { id: 'story',    emoji: '📖', label: 'Share a Story',      desc: 'Contribute a folk tale, oral history, legend or ancestral memory.', color: 'amber' },
  { id: 'audio',    emoji: '🎙️', label: 'Record Oral Audio',  desc: 'Record your voice or document an elder speaking their mother tongue.', color: 'rose' },
  { id: 'cultural', emoji: '🌾', label: 'Cultural Lore',      desc: 'Share customs, seasonal rituals or ancestral crafts tied to the dialect.', color: 'green' },
];

const colorMap: Record<string, { border: string; bg: string; icon: string; btn: string }> = {
  teal:   { border: 'border-emerald-500/30 hover:border-emerald-400', bg: 'bg-emerald-500/10', icon: 'bg-emerald-500/20 text-emerald-300', btn: 'text-emerald-400' },
  blue:   { border: 'border-cyan-500/30    hover:border-cyan-400',    bg: 'bg-cyan-500/10',    icon: 'bg-cyan-500/20 text-cyan-300',       btn: 'text-cyan-400' },
  amber:  { border: 'border-amber-500/30   hover:border-amber-400',   bg: 'bg-amber-500/10',   icon: 'bg-amber-500/20 text-amber-300',     btn: 'text-amber-400' },
  rose:   { border: 'border-rose-500/30    hover:border-rose-400',    bg: 'bg-rose-500/10',    icon: 'bg-rose-500/20 text-rose-300',       btn: 'text-rose-400' },
  green:  { border: 'border-teal-500/30    hover:border-teal-400',    bg: 'bg-teal-500/10',    icon: 'bg-teal-500/20 text-teal-300',       btn: 'text-teal-400' },
};

const ContributePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState({ language:'', region:'', content:'', meaning:'', example:'', name:'', source:'', title:'', context:'' });
  const [submitted, setSubmitted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { addContribution, showToast } = useApp();
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.language || !form.content) { showToast('Please fill in the required fields.', 'error'); return; }
    addContribution({
      type: (selectedType as any) || 'word',
      title: form.title || form.content.slice(0, 50),
      language: form.language,
      region: form.region,
      contributor: form.name || 'Anonymous Contributor',
      content: form.content
    });
    setSubmitted(true);
  };

  const startRecording = () => {
    setRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => setRecordingTime(t => { if (t >= 60) { stopRecording(); return t; } return t + 1; }), 1000);
  };
  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
    setRecordingStopped(true);
  };
  const reset = () => {
    setSelectedType(null);
    setForm({ language:'', region:'', content:'', meaning:'', example:'', name:'', source:'', title:'', context:'' });
    setSubmitted(false);
    setRecording(false);
    setRecordingStopped(false);
    setRecordingTime(0);
  };

  const selType = types.find(t => t.id === selectedType);

  return (
    <div className="page-wrapper pattern-bg">
      {/* Hero */}
      <div className="page-hero">
        <div className="container-page" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Mic size={13} className="text-emerald-400" /> Digital Contribution Wizard
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Safeguard Your Mother Tongue
            </h1>
            <p className="text-slate-300 text-base sm:text-lg" style={{ maxWidth: '36rem', margin: '0 auto' }}>
              Know a local dialect word, oral idiom, or ancestral tale? Contribute it and immortalize it in the living sanctuary.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {/* Submission Success */}
          {submitted && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-slate-900/80 rounded-3xl border border-emerald-500/40 shadow-2xl p-10 sm:p-14 text-center backdrop-blur-2xl"
            >
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <CheckCircle size={40} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Submission Received!</h2>
              <p className="text-slate-300 mb-1">Your contribution has been successfully queued for moderation review.</p>
              <p className="text-sm text-emerald-400 font-semibold mb-8">Our linguistics moderators will verify and publish it to the public archive.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3.5">
                <button onClick={reset} className="btn-primary">Submit Another Entry</button>
                <button onClick={reset} className="btn-secondary">Return to Wizard</button>
              </div>
            </motion.div>
          )}

          {/* Type selection */}
          {!submitted && !selectedType && (
            <motion.div key="types" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-extrabold text-white mb-6 text-center">What would you like to contribute today?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {types.map(type => {
                  const c = colorMap[type.color];
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-6 rounded-2xl bg-slate-900/60 border backdrop-blur-md transition-all shadow-lg hover:shadow-2xl ${c.border}`}
                    >
                      <div className={`w-12 h-12 ${c.icon} rounded-2xl flex items-center justify-center mb-4 text-2xl border`}>
                        {type.emoji}
                      </div>
                      <h3 className="font-bold text-white text-lg mb-1.5">{type.label}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">{type.desc}</p>
                      <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${c.btn}`}>
                        Start Form <ChevronRight size={14} />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Form Step */}
          {!submitted && selectedType && (
            <motion.div key="form" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {/* Back navigation */}
              <div className="flex items-center gap-3 mb-6">
                <button onClick={reset} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Change Selection
                </button>
                <span className="text-slate-700">|</span>
                <span className="text-sm font-bold text-emerald-400">{selType?.emoji} {selType?.label}</span>
              </div>

              <form onSubmit={handleSubmit} className="bg-slate-900/70 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 space-y-6 backdrop-blur-xl">

                {/* In-Browser Studio Recording */}
                {selectedType === 'audio' && (
                  <div className="bg-slate-950/70 rounded-2xl border border-cyan-500/30 p-6 text-center shadow-inner">
                    <h3 className="text-xl font-bold text-white mb-1.5">Direct Voice Recording Studio</h3>
                    <p className="text-xs text-slate-400 mb-6">Capture authentic pronunciation or oral history directly from your microphone.</p>
                    <div className="flex flex-col items-center gap-4">
                      {!recording && !recordingStopped && (
                        <button type="button" onClick={startRecording}
                          className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform"
                          aria-label="Start recording">
                          <Mic size={32} className="text-white" />
                        </button>
                      )}
                      {recording && (
                        <button type="button" onClick={stopRecording}
                          className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-pulse"
                          aria-label="Stop recording">
                          <div className="w-8 h-8 bg-white rounded-lg" />
                        </button>
                      )}
                      {recordingStopped && (
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                          <CheckCircle size={38} className="text-emerald-400" />
                        </div>
                      )}
                      {recording && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-end gap-1.5 h-8">
                            {Array.from({length:10}).map((_,i) => (
                              <div key={i} className="w-1 bg-rose-500 rounded-full animate-waveform shadow-[0_0_8px_rgba(244,63,94,0.8)]" style={{ height:`${25+i*5}px`, animationDelay:`${i*0.1}s` }} />
                            ))}
                          </div>
                          <span className="text-rose-400 font-mono font-bold text-xl">{recordingTime}s</span>
                          <p className="text-xs text-rose-300 animate-pulse font-semibold">Recording live from microphone…</p>
                        </div>
                      )}
                      {!recording && !recordingStopped && <p className="text-sm text-slate-400 font-medium">Tap microphone to begin</p>}
                      {recordingStopped && (
                        <div>
                          <p className="text-sm font-semibold text-emerald-400 mb-2">Voice Captured ({recordingTime}s)</p>
                          <div className="flex gap-2 justify-center">
                            <button type="button" onClick={() => { setRecordingStopped(false); setRecordingTime(0); }} className="px-4 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-700">Record Again</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Language + Region */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Language / Dialect <span className="text-rose-400">*</span></label>
                    <select name="language" value={form.language} onChange={handleChange} required className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
                      <option value="">Select Target Dialect</option>
                      {languages.map(l => <option key={l.id} value={l.name}>{l.name} ({l.nativeName})</option>)}
                      <option value="Other">Other Indigenous Dialect</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Region / District</label>
                    <input type="text" name="region" value={form.region} onChange={handleChange}
                      placeholder="e.g. Sindhudurg, Palghar, Dhule"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                  </div>
                </div>

                {/* Title */}
                {(selectedType === 'story' || selectedType === 'audio') && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Title</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange}
                      placeholder={selectedType === 'story' ? 'Title of the traditional story' : 'Description of audio clip'}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                  </div>
                )}

                {/* Main Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {selectedType === 'word' && 'The Word / Expression'}{selectedType === 'phrase' && 'The Idiom / Phrase'}{selectedType === 'story' && 'Story Narrative'}{selectedType === 'audio' && 'Recording Transcription / Notes'}{selectedType === 'cultural' && 'Cultural Lore Details'}
                    <span className="text-rose-400"> *</span>
                  </label>
                  <textarea name="content" rows={selectedType === 'story' ? 6 : 3} value={form.content} onChange={handleChange} required
                    placeholder={selectedType === 'word' ? 'Enter the native word in script or Latin' : selectedType === 'phrase' ? 'Enter the full phrase or saying' : selectedType === 'story' ? 'Write the narrative here...' : 'Describe what was recorded'}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm resize-none" />
                </div>

                {/* Meaning & Usage */}
                {(selectedType === 'word' || selectedType === 'phrase') && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Meaning & Nuance</label>
                      <textarea name="meaning" rows={2} value={form.meaning} onChange={handleChange}
                        placeholder="What does it mean? What cultural context is it used in?"
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Example Sentence</label>
                      <input type="text" name="example" value={form.example} onChange={handleChange}
                        placeholder="Sentence showing how elders speak this word"
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                    </div>
                  </>
                )}

                {/* Contributor metadata */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Your Name (optional)</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Leave blank for anonymous contribution"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Source / Elder Attribution</label>
                    <input type="text" name="source" value={form.source} onChange={handleChange}
                      placeholder="e.g. Village elder, grandmother, local artisan"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm" />
                  </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                  <CheckCircle size={18} />
                  Submit to Living Archive
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;




