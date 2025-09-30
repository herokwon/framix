---
'framix': patch
---

📄 Release Note

### ✨ New Features

- Restructured folder layout: moved components & layouts into per-component / per-layout directories (e.g. `components/Button/`, `layouts/Grid/`) (#52)
- Introduced explicit index.ts in each component/layout folder for named exports (component + props types)
- Centralized alignment logic and shared alignment types/constants for consistency across components (#54)
- Renamed variant "text" → "standard" in affected components (`Button`, `TextField`, etc.)
- Removed dependency on es-toolkit/camelCase for variant name mapping
- Simplified props and improved typing in various components (`IconButton`, `Select`, `RadioGroup`, `Tooltip`, layout components)
- Updated import paths, tsconfig aliases, Storybook metadata, documentation and dev instructions

<br />

### 🛠 Fixes & Maintenance

- Adjusted test descriptions (e.g. added [Components] prefix) and updated test import paths
- Cleaned up docs, copilot instructions, and README references
- Removed unused overlay exports and deprecated paths
