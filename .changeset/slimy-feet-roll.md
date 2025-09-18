---
'framix': patch
---

📄 Release Note

### 🐛 Fixes & Improvements

Added 'use client' directive to all UI components (Button, LinkButton, etc.) to ensure compatibility when used in client-side rendering environments of external projects. 
GitHub

Removed injectStyle: true option in the build config (tsup) to fix issues with Tailwind CSS styles not applying correctly. 
GitHub

Updated package.json to include sideEffects configuration for CSS files to ensure global styles are preserved and bundled properly. 
GitHub

<br />

### ⚠️ Breaking Changes / Notes

External projects no longer need to manually add 'use client' when importing Framix components.

Styles previously injected via build may not have loaded correctly; with this release, global CSS is now correctly bundled, resolving previous 404 errors for CSS files.
