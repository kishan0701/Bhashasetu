import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Volume2, Mic, Sparkles,
  X, ArrowUpRight, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface DialectPin {
  id: string;
  name: string;
  nativeName: string;
  regionId: string;
  regionName: string;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  primaryDialect: string;
  accentColor: string;
  description: string;
  phrase: string;
  translation: string;
  wordCount: number;
  audioCount: number;
  storyCount: number;
  status: 'Thriving' | 'Stable' | 'Vulnerable' | 'Endangered';
  statusColor: string;
}

export interface LinguisticRegion {
  id: string;
  name: string;
  marathiName: string;
  color: string;
  accent: string;
  path: string;
  labelX: number;
  labelY: number;
  dialects: string[];
}

// ── Realistic Geographic Boundaries of Maharashtra Regions (800 x 600 Canvas) ──
const linguisticRegions: LinguisticRegion[] = [
  {
    id: 'konkan',
    name: 'Konkan Coastal Strip',
    marathiName: 'कोकण किनारपट्टी',
    color: '#06B6D4',
    accent: '#10B981',
    path: 'M 115,165 C 125,185 130,220 135,260 C 140,310 150,370 165,430 C 178,485 195,530 210,555 L 180,565 C 160,530 145,470 130,410 C 115,350 100,290 95,240 C 92,205 105,175 115,165 Z',
    labelX: 125,
    labelY: 340,
    dialects: ['Malvani', 'Konkani', 'Agri-Koli'],
  },
  {
    id: 'khandesh',
    name: 'Khandesh & Satpura',
    marathiName: 'खानदेश व सातपुडा',
    color: '#F59E0B',
    accent: '#EAB308',
    path: 'M 115,165 C 130,135 155,90 185,72 C 220,60 270,72 320,78 C 365,82 400,90 415,105 L 390,175 C 330,180 270,185 210,195 C 170,202 140,215 135,225 C 128,200 120,180 115,165 Z',
    labelX: 250,
    labelY: 130,
    dialects: ['Ahirani', 'Bhili', 'Pawri'],
  },
  {
    id: 'western',
    name: 'Western Maharashtra (Desh)',
    marathiName: 'पश्चिम महाराष्ट्र (देश)',
    color: '#8B5CF6',
    accent: '#A855F7',
    path: 'M 135,225 C 145,215 170,202 210,195 C 260,188 310,182 340,205 C 370,225 390,265 400,315 C 410,365 390,410 365,445 C 335,480 290,515 245,540 C 225,550 215,555 210,555 C 195,530 178,485 165,430 C 150,370 140,310 135,260 C 133,245 133,235 135,225 Z',
    labelX: 255,
    labelY: 360,
    dialects: ['Puneri Deshi', 'Kolhapuri', 'Solapuri'],
  },
  {
    id: 'marathwada',
    name: 'Marathwada Godavari Basin',
    marathiName: 'मराठवाडा (गोदावरी खोरे)',
    color: '#3B82F6',
    accent: '#60A5FA',
    path: 'M 340,205 C 370,185 410,180 455,190 C 500,200 535,230 550,270 C 560,310 545,360 520,395 C 490,430 440,445 390,448 C 378,448 370,446 365,445 C 390,410 410,365 400,315 C 390,265 370,225 340,205 Z',
    labelX: 440,
    labelY: 310,
    dialects: ['Marathwadi', 'Dakkhani-Marathi'],
  },
  {
    id: 'vidarbha',
    name: 'Vidarbha Agrarian Plains',
    marathiName: 'विदर्भ (वऱ्हाड प्रदेश)',
    color: '#F97316',
    accent: '#FB923C',
    path: 'M 415,105 C 445,95 490,92 535,98 C 580,105 615,120 625,145 C 635,175 625,220 605,255 C 585,285 565,285 550,270 C 535,230 500,200 455,190 C 410,180 370,185 390,175 L 415,105 Z',
    labelX: 515,
    labelY: 175,
    dialects: ['Varhadi', 'Nagpuri'],
  },
  {
    id: 'eastern',
    name: 'Eastern Zadipatti & Gondwana',
    marathiName: 'झाडीपट्टी व पूर्व विदर्भ (गोंडवन)',
    color: '#10B981',
    accent: '#34D399',
    path: 'M 625,145 C 655,120 700,115 735,135 C 765,155 775,195 780,245 C 785,305 770,370 740,420 C 705,465 655,470 610,445 C 570,420 545,370 550,330 C 555,295 585,285 605,255 C 625,220 635,175 625,145 Z',
    labelX: 680,
    labelY: 280,
    dialects: ['Zadipoli', 'Gondi', 'Madia'],
  },
];

