# 🧠 Project Memory & Decision Records — BhashaSetu (CEP)

> **Purpose:** Persistent institutional memory. Records why decisions were made, historical context, and technical discoveries so that future engineers don't have to guess or reinvent the wheel.

---

## 1. Project Background & Vision

- **Project Code:** `cep` (Cultural Endangered Languages Preservation Platform)
- **Brand Name:** BhashaSetu (भाषा सेतु)
- **Mission:** Provide an accessible, culturally dignified digital sanctuary for endangered Indian dialects, preserving oral folklore, audio pronunciations, and indigenous cultural context before they vanish.

---

## 2. Architectural Decision Records (ADRs)

### ADR-001: Choice of Vite + React 19 Single Page App (SPA)
- **Date:** 2026-09
- **Context:** Needed a fast, modern frontend stack for rendering dynamic maps, interactive audio visualizers, and smooth tab switching.
- **Decision:** Chose Vite with React 19 and TypeScript rather than heavy Next.js SSR.
- **Rationale:** 
  - Audio playback and interactive Leaflet maps are inherently client-side experiences.
  - SPAs can be deployed to zero-cost edge CDNs (Vercel, Cloudflare Pages) and packaged as offline-first PWAs for field linguists in areas without cellular connectivity.

---

### ADR-002: Tailwind CSS v4 + Cyber-Heritage Dark Design System
- **Date:** 2026-09
- **Context:** Previous light parchment scheme lacked modern visual punch, dynamic contrast for audio waveforms, and cinematic gravitas.
- **Decision:** Shifted to a high-contrast Cyber-Heritage Dark palette (`#080C14`, `#0F172A`, `#10B981`, `#06B6D4`) in `cep-app/src/index.css` with Google Fonts `Outfit`, `Plus Jakarta Sans`, and `Noto Sans Devanagari`.
- **Rationale:**
  - Dark surfaces dramatically enhance glowing elements like audio waveforms, interactive radar map markers, and high-frequency phoneme charts.
  - Pairing geometric `Outfit` with crisp `Plus Jakarta Sans` creates a premium, high-tech archival aesthetic while honoring cultural heritage.

---

### ADR-003: Leaflet & OpenStreetMap for Geospatial Mapping
- **Date:** 2026-09
- **Context:** Need to visually place 100+ dialects on the map of India with accurate coordinates.
- **Decision:** Adopted `leaflet` and `react-leaflet` with OpenStreetMap raster tiles.
- **Rationale:**
  - 100% open-source without requiring proprietary API billing keys (unlike Google Maps or Mapbox).
  - Lightweight and supports custom marker pins with reactive popups.

---

### ADR-004: Centralized AppContext for Rapid Prototyping
- **Date:** 2026-09
- **Context:** Needed a working contribution submission flow and admin moderation queue without waiting for a database to be provisioned.
- **Decision:** Built `AppContext.tsx` with initial data seeded from `mockData.ts`. Submissions and approvals update in-memory state with visual toast feedback.
- **Rationale:**
  - Enables complete end-to-end UX testing of the contribution and approval pipeline immediately.
  - The context API is cleanly isolated, meaning switching to a Supabase or REST client later requires zero changes to UI components.

---

### ADR-005: Serena Language Server Integration
- **Date:** 2026-09
- **Context:** Codebase needed deep code intelligence, AST symbol navigation, and robust cross-file reference tracking.
- **Decision:** Activated Serena with the `typescript` language server in `.serena/project.yml`.
- **Rationale:**
  - Serena indexes all symbols across `cep-app/src` (`App`, `AppContext`, `LanguageCard`, `StoryCard`, etc.).
  - Enables instant health checks, diagnostics, and refactoring safety.

---

## 3. Current Technical State

- **Node Version:** `v24.20.0`
- **Package Manager:** `npm 11.19.0`
- **TypeScript:** `5.9.3` (bundled in Serena LSP) / `~6.0.2` in `package.json`
- **Build Status:** Verified clean build via `npm run build`
- **Serena Health:** Verified passed (`serena project health-check` returns exit code 0 / tools working correctly).

---

## 4. Helpful Tips & Gotchas for Teammates

1. **Leaflet CSS Import**:
   - Leaflet styles must be available globally. Make sure `leaflet/dist/leaflet.css` is imported in `LanguageMapPage.tsx` or `index.html`.
2. **Adding New Languages to the Archive**:
   - Simply add a new object to the `languages` array in `cep-app/src/data/mockData.ts`. Ensure you include valid geographic coordinates `[lat, lng]` so it renders properly on the map.
3. **Modifying Types**:
   - When updating the shape of languages, words, or stories, always edit `cep-app/src/types/index.ts` first. TypeScript will immediately pinpoint any component that needs adjustments.
