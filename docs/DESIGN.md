# 🎨 Design System & UI/UX Guidelines — BhashaSetu (CEP)

> **Visual Identity:** Cultural Dignity, Organic Warmth, Archival Depth, and Modern Fluidity.

---

## 1. Aesthetic Direction & Brand Mood

## 1. Aesthetic Direction & Brand Mood

Endangered languages carry ancient stories, songs, and communal identities. The redesigned visual language of BhashaSetu is a **Cyber-Heritage Dark (Cosmic Slate & Emerald)** aesthetic:
- **Cosmic Dark Canvas:** Deep nocturnal slate (`#080C14` and `#0F172A`) providing rich contrast and cinematic atmosphere.
- **Luminous Neon Accents:** Electric Emerald (`#10B981`) and Cyan Glow (`#06B6D4`) representing audio waveforms, living voices, and digital preservation.
- **Cultural Gold & Amethyst Accents:** Royal saffron gold (`#F59E0B`) and ritual violet (`#8B5CF6`) for folklore and heritage categories.
- **Glassmorphism & Micro-Glows:** Frosted translucent panels (`backdrop-blur-md`, subtle border glows) delivering a premium, modern feel.

---

## 2. Color Palette & Design Tokens

Defined in `cep-app/src/index.css`:

```css
:root {
  --bg-deep:      #080C14;  /* Deepest cosmic slate body background */
  --bg-surface:   #0F172A;  /* Card surface and sidebar panels */
  --bg-card:      rgba(15, 23, 42, 0.7); /* Translucent glass card */
  --emerald:      #10B981;  /* Primary brand color - living voice emerald */
  --cyan:         #06B6D4;  /* Audio visualizer glow & pronunciation accent */
  --amber:        #F59E0B;  /* Saffron heritage badge & caution highlight */
  --violet:       #8B5CF6;  /* Folklore & oral literature accent */
  --text-primary: #F8FAFC;  /* Crisp high-contrast heading text */
  --text-muted:   #94A3B8;  /* Secondary descriptive text & timestamps */
  --border-glass: rgba(148, 163, 184, 0.1); /* Subtle glowing borders */
}
```

### Vulnerability Status Color Codes

Languages are categorized by UNESCO threat levels, represented by glowing pill badges:

| Status | Badge Background | Badge Text / Glow | Meaning |
| :--- | :--- | :--- | :--- |
| **Endangered** | `rgba(239, 68, 68, 0.15)` | `#F87171` (Red Glow) | Severely threatened; spoken almost exclusively by elders |
| **Vulnerable** | `rgba(245, 158, 11, 0.15)` | `#FBBF24` (Amber Glow) | Spoken by older generations; restricted to certain domains |
| **Stable** | `rgba(16, 185, 129, 0.15)` | `#34D399` (Emerald Glow)| Spoken across multiple generations |
| **Thriving** | `rgba(6, 182, 212, 0.15)` | `#38BDF8` (Cyan Glow) | Active growth in revitalization projects |

---

## 3. Typography System

Loaded via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Font Pairings & Roles

1. **`Outfit` (Display & Headings)**
   - **Role:** Main page titles (`h1`, `h2`), brand logo, audio waveform headers, metrics counters.
   - **Character:** Ultra-modern, geometric, authoritative, futuristic yet balanced.
   
2. **`Plus Jakarta Sans` (Interface & Body)**
   - **Role:** Body copy, data tables, navigation links, buttons, and form inputs.
   - **Character:** Exceptionally legible on dark backgrounds with crisp letterforms.

3. **`Noto Sans Devanagari` (Native Script)**
   - **Role:** Native script titles (e.g. 'संथाली', 'भोटिया', 'गोंडी'), Devanagari text, native transliterations.
   - **Character:** Typographically authentic and properly rendered across all modern devices.

---

## 4. UI Component Anatomy

### 4.1. Language Card (`LanguageCard.tsx`)
- **Header:** Native script title alongside Roman transliteration.
- **Badge:** Vulnerability level (`Endangered` / `Vulnerable`).
- **Stats Strip:** Mini icons showing speaker count, archived word count, and audio clips.
- **Hover State:** Subtle upward translation (`translate-y-[-4px]`) and soft elevation shadow.

### 4.2. Audio Card (`AudioCard.tsx`)
- **Player Interface:** Circular play/pause button with Teal fill.
- **Waveform:** Animated SVG / CSS simulated audio bars that react when active.
- **Metadata:** Speaker name, region, recording date, and category badge.

### 4.3. Story Card (`StoryCard.tsx`)
- **Visuals:** Warm gradient header or thumbnail image.
- **Reading Time:** Pill indicator (e.g. `📖 4 min read`).
- **Cultural Context:** Subtitle highlighting the ceremony or ritual associated with the tale.

### 4.4. Interactive Map (`LanguageMapPage.tsx`)
- **Tile Layer:** Clean OpenStreetMap cartridge that harmonizes with our warm cream palette.
- **Markers:** Custom colored Leaflet marker pins reflecting dialect vulnerability.
- **Popup:** Quick-view snapshot of language statistics with a 1-click button to view the full dossier.

---

## 5. Layout & Spacing Principles

- **Max Content Width**: `max-w-7xl` (1280px) centered with responsive padding (`px-4 sm:px-6 lg:px-8`).
- **Card Grids**:
  - Desktop: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`)
  - Mobile: Single column with edge-to-edge touch-friendly padding.
- **Corner Radii**:
  - Inputs & Small Buttons: `rounded-xl` (12px)
  - Content Cards: `rounded-2xl` (16px)
  - Modals & Hero Containers: `rounded-3xl` (24px)