// ── Dialect Nodes Positioned on Actual Districts ──
const dialectPins: DialectPin[] = [
  {
    id: 'p-malvani',
    name: 'Sindhudurg & Malvan',
    nativeName: 'मालवणी / दक्षिण कोकणी',
    regionId: 'konkan',
    regionName: 'Konkan',
    x: 185,
    y: 520,
    primaryDialect: 'Malvani',
    accentColor: '#10B981',
    description: 'Maritime coastal dialect of South Konkan, rich in fishing idioms and Dashavatara folk theatre.',
    phrase: 'खंय चाललास रे बाबा तू आज?',
    translation: 'Where are you heading off to today, friend?',
    wordCount: 1423,
    audioCount: 344,
    storyCount: 193,
    status: 'Vulnerable',
    statusColor: '#F59E0B',
  },
  {
    id: 'p-mumbai',
    name: 'Mumbai & Thane Coast',
    nativeName: 'आगरी-कोळी / मुंबई',
    regionId: 'konkan',
    regionName: 'Konkan',
    x: 105,
    y: 250,
    primaryDialect: 'Agri-Koli',
    accentColor: '#06B6D4',
    description: 'Indigenous coastal speech of Arabian Sea fishing villages and salt-pan agrarian communities.',
    phrase: 'काय चाललंय मग, बरा हायस ना?',
    translation: 'What is happening, are you doing fine?',
    wordCount: 890,
    audioCount: 312,
    storyCount: 114,
    status: 'Stable',
    statusColor: '#10B981',
  },
  {
    id: 'p-warli',
    name: 'Palghar & Dahanu',
    nativeName: 'वारली बोली',
    regionId: 'konkan',
    regionName: 'North Konkan',
    x: 120,
    y: 175,
    primaryDialect: 'Warli',
    accentColor: '#F59E0B',
    description: 'Indigenous forest tongue of the Sahyadri tribal foothills, deeply intertwined with Tarpa folk dances.',
    phrase: 'तर्पा वाजतोय, चला डोंगरावर नाचायला!',
    translation: 'The tarpa is playing, come dance upon the hills!',
    wordCount: 480,
    audioCount: 145,
    storyCount: 92,
    status: 'Endangered',
    statusColor: '#EF4444',
  },
  {
    id: 'p-pune',
    name: 'Pune & Sahyadri',
    nativeName: 'पुणेरी / देशी मराठी',
    regionId: 'western',
    regionName: 'Western Maharashtra',
    x: 235,
    y: 330,
    primaryDialect: 'Deshi Marathi',
    accentColor: '#8B5CF6',
    description: 'The literary heartland of mountain plateau Marathi, home to historical Bakhar texts and classic proverbs.',
    phrase: 'नक्की काय म्हणायचंय तुम्हाला?',
    translation: 'What precisely is it that you wish to say?',
    wordCount: 1850,
    audioCount: 540,
    storyCount: 220,
    status: 'Thriving',
    statusColor: '#10B981',
  },
  {
    id: 'p-kolhapur',
    name: 'Kolhapur & Sangli',
    nativeName: 'कोल्हापुरी लहेजा',
    regionId: 'western',
    regionName: 'Southern Maharashtra',
    x: 235,
    y: 490,
    primaryDialect: 'Kolhapuri',
    accentColor: '#EF4444',
    description: 'Famed for vigorous inflections, wrestling akhada terms, and deep traditional warmth.',
    phrase: 'काय म्हंताय व्हय मालक, सगळं जोरात?',
    translation: 'What do you say, boss, is everything going great?',
    wordCount: 720,
    audioCount: 260,
    storyCount: 130,
    status: 'Thriving',
    statusColor: '#10B981',
  },
  {
    id: 'p-solapur',
    name: 'Solapur & Dharashiv',
    nativeName: 'सोलापुरी बोली',
    regionId: 'western',
    regionName: 'Southern Border',
    x: 350,
    y: 410,
    primaryDialect: 'Solapuri',
    accentColor: '#A855F7',
    description: 'Border synthesis blending Marathi syntax with Kannada melodic cadence and weaving jargon.',
    phrase: 'गरम शेणगा चटणी आणि भाकरी खाऊया!',
    translation: 'Come eat hot peanut chutney and crisp jowar bhakri!',
    wordCount: 460,
    audioCount: 150,
    storyCount: 58,
    status: 'Stable',
    statusColor: '#10B981',
  },
  {
    id: 'p-ahirani',
    name: 'Dhule & Jalgaon',
    nativeName: 'अहिराणी (खानदेशी)',
    regionId: 'khandesh',
    regionName: 'Khandesh',
    x: 280,
    y: 125,
    primaryDialect: 'Ahirani',
    accentColor: '#EAB308',
    description: 'Ancient Indo-Aryan tongue preserving archaic Prakrit vocabulary, spoken along the Tapi river.',
    phrase: 'आपुन कव्हा भेटसू मग भाऊ?',
    translation: 'When shall we meet then, brother?',
    wordCount: 512,
    audioCount: 165,
    storyCount: 68,
    status: 'Vulnerable',
    statusColor: '#F59E0B',
  },
  {
    id: 'p-bhili',
    name: 'Nandurbar & Satpura',
    nativeName: 'भिल्ली / पावरी',
    regionId: 'khandesh',
    regionName: 'Satpura Tribal Belt',
    x: 185,
    y: 85,
    primaryDialect: 'Bhili',
    accentColor: '#EC4899',
    description: 'Mountain dialect rich in oral ballads, sacred herbal traditions, and monsoon harvest songs.',
    phrase: 'आखातीज नो मेळो भरायलो डोंगरावर!',
    translation: 'The Akhatij sacred gathering has assembled on the hill!',
    wordCount: 410,
    audioCount: 110,
    storyCount: 74,
    status: 'Vulnerable',
    statusColor: '#F59E0B',
  },
  {
    id: 'p-marathwada',
    name: 'Chhatrapati Sambhajinagar',
    nativeName: 'मराठवाडी बोली',
    regionId: 'marathwada',
    regionName: 'Marathwada',
    x: 430,
    y: 280,
    primaryDialect: 'Marathwadi',
    accentColor: '#3B82F6',
    description: 'Cradle of medieval Marathi literature and Varkari saint poetry, marked by gentle Dakkhani tone.',
    phrase: 'कवा आलात तुम्ही गावात, बरं हाय ना?',
    translation: 'When did you arrive in the village, is all well?',
    wordCount: 840,
    audioCount: 280,
    storyCount: 125,
    status: 'Stable',
    statusColor: '#10B981',
  },
  {
    id: 'p-varhadi',
    name: 'Amravati & Akola',
    nativeName: 'वऱ्हाडी बोली',
    regionId: 'vidarbha',
    regionName: 'Vidarbha',
    x: 500,
    y: 145,
    primaryDialect: 'Varhadi',
    accentColor: '#F97316',
    description: 'Celebrated in saint poetry and rural farming folklore, known for warm elongated vowels.',
    phrase: 'कोठे चालले बापू तुम्ही येवढ्या घाईत?',
    translation: 'Where are you heading off to in such a rush, elder brother?',
    wordCount: 620,
    audioCount: 195,
    storyCount: 88,
    status: 'Stable',
    statusColor: '#10B981',
  },
  {
    id: 'p-nagpur',
    name: 'Nagpur & Wardha',
    nativeName: 'नागपुरी बोली',
    regionId: 'vidarbha',
    regionName: 'Eastern Vidarbha',
    x: 615,
    y: 155,
    primaryDialect: 'Nagpuri',
    accentColor: '#FB923C',
    description: 'Urban and agrarian fusion of Eastern Vidarbha with rich humorous idioms and theatrical cadence.',
    phrase: 'सगळं काही व्यवस्थित जमून आलं भाऊ!',
    translation: 'Everything fell into place wonderfully, brother!',
    wordCount: 540,
    audioCount: 180,
    storyCount: 82,
    status: 'Stable',
    statusColor: '#10B981',
  },
  {
    id: 'p-zadipoli',
    name: 'Bhandara & Gondia',
    nativeName: 'झाडीबोली (झाडीपट्टी)',
    regionId: 'eastern',
    regionName: 'Zadipatti Forest Belt',
    x: 685,
    y: 190,
    primaryDialect: 'Zadipoli',
    accentColor: '#14B8A6',
    description: 'Dynamic dialect preserved through the renowned overnight Zadipatti folk theatre movement.',
    phrase: 'झाडीपट्टीचं नाटक पाहाले चला आज!',
    translation: 'Come let us go watch the forest theater play tonight!',
    wordCount: 590,
    audioCount: 178,
    storyCount: 76,
    status: 'Vulnerable',
    statusColor: '#F59E0B',
  },
  {
    id: 'p-gondi',
    name: 'Gadchiroli & Bhamragad',
    nativeName: 'गोंडी / माडिया',
    regionId: 'eastern',
    regionName: 'Tribal Heartland',
    x: 715,
    y: 350,
    primaryDialect: 'Gondi',
    accentColor: '#10B981',
    description: 'Ancient indigenous Dravidian language preserved across deep Sal and Teak forest ecosystems.',
    phrase: 'सेवा जोहार, सगा जन!',
    translation: 'Sacred reverence and highest greetings to all kin!',
    wordCount: 380,
    audioCount: 95,
    storyCount: 65,
    status: 'Endangered',
    statusColor: '#EF4444',
  },
];

