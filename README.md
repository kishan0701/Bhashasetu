# 🌐 BhashaSetu (भाषासेतु)
### *Digital Preservation of Regional Linguistic Heritage & Endangered Oral Traditions*

<p align="center">
  <img src="cep-app/public/logo.png" alt="BhashaSetu Logo" width="160" />
</p>

<p align="center">
  <strong>A modern, community-driven digital archiving platform dedicated to documenting, mapping, and preserving vulnerable regional dialects, oral lore, and indigenous vocabularies across India.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/CEP-Community_Engagement_Project-emerald?style=for-the-badge" alt="CEP Project" />
</p>

---

## 📖 About The Project

According to UNESCO, more than **197 languages and dialects in India** are classified as vulnerable, endangered, or dying. When a dialect fades, an entire civilization's oral history, folk medicine, ecological understanding, songs (*Ovi*), and cultural identity vanish with it.

**BhashaSetu** ("Bridge of Languages") bridges the generational divide by combining modern web technologies with grassroots linguistic documentation:
- 🗺️ **Interactive Dialect Geo-Map:** Explore regional speech communities across Maharashtra and Western India with geographical coordinates, speaker statistics, and vitality statuses.
- 🎙️ **Studio-Grade Audio Archive:** Listen to verified native speaker recordings (48kHz audio) of traditional greetings, proverbs, and conversational phrases.
- 📚 **Living Oral Lore & Folk Narratives:** Curated folklore, ritual stories, and moral fables with original Devanagari script alongside contextual English translations and rich cultural illustrations.
- 📖 **Interactive Folk Dictionaries:** Searchable regional glossaries with pronunciations, parts of speech, and real-world conversational examples.
- 🤝 **Community Contribution & Verification:** A decentralized workflow allowing native speakers, researchers, and village elders to submit words and stories for peer review.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Dialect Explorer** | In-depth profiles of dialects including **Malvani, Varhadi, Warli, Konkani, Ahirani, Bhili, and Marathi**. |
| **Interactive Geo-Map** | Leaflet-powered geospatial map with vitality tags (*Thriving, Stable, Vulnerable, Endangered*) and mobile-optimized sliding bottom sheets. |
| **Living Folklore & Lore** | Authentic cultural narratives illustrated with high-definition digital artwork capturing coastal whaling lore, Vidarbha cotton fields, and Warli forest music. |
| **Phonetic Pronunciations** | Audio clips and phonetic breakdowns ensuring oral accuracy is maintained. |
| **Contribution Studio** | Clean portal for speakers to record and archive new phrases, idioms, and stories. |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom Modern Glassmorphic Design System
- **Icons & Graphics:** Lucide React, Framer Motion
- **Maps:** Leaflet & React-Leaflet
- **Architecture:** Client-side SPA with scalable modular data structures

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Bhashasetu.git
   cd Bhashasetu
   ```

2. **Navigate to the web app folder:**
   ```bash
   cd cep-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:5173
   ```

### Building for Production
```bash
npm run build
```
The optimized production bundle will be generated in `cep-app/dist/`.

---

## 📁 Repository Structure

```
Bhashasetu/
├── cep-app/                # React + TypeScript + Vite frontend
│   ├── public/             # Static assets (logos, story illustrations, icons)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, AudioCard, StoryCard...)
│   │   ├── pages/          # Application pages (Home, Map, Stories, Dictionary, Studio...)
│   │   ├── data/           # Linguistic datasets & mock archives
│   │   ├── types/          # TypeScript domain interfaces
│   │   └── context/        # React Context providers
│   ├── package.json
│   └── vite.config.ts
├── docs/                   # Project documentation & architectural notes
├── VIVA_NOTES.txt          # Viva & Academic presentation notes
└── README.md
```

---

## 🎓 Academic Context

- **Course:** Community Engagement Project (CEP)
- **Institution:** Mumbai University
- **Theme:** Digital Preservation of Cultural & Linguistic Diversity

---

## 📄 License

This project is created for educational and community preservation purposes under the [MIT License](LICENSE).
