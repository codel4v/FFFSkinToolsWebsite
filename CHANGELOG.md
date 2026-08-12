# Changelog

All notable changes to the FFF Skin Tools website, newest first.

## v1.15b — Interstitial Ads Fixes and Changes (2026-08-12)
- Reward ("Watch Ad") modal redesigned: small centered card + blurred backdrop instead of a full-screen takeover, matching the existing "insufficient coins" dialog style
- Fixed "Finding an ad" appearing to do nothing: modal now stays visible at least 600ms before auto-closing on a no-fill response
- Reserved `min-height:250px` on all 9 AdSense `<ins>` slots so unfilled ads don't collapse to 0px and shorten pages on desktop

## v1.15 — Interstitial Ads (2026-08-12)
- Implemented non-rewarded interstitial (`adBreak({type:'next'})`) firing on every real navigation, via the single hashchange choke point
- Rebuilt the rewarded-ad flow end to end: "Watch Ad" → real `adBreak({type:'reward'})` call → checking/ready states → user-confirmed "Watch Now" → coins granted only in `adViewed` (previously granted unconditionally on modal close)
- Added `adBreak`/`adConfig` bootstrap script; enabled `data-adbreak-test="on"` for testing

## v1.14c — Top Bottom Ad Slot bug fixes (2026-08-12)
- Fixed crash in `componentDidUpdate` (`Cannot read properties of undefined (reading 'route')`) that was silently blocking ad slots from re-filling on navigation

## v1.14b — Top Bottom Ad Slot testing (2026-08-12)
- Added `data-ad-test="on"` to all 9 display ad slots for AdSense test-mode verification

## v1.14 — Top Bottom Ad Slot implementation (2026-08-12)
- Pivoted from the originally-planned Google Ad Manager/GPT setup to AdSense + H5 Games Ads (per ad ops)
- Replaced all 9 existing 320×250 placeholder ad slots site-wide with real AdSense `<ins>` units (2 slot IDs: Top/Bottom)
- Reordered Home screen: ad slot now appears before the "Entry Coins Balance" card
- Added `fillAds()` — required in this SPA since AdSense needs one fill call per newly-mounted `<ins>` tag on route change

## v1.21 — Lazyload Implementation + Minor bug fixes (2026-08-12)
- Added `loading="lazy"` to category-grid item thumbnails (up to 51 images in some categories); left hero/detail images eager
- Fixed a leftover dangling line in `back()` referencing an undefined variable

## v1.12 — Favicon fix and minor text changes (2026-08-10)
- Fixed favicon not appearing: href casing didn't match the actual uploaded filenames (`Favicon.svg`/`Favicon.png` vs `favicon.svg`/`favicon.png`)
- Synced the "Skin not showing?" troubleshooting popup text to exactly match the Home page's troubleshooting section (was missing a bullet + had a shortened closing line)

## v1.11 — Navigation Bug Fixes (2026-08-10)
- Fixed Back button infinite loop (category ↔ detail bounce, never reaching Home): removed the hand-rolled history stack and switched to native `window.history.back()`, since every forward navigation already creates a real browser history entry

## v1.1 — hash links & favicon implementation (2026-08-10)
- Converted every navigation point site-wide (category cards, item rows, flow steps, Back buttons, Get Started) from JS-only clicks to real `<a href="#/...">` anchors — required for ad click-trigger detection, plus gets working browser Back/Forward and deep links for free
- Added dynamic per-screen browser tab titles
- Added favicon `<link>` tags
- Swapped the coin icon (opaque-white slit → transparent slit) across all 4 places it appears

## v1.1 — Hash links & Favicon (2026-08-10)
- Uploaded Favicon.svg / Favicon.png asset files

## Initial deployment (2026-08-07)
- First deployment of the claude.ai/design HTML export to GitHub + Vercel
- Removed the splash/loading screen — site now opens straight to the Welcome screen