export const LanguageMapPage: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<DialectPin>(dialectPins[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Pre-load voices on mount (Chrome loads them async)
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis?.getVoices() || [];
      if (v.length > 0) voicesRef.current = v;
    };
    loadVoices();
    window.speechSynthesis?.addEventListener?.('voiceschanged', loadVoices);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', loadVoices);
  }, []);

  // Play audio pronunciation of the dialect phrase
  const handlePlayAudio = (phrase: string) => {
    if (!('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);

    const doSpeak = () => {
      const voices = voicesRef.current.length > 0
        ? voicesRef.current
        : window.speechSynthesis.getVoices();

      const utterance = new SpeechSynthesisUtterance(phrase);

      // Priority: mr-IN → hi-IN → hi-* → en-IN → any
      const preferred =
        voices.find(v => v.lang === 'mr-IN') ||
        voices.find(v => v.lang === 'hi-IN') ||
        voices.find(v => v.lang.startsWith('hi')) ||
        voices.find(v => v.lang === 'en-IN') ||
        voices.find(v => v.lang.startsWith('en')) ||
        null;

      if (preferred) utterance.voice = preferred;
      utterance.lang = preferred?.lang ?? 'hi-IN';
      utterance.rate = 0.80;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend   = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    };

    // Chrome REQUIRES a small delay after cancel() before speak() — otherwise silent
    setTimeout(doSpeak, 120);
  };

  const filteredPins = activeFilter === 'all'
    ? dialectPins
    : dialectPins.filter(p => p.regionId === activeFilter);

  return (
    <div className="page-wrapper min-h-screen" style={{ background: '#06090F' }}>
      {/* ── Premium Header Hero ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5.5rem',
        paddingBottom: '2.5rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #080D1A 0%, #06090F 100%)',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '350px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-page" style={{ position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#6EE7B7', fontSize: '11px', fontWeight: 700,
            padding: '6px 16px', borderRadius: '999px',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '18px',
            boxShadow: '0 0 20px rgba(16,185,129,0.15)',
          }}>
            <Compass size={13} />
            <span>Interactive Dialect Map · भाषा नकाशा · Maharashtra</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '12px',
          }}>
            Maharashtra{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10B981, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Linguistic Landscape</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Explore regional dialects visually across Maharashtra. Tap any glowing node on the map to reveal its words, phrases, and audio archive.
          </p>
        </div>
      </div>

      <div className="container-page pb-12 space-y-4">

        {/* ── Visual Filter Pills (Konkan, Vidarbha, Khandesh, etc.) ── */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              All Maharashtra ({dialectPins.length})
            </button>

            {linguisticRegions.map(reg => (
              <button
                key={reg.id}
                onClick={() => {
                  setActiveFilter(reg.id);
                  const firstPin = dialectPins.find(p => p.regionId === reg.id);
                  if (firstPin) setSelectedPin(firstPin);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === reg.id
                    ? 'text-white shadow-lg border'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
                style={{
                  backgroundColor: activeFilter === reg.id ? `${reg.color}30` : undefined,
                  borderColor: activeFilter === reg.id ? reg.color : undefined,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: reg.color }} />
                <span>{reg.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400 font-normal hidden sm:inline" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                  ({reg.marathiName.split(' ')[0]})
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setActiveFilter('all');
              setSelectedPin(dialectPins[0]);
            }}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 shrink-0 cursor-pointer"
            title="Reset focus"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* ── Main Map Canvas with Floating Interactive Pop-up ── */}
        <div className="relative w-full rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #020509 0%, #040A12 40%, #050D16 100%)', border: '1px solid rgba(16,185,129,0.18)', boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.95), 0 0 80px rgba(16,185,129,0.05) inset, inset 0 1px 0 rgba(255,255,255,0.04)' }}>

          {/* Top Bar on Map */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 px-3.5 py-1.5 rounded-xl flex items-center gap-2 pointer-events-auto shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-xs font-bold text-white tracking-wide">
                Interactive Geographic Projection
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">· Click nodes to inspect</span>
            </div>

            {/* Compass Rose */}
            <div className="rounded-xl text-slate-400 flex flex-col items-center pointer-events-auto" style={{ background: 'rgba(4,8,16,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 10px', boxShadow: '0 4px 16px rgba(0,0,0,0.6)' }}>
              <span className="text-[9px] font-black text-emerald-400" style={{ letterSpacing: '2px', lineHeight: 1 }}>N</span>
              <Compass size={18} className="text-emerald-400 my-0.5" style={{ filter: 'drop-shadow(0 0 6px #10B981)' }} />
              <span className="text-[9px] font-black text-slate-500" style={{ letterSpacing: '2px', lineHeight: 1 }}>S</span>
            </div>
          </div>

          {/* ── Realistic Geographic SVG Map ── */}
          <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none overflow-hidden" style={{ background: 'radial-gradient(ellipse 120% 100% at 15% 50%, rgba(2,100,163,0.12) 0%, transparent 55%), radial-gradient(ellipse 90% 80% at 85% 30%, rgba(16,185,129,0.04) 0%, transparent 50%), #020509' }}>
            <svg
              viewBox="0 0 840 600"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: 'drop-shadow(0 0 60px rgba(16,185,129,0.08))' }}
            >
              <defs>
                {/* Richer ocean ripple */}
                <pattern id="ocean-ripple" width="36" height="18" patternUnits="userSpaceOnUse">
                  <path d="M 0,9 Q 9,2 18,9 Q 27,16 36,9" fill="none" stroke="#0284C7" strokeWidth="0.7" strokeOpacity="0.14" />
                  <path d="M 0,16 Q 9,9 18,16 Q 27,23 36,16" fill="none" stroke="#0ea5e9" strokeWidth="0.4" strokeOpacity="0.08" />
                </pattern>

                {/* Terrain stipple dots inside Maharashtra */}
                <pattern id="terrain-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="0.6" fill="#334155" fillOpacity="0.3" />
                </pattern>

                {/* Fine cross-grid for interior detail */}
                <pattern id="interior-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeOpacity="0.4" />
                </pattern>

                {/* Ocean depth gradient (left side) */}
                <linearGradient id="ocean-depth" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#020c1b" stopOpacity="1" />
                  <stop offset="60%" stopColor="#021627" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="ocean-glow" cx="8%" cy="50%" r="35%">
                  <stop offset="0%" stopColor="#0369a1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>

                {/* Atmosphere glow behind whole map */}
                <radialGradient id="map-atmosphere" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>

                {/* Pin glow filter */}
                <filter id="pin-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Region soft glow filter */}
                <filter id="region-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Vignette gradient overlay */}
                <radialGradient id="vignette" cx="50%" cy="50%" r="55%">
                  <stop offset="60%" stopColor="transparent" stopOpacity="0" />
                  <stop offset="100%" stopColor="#010408" stopOpacity="0.7" />
                </radialGradient>
              </defs>

              {/* ── Global atmosphere background ── */}
              <rect x="0" y="0" width="840" height="600" fill="url(#map-atmosphere)" />

              {/* ── Arabian Sea Ocean Fill ── */}
              <rect x="0" y="0" width="220" height="600" fill="url(#ocean-depth)" />
              <rect x="0" y="0" width="220" height="600" fill="url(#ocean-ripple)" opacity="0.85" />
              <rect x="0" y="0" width="220" height="600" fill="url(#ocean-glow)" />

              {/* Ocean isodepth contour lines */}
              <path d="M 60,50 C 55,150 50,300 55,430 C 58,490 62,530 65,580" fill="none" stroke="#0369a1" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="8,6" />
              <path d="M 90,30 C 84,140 80,280 84,400 C 87,470 92,520 95,580" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeOpacity="0.1" strokeDasharray="6,8" />

              {/* Coastal Text */}
              <text x="42" y="320" transform="rotate(-90 42,320)" fill="#0ea5e9" fontSize="10" fontWeight="800" letterSpacing="5" opacity="0.45"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
                ARABIAN SEA
              </text>
              <text x="58" y="295" transform="rotate(-90 58,295)" fill="#0ea5e9" fontSize="9" fontWeight="600" letterSpacing="2" opacity="0.25"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                अरबी समुद्र
              </text>

              {/* ── Neighboring State Labels ── */}
              <text x="145" y="42" fill="#334155" fontSize="10" fontWeight="800" letterSpacing="3" style={{ fontFamily: 'Outfit, sans-serif' }}>GUJARAT ↑</text>
              <text x="430" y="40" fill="#334155" fontSize="10" fontWeight="800" letterSpacing="2" style={{ fontFamily: 'Outfit, sans-serif' }}>MADHYA PRADESH ↑</text>
              <text x="756" y="82" fill="#334155" fontSize="9" fontWeight="800" letterSpacing="2" style={{ fontFamily: 'Outfit, sans-serif' }}>CHHATTISGARH →</text>
              <text x="645" y="522" fill="#334155" fontSize="9" fontWeight="700" letterSpacing="2" style={{ fontFamily: 'Outfit, sans-serif' }}>TELANGANA ↓</text>
              <text x="338" y="572" fill="#334155" fontSize="10" fontWeight="800" letterSpacing="2" style={{ fontFamily: 'Outfit, sans-serif' }}>KARNATAKA ↓</text>
              <text x="172" y="588" fill="#334155" fontSize="9" fontWeight="700" letterSpacing="1" style={{ fontFamily: 'Outfit, sans-serif' }}>GOA ↙</text>

              {/* ── Maharashtra terrain base layer ── */}
              <path
                d="M 115,165 C 125,185 130,220 135,260 C 140,310 150,370 165,430 C 178,485 195,530 210,555 C 225,550 245,540 290,515 C 335,480 365,445 390,448 C 440,445 490,430 520,395 C 545,360 560,310 550,270 C 535,230 500,200 455,190 C 410,180 370,185 390,175 L 415,105 C 400,90 365,82 320,78 C 270,72 220,60 185,72 C 155,90 130,135 115,165 Z"
                fill="url(#terrain-dots)"
                opacity="0.5"
              />
              <path
                d="M 625,145 C 655,120 700,115 735,135 C 765,155 775,195 780,245 C 785,305 770,370 740,420 C 705,465 655,470 610,445 C 570,420 545,370 550,330 C 555,295 585,285 605,255 C 625,220 635,175 625,145 Z"
                fill="url(#terrain-dots)"
                opacity="0.5"
              />

              {/* ── Interior grid overlay on Maharashtra ── */}
              <path
                d="M 115,165 C 125,185 130,220 135,260 C 140,310 150,370 165,430 C 178,485 195,530 210,555 C 225,550 245,540 290,515 C 335,480 365,445 390,448 C 440,445 490,430 520,395 C 545,360 560,310 550,270 C 535,230 500,200 455,190 C 410,180 370,185 390,175 L 415,105 C 400,90 365,82 320,78 C 270,72 220,60 185,72 C 155,90 130,135 115,165 Z"
                fill="url(#interior-grid)"
                opacity="0.6"
              />

              {/* ── Maharashtra Geographic Regions ── */}
              {linguisticRegions.map(region => {
                const isHovered = hoveredRegion === region.id;
                const isRegionActive = activeFilter === 'all' || activeFilter === region.id;

                return (
                  <g
                    key={region.id}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className="cursor-pointer"
                  >
                    {/* Glow layer (rendered under the fill) */}
                    {isHovered && (
                      <path
                        d={region.path}
                        fill={region.color}
                        fillOpacity={0.12}
                        filter="url(#region-glow)"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                    {/* Region Fill */}
                    <path
                      d={region.path}
                      fill={region.color}
                      fillOpacity={isRegionActive ? (isHovered ? 0.32 : 0.15) : 0.04}
                      stroke={region.color}
                      strokeWidth={isHovered ? 2.2 : 1.2}
                      strokeOpacity={isRegionActive ? (isHovered ? 1 : 0.7) : 0.2}
                      style={{ transition: 'all 0.25s ease' }}
                    />
                    {/* Region inner highlight stroke */}
                    <path
                      d={region.path}
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="0.8"
                      style={{ pointerEvents: 'none' }}
                    />

                    {/* Region Label */}
                    <text
                      x={region.labelX}
                      y={region.labelY - 8}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fillOpacity={isHovered ? 0.95 : 0.55}
                      fontSize="10"
                      fontWeight="900"
                      letterSpacing="1.5"
                      className="pointer-events-none select-none"
                      style={{ fontFamily: 'Outfit, sans-serif', transition: 'all 0.25s' }}
                    >
                      {region.name.split(' ')[0].toUpperCase()}
                    </text>
                    <text
                      x={region.labelX}
                      y={region.labelY + 8}
                      textAnchor="middle"
                      fill={region.color}
                      fillOpacity={isHovered ? 0.95 : 0.65}
                      fontSize="10"
                      fontWeight="700"
                      className="pointer-events-none select-none"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', transition: 'all 0.25s' }}
                    >
                      {region.marathiName.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* ── Major Rivers of Maharashtra ── */}
              {/* Godavari River (east-to-west across Marathwada) */}
              <path d="M 780,230 C 740,235 700,248 660,258 C 620,268 580,272 545,268 C 510,264 480,255 450,252 C 420,249 390,252 360,258 C 330,264 300,272 270,278" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.3" strokeDasharray="1,0" />
              <text x="590" y="248" fill="#38bdf8" fontSize="8" fontWeight="600" opacity="0.4" style={{ fontFamily: 'Outfit' }}>गोदावरी</text>
              {/* Krishna River */}
              <path d="M 200,435 C 225,428 258,418 295,408 C 330,398 368,388 398,382" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.25" />
              <text x="240" y="420" fill="#22d3ee" fontSize="8" fontWeight="600" opacity="0.35" style={{ fontFamily: 'Outfit' }}>कृष्णा</text>
              {/* Tapi River */}
              <path d="M 145,130 C 185,110 235,95 290,88 C 340,82 390,84 415,95" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.28" />
              <text x="235" y="82" fill="#60a5fa" fontSize="8" fontWeight="600" opacity="0.35" style={{ fontFamily: 'Outfit' }}>तापी</text>
              {/* Wardha/Pranhita River */}
              <path d="M 615,148 C 620,190 630,240 640,290 C 650,340 658,390 655,430" fill="none" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.2" />

              {/* ── Sahyadri Mountain Range Hint (western edge) ── */}
              <path d="M 130,170 C 138,200 143,240 148,280 C 153,330 158,385 168,430" fill="none" stroke="#78716c" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="3,5" />
              <text x="155" y="300" transform="rotate(-88 155,300)" fill="#a8a29e" fontSize="8" fontWeight="700" opacity="0.3" letterSpacing="3" style={{ fontFamily: 'Outfit' }}>SAHYADRI</text>

              {/* ── Regional boundary accents ── */}
              <line x1="135" y1="225" x2="340" y2="205" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,4" opacity="0.6" />
              <line x1="390" y1="175" x2="455" y2="190" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,4" opacity="0.6" />
              <line x1="455" y1="190" x2="550" y2="270" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,4" opacity="0.6" />
              <line x1="550" y1="270" x2="605" y2="255" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,4" opacity="0.6" />

              {/* ── Interactive Map Marker Pins ── */}
              {filteredPins.map(pin => {
                const isSelected = selectedPin?.id === pin.id;
                const pr = isSelected ? 11 : 7.5;

                return (
                  <g
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className="cursor-pointer"
                  >
                    {/* Pulse ring (radar sweep) */}
                    <circle cx={pin.x} cy={pin.y} r={isSelected ? 24 : 16} fill={pin.accentColor} opacity="0">
                      <animate attributeName="r" from={isSelected ? "12" : "8"} to={isSelected ? "30" : "22"} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.45;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Second slower ring */}
                    <circle cx={pin.x} cy={pin.y} r={isSelected ? 18 : 12} fill={pin.accentColor} opacity="0">
                      <animate attributeName="r" from={isSelected ? "10" : "7"} to={isSelected ? "24" : "18"} dur="2s" begin="0.7s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0" dur="2s" begin="0.7s" repeatCount="indefinite" />
                    </circle>

                    {/* Teardrop marker body */}
                    <path
                      d={`M ${pin.x},${pin.y - pr * 2.4} 
                         C ${pin.x - pr * 1.1},${pin.y - pr * 2.4} ${pin.x - pr * 1.1},${pin.y - pr * 0.3}
                         Q ${pin.x - pr * 0.9},${pin.y + pr * 0.6} ${pin.x},${pin.y + pr * 1.4}
                         Q ${pin.x + pr * 0.9},${pin.y + pr * 0.6} ${pin.x + pr * 1.1},${pin.y - pr * 0.3}
                         C ${pin.x + pr * 1.1},${pin.y - pr * 2.4} ${pin.x},${pin.y - pr * 2.4} Z`}
                      fill={isSelected ? pin.accentColor : `${pin.accentColor}CC`}
                      stroke={isSelected ? '#fff' : pin.accentColor}
                      strokeWidth={isSelected ? 1.8 : 1.2}
                      strokeOpacity={0.9}
                      style={{
                        filter: isSelected
                          ? `drop-shadow(0 0 12px ${pin.accentColor}) drop-shadow(0 4px 8px rgba(0,0,0,0.8))`
                          : 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
                        transition: 'all 0.2s ease',
                      }}
                    />
                    {/* Marker inner circle dot */}
                    <circle
                      cx={pin.x}
                      cy={pin.y - pr * 1.2}
                      r={isSelected ? pr * 0.45 : pr * 0.38}
                      fill="rgba(0,0,0,0.5)"
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y - pr * 1.2}
                      r={isSelected ? pr * 0.25 : pr * 0.2}
                      fill="#fff"
                      fillOpacity={isSelected ? 1 : 0.85}
                    />

                    {/* Label below marker */}
                    <g transform={`translate(${pin.x}, ${pin.y + pr * 1.8})`}>
                      <rect
                        x="-38" y="2" width="76" height="18" rx="5"
                        fill={isSelected ? '#0f172a' : 'rgba(6,9,16,0.9)'}
                        stroke={isSelected ? pin.accentColor : 'rgba(255,255,255,0.12)'}
                        strokeWidth={isSelected ? 1.5 : 0.8}
                        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9))' }}
                      />
                      <text
                        x="0" y="14"
                        textAnchor="middle"
                        fill={isSelected ? '#fff' : '#cbd5e1'}
                        fontSize={isSelected ? '9.5' : '8.5'}
                        fontWeight="700"
                        className="select-none"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {pin.primaryDialect}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Vignette overlay to deepen edges */}
              <rect x="0" y="0" width="840" height="600" fill="url(#vignette)" style={{ pointerEvents: 'none' }} />
            </svg>

            {/* ── FLOATING GLASS POPUP INSPECTOR ── */}
            <AnimatePresence>
              {selectedPin && (
                <>
                  {/* ── MOBILE: Compact bottom bar (hidden on sm+) ── */}
                  <motion.div
                    key={`mobile-${selectedPin.id}`}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="sm:hidden absolute bottom-0 left-0 right-0 z-30 rounded-b-3xl rounded-t-2xl"
                    style={{
                      background: 'rgba(6,9,18,0.97)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderBottom: 'none',
                      boxShadow: '0 -8px 32px rgba(0,0,0,0.9)',
                    }}
                  >
                    {/* Handle pill */}
                    <div className="flex justify-center pt-2 pb-1">
                      <div className="w-8 h-1 rounded-full bg-slate-700" />
                    </div>

                    <div className="px-3 pb-3">
                      {/* Top row: color dot + name + status + close */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: selectedPin.accentColor, boxShadow: `0 0 6px ${selectedPin.accentColor}` }}
                          />
                          <span className="text-[11px] font-extrabold text-white truncate">{selectedPin.name}</span>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0"
                            style={{
                              color: selectedPin.statusColor,
                              borderColor: `${selectedPin.statusColor}50`,
                              backgroundColor: `${selectedPin.statusColor}12`,
                            }}
                          >{selectedPin.status}</span>
                        </div>
                        <button
                          onClick={() => setSelectedPin(null as any)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                        >
                          <X size={13} />
                        </button>
                      </div>

                      {/* Native name */}
                      <div className="text-[10px] text-emerald-400 font-semibold mb-2" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                        {selectedPin.nativeName}
                      </div>

                      {/* Stats row + audio btn */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-2 flex-1">
                          {[
                            { val: selectedPin.wordCount, label: 'Words', color: 'text-white' },
                            { val: selectedPin.audioCount, label: 'Audio', color: 'text-emerald-400' },
                            { val: selectedPin.storyCount, label: 'Stories', color: 'text-cyan-400' },
                          ].map(s => (
                            <div key={s.label} className="flex-1 text-center bg-slate-900/70 border border-slate-800 rounded-lg py-1">
                              <div className={`text-[11px] font-extrabold ${s.color}`}>{s.val}</div>
                              <div className="text-[8px] text-slate-500 uppercase font-bold">{s.label}</div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => handlePlayAudio(selectedPin.phrase)}
                          disabled={isPlayingAudio}
                          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.35)] cursor-pointer"
                        >
                          <Volume2 size={13} className={isPlayingAudio ? 'animate-bounce' : ''} />
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Link
                          to="/explore"
                          className="btn-primary flex-1 py-1.5 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1"
                        >
                          <span>Explore</span><ArrowUpRight size={11} />
                        </Link>
                        <Link
                          to="/audio"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-[10px] font-bold border border-slate-700 flex items-center gap-1"
                        >
                          <Mic size={11} className="text-emerald-400" /><span>Audio</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── DESKTOP: Top-right floating panel (hidden on mobile) ── */}
                  <motion.div
                    key={`desk-${selectedPin.id}`}
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="hidden sm:block absolute top-14 right-4 w-72 z-30 p-3.5 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-slate-700/90 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(16,185,129,0.2)]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedPin.accentColor, boxShadow: `0 0 6px ${selectedPin.accentColor}` }} />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{selectedPin.regionName}</span>
                          <span className="text-[9px] font-bold px-1.5 rounded-full border" style={{ color: selectedPin.statusColor, borderColor: `${selectedPin.statusColor}50`, backgroundColor: `${selectedPin.statusColor}15` }}>
                            {selectedPin.status}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-white mt-0.5">{selectedPin.name}</h3>
                        <div className="text-[11px] text-emerald-400 font-semibold" style={{ fontFamily: 'Noto Sans Devanagari' }}>{selectedPin.nativeName}</div>
                      </div>
                      <button onClick={() => setSelectedPin(null as any)} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>

                    {/* Phrase */}
                    <div className="my-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-[8px] uppercase font-bold text-amber-300 flex items-center gap-1"><Sparkles size={9} /> Phrase</div>
                        <div className="text-[11px] font-bold text-white truncate mt-0.5" style={{ fontFamily: 'Noto Sans Devanagari' }}>"{selectedPin.phrase}"</div>
                        <div className="text-[9px] text-slate-400 truncate italic">"{selectedPin.translation}"</div>
                      </div>
                      <button onClick={() => handlePlayAudio(selectedPin.phrase)} disabled={isPlayingAudio} className="p-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 shrink-0 cursor-pointer">
                        <Volume2 size={12} className={isPlayingAudio ? 'animate-bounce' : ''} />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                      <div className="bg-slate-900/70 border border-slate-800/80 rounded-lg py-1.5 text-center">
                        <div className="font-extrabold text-white text-xs">{selectedPin.wordCount}</div>
                        <div className="text-[8px] text-slate-400 uppercase font-semibold">Words</div>
                      </div>
                      <div className="bg-slate-900/70 border border-slate-800/80 rounded-lg py-1.5 text-center">
                        <div className="font-extrabold text-emerald-400 text-xs">{selectedPin.audioCount}</div>
                        <div className="text-[8px] text-slate-400 uppercase font-semibold">Audios</div>
                      </div>
                      <div className="bg-slate-900/70 border border-slate-800/80 rounded-lg py-1.5 text-center">
                        <div className="font-extrabold text-cyan-400 text-xs">{selectedPin.storyCount}</div>
                        <div className="text-[8px] text-slate-400 uppercase font-semibold">Stories</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to="/explore" className="btn-primary flex-1 py-1.5 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1">
                        <span>Explore Dialect</span><ArrowUpRight size={11} />
                      </Link>
                      <Link to="/audio" className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold border border-slate-700 flex items-center gap-1">
                        <Mic size={11} className="text-emerald-400" /><span>Audio</span>
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Bottom-left Rich Legend */}
            <div className="absolute bottom-4 left-4 z-20 hidden md:block rounded-2xl overflow-hidden" style={{ background: 'rgba(4,8,16,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.8)' }}>
              <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Map Legend</span>
              </div>
              <div className="px-3 py-2 flex flex-col gap-1.5">
                {linguisticRegions.map(reg => (
                  <span key={reg.id} className="flex items-center gap-2 text-[10px] font-semibold text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: reg.color, boxShadow: `0 0 6px ${reg.color}80` }} />
                    {reg.name.split(' ')[0]}
                  </span>
                ))}
                <div className="mt-1 pt-1.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                    <span className="inline-block w-6 h-px" style={{ background: 'linear-gradient(90deg, #38bdf8, transparent)', opacity: 0.6 }} /> Rivers
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom-right status key */}
            <div className="absolute bottom-4 right-4 z-20 hidden md:flex flex-col gap-1 px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider" style={{ background: 'rgba(4,8,16,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-slate-500 mb-0.5">Conservation</span>
              {[['#10B981','Thriving'],['#10B981','Stable'],['#F59E0B','Vulnerable'],['#EF4444','Endangered']].map(([c,l]) => (
                <span key={l} className="flex items-center gap-1.5" style={{ color: c as string }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c as string }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Hub Picker (Minimal, visual, 1 line per dialect) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {dialectPins.map(pin => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <button
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pin.accentColor }} />
                  <span className="font-bold text-xs text-white truncate">{pin.primaryDialect}</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5" style={{ fontFamily: 'Noto Sans Devanagari' }}>
                  {pin.nativeName.split('/')[0].trim()}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LanguageMapPage;
