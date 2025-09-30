# framix

## 0.4.0

### Minor Changes

- 705e8b7: 📄 Release Note

  ### ✨ New Features
  
  - Added core **Form components**: `TextField`, `Checkbox`, `Radio` / `RadioGroup`, `Select`, `Switch` (#48)
  - All components support controlled/uncontrolled usage and accessibility compliance
  - Storybook stories and test coverage included

  <br />

  ### 🛠 Improvements

  - Compound API for `Select` (`Trigger`, `Content`, `Item`) (#48)
  - `Grid` layout: added `stretch` option for `justifyContent` (#48)
  - Unified exports via `form/index.ts` (#48)
  - Added client entry (`framix/client`) for RSC compatibility (#45)
  - Updated `Button` and `LinkButton` exports to use client entry (#45)

  <br />

  ### 🐛 Fixes

  - Preserved `'use client'` directive in build output to prevent RSC breakage (#45)

  <br />

  ### 📦 Build

  - Migrated build system to **Vite lib mode** with dual entry points (#45)
  - Externalized React runtime and refined `package.json` exports (#45)

  <br />

  ### ⚠️ Notes

  - `Select` currently supports only single selection; multi-select and searchable options will come in future updates.

## 0.3.1

### Patch Changes

- 1ec6bda: 📄 Release Note

  ### 🐛 Fixes & Improvements

  - Added 'use client' directive to all UI components (Button, LinkButton, etc.) to ensure compatibility when used in client-side rendering environments of external projects.
  - Removed injectStyle: true option in the build config (tsup) to fix issues with Tailwind CSS styles not applying correctly.
  - Updated package.json to include sideEffects configuration for CSS files to ensure global styles are preserved and bundled properly.

  <br />

  ### ⚠️ Breaking Changes / Notes

  - External projects no longer need to manually add 'use client' when importing Framix components.
  - Styles previously injected via build may not have loaded correctly; with this release, global CSS is now correctly bundled, resolving previous 404 errors for CSS files.

## 0.3.0

### Minor Changes

- 3f2fcef: 📄 Release Note

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

  ***

  ### 🔎 Notes

  - Users upgrading to **v0.3.0** should verify that they have compatible versions of `lucide-react` installed to avoid peer dependency warnings or runtime missing icon issues.
  - Storybook’s visual baseline has shifted for many components; existing snapshots may need updating after this release.

## 0.2.1

### Patch Changes

- f624760: 📄 Release Note

  ### 🔧 **Enhancements & Refactors**

  - **Box**
    - Corrected function return type
    - Added `JSDoc` comments
  - **Container**
    - Filtered out `fixed` and `maxWidth` props from rest parameters
    - Corrected function return type
    - Added `JSDoc` comments
  - **Flex**
    - Updated `gap` prop to support both number and object types
    - Added `inline` prop to support inline-flex layout
    - Corrected function return type
    - Added `JSDoc` comments
    - Extended test coverage for `inline` and `gap` behaviors
  - **Grid**
    - Update `null` to `undefined` for grid-templates
    - Corrected function return type
    - Added `JSDoc` comments
    - Updated test cases related to `gap` handling

  <br />

  ### 📦 **Dependencies**
  - Upgraded vulnerable packages flagged by [`Security - Dependabot alerts / #2`](https://github.com/herokwon/framix/security/dependabot/2)

  <br />

  ### 🧪 **Testing**
  - Added and updated test cases for layout components
    - Focused on behavior of new props and internal logic
    - Ensured proper prop filtering and rendering across all variants

  <br />

  ### 📚 **Documentation**
  - All layout components (`Box`, `Container`, `Flex`, `Grid`) now include:
    - One-line JSDoc summaries
    - Usage examples
    - Descriptions aligned with design system goals

  <br />

  > This update focuses on internal consistency, improved documentation, and resilience against dependency vulnerabilities. It prepares the layout system for future feature expansion while ensuring developer clarity and safe usage.

## 0.2.0

### Minor Changes

- 72ce4b0: 📄 Release Note

  ### ✨ **New Features**
  - **Layout Component System**: Introduced comprehensive layout components with polymorphic architecture
  - **CSS Grid & Flexbox Support**: Added complete CSS Grid and Flexbox layout utilities
  - **Testing Infrastructure**: Comprehensive test coverage with React Testing Library and Vitest
  - **Storybook Integration**: Visual documentation and component playground

  <br />

  ### 🎯 **Layout Components Added**

  **Box Component:**
  - Base polymorphic component supporting any HTML element
  - Type-safe element rendering with proper prop forwarding
  - Event handling and accessibility support

  **Container Component:**
  - Responsive container with fixed and fluid width options
  - Configurable max-width breakpoints (sm, md, lg, xl)
  - Semantic HTML element support (main, section, article, aside, header, footer)

  **Flex Component:**
  - Complete Flexbox API with direction, justification, alignment controls
  - Gap management with CSS custom properties
  - Wrap control and responsive design support

  **Grid Component:**
  - Full CSS Grid implementation with template columns/rows
  - Advanced alignment controls (justifyContent, alignContent, placeItems)
  - Auto-fill/auto-fit responsive patterns
  - Custom gap management for rows and columns

  <br />

  ### 🛠 **Developer Utilities**

  **Data Constants:**
  - `ELEMENT_SIZES`: Standardized size variants (sm, md, lg, xl)
  - `ELEMENT_SPACINGS`: Spacing variants (compact, normal, loose)
  - `ELEMENT_APPEARANCES`: Color variants (default, primary, success, danger, warning, info)

  **Testing Setup:**
  - `@testing-library/user-event` for comprehensive interaction testing
  - Test utilities for polymorphic component validation
  - Event handling and accessibility testing patterns

  **Build Tools:**
  - `es-toolkit` for optimized utility functions
  - Enhanced import sorting with Prettier configuration
  - TypeScript path aliases for better organization (`@data`, `@layouts`)

  <br />

  ### 🔧 **Development Experience**

  **Storybook Configuration:**
  - Custom preview styling for light/dark theme support
  - Component playground with interactive controls
  - Comprehensive story coverage for all layout scenarios

  **Type Safety:**
  - Polymorphic component types with strict prop validation
  - CSS value extraction types for design token consistency
  - Comprehensive type coverage for all component variants

  **Import Organization:**
  - Enhanced Prettier configuration with Storybook imports
  - Organized import groups: Storybook → Third-party → Types → Utils → Data → Layouts

  <br />

  ### 📚 **Testing Coverage**

  **Component Tests:**
  - 100+ test cases covering rendering, polymorphic behavior, and props
  - Event handling validation (click, mouse, keyboard)
  - Accessibility testing (ARIA attributes, semantic elements)
  - Edge case handling and error scenarios

  **Story Documentation:**
  - Visual component gallery with interactive examples
  - Comprehensive prop documentation and usage patterns
  - Responsive design demonstrations
  - Complex layout composition examples

  <br />

  ### 🔄 **Architecture Improvements**

  > **New Components Available:**

  ```typescript
  // Polymorphic base component
  // Data constants
  import { ELEMENT_APPEARANCES, ELEMENT_SIZES, ELEMENT_SPACINGS } from '@data';

  import { Box } from '@layouts';
  // Responsive container
  import { Container } from '@layouts';
  // Flexbox layout
  import { Flex } from '@layouts';
  // CSS Grid layout
  import { Grid } from '@layouts';
  ```

  **Enhanced Import Patterns:**

  ```typescript
  // Layout components with polymorphic props
  <Box as="button" onClick={handleClick}>Button</Box>
  <Container as="main" maxWidth="lg">Content</Container>
  <Flex direction="column" gap={2}>Items</Flex>
  <Grid templateColumns={{ repeat: 3, size: '1fr' }} gap={{ row: 1, column: 2 }}>Grid Items</Grid>
  ```

  **Testing Utilities:**

  ```typescript
  // Comprehensive component testing
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';

  // Event simulation and validation
  await userEvent.click(button);
  await userEvent.hover(element);
  ```

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
