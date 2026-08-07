# FFF Skin Tool — Design System

A premium, esports-grade design system for **FFF Skin Tool**, an Android companion app for battle-royale (Free Fire) players. It powers three surfaces today: a **paid Skins/Cosmetics catalog**, a **Pets catalog**, and a **Diamond Guide** (currency top-up guidance).

The system's job is to feel like an **official esports companion app**: premium, confident, technical, modern, fast, clean and highly organized — *gaming-first without the cheap gaming clichés*. No neon overload, no template UI, no visual clutter.

## Sources provided
- `assets/logo-fff-skin-tool.png` — primary wordmark lockup (from `uploads/FFF Skin Tool Logo.png`).
- `assets/app-icon.png` — app icon: a loot-vault opening onto a glowing crystal (from `uploads/FFF Skin Tool app icon 2.png`).
- No codebase, Figma file, or brand-guideline document was supplied. The color, type and component systems below are derived directly from the logo + icon and the stated brand adjectives. **Fonts are a Google Fonts substitution (flagged below) — supply licensed brand fonts to replace them.**

---

## CONTENT FUNDAMENTALS
How FFF Skin Tool writes copy.

- **Voice:** confident, concise, expert. It talks like a knowledgeable teammate, not a hype-man. Short, declarative lines. "Best-value top-ups." "Fresh legendary skins, updated weekly."
- **Person:** address the player as **you** ("Your balance", "Notify me about new drops"). The app refers to itself in third person sparingly, mostly it just states facts.
- **Casing:** Title Case for screen titles, section headers and buttons ("Diamond Guide", "Buy Diamonds", "Browse full catalog"). UPPERCASE micro-labels for meta/eyebrows, tracked out (`Drop of the week`, `Popularity`). Sentence case for body and helper text.
- **Numbers are first-class.** Diamond amounts, IDs, percentages and stats are always set in the mono face with tabular figures and thousands separators (`12,340`, `SKN-0472-LG`, `-25%`). Numbers never hide.
- **Tone words in the wild:** "Legendary", "Mythic", "Vault", "Drop", "Season 12", "Whale pick", "Best value". Rarity and value language is core vocabulary.
- **No emoji.** Iconography carries all the visual shorthand (see Iconography). Exclamation marks are rare; urgency comes from facts ("2 days left"), not punctuation.
- **Guidance, not pressure.** The Diamond Guide *advises* ("When to buy", "avoid single-tap top-ups") rather than nagging. Premium is presented as value, never FOMO spam.

---

## VISUAL FOUNDATIONS

**Overall mood.** Deep-space navy canvas, precision-cut like faceted crystal. One hero accent (electric crystal-cyan), gold reserved for premium/legendary, violet + azure as secondary rarity accents, chrome-silver typography. Cool-toned, technical, high-contrast, calm — the flash comes from *content* (skin art, rarity), not from the chrome.

