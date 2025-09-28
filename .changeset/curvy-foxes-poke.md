---
'framix': minor
---

📄 Release Note

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

