# FFF Skin Tool — Website

Static website export for the FFF Skin Tool web experience (companion site to the Android app). Built in claude.ai/design, exported as static HTML/CSS/JS, deployed on Vercel.

## Structure
- `index.html` — entry point / main page
- `support.js` — runtime script required by the design export (loads a couple of libraries from a CDN at runtime — no build step needed)
- `_ds/` — design system: design tokens (colors, type, spacing, etc.) and compiled styles/scripts
- `assets/` — images (catalog headers, character/skin/pet renders, icons, etc.)

## Deploying
No build step required — this is a static site. Point Vercel at this repo with no framework preset / default settings, and it will serve `index.html` at the root.

## Local preview
Open `index.html` directly in a browser, or serve the folder locally, e.g.:
```
npx serve .
```