- **Color.** Dark-first. Canvas `--ink-950` (#05070F); surfaces step up in lightness (`--ink-850/800/700`) rather than with heavy shadow. Primary accent `--crystal-500` (#1FCDF5). Premium accent `--gold-500` (#F5B833), used sparingly. Full rarity ladder: common → rare → epic → legendary → mythic. Semantic success/warning/danger are muted, never candy-bright.
- **Type.** Display = **Chakra Petch** (squared, technical, gaming-first but professional) for headings, stats and labels. Body/UI = **IBM Plex Sans**. Numerics = **IBM Plex Mono** with tabular figures. Display is set tight (`-0.01em`); micro-labels are tracked wide (`0.08–0.14em`) and uppercase.
- **Spacing.** 4px base grid. App reference width 412px (Android), 16px gutters, 56px header, 64px bottom tab bar, 44px minimum touch target.
- **Backgrounds.** Flat deep navy, occasionally lifted by a single restrained radial "glow" (`--grad-glow`) at the top of a view or behind featured content. No busy patterns, no full-bleed photographic textures, no gradient soup. Rarity glow appears *behind item artwork only*.
- **Gradients.** Three signature linear gradients: crystal (cyan→blue), premium (gold), mythic (cyan→violet). Used on primary/premium buttons, active segments, progress fills and accent strokes — never as page backgrounds.
- **Corner radii.** Controlled and modern: controls `--r-md` (12px), cards `--r-lg` (16px), pills 999px. One deliberately *sharp* motif: the `RarityBadge` clips a shard corner (angular nod to the logo) — the only place we break the rounded language.
- **Borders.** Hairlines do the heavy lifting: `--line` (rgba white 7%) default, `--line-strong` (13%) for emphasis, `--line-crystal` for accent/focus. Cards = 1px hairline + subtle vertical surface gradient.
- **Shadows & glow.** Elevation reads through surface lightness + hairline, with restrained black drop-shadows (`--shadow-sm/md/lg`). Colored **glows** (`--glow-crystal/gold/violet`) are *reserved* — focus rings, legendary/mythic items, the primary CTA — never ambient.
- **Transparency & blur.** Used for chrome that floats over content: sticky `AppHeader` and `TabBar` use `rgba` navy + `blur(12px)`; the detail sheet dims the backdrop. Glass `IconButton` variant for controls over artwork.
- **Radii/imagery vibe.** Imagery skews cool — icy cyans, electric blues, violet, with gold as the warm counterpoint. High-contrast on near-black.
- **Motion.** Fast and confident. Durations 120/180/280ms, `ease-out` cubic-bezier(0.16,1,0.3,1). Press = scale to 0.97 (buttons) / 0.92 (icon buttons). Meters and sheets slide/fill on the slow track. **No bounce, no infinite ambient loops, no float.** Respects `prefers-reduced-motion`.
- **Hover / press.** Hover: border warms to `--line-crystal`, cards lift 3px, item cards adopt their rarity color. Press: scale-down. Active nav/segment: crystal gradient fill + subtle glow.
- **Layout rules.** Sticky translucent header (top) and tab bar (bottom); content scrolls between. Catalogs are a 2-up grid. Detail opens as a bottom sheet, not a new page.

---

## ICONOGRAPHY
- **System:** line icons, 2px stroke, rounded caps/joins, 24px grid — delivered through the `Icon` component and a curated set (`ICONS`).
- **SUBSTITUTION (flagged):** no brand glyph set was provided. The set uses **Lucide (ISC-licensed) path data** as the closest premium/technical match to the brand's clean, confident tone. Glyphs are embedded as inline SVG in `components/icons/Icon.jsx` (no runtime/CDN dependency). Swap for a licensed brand set if one exists.
- **Coverage:** navigation & catalog essentials — `search, home, gem, heart, star, crown, paw, filter, sparkles, chevron{Right,Left,Down}, check, x, plus, bell, user, shield, bookOpen, zap, lock, info, grid, arrowLeft, copy, flame`. `gem` (diamonds), `crown` (premium/VIP/legendary), `paw` (pets) and `sparkles` (skins) carry brand meaning.
- **Color:** icons inherit `currentColor`; crystal-cyan for active/interactive, chrome for default, gold on premium surfaces.
- **No emoji, no unicode-glyph icons, no PNG icon sprites.** The only raster brand art is the logo and app icon in `assets/`.
- **Artwork placeholders:** skin/pet renders were not provided. The UI kit uses a branded faceted-crystal placeholder (`Artwork` in `ui_kits/fff-app/parts.jsx`) — replace with real item art.

---

## Components
Reusable primitives, exported on the compiled namespace (see `check_design_system`). Grouped by concern under `components/`.

**Icons** — `Icon` (+ `ICONS` glyph map).
**Core** (`components/core/`) — `Button`, `IconButton`, `Badge`, `Tag`, `Card`.
**Forms** (`components/forms/`) — `Input`, `SearchField`, `SegmentedControl`, `Switch`.
**Feedback** (`components/feedback/`) — `ProgressBar`, `EmptyState`, `Banner`.
**Navigation** (`components/navigation/`) — `AppHeader`, `TabBar`.
**Catalog** (`components/catalog/`, brand-specific) — `RarityBadge` (+ `RARITIES`), `DiamondPill`, `StatBar`, `ItemCard`.

Each component ships `<Name>.jsx`, `<Name>.d.ts` (props + JSDoc) and `<Name>.prompt.md` (usage). Each directory has a `*.card.html` specimen tagged for the Design System tab.

### Intentional additions
This is a from-scratch system (no source inventory), so the set is authored to the product's needs. The **catalog** group (`RarityBadge`, `DiamondPill`, `StatBar`, `ItemCard`) and the `Icon` wrapper are brand-specific primitives added because the product is fundamentally a rarity-driven, diamond-priced catalog.

---

## UI Kits
- **`ui_kits/fff-app/`** — the FFF Skin Tool Android app, interactive. Screens: Home/Featured, Skins catalog, Pets catalog, Diamond Guide, plus a shared item Detail sheet. Tab-bar navigation, search + rarity filters, favorites, add-to-cart toast. `index.html` is the entry; screens are factored into `HomeScreen.jsx`, `CatalogScreen.jsx`, `DiamondScreen.jsx`, `DetailSheet.jsx`, `App.jsx`, `parts.jsx`, with mock data in `data.js`.

---

## Index / manifest
- `styles.css` — global entry (import manifest only). Consumers link this one file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `motion.css`, `base.css`.
- `components/` — `icons/`, `core/`, `forms/`, `feedback/`, `navigation/`, `catalog/`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/fff-app/` — the app recreation.
- `assets/` — `logo-fff-skin-tool.png`, `app-icon.png`.
- `SKILL.md` — Agent-Skills-compatible entry for downloading/using this system.

## Caveats
- **Fonts** are a Google Fonts substitution (Chakra Petch / IBM Plex Sans / IBM Plex Mono). Replace with licensed brand fonts if they exist.
- **Icons** are Lucide-based (flagged above).
- **Item artwork** (skin/pet renders) are branded placeholders — supply real renders.
