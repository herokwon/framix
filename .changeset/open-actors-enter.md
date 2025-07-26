---
'framix': minor
---

📄 Release Note

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
import { Box } from '@layouts';

// Responsive container
import { Container } from '@layouts';

// Flexbox layout
import { Flex } from '@layouts';

// CSS Grid layout
import { Grid } from '@layouts';

// Data constants
import { ELEMENT_SIZES, ELEMENT_SPACINGS, ELEMENT_APPEARANCES } from '@data';
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
