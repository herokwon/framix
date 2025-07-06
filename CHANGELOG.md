# framix

## 0.1.0

### Minor Changes

- 6e23800: 📄 Release Note

  ### ✨ **New Features**

  - **Design Token System**: Introduced comprehensive design token patterns using CSS custom properties
  - **Theme-Aware Components**: Added light/dark theme support with automatic system preference detection
  - **Modular CSS Architecture**: Restructured styles into focused, maintainable modules
  - **Custom Variant Support**: Added `dark` custom variant for Tailwind CSS utilities

  <br />

  ### 🎯 **Design Tokens Added**

  **Color Tokens:**

  - Primary, neutral, success, danger, warning, info color variants
  - Light/dark theme support with hover and active states
  - Semantic color naming convention (`--color-primary-light`, `--color-success-dark`)

  **Typography Tokens:**

  - Heading scales (heading1, heading2)
  - Title scales (title1, title2)
  - Body text scales (body1, body2, body3)
  - Responsive line-height calculations

  **Spacing Tokens:**

  - Compact, normal, loose spacing variants
  - Consistent spacing scale based on base units

  **Effect Tokens:**

  - Text opacity levels (primary: 0.87, secondary: 0.6, disabled: 0.38)
  - Shadow tokens for outlines and overlays

  <br />

  ### 🛠 **New Utilities**

  - **Background Colors**: Theme-aware background utilities (`bg-success-background-light/dark`)
  - **Text Colors**: Default text colors for light/dark themes
  - **Gradient Effects**: `underline-gradient-*` utility with hover animations
  - **Accessibility**: `disabled` utility with proper opacity and cursor states

  <br />

  ### 🔧 **Developer Experience**

  - **Path Aliases**: Added `@styles/*` TypeScript path alias for better imports
  - **Import Organization**: Enhanced Prettier configuration for stylesheet import ordering
  - **Modular Structure**: Split styles into focused files:
    - `color.css` - Color tokens and utilities
    - `effect.css` - Visual effects and opacity
    - `spacing.css` - Spacing tokens
    - `typography.css` - Typography scale
    - `index.css` - Main entry point

  <br />

  ### 📚 **Documentation**

  - Updated issue templates with improved formatting
  - Removed unnecessary colons from section headers
  - Enhanced component documentation structure

  <br />

  ### 🔄 **Migration Guide**

  > **Breaking Changes:** None - all existing code remains compatible

  - **New Features Available:**

  ```css
  /* Theme-aware background colors */
  .bg-success-background-light
  .bg-success-background-dark

  /* Text utilities */
  .text-default-light
  .text-default-dark

  /* Gradient effects */
  .underline-gradient-2
  .underline-gradient-4
  ```

  - **Path Alias Updates:**

  ```typescript
  // Old import
  // New import
  import '@styles/index.css';

  import '../src/index.css';
  ```
