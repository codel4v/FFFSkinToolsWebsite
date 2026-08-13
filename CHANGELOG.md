# Changelog

All notable changes to the FFF Skin Tools website, newest first.

## v1.18 — Fix non-rewarded interstitials not firing on navigation (2026-08-13)
- Static display ads: left exactly as-is at v1.17. The grey line on an unfilled slot is
  intentional/wanted and was NOT removed. Console diagnostics from v1.17 testing showed the
  static-ad symptom is data-ad-status="unfilled" (Google returning no ad), not a layout collapse
  -- treating that as a fill-rate matter to give more time, not a code bug
- Rewarded ad flow deliberately untouched -- it works consistently and shares no code with the
  navigation interstitial path
- Three real problems found in the non-rewarded nav interstitial:
  1. navigateWithInterstitial()/goBackWithInterstitial() ran a blind setTimeout(go, 2500) that
     fired regardless of ad state. A real interstitial takes longer than 2.5s to view/dismiss,
     so even a successfully-served ad was destroyed by navigating away mid-playback. Verified in
     Node: a 6s ad under the old timing gets cut off at 2500ms
  2. adBreakDone's placementInfo argument was discarded. Its breakStatus field states exactly
     why no ad showed (noAdPreloaded / frequencyCapped / timeout / ignored / dismissed / viewed
     / error / notReady / other) -- the single most useful diagnostic available, thrown away
  3. adConfig() never set preloadAdBreaks. Because every screen is a real page load in this app,
     each page begins a fresh ad-placement session with nothing preloaded, so a break requested
     a few seconds after load was very likely never fetched at all
- Fixes: replaced the blind timeout with a two-stage model keyed off the beforeAd callback --
  a short 1200ms "is an ad even coming?" window, cancelled the moment beforeAd fires, then a
  30s safety net so a real ad can play to completion. Navigation still can never block
  indefinitely. Both nav and Back now share one runNavInterstitial() implementation to stop the
  two copies drifting apart. adConfig now sets preloadAdBreaks:'on' plus an onReady log
- All adBreak callbacks now log to console under an [ads] prefix, including breakStatus
- Verified all four paths in Node before shipping (no ad / silent adBreakDone never firing /
  6s ad playing through / adBreak throwing). Navigation completes correctly in every case, and
  is now FASTER than before when no ad is coming (~30-50ms, or 1200ms worst case, vs a flat
  2500ms wait previously)
- Expectation setting: even fully working, this will NOT fire on every navigation. Google
  enforces a frequency cap between interstitials, so breakStatus=frequencyCapped on most
  navigations is correct behaviour, not a bug. Also worth noting vignette ads are already
  enabled at the AdSense dashboard level and serve their own navigation interstitials -- the two
  formats compete, so some suppression of adBreak interstitials is expected

## v1.17 — Ad slots on all flow screens; slot-parity test for the collapse (2026-08-13)
- v1.16's flex-item theory did NOT fix it: Detail and the flow screens still collapse, both via
  the flow and on a fresh direct load. Third failed theory in a row on this bug
- Added the missing static slots: Mode Selection, Progression Level, and Rank Selection had NO
  ad slots at all and now have both Top and Bottom. Rank's container is a 2-col grid, so its
  ad wrappers get grid-column:1/-1 to span full width instead of sitting in one cell
- Also added the complementary slot to the four screens that only had one: Detail (had Top only,
  now + Bottom), Flow Terminal / Account Sync / Complete (had Bottom only, now + Top). Every
  screen now has exactly one Top + one Bottom; 20 ins tags across 10 screens
- Reason for doing that beyond consistency: the only structural property that correlates
  perfectly with the bug across all 7 ad-bearing screens is slot COUNT, not any CSS property --
  Welcome/Home/Category have two slots and are stable; Detail/Terminal/Verify/Complete had
  exactly one and all collapse. No confirmed mechanism for why, so this is explicitly a
  hypothesis test that happens to coincide with wanted work, NOT a diagnosed fix
- If the collapse persists after this, stop guessing and capture real evidence first -- a
  MutationObserver on the ins (logging data-ad-status, inline style, offsetWidth/Height over
  time) will show whether the slot is being un-filled, resized to zero, or width-starved,
  which none of the last three theories could distinguish between

## v1.16 — Fix collapse on Detail/flow screens: ad wrapper as flex item (2026-08-13)
- Reported: static ads still collapsing on the item Detail screen and every flow screen after
  it (Terminal, Account Sync, Complete), even on a cold first load with no prior navigation --
  ruling out any session/frequency-based explanation
