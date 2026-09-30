# 🏛️ System Architecture & File Structure — BhashaSetu (CEP)

> **Audience:** Developers, Contributors, and Teammates  
> **Philosophy:** Readable, human-first architecture with clear separation of concerns. No magic or unnecessary abstractions.

---

## 1. High-Level Architecture

The platform is designed as a high-performance, responsive single-page web application (SPA) backed by centralized client state, rich UI components, and an LSP-powered development environment via Serena.

```mermaid
graph TD
    subgraph Client Application [cep-app (React 19 + TypeScript + Vite)]
        Router[React Router v7] --> Pages[Page Views (12 Pages)]
        Pages --> Components[Reusable UI Components]
        Components --> Context[AppContext (State Store)]
        Context --> MockData[Local Data Store (mockData.ts)]
    end

    subgraph Tooling & Developer Environment
        Serena[Serena LSP Engine] --> TS_Server[TypeScript Language Server]
        Oxlint[Oxlint Linter] --> CodeBase[Codebase Quality Gates]
    end

    subgraph Future Backend Target
        Context -.-> Supabase[Supabase / PostgreSQL API]
        Components -.-> S3[Cloudflare R2 / S3 Audio CDN]
    end
```

---

## 2. Complete Project Directory Guide

Here is the exact map of every file and folder in this repository. Any teammate opening this repository can locate the exact file they need in seconds:

```
cep/
├── .serena/                  # Serena Language Server configuration & telemetry
│   └── project.yml           # Project LSP settings (TypeScript LSP backend)
├── adapters/                 # AI Assistant agent adapters & workflow rules
│   ├── CLAUDE.md             # Claude-specific environment and guidelines
│   ├── GEMINI.md             # Gemini-specific configuration
│   └── GPT_OSS.md            # Open-source LLM guidance
├── docs/                     # 📚 Core Project Documentation
│   ├── PRD.md                # Product Requirements Document
│   ├── ARCHITECTURE.md       # System architecture and directory guide (this file)
│   ├── RULES.md              # Engineering rules and team coding standards
│   ├── DESIGN.md             # Design tokens, color system, and UI guidelines
│   ├── TASKS.md              # Roadmap, sprints, and task backlog
│   └── MEMORY.md             # Decision log, history, and technical state
├── PROJECT_RULES.md          # Global engineering rules & verification protocol
├── GSD-STYLE.md              # Workflow and commit style guide
├── model_capabilities.yaml   # Model parameter mappings
├── VERSION                   # Project release version
│
└── cep-app/                  # 💻 Main Frontend Application (Vite + React)
    ├── index.html            # Application entry HTML with Google Fonts
    ├── package.json          # Node dependencies and build scripts
    ├── tsconfig.json         # TypeScript base configuration
    ├── vite.config.ts        # Vite build tool and plugin configuration
    └── src/
        ├── main.tsx          # React application root mounting point
        ├── App.tsx           # Router configuration & top-level layout wrapper
        ├── App.css           # App-specific animations and utility styling
        ├── index.css         # Design system tokens, Tailwind imports, typography
        │
        ├── types/            # 🏷️ TypeScript Domain Models
        │   └── index.ts      # Interfaces: Language, Word, Phrase, Story, AudioRecording, etc.
        │
        ├── data/             # 💾 Local Data Archive
        │   └── mockData.ts   # Rich repository of endangered languages, words, and stories
        │
        ├── context/          # 🔄 Application State Store
        │   └── AppContext.tsx# React Context for search, toast, contributions, moderation
        │
        ├── components/       # 🧩 Reusable Presentation Components
        │   ├── Navbar.tsx    # Responsive header with search bar & navigation drawer
        │   ├── Layout.tsx    # Toast notifications and universal footer
        │   ├── LanguageCard.tsx # Visual cards displaying language summary & speaker count
        │   ├── WordCard.tsx  # Vocabulary cards with pronunciation and meaning
        │   ├── StoryCard.tsx # Folklore cards with reading time and cultural context
        │   └── AudioCard.tsx # Audio clip player with simulated waveform visualization
        │
        └── pages/            # 📄 Route Pages (12 Complete Views)
            ├── HomePage.tsx            # Hero section, impact statistics, featured dialects
            ├── ExplorePage.tsx         # Filterable catalog of all archived languages
            ├── LanguageDetailPage.tsx  # Deep dossier with tabs for Words, Phrases, Stories
            ├── AudioArchivePage.tsx    # Audio hub with category & dialect audio filters
            ├── StoriesPage.tsx         # Oral narratives archive with category filters
            ├── StoryDetailPage.tsx     # Full story reader with dual-language translation
            ├── LanguageMapPage.tsx     # Interactive Leaflet map with dialect markers
            ├── WordSearchPage.tsx      # Comprehensive dictionary search & filter engine
            ├── ContributePage.tsx      # Multi-type contribution submission form
            ├── DashboardPage.tsx       # Analytics, speaker charts, preservation metrics
            ├── AboutPage.tsx           # Mission, team, methodology, and ethical charter
            └── AdminPage.tsx           # Moderation queue to approve/reject submissions
```

