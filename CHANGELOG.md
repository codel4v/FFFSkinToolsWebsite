# Changelog

All notable changes to the FFF Skin Tools website, newest first.

## v1.13 — Fix lingering availableWidth=0 error; note on ad sizing (2026-08-13)
- Confirmed via fresh screenshot: "TagError: adsbygoogle.push() error: No slot size for
  availableWidth=0" is a separate, still-open issue from the v1.12 grey-line fix (that one was
  about height being removed after fill; this is specifically about width resolving to 0 at
  push() time)
- Replaced the readyState/load-event gate with AppShared.fillAdsWhenReady(): waits for load,
  then a double requestAnimationFrame — readyState === 'complete' doesn't strictly guarantee
  the browser has actually finished a layout pass at that exact synchronous point, which is a
  plausible cause of the intermittent width=0 error; double rAF is the standard way to
  guarantee a real paint has happened first
- Reviewed the "ad sizing sometimes looks off" report (a tall list-style creative pushing
  content down): this looks like normal variation from data-ad-format="auto", not a bug —
  Google is deliberately choosing creative shape/size per request. Constraining the format
  (e.g. "rectangle") would reduce this at the cost of fill rate; not changed without a
  decision on that trade-off
- Confirmed via screenshot: rewarded ads are genuinely playing full video creatives now
  (#goog_fullscreen_ad), consistent with what's been reported working

## v1.12 — Fix: ads rendering then collapsing into a grey line (2026-08-12)
- Confirmed: the top/bottom static ad refresh bug (loading only once, needing a refresh) is
  fixed as of the v1.9/v1.10 query-string routing work — no longer an open issue
- New bug found instead: an ad would render successfully, then collapse into a grey
  placeholder a moment later. Root cause: our own CSS removed the reserved min-height the
  instant data-ad-status="filled" appeared, which could trigger Google's script to
  re-evaluate the slot's now-changed dimensions and invalidate what was just a working ad
- Fixed: min-height is now static (100px, down from 250px) and never removed once an ad
  fills — only the display:none for genuinely unfilled slots still toggles dynamically
- Reviewed the once-in-7-9-attempts rewarded ad auto-close report: nothing in our code can
  cause this — our own UI is fully removed from the DOM before real ad playback begins, so
  this is most likely inherent ad-network flakiness, not a fixable bug on our end
- Ad ops enabled vignette ads via the AdSense dashboard directly — working well, so the
  custom overlay-style interstitial (discussed but never built) is no longer needed
- Regular (non-rewarded) blanket interstitials confirmed not firing anywhere — next up

## v1.11 — Fix: navigation could get permanently stuck (2026-08-12)
- v1.10's navigateWithInterstitial()/goBackWithInterstitial() waited for adBreakDone before
  navigating, with no fallback — reported as "clicking a category does nothing"
- Confirmed via console: Google's own ad script is throwing real internal errors on this page
  ("TagError: adsbygoogle.push() error: No slot size for availableWidth=0") — if a similar
  error happens inside adBreak()'s own processing, adBreakDone can simply never fire
- Added a hard 2.5s timeout so navigation always completes regardless of what the ad script
  does, plus a try/catch around adBreak() itself so a thrown error navigates immediately
  instead of waiting out the timeout unnecessarily
- Verified both failure modes directly in Node (adBreakDone never firing, adBreak() throwing
  synchronously) before shipping
- The "No slot size for availableWidth=0" error is new, useful evidence for the still-open
  Top/Bottom static ad slot bug — not addressed in this release, still next up

## v1.10 — Fix interstitial/rewarded broken by v1.9 (2026-08-12)
- Root cause: Google's Ad Placement API requires adBreak() to be called "as part of a user
  action". v1.9 called it in componentDidMount — a page-load lifecycle hook, not a live user
  gesture — which very likely also poisoned the page's whole ad-placement context, breaking
  the rewarded ad's otherwise-valid click too. Confirmed via console: no JS error, just a
  silent "no ad" — consistent with a policy-compliant rejection, not a crash.
- Moved the interstitial trigger out of componentDidMount entirely. Every navigating link
  (category cards, item rows, flow tiles, Back buttons, Get Started, etc.) now calls
  adBreak() synchronously from its own click handler, and only completes the real navigation
  once the ad break resolves (via adBreakDone) — genuinely "part of a user action" this time.
- Added AppShared.navigateWithInterstitial()/goBackWithInterstitial() and a navClick() handler
  factory; modified clicks (ctrl/cmd/shift/middle-click) are left alone so opening in a new
  tab still works normally
- Verified the new helpers directly in Node (deferred-navigation timing, Back fallback,
  modified-click bypass) before shipping, not just by inspection
- Top/Bottom static ad slot bug is unrelated and still open — not addressed in this release

## v1.9 — Hash links to URL Parameters (2026-08-12)
- Pivoted away from the multi-file HTML-split effort (v1.4 category-grid work stays, that
  file split is abandoned) — realized query-string changes trigger a real browser navigation
  just like separate files do, so the whole site could go back to one index.html
- Every #/route hash link converted to a real index.html?screen=...&key=...&item=... link —
  each navigation is now a genuine page load, which is what actually fixes AdSense treating
  the whole SPA as one ever-growing page
- Removed entirely (no longer needed): the hashchange listener, routeHash/parseHash, the
  duplicate _syncHash definition, componentDidUpdate, and all the stale-<ins>
  pruning/cloning logic from fillAds() — a real page load starts with a clean DOM every time
- Added shared.js: coins/UID/region now persist via localStorage, since nothing in memory
  survives a real navigation anymore (this didn't matter in the old SPA, where the page never
  actually reloaded) — required for the site to function correctly, not optional
- back() now uses real history.back() with a simple fallback, no more hash comparison

## v1.8 — Cleaned up ad fill logic (2026-08-12)
- Removed the retry-with-delay from v1.6 — redundant on top of the pruning fix, and firing
  extra unnecessary requests is exactly the kind of noisy pattern worth avoiding
- Fixed a real bug in clone-and-replace: it would swap out and re-request ANY already-processed
  slot, including one already showing a real, successfully filled ad (data-ad-status="filled")
  — discarding a working ad to ask for one it didn't need. Now explicitly skips filled slots and
  only retries genuinely unfilled/stuck ones.
- Kept the core fix from v1.7 (pruning invisible leftover <ins> tags) and the load-timing gate
  from v2.3 — this is meant to be the same theory, tested clean, not a new one

## v1.7 — Prune leftover ad slots from previous screens (2026-08-12)
- Root cause found via direct console/network inspection: navigating away from a screen was
  NOT removing its <ins class="adsbygoogle"> tags from the DOM — they stayed behind, invisible.
  AdSense has no concept of our SPA screens and treats every ins it has ever seen as living on
  one single, ever-growing real page, and appears to cap/ignore further requests once too many
  accumulate — matching "works after a refresh, breaks down the more you navigate" exactly.
- fillAds() now actively deletes any ins.adsbygoogle that is no longer visible (offsetParent is
  null) before requesting anything new, keeping the real DOM ad-slot count bounded to just the
  current screen instead of growing for the entire session.

## v1.6 — Ad fill retry on first push (2026-08-12)
- fillAds() now retries once, after 800ms, if a push() call never got acknowledged by
  AdSense at all (no data-adsbygoogle-status appeared) — most likely caused by the AdSense
  script still loading/initializing at the moment we called push()
- Deliberately scoped narrow: this never re-requests a slot Google already responded to
  (filled or genuinely unfilled), since AdSense refuses to re-fill an <ins> it has processed —
  only helps the specific "our push never even registered" case

## v1.5 — Weapons/Vehicles/Pets/Bundles are now genuinely free (2026-08-12)
- Correction to v1.4: that release only hid the Entry Cost badge on these 4 categories — the
  actual 10-coin unlock requirement was untouched, so the lock overlay still showed on them
- Now fixed for real: openCategory() skips the coin gate entirely for these 4 keys (based on
  category key, not array position, so this stays correct even if the grid order changes again),
  and the category card never renders as locked regardless of coin balance

## v1.4 — Home page category grid changes (2026-08-12)
- Swapped row 1 and row 3: Weapons and Vehicles are now the first two category cards, moving
  Characters and Fashion down
- Removed the Entry Cost badge from the first 4 cards (Weapons, Vehicles, Pets, Bundles) —
  the remaining 4 (Characters, Fashion, Skyboards, Backpacks) still show it
- Reworked the locked-category overlay to only cover the bottom portion of the card, so the
  title and item count stay visible even when a category is locked

## v2.4 — Fix ad fills on SPA navigation (2026-08-12)
- Removed a premature fillAds() call that ran immediately after setState() inside the
  hashchange handler — React 18 batches setState even in native event listeners, so this fired
  before the new screen's ad slots existed in the DOM at all. componentDidUpdate already
  handles this correctly (fires after the DOM commit), so this was simply the wrong-timing call.
- Hardened fillAds() to detect an <ins> already marked processed by AdSense and swap in a
  clean clone before requesting a fill, in case the templating engine reuses/patches an ad
  slot's DOM node across screens or revisits rather than creating a genuinely fresh one —
  AdSense refuses to re-fill an element it has already marked done.

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
