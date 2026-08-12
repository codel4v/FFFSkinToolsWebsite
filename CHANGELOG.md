# Changelog

All notable changes to the FFF Skin Tools website, newest first.

## v2.3 — Ad slot polish: responsive sizing + first-load fix (2026-08-12)
- Ad slots now use Google's own recommended CSS: reserve 250px only until an ad request
  resolves, then hide unfilled slots entirely and let filled slots size to whatever creative
  actually loaded (fixes visible empty space in slot boxes)
- First ad-fill attempt now waits for the page to fully finish loading instead of firing right
  after mount — likely cause of static ads only appearing after a refresh, not on first load
  (a known class of issue when a slot briefly resolves to 0-width before layout settles)

## v2.21 — Fix: test mode flags had reappeared (2026-08-12)
- v1.2 was built on a stale base and silently re-included data-ad-test="on" on all 10 display
  slots plus data-adbreak-test="on" on the loader script, despite the commit message — the
  rewarded interstitial showing "Rewarded ad example" after go-live was this, not a deployment issue
- Re-removed both flags for real this time (verified directly against the file, not assumed)
- Spinner animation from v1.2 carried over correctly, no change needed there

## v1.2 — Go live: test mode removed (2026-08-12)
- Removed data-ad-test="on" from all 10 AdSense display slots
- Removed data-adbreak-test="on" from the AdSense loader script (interstitial/rewarded)
- All ad units now request real inventory — no more forced test creative
- Fixed the "Finding an ad" loading icon: was static, now has a simple looping spin animation

## v1.17 — Category page ad slots (2026-08-12)
- Removed the repeating 320×100 in-list ad placeholders from category pages (never wired to
  real ads; could repeat up to ~17 times on a single large category — a duplicate-density
  concern anyway)
- Added a real Top ad slot to category pages (above the item list), joining the existing Bottom
  slot (below it) — category pages now match every other screen's Top/Bottom pattern

## v1.16 — Interstitial/Rewarded ad reliability fixes (2026-08-12)
- Fixed interstitial getting stuck (no countdown, unclickable X, required a refresh): added a
  guard against firing a second adBreak() while a previous one was still resolving
- Rewarded ad flow no longer silently closes when no ad is available — now shows a visible
  "No ad available, Try Again" state instead
- Confirmed: the grey header bar, countdown, and X button are entirely Google's own test-mode
  overlay chrome (data-adbreak-test="on") — nothing in our code renders any of that

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

## v2.3 — Ad slot polish: responsive sizing + first-load fix (2026-08-12)
- Ad slots now use Google's own recommended CSS: reserve 250px only until an ad request
  resolves, then hide unfilled slots entirely and let filled slots size to whatever creative
  actually loaded (fixes visible empty space in slot boxes)
- First ad-fill attempt now waits for the page to fully finish loading instead of firing right
  after mount — likely cause of static ads only appearing after a refresh, not on first load
  (a known class of issue when a slot briefly resolves to 0-width before layout settles)

## v2.21 — Fix: test mode flags had reappeared (2026-08-12)
- v1.2 was built on a stale base and silently re-included data-ad-test="on" /
  data-adbreak-test="on" on all 11 ad units, despite the commit message — the rewarded
  interstitial showing "Rewarded ad example" after go-live was this, not a deployment issue
- Re-removed both flags for real this time (verified directly against the file, not assumed)
- Spinner animation from v1.2 carried over correctly, no change needed there

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
