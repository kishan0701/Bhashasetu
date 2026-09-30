# 📜 Product Requirements Document (PRD) — BhashaSetu (CEP)

> **Project Name:** BhashaSetu (Cultural Endangered Languages Preservation Platform)  
> **Document Status:** Active / Reference  
> **Target Audience:** Core Engineering Team, Linguists, Community Contributors  
> **Repository:** `cep` / `cep-app`

---

## 1. Executive Summary & Vision

India and South Asia are home to hundreds of indigenous languages, regional dialects, and oral traditions. According to UNESCO and linguistic surveys, over **197 Indian languages** are currently classified as vulnerable, endangered, or critically endangered. When a language dies, an entire worldview, indigenous ecological knowledge, folklore, and cultural memory vanish with it.

**BhashaSetu** (भाषा सेतु — *Bridge of Languages*) is an open, community-driven digital preservation platform. It bridges ancient oral knowledge with modern digital technology by archiving words, idioms, audio recordings, folk stories, and geographical origins of threatened dialects.

---

## 2. Core Problem Statement

1. **Oral-First Nature**: Many endangered dialects have no formal written script; their vocabulary survives only in speech between elders.
2. **Fragmentation of Data**: Existing linguistic research is scattered in academic journals, PDFs, or private field notes inaccessible to the native community or young generations.
3. **Lack of Community Verification**: Generic crowd-sourcing often introduces inaccuracies without linguist/community elder peer review.
4. **Youth Disconnect**: Modern digital platforms lack engaging, aesthetically pleasing interfaces for youth to explore their ancestral roots.

---

## 3. User Personas

| Persona | Role | Primary Goal | Pain Point |
| :--- | :--- | :--- | :--- |
| **Elder / Native Speaker** | Oral Contributor | Share songs, stories, and pronunciations in their mother tongue | Complex tech interfaces; non-digital background |
| **Field Linguist / Researcher** | Verifier & Curator | Document phonetic variations, validate definitions, categorize grammar | Incomplete metadata, lack of audio-visual context |
| **Youth / Cultural Learner** | Explorer | Learn ancestral words, read translated folklore, hear authentic accents | No easy, attractive mobile/web interface |
| **Community Admin** | Platform Moderator | Review pending submissions, prevent spam, maintain archival quality | Managing high volume of submissions with limited time |

---

## 4. Key Functional Modules

### 4.1. Language Directory & Dossiers (`/explore`, `/language/:id`)
- **Metadata Cards**: Native script name, region, state, estimated living speakers, linguistic classification, and vulnerability badge (`endangered`, `vulnerable`, `stable`).
- **Deep-Dive Dossier**:
  - Detailed background, origin story, and linguistic characteristics.
  - Tabbed explorer for **Words**, **Phrases**, **Stories**, and **Audio Clips**.
  - Statistics overview (speaker counts, community contributors, verified entries).

### 4.2. Interactive Geo-Linguistic Map (`/map`)
- Visual map powered by Leaflet and OpenStreetMap.
- Geospatial pins marking where each dialect is actively spoken across Indian states/regions.
- Interactive popups showing dialect highlights, quick stats, and direct links to language profiles.

### 4.3. Oral Histories & Folklore Archive (`/stories`, `/stories/:id`)
- Rich storytelling reader featuring traditional folk tales, creation legends, and personal narratives.
- Dual-text reading experience: Native transcription paired side-by-side with English/Hindi translations.
- Embedded audio narration player with time estimates and cultural context annotations.

### 4.4. Audio Archive & Pronunciation Studio (`/audio`)
- Dedicated listening hub for authentic human voices.
- Filter by dialect, region, and category (e.g. *folk-story*, *word-pronunciation*, *local-proverb*).
- Interactive waveform visualizer, play/pause controls, and speaker attribution.

### 4.5. Community Contribution Workflow (`/contribute`)
- Clean, multi-step submission form for:
  - New Words & Meanings (with parts of speech, example usage).
  - Cultural Phrases & Proverbs.
  - Folk Stories with dual-language content.
  - Audio Pronunciations.
- Contributor identity attribution (allows anonymous submissions for privacy).

### 4.6. Admin Review & Verification Portal (`/admin`)
- Moderation queue displaying pending contributions.
- One-click **Approve** or **Reject** with optional reviewer notes.
- Real-time status update synchronized across the app context.

### 4.7. Lexical Search & Global Discovery (`/word-search`, Global Navbar Search)
- Instant search bar with auto-suggestions across languages, words, phrases, and stories.
- Word Search page with filter chips (part of speech, language, verification status).

---

## 5. Non-Functional Requirements

- **Performance**: Instant client-side routing via Vite + React Router. Zero lag during audio playback.
- **Design & Aesthetics**: Earthy, dignified cultural design using warm cream, heritage teal, and deep amber. Clear typography using *Playfair Display*, *Inter*, and *Noto Sans Devanagari*.
- **Accessibility**: High contrast ratio (WCAG AA), accessible labels for audio controls, responsive on screens from 360px mobile to 4K displays.
- **Data Integrity**: TypeScript strict types across all domain models (`Language`, `Word`, `Phrase`, `Story`, `AudioRecording`).

---

## 6. Success Metrics & KPIs

1. **Preservation Volume**: Total count of unique dialects and verified vocabulary items documented.
2. **Audio Richness**: Percentage of vocabulary entries backed by real human audio recordings.
3. **Community Engagement**: Number of active contributors and stories submitted each month.
4. **Verification Velocity**: Average time taken by moderators to review and publish a contribution.
