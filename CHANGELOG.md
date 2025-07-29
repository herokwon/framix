# framix

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
