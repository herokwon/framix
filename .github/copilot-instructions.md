
# Copilot Instructions for framix

## Overview
- framix is a React-based UI component library. Core directories: `src/components/ui`, `src/layouts`, `src/styles`, `src/utils`, `src/types`, `src/data`.
- Each component has: implementation (`*.tsx`), Storybook docs (`*.stories.tsx`), tests (`*.test.tsx`).

## Core Commands & Workflow
- Dev server: `pnpm dev` (Vite)
- Build: `pnpm build` (type check via `tsc -b` then bundle with tsup)
- Tests: `pnpm test` (Vitest + coverage)
- Tests UI: `pnpm test:ui` (Vitest UI mode)
- Storybook: `pnpm storybook` (dev), `pnpm build-storybook` (static build)
- Release: `pnpm release` (build + changeset publish)
- Lint / Format: `pnpm lint`, `pnpm format`

## Tooling & Integration
- TypeScript: path aliases in `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` (`@components`, `@data`, `@layouts`, `@styles`, `@types`, `@utils`).  
  Example: `import { cn } from '@utils/cn'`
- ESLint: strict flat config (`eslint.config.js`) + Prettier. Disallows unused code & side-effect-only imports.
- Vite: configured in `vite.config.ts` with React SWC, Tailwind, tsconfig paths.
- Testing: `vitest.setup.ts` adds Testing Library + jest-dom; coverage excludes types, stories, test files, config, d.ts.
- Storybook: integrated with Vitest (storybook project in Vite test config); Storybook interaction tests run separately (Playwright headless browser).

## Directory Structure & Patterns
- `src/components/ui`: atomic UI components (impl + test + story co-located)
- `src/layouts`: layout primitives (same pattern as UI)
- `src/utils`: shared helpers (`cn.ts`, `is-local-url.ts`) with tests
- `src/types`: shared & component-related type definitions
- `src/data`: constants / data maps
- `src/styles`: global design tokens & layer styles (import per component)
- `index.ts` in each domain folder is the re-export entry
- Tests also appear in `__tests__` under root domains for integration style cases

## External Dependencies & Key Points
- Core stack: React 19, TailwindCSS 4, Lucide-React, Storybook 9, Vitest, Playwright, Chromatic (storybook publishing/testing potential)
- Vite plugins: react-swc, tailwindcss, tsconfig-paths

## Coding Patterns
- Props types imported from `src/types` instead of redefining per component when reusable.
- Styles applied with explicit CSS imports: `import '../styles/typography.css'` (avoid implicit global assumptions).
- Tests follow: `describe / it / expect`; prefer Testing Library queries over DOM traversal.
- Stories export default meta + named story exports (CSF pattern).

### Path Alias Example
```tsx
import { Button } from '@components/ui/Button';
import { cn } from '@utils/cn';
```

### Test vs Story Separation
- `src/components/ui/Button.test.tsx` (unit / behavior test)
- `src/components/ui/Button.stories.tsx` (visual & docs)

### Coverage Exclusions
Types, story files, test files, config scripts, declaration files are excluded (see `vite.config.ts` coverage.exclude).

### Reference Files
- `src/components/ui/Button.tsx`, `src/layouts/Box.tsx`, `src/utils/cn.ts` illustrate styling, layout composition, utility patterns.

---
This guide gives AI coding agents the minimal, project-specific knowledge to be productive quickly. For gaps or clarifications, open an issue or update this file.

## Release & Versioning
- Versioning managed via Changesets (`.changeset` directory auto-generated when running `pnpm changeset`).
- Command flow:
  1. Author changes & add a changeset: `pnpm changeset` (select bump type; writes markdown file).
  2. Merge PRs accumulating changeset files into release branch (or main).
  3. Run `pnpm release` (build + publish via changeset publish).
- Semver guidance:
  - PATCH: bug fix, internal refactor, style-only, test-only, non-breaking prop default adjustments.
  - MINOR: new component, new prop (backward compatible), visual enhancement behind non-breaking defaults.
  - MAJOR: removed/deprecated props, renamed exports, breaking CSS class or structural markup changes.
- Build artifacts: emitted to `dist/` via tsup (CJS + ESM + d.ts). Ensure tree-shake friendliness (avoid side-effectful top-level code).
- Export hygiene: add new public exports to `src/index.ts` and keep naming consistent with existing PascalCase components / camelCase utilities.
- Avoid leaking internal test utilities or types not intended for consumers; keep them un-exported or under internal modules.

## Contribution Conventions
- Commit messages (recommended conventional style):
  - ``feat(ui): Add `ToggleSwitch` ui component``
  - ``feat(form): Add `Checkbox` form component``
  - `fix(ui/Button): Correct disabled focus ring`
  - `docs(ui/Button): Update story examples`
  - `refactor(layout/Grid): Simplify gap logic`
  - `test(utils/is-local-url): Add edge cases`
- Pull Requests should include:
  - Summary of change + motivation.
  - Screenshots or Storybook link for visual changes.
  - Mention of added/updated tests (unit + story if applicable).
  - Changeset file (unless purely docs or internal chore). If omitted intentionally, explain why.
- New Component Checklist:
  - [ ] Implementation in `src/components/ui/Name.tsx` and `src/components/form/Name.tsx` (or layout if structural).
  - [ ] Story: usage variations, accessibility notes, edge state examples.
  - [ ] Tests: render + accessibility role/query + critical interactions.
  - [ ] Styles: imports only required CSS from `src/styles`; no global leakage.
  - [ ] Types: shared types extracted to `src/types` if reusable.
  - [ ] Export added to `src/components/ui/index.ts`, `src/components/form/index.ts` and root `src/index.ts`.
  - [ ] Changeset created with appropriate semver bump.
- Accessibility: prefer semantic HTML tags (see `src/data/html-tag.ts` / `src/types/html-tag.ts`), ensure focus states & aria labels where needed.
- Prop patterns: prefer primitive + minimal polymorphism; use existing polymorphic types in `src/types/polymorphic.ts` if forwarding element types.
- Testing guidelines: prefer Testing Library role/text queries; avoid snapshot tests for dynamic UI unless structural regression protection is needed.
- Storybook: keep stories lean; move complex logic to reusable examples if necessary to avoid bloating bundle size.

