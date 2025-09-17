---
'framix': minor
---

📄 Release Note

### 🚀 New Components & Features

- Introduced core UI components: `Button`, `IconButton`, `LinkButton`, `Text`, `Heading`, `Spinner`, `Alert`, `Tooltip`.
- Integrated **Lucide React** for icon support across UI components.
- Added new common type definitions: `ElementStatus`, `ElementVariant`, `ElementColor`.

<br />

### 🔧 Enhancements & Refactors

- `Button` component’s `filled` variant now uses **semibold (font-weight: 600)** for stronger emphasis.
- Improved class-name utility (`cn`) to better merge Tailwind CSS class groups.
- Updated design tokens & utility classes:
  - Renamed color variables (`neutral` → `secondary`) and updated default color palette.
  - Added shadow variables for clickable elements.
  - Refined hover/active state utilities for variant styles.
  - Updated spin animation timing for smoother transitions.
- Style refinements for disabled states, pointer events, and cursor behavior.
- TypeScript improvements: enhanced type safety in props (e.g. StrictOmit, HTML tag types for `Text` and `Heading`).

<br />

### 🧪 Testing & Documentation

- Added Storybook stories with controls for all variant/color/size combinations.
- Extended test coverage to include new UI components (`Alert`, `Tooltip`, etc.) and existing ones.
- Updated Storybook argTypes & controls for spacing, variant, color, size.

<br />

### ⚙️ Dependencies & Build

- Included `lucide-react` both as a runtime dependency and peer dependency.
- Updated build configuration for externalization to avoid bundle duplication.
- Added `isLocalURL` utility with tests.

---

### 🔎 Notes

- Users upgrading to **v0.3.0** should verify that they have compatible versions of `lucide-react` installed to avoid peer dependency warnings or runtime missing icon issues.
- Storybook’s visual baseline has shifted for many components; existing snapshots may need updating after this release.