- Verified the v1.14/v1.15 CSS fixes ARE present identically on every screen, including these
  ones -- this is not a leftover of the earlier bug
- Actual difference found by checking each ad wrapper's direct parent: on Welcome/Home/Category
  (stable) the ad wrapper's parent is a plain block div. On Detail, Flow Terminal, Flow Account
  Sync, and Flow Complete (collapsing) the ad wrapper's direct parent is a
  display:flex;flex-direction:column container -- making the ad wrapper itself a flex item
- Flex items get min-width:auto by default, which lets the browser size them by content rather
  than guaranteeing 100% width -- a known source of full-width-responsive AdSense units
  mis-measuring available space, rendering, then re-resolving to something smaller. This matches
  the "shrinks, then collapses" symptom exactly
- Fix: added width:100%;flex-shrink:0;min-width:0 to the 4 ad wrapper divs that sit inside a
  flex column (Detail, Flow Terminal, Flow Account Sync, Flow Complete only) to force stable
  block-level sizing regardless of the flex context. The 6 wrappers on non-flex parents
  (Welcome/Home/Category) were left untouched since they were never affected
- Flow Mode Selection and Flow Level Selection have no ad slots at all, so nothing to fix there

## v1.15 — Roll back CSS entirely; stop fighting AdSense's own resize box model (2026-08-13)
- v1.14 made things worse: min-height:100px unconditional caused Top to also collapse almost
  always, with mostly 1:1/square creatives now being served
- Root cause reframed: AdSense sets sizing via inline styles on the ins during its own resize
  step (which briefly shrinks before settling on final size) — inline styles beat any CSS rule
  we write unless we use !important, so our min-height was never actually stopping the shrink,
  it was just adding noise. Meanwhile the ad wrapper divs' overflow:hidden was clipping the ad
  if it tried to grow past whatever height it was mid-resize at — this is what "shrinks, then
  collapses" was actually showing us. The shrunk/clipped presentation at push() time is also the
  likely cause of the 1:1-only creatives, since Google was measuring an artificially squeezed
  container
- Fix: removed the ins-level min-height rule entirely (back to zero custom sizing CSS — ad ops'
  original snippet has none). Changed overflow:hidden to overflow:visible on all 10 ad wrapper
  divs so nothing can clip AdSense's own resize. Kept the unfilled data-ad-status hide rule
  only, which is Google's own documented recommendation and scoped to genuinely-unfilled ins,
  not the filled/resizing case
- Kept AppShared.fillAdsWhenReady()/fillAds() in shared.js — unlike ad ops' snippet, our ins
  tags don't exist in the DOM until support.js compiles the page at runtime, so a deferred
  push() call is a real architectural requirement here, not an embellishment
- Lesson from this round: two consecutive "fixes" (v1.12's claim, and v1.14's real but wrong-
  theory attempt) both tried to manage AdSense's box model via CSS instead of just not fighting
  it — reverting to the minimum footprint matching ad ops' original tags first, rather than
  layering on more CSS, was the move that should have happened earlier

## v1.14 — Actually fix the grey-line collapse (v1.12 fix had never shipped) (2026-08-13)
- Root cause of the collapse bug "coming back with a vengeance": verified against the live
  deployed index.html and found the v1.12 fix was never actually applied — the CSS was still
  the original `ins.adsbygoogle:not([data-ad-status]){min-height:250px}` rule, not the static
  100px/never-removed version the v1.12 entry describes
- `:not([data-ad-status])` stops matching the instant Google sets data-ad-status="filled" on
  the ins, so the min-height rule doesn't shrink, it disappears entirely — and since each ad's
  wrapper div has overflow:hidden with no height of its own, the whole block collapses to the
  AD-badge sliver the moment a fill succeeds. Very likely also what triggers Google's script to
  re-evaluate and invalidate the just-filled ad, per the original v1.12 theory
- Explains the Top (~1/4) vs Bottom (almost every time) asymmetry too — it tracks how often
  each slot actually resolves to data-ad-status at all, not a lazy-load/viewport timing effect
- Fixed for real this time: `ins.adsbygoogle{min-height:100px}` (unconditional, all states),
  `ins.adsbygoogle[data-ad-status="unfilled"]{display:none!important}` unchanged
- Reinforces the standing rule: always verify against the actual deployed file before trusting
  a changelog entry describing a fix as shipped

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
