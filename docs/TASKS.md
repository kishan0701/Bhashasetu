# Tasks & Roadmap Backlog - BhashaSetu (CEP)

> **Sprint Cadence:** Continuous Delivery
> **Status Indicators:** `[x] Completed` | `[/] In Progress` | `[ ] Backlog / Planned`

---

## Current Milestone: Phase 2 - Architecture, Tooling & Polish

| Priority | Task ID | Description | Owner | Status |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | TSK-101 | Configure Serena LSP backend with TypeScript language server | Team | [x] Completed |
| **P0** | TSK-102 | Verify Serena symbol indexing and health checks | Team | [x] Completed |
| **P0** | TSK-103 | Create human-friendly documentation suite (docs/ directory) | Team | [x] Completed |
| **P1** | TSK-104 | Audit UI components for mobile responsiveness and clean layouts | Team | [x] Completed |
| **P1** | TSK-105 | Validate zero TypeScript build warnings (npm run build) | Team | [x] Completed |
| **P0** | TSK-106 | Generate real TTS audio (gTTS) for all 7 dialect recordings | Team | [x] Completed |
| **P0** | TSK-107 | Fix AudioCard desktop playback (MIME type + Chrome audio bug) | Team | [x] Completed |
| **P0** | TSK-108 | Fix Map page dialect Audio button for desktop browsers | Team | [x] Completed |
| **P0** | TSK-109 | Add Home navigation link to Navbar, mobile drawer, and Footer | Team | [x] Completed |
| **P0** | TSK-110 | Update hero Sample Oral Archive to authentic Abhang recitation | Team | [x] Completed |
| **P1** | TSK-111 | Calibrate archive numbers to realistic early-stage metrics | Team | [x] Completed |
| **P0** | TSK-112 | Fix UTF-8 encoding/mojibake for dialect icons and Devanagari script | Team | [x] Completed |
| **P1** | TSK-113 | Refactor Explore filter controls into responsive 1-line layout | Team | [x] Completed |

---

## Phase 1: MVP Core Showcase (Completed)

- [x] Home Landing Page (HomePage.tsx)
- [x] Language Catalog (ExplorePage.tsx)
- [x] Language Dossier (LanguageDetailPage.tsx)
- [x] Interactive Geospatial Map (LanguageMapPage.tsx) - dialect nodes with phrase audio
- [x] Oral Histories Hub (StoriesPage.tsx & StoryDetailPage.tsx) - dual-language reader + audio
- [x] Audio Listening Archive (AudioArchivePage.tsx) - real MP3 playback for 7 dialects
- [x] Contribution Workflow (ContributePage.tsx)
- [x] Moderation Queue (AdminPage.tsx)
- [x] Lexical Search (WordSearchPage.tsx)
- [x] Analytics Dashboard (DashboardPage.tsx)

---

## Phase 3: Real Persistence & Media Infrastructure (Upcoming)

| Priority | Task ID | Description | Target |
| :--- | :--- | :--- | :--- |
| **P0** | TSK-201 | Supabase Database Schema | Sprint 3 |
| **P0** | TSK-202 | Audio Media Storage (R2 / S3) | Sprint 3 |
| **P1** | TSK-203 | In-Browser Audio Recording widget | Sprint 3 |
| **P1** | TSK-204 | User Authentication (email / OAuth) | Sprint 4 |
| **P2** | TSK-205 | Offline PWA Support | Sprint 4 |

---

## Bug Tracker & Known Issues

| ID | Issue Description | Component | Status |
| :--- | :--- | :--- | :--- |
| BUG-01 | Leaflet default marker icon path issue in Vite builds | LanguageMapPage.tsx | Fixed |
| BUG-02 | Audio playback reset on route navigation | AudioCard.tsx | By design |
| BUG-03 | Audio files were silent/placeholder WAVs | public/audio/ | Fixed - real gTTS MP3 generated |
| BUG-04 | Desktop Chrome audio silent (source onError misfires) | AudioCard.tsx | Fixed - direct src= with error-code check |
| BUG-05 | Map dialect Audio button silent on desktop Chrome | LanguageMapPage.tsx | Fixed - useRef voice preload + 120ms delay |
| BUG-06 | Return navigation trap: no Home link on subpages | Navbar.tsx, Layout.tsx | Fixed - Home link in Desktop Nav, Drawer & Footer |
| BUG-07 | Hero sample audio lacked musicality | HomePage.tsx | Fixed - switched to Tukaram Abhang (312s) |
| BUG-08 | Mojibake encoding error (`ðŸŒ¿`, `à¤®à¤°à¤¾à¤ à¥€`) | mockData.ts | Fixed - clean UTF-8 restored across all data |
| BUG-09 | Category & status filter dropdowns stacked on 2 lines | ExplorePage.tsx | Fixed - single-row responsive flex layout |
