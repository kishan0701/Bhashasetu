# 📋 Tasks & Roadmap Backlog — BhashaSetu (CEP)

> **Sprint Cadence:** Continuous Delivery  
> **Status Indicators:** `[x] Completed` | `[/] In Progress` | `[ ] Backlog / Planned`

---

## 🚀 Current Milestone: Phase 2 — Architecture, Tooling & Polish

| Priority | Task ID | Description | Owner | Status |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | `TSK-101` | Configure Serena LSP backend with TypeScript language server | Team | [x] Completed |
| **P0** | `TSK-102` | Verify Serena symbol indexing and health checks | Team | [x] Completed |
| **P0** | `TSK-103` | Create human-friendly documentation suite (`docs/` directory) | Team | [x] Completed |
| **P1** | `TSK-104` | Audit UI components for mobile responsiveness and clean layouts | Team | [/] In Progress |
| **P1** | `TSK-105` | Validate zero TypeScript build warnings (`npm run build`) | Team | [x] Completed |

---

## 📦 Phase 1: MVP Core Showcase (Completed Archives)

- [x] **Home Landing Page** (`HomePage.tsx`): Hero banner, impact counters, featured languages carousel, value propositions.
- [x] **Language Catalog** (`ExplorePage.tsx`): Filterable grid of dialects with state and vulnerability filters.
- [x] **Language Dossier** (`LanguageDetailPage.tsx`): Deep profile with tabbed Words, Phrases, Stories, and Audio.
- [x] **Interactive Geospatial Map** (`LanguageMapPage.tsx`): Leaflet map rendering dialect locations with popups.
- [x] **Oral Histories Hub** (`StoriesPage.tsx` & `StoryDetailPage.tsx`): Dual-language reader with context notes.
- [x] **Audio Listening Archive** (`AudioArchivePage.tsx`): Player with simulated audio waveform.
- [x] **Contribution Workflow** (`ContributePage.tsx`): Submission forms for words, phrases, stories, and audio.
- [x] **Moderation Queue** (`AdminPage.tsx`): Pending approval interface with live state synchronization.
- [x] **Lexical Search** (`WordSearchPage.tsx`): Multi-filter dictionary search across archived vocabulary.
- [x] **Analytics Dashboard** (`DashboardPage.tsx`): Speaker demographics, preservation metrics, and charts.

---

## 🔮 Phase 3: Real Persistence & Media Infrastructure (Upcoming)

| Priority | Task ID | Description | Target |
| :--- | :--- | :--- | :--- |
| **P0** | `TSK-201` | **Supabase Database Schema**: Define tables for `languages`, `words`, `phrases`, `stories`, and `audio_records` with foreign keys and RLS policies | Sprint 3 |
| **P0** | `TSK-202` | **Audio Media Storage**: Connect Cloudflare R2 or AWS S3 bucket for uploading real `.wav` / `.mp3` recordings | Sprint 3 |
| **P1** | `TSK-203` | **In-Browser Audio Recording**: Add a native microphone recording widget to `ContributePage.tsx` using the Web Audio API | Sprint 3 |
| **P1** | `TSK-204` | **User Authentication**: Implement email / OAuth logins for contributors, linguists, and platform admins | Sprint 4 |
| **P2** | `TSK-205` | **Offline PWA Support**: Enable service worker caching so researchers can record data in remote areas without internet | Sprint 4 |

---

## 🌟 Phase 4: Linguistic Intelligence & Community Scaling (Future)

- [ ] `TSK-301`: Automated IPA (International Phonetic Alphabet) transcription assistance via speech-to-text models.
- [ ] `TSK-302`: Community peer review system (upvoting translations and reporting inaccuracies).
- [ ] `TSK-303`: Multi-lingual UI toggle (Switch entire interface between English, Hindi, Bengali, etc.).
- [ ] `TSK-304`: Export dossiers to printable PDF / archival JSON format for academic research repositories.

---

## 🐞 Bug Tracker & Known Issues

| ID | Issue Description | Component | Workaround / Status |
| :--- | :--- | :--- | :--- |
| `BUG-01` | Leaflet default marker icon path issue in Vite builds | `LanguageMapPage.tsx` | Resolved with inline SVG / Lucide icons |
| `BUG-02` | Audio playback reset on route navigation | `AudioCard.tsx` | Expected in local state; global player planned for Phase 3 |
