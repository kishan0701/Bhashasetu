# 📏 Engineering Rules & Coding Standards — BhashaSetu (CEP)

> **Core Philosophy:** Code is written for humans to read, collaborate on, and maintain — not just for compilers to execute. Write clear, intentional, clean code. Avoid mechanical boilerplate and AI-generated noise.

---

## 1. Golden Principles

1. **Self-Documenting Code**: Choose expressive names for functions, components, and variables. If a function is called `filterEndangeredLanguages(languages)`, it shouldn't need a 5-line comment explaining that it filters languages.
2. **Keep It Simple & Focused (KISS)**: Every component should do one job well. Avoid creating monster 1,000-line components. If a component grows beyond 250 lines, split sub-sections into focused helper components.
3. **No Dead or Commented-Out Code**: If code is unused, delete it. Git has full version history if we ever need it back.
4. **Explicit Over Clever**: Prefer straightforward, standard JavaScript/TypeScript idioms over convoluted one-liners.

---

## 2. TypeScript & React Best Practices

### 2.1. Strict Typing
- **Never use `any`**. Use explicit interfaces from `src/types/index.ts`. If a type is unknown or generic, use `unknown` or create a union type.
- Export all shared types from `src/types/index.ts`.
- Prefer interfaces for object structures and type aliases for unions/tuples.

```typescript
// ✅ Good: Typed props and expressive interface
interface StoryCardProps {
  story: Story;
  onSelect?: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onSelect }) => { ... };

// ❌ Bad: Untyped or using 'any'
export const StoryCard = (props: any) => { ... };
```

### 2.2. Component Conventions
- **Component File Structure**:
  1. Imports (external libraries first, then internal components/types)
  2. Component-specific interfaces/types
  3. Main functional component
  4. Export statement (named or default export, consistent per module)
- **Functional Components Only**: Use React 19 functional components with standard hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useContext`).
- **Hook Dependencies**: Always list all required variables in hook dependency arrays. Never disable eslint exhaustive-deps unless strictly justified.

---

## 3. Styling & Design Standards

- **Use Theme Tokens**: Always reference defined design tokens (`--cream`, `--teal`, `--navy`, `--amber`) or their corresponding Tailwind classes (`bg-teal-600`, `text-amber-800`).
- **Responsive by Default**: Every new UI feature must look great on both mobile (375px+) and desktop (1280px+). Use standard Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- **Interactive States**: Buttons and interactive links must have visible `:hover`, `:focus-visible`, and `:active` feedback.
- **Font Pairing**:
  - Headings / Heritage accents: `font-serif` or `Playfair Display`
  - Body copy & UI controls: `Inter`
  - Regional / Devanagari text: `Noto Sans Devanagari`

---

## 4. State Management Rules

- **Local State First**: If state is only needed by one component, keep it local with `useState`.
- **Global State via Context**: If state needs to be accessed across distant pages (e.g. contribution queue, global search query, toast alerts), place it in `AppContext`.
- **Immutable Updates**: Never mutate state objects directly. Always create new copies using spread syntax or pure mapping functions:

```typescript
// ✅ Good: Immutable array update
setContributions(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));

// ❌ Bad: Direct state mutation
contributions[0].status = 'approved';
```

---

## 5. File & Folder Naming Conventions

| Entity | Pattern | Example |
| :--- | :--- | :--- |
| **Component Files** | `PascalCase.tsx` | `AudioCard.tsx`, `LanguageCard.tsx` |
| **Page Views** | `PascalCase.tsx` with `Page` suffix | `HomePage.tsx`, `StoryDetailPage.tsx` |
| **Utility / Hook Files** | `camelCase.ts` | `useDebounce.ts`, `formatDate.ts` |
| **Type Definitions** | `camelCase.ts` | `index.ts`, `apiTypes.ts` |
| **Constants / Mock Data** | `camelCase.ts` | `mockData.ts` |
| **Documentation** | `UPPERCASE.md` | `PRD.md`, `ARCHITECTURE.md` |

---

## 6. Git & Commit Guidelines

- **Atomic Commits**: One logical change per commit. Don't bundle unrelated UI fixes with data refactors.
- **Commit Message Format**: Follow standard Conventional Commits:
  - `feat(audio): add simulated waveform visualizer to AudioCard`
  - `fix(map): prevent Leaflet container re-initialization crash`
  - `docs(rules): add team coding standards document`
  - `style(navbar): refine mobile menu slide-in transition`
  - `refactor(types): unify Language and Dialect interfaces`

---

## 7. Verification Checklist Before Pushing Code

Before opening a pull request or pushing to the main branch:
- [ ] Run `npm run build` in `cep-app` — ensure zero TypeScript compilation errors.
- [ ] Run `npm run lint` in `cep-app` — ensure Oxlint passes cleanly.
- [ ] Test in the browser — verify layout on desktop and mobile viewports.
- [ ] Check console — verify no unhandled runtime errors or missing React keys.