---

## 3. Key Architectural Layers Explained

### 3.1. Domain Models (`cep-app/src/types/index.ts`)
Everything starts with strict TypeScript interfaces. There is zero guessing what shape an object takes:
- **`Language`**: Details on region, state, coordinates, speaker status (`endangered`, `vulnerable`, etc.), and word/story counters.
- **`Word` & `Phrase`**: Native text, IPA pronunciation, English meaning, category, and contributor metadata.
- **`Story`**: Cultural narrative with dual-language text, cultural context, reading time, and audio reference.
- **`AudioRecording`**: Speaker info, category, duration, play counter, and audio URL.
- **`PendingContribution`**: Queued submission model used by both the contribution form and the admin moderation panel.

### 3.2. Central State (`cep-app/src/context/AppContext.tsx`)
Rather than pulling in heavyweight external libraries like Redux for simple state, we utilize a lean React Context:
- Manages **Pending Contributions** (allows users to submit words/stories and moderators to approve/reject them live).
- Manages **Global Search State** and search overlay toggle.
- Dispatches **Toast Notifications** (`showToast('Item submitted', 'success')`).

### 3.3. Presentation Layer (`components/` & `pages/`)
- Components are **purely presentational** or connect to `useApp()` for minimal actions.
- Pages handle layout assembly, URL parameters (`useParams`), and data filtering.
- Visual consistency is guaranteed by CSS variables defined in `index.css` (see `docs/DESIGN.md`).

---

## 4. How Data Flows (Human Walkthrough)

To understand how easy it is to trace code, consider the **Contribution Flow**:

1. User visits `/contribute` ([ContributePage.tsx](file:///d:/Coding/My%20project/cep/cep-app/src/pages/ContributePage.tsx)).
2. User fills out a form to submit a new word or folk story.
3. The page calls `addContribution()` from `useApp()` ([AppContext.tsx](file:///d:/Coding/My%20project/cep/cep-app/src/context/AppContext.tsx)).
4. `AppContext` creates a new `PendingContribution` item with a unique ID and `status: 'pending'`, prepends it to state, and fires `showToast()`.
5. When the user visits `/admin` ([AdminPage.tsx](file:///d:/Coding/My%20project/cep/cep-app/src/pages/AdminPage.tsx)), the new item appears instantly in the moderation queue.
6. The admin clicks **Approve** or **Reject**, which updates the contribution status in state without needing a page refresh.

---

## 5. Tooling & Serena Integration

The project is integrated with the **Serena Language Server Protocol (LSP)**:
- Configuration file: `.serena/project.yml`
- Active Language Server: `typescript` (bundled TypeScript LSP)
- Workspace Folder: `cep` root with automatic indexing of `cep-app/src`
- Benefits:
  - Instant cross-file symbol lookups (`find_symbol`, `get_symbols_overview`).
  - AST-aware refactoring and symbol renaming.
  - Compile diagnostics and type safety validation on every change.
