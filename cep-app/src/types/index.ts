// ============================================================
// BhashaSetu - TypeScript Type Definitions
// ============================================================

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  state: string;
  community: string;
  speakers: number;
  wordCount: number;
  phraseCount: number;
  storyCount: number;
  audioCount: number;
  description: string;
  longDescription: string;
  linguisticBackground: string;
  status: 'endangered' | 'vulnerable' | 'stable' | 'thriving';
  category: 'language' | 'dialect' | 'variety' | 'creole';
  color: string;
  gradient: string;
  icon: string;
  tags: string[];
  coordinates: [number, number];
  contributors: number;
  lastUpdated: string;
}

export interface Word {
  id: string;
  languageId: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  audioUrl?: string;
  contributor: string;
  verifiedBy?: string;
  verified: boolean;
  dateAdded: string;
  tags: string[];
  relatedWords: string[];
}

export interface Phrase {
  id: string;
  languageId: string;
  phrase: string;
  pronunciation: string;
  meaning: string;
  context: string;
  exampleUsage: string;
  audioUrl?: string;
  contributor: string;
  verified: boolean;
  dateAdded: string;
  category: 'greeting' | 'proverb' | 'idiom' | 'expression' | 'folk' | 'ritual';
}

export interface Story {
  id: string;
  languageId: string;
  title: string;
  titleTranslation: string;
  language: string;
  region: string;
  content: string;
  contentTranslation: string;
  summary: string;
  contributor: string;
  contributorRole: string;
  audioUrl?: string;
  hasAudio: boolean;
  category: 'folk-tale' | 'oral-history' | 'personal-memory' | 'legend' | 'proverb-story' | 'ritual-narrative';
  culturalContext: string;
  dateAdded: string;
  verified: boolean;
  readTime: number;
  thumbnail: string;
  coverImage?: string;
}

export interface AudioRecording {
  id: string;
  languageId: string;
  language: string;
  speakerName: string;
  anonymous: boolean;
  location: string;
  region: string;
  title: string;
  description: string;
  category: 'word-pronunciation' | 'traditional-phrase' | 'folk-story' | 'conversation' | 'local-proverb' | 'cultural-narration';
  duration: number;
  dateRecorded: string;
  audioUrl?: string;
  transcription?: string;
  verified: boolean;
  plays: number;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  region: string;
  contributions: number;
  joinedDate: string;
  avatar?: string;
  languages: string[];
}

export interface PendingContribution {
  id: string;
  type: 'word' | 'phrase' | 'story' | 'audio' | 'cultural';
  title: string;
  language: string;
  region: string;
  contributor: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  content: string;
  notes?: string;
}

export interface SearchResult {
  type: 'language' | 'word' | 'phrase' | 'story' | 'audio';
  id: string;
  title: string;
  subtitle: string;
  language: string;
  region: string;
}

export interface MapMarker {
  id: string;
  name: string;
  coordinates: [number, number];
  languages: string[];
  wordCount: number;
  audioCount: number;
  storyCount: number;
  region: string;
}

export interface ImpactStat {
  label: string;
  value: number;
  unit?: string;
  icon: string;
  color: string;
}
