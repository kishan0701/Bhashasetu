import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, Clock, MapPin, User, CheckCircle, RotateCcw } from 'lucide-react';
import type { AudioRecording } from '../types';

const catLabels: Record<string, string> = {
  'word-pronunciation': 'Pronunciation',
  'traditional-phrase': 'Phrase',
  'folk-story': 'Folk Story',
  'conversation': 'Dialogue',
  'local-proverb': 'Proverb',
  'cultural-narration': 'Narration',
};

const langTheme: Record<string, { label: string; icon: string; badge: string }> = {
  'Malvani':  { label: 'मालवणी', icon: '🌊', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
  'Warli':    { label: 'वारली', icon: '🌿', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
  'Varhadi':  { label: 'वऱ्हाडी', icon: '🌾', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
  'Marathi':  { label: 'मराठी', icon: '📜', badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
  'Bhili':    { label: 'भीली', icon: '🏹', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
  'Konkani':  { label: 'कोंकणी', icon: '🌴', badge: 'bg-teal-500/10 text-teal-300 border-teal-500/30' },
  'Ahirani':  { label: 'अहिराणी', icon: '🏔️', badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30' },
};

// Generates an acoustic profile for visual waveform
const generateWave = (id: string, count = 32): number[] => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const norm = i / (count - 1);
    const env = Math.sin(norm * Math.PI); // Smooth curve
    const noise = Math.abs(Math.sin(i * 1.5 + hash));
    const h = Math.round(20 + env * (noise * 60 + 20));
    bars.push(Math.max(20, Math.min(95, h)));
  }
  return bars;
};

interface AudioCardProps {
  recording: AudioRecording;
  compact?: boolean;
}

export const AudioCard: React.FC<AudioCardProps> = ({ recording, compact = false }) => {
  // Use a real <audio> DOM element ref for maximum browser compatibility
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(recording.duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const waveBars = useMemo(() => generateWave(recording.id, 32), [recording.id]);
  const lang = langTheme[recording.language] || {
    label: recording.language,
    icon: '🎙️',
    badge: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  const fmt = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const audioUrl = recording.audioUrl || '';
  const hasAudio = Boolean(audioUrl);
  const [audioLoadFailed, setAudioLoadFailed] = useState(false);

  // Simulation fallback (for cards without audio)
  const startSimulation = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          setCurrentTime(0);
          return 0;
        }
        const step = (100 / recording.duration) * 0.4 * playbackSpeed;
        const next = Math.min(100, p + step);
        setCurrentTime((next / 100) * recording.duration);
        return next;
      });
    }, 400);
  };

  const handlePlay = () => {
    const audio = audioRef.current;

    if (hasAudio && audio && !audioLoadFailed) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.muted = isMuted;
        audio.playbackRate = playbackSpeed;
        // If audio is not loaded yet, force load (important for desktop)
        if (audio.readyState === 0) {
          audio.load();
        }
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(err => {
              console.warn('Audio play failed:', err);
              // Only fall back to simulation if it's a NotSupportedError (broken file)
              // NotAllowedError means user hasn't interacted — retry on next click
              if (err.name === 'NotSupportedError') {
                setAudioLoadFailed(true);
                startSimulation();
              }
              // For NotAllowedError, do nothing — next user click will work
            });
        }
      }
    } else {
      // No audio source or load failed — use visual simulation
      if (isPlaying) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
      } else {
        startSimulation();
      }
    }
  };

  const seekTo = (pct: number) => {
    const clamped = Math.max(0, Math.min(1, pct));
    const targetTime = clamped * duration;
    setProgress(clamped * 100);
    setCurrentTime(targetTime);

    if (audioRef.current && hasAudio) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleWaveSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    seekTo(pct);
  };

  const handleMute = () => {
    setIsMuted(m => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  };

  const handleRestart = () => {
    seekTo(0);
    if (!isPlaying) handlePlay();
  };

  const handleSpeedCycle = () => {
    const speeds = [1, 1.25, 1.5];
    const currIdx = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currIdx + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };

  // Cleanup on unmount
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  return (
    <div
      className={`rounded-2xl transition-all duration-200 border p-5 sm:p-6 ${
        isPlaying
          ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_8px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
          : 'bg-[#0A0F1D]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0C1324]'
      }`}
    >
      {/* Hidden native <audio> element — always rendered so desktop can interact */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onLoadedMetadata={() => {
            const audio = audioRef.current;
            if (audio && audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
              setDuration(audio.duration);
            }
          }}
          onTimeUpdate={() => {
            const audio = audioRef.current;
            if (audio && audio.duration > 0) {
              setProgress((audio.currentTime / audio.duration) * 100);
              setCurrentTime(audio.currentTime);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
          }}
          onError={(e) => {
            // Only mark as failed for actual network/decode errors, not premature fires
            const target = e.currentTarget;
            if (target.error && target.error.code !== MediaError.MEDIA_ERR_ABORTED) {
              setIsPlaying(false);
              setAudioLoadFailed(true);
            }
          }}
        />
      )}

      {/* Top Header Row: Dialect Pill, Category, Duration */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Dialect */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${lang.badge}`}>
            <span>{lang.icon}</span>
            <span>{recording.language}</span>
          </span>

          {/* Category */}
          <span className="text-xs text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
            {catLabels[recording.category] || recording.category}
          </span>

          {/* Verified */}
          {recording.verified && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <CheckCircle size={12} />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
          <Clock size={12} className="text-slate-500" />
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="font-bold text-white text-base sm:text-lg leading-snug tracking-tight">
          {recording.title}
        </h3>
        {!compact && (
          <p className="text-xs sm:text-sm text-slate-300/90 mt-1 leading-relaxed line-clamp-2">
            {recording.description}
          </p>
        )}
      </div>

      {/* Speaker and Location */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/60">
        <span className="flex items-center gap-1.5 text-slate-300 font-medium">
          <User size={12} className="text-slate-500" />
          {recording.anonymous ? 'Traditional Speaker' : recording.speakerName}
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <MapPin size={12} className="text-slate-500" />
          {recording.location}
        </span>
        <span className="text-slate-500">
          {recording.plays} plays
        </span>
      </div>

      {/* Main Player Row: Play Button + Waveform + Scrubber */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play / Pause Circular Button */}
        <button
          onClick={handlePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-md ${
            isPlaying
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95'
          }`}
        >
          {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-0.5" />}
        </button>

        {/* Waveform & Scrubber */}
        <div className="flex-1 min-w-0">
          {/* Interactive Waveform Bars */}
          <div
            className="flex items-end gap-[2px] h-8 cursor-pointer py-1 px-1 rounded-lg bg-slate-950/40 hover:bg-slate-950/70 transition-colors"
            onClick={handleWaveSeek}
            title="Click to seek"
          >
            {waveBars.map((h, i) => {
              const barPct = (i / waveBars.length) * 100;
              const isPlayed = barPct <= progress;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-100 ${
                    isPlayed
                      ? 'bg-gradient-to-t from-emerald-400 to-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.5)]'
                      : 'bg-slate-700/50 hover:bg-slate-600'
                  }`}
                  style={{
                    height: `${h}%`,
                    animation: isPlaying ? `waveform 0.85s ease-in-out ${i * 0.035}s infinite` : 'none',
                    transformOrigin: 'bottom'
                  }}
                />
              );
            })}
          </div>

          {/* Time indicator and controls */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-1.5 px-0.5">
            <span className={isPlaying ? 'text-cyan-400 font-semibold' : 'text-slate-400'}>
              {fmt(currentTime)}
            </span>
            <span className="text-slate-500">
              {fmt(duration)}
            </span>
          </div>
        </div>

        {/* Subtle Extra Actions: Speed & Mute */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleSpeedCycle}
            title="Playback Speed"
            className="px-2 py-1 rounded text-[11px] font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={handleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={handleRestart}
            title="Restart"
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
