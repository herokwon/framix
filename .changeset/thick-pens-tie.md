---
'framix': patch
---

📄 Release Note

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
