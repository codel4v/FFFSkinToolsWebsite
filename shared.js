// FFF Skin Tools — shared module for the query-string-routed single-file site.
// Loaded before the page's own <script type="text/x-dc"> block.
//
// Every screen is now a genuinely real page load (index.html?screen=...&key=...&item=...),
// which is what actually fixes the AdSense problem — but it also means nothing in `this.state`
// survives between screens on its own anymore. This module is the one thing that DOES persist
// (coins/uid/region/unlocked, via localStorage) plus the ad helpers.
//
// v1.10: adBreak() must be called as part of a user action (Google's own requirement). Firing
// it from componentDidMount — a page-load lifecycle hook, not a live user gesture — silently
// broke BOTH the interstitial and the rewarded ad (the rewarded ad's own, genuinely valid click
// was very likely getting caught by the same page's ad-placement context having already been
// flagged non-compliant by the earlier bad call). Fix: only ever call adBreak() synchronously
// inside an actual click handler, and defer the real navigation until it resolves.

window.AppShared = (function () {
  const STATE_KEY = 'fffSkinToolsState';
  const DEFAULT_STATE = { coins: 0, unlocked: [], uid: '', region: 'India' };

  function getState() {
    try {
      return Object.assign({}, DEFAULT_STATE, JSON.parse(localStorage.getItem(STATE_KEY) || '{}'));
    } catch (e) {
      return Object.assign({}, DEFAULT_STATE);
    }
  }
  function setState(patch) {
    const next = Object.assign(getState(), patch);
    try { localStorage.setItem(STATE_KEY, JSON.stringify(next)); } catch (e) { /* storage unavailable — fail silently */ }
    return next;
  }

  // Real page loads mean a genuinely clean DOM every time — no accumulation of stale <ins>
  // tags across "screens" to worry about.
  function fillAds() {
    try {
      document.querySelectorAll('ins.adsbygoogle').forEach(el => {
        if (!el.getAttribute('data-ad-fill-requested')) {
          el.setAttribute('data-ad-fill-requested', '1');
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    } catch (e) { /* AdSense script not loaded yet, or blocked (e.g. ad blocker) — fail silently */ }
  }

  // Calls fillAds() once the page has fully loaded AND at least one full render/layout cycle
  // has completed — document.readyState === 'complete' alone doesn't strictly guarantee the
  // browser has actually finished laying out the page at that exact synchronous point, which
  // is a plausible cause of the intermittent "No slot size for availableWidth=0" error (the ad
  // slot's container briefly resolving to 0 width right when push() is called). A double
  // requestAnimationFrame is the standard way to guarantee a real paint has happened first.
  function fillAdsWhenReady() {
    const afterPaint = () => requestAnimationFrame(() => requestAnimationFrame(fillAds));
    if (document.readyState === 'complete') {
      afterPaint();
    } else {
      window.addEventListener('load', afterPaint, { once: true });
    }
  }

  // Navigate to `url`, giving Google a real interstitial opportunity first — called
  // synchronously from a link's click handler, so it genuinely is "part of a user action".
  // Navigation always completes via adBreakDone, whether or not an ad actually showed — but
  // that's guarded with a hard timeout below: Google's own ad script has been observed
  // throwing real internal errors (e.g. "No slot size for availableWidth=0"), and if that
  // happens during adBreak()'s own processing, adBreakDone may simply never fire. Getting
  // permanently stuck unable to navigate is a far worse outcome than a missing ad, so this
  // never waits indefinitely no matter what the ad script does.
  function navigateWithInterstitial(url) {
    if (typeof adBreak !== 'function') { location.href = url; return; }
    let navigated = false;
    const go = () => { if (!navigated) { navigated = true; location.href = url; } };
    setTimeout(go, 2500);
    try {
      adBreak({ type: 'next', name: 'page-nav', adBreakDone: go });
    } catch (e) {
      go(); // adBreak() itself threw — navigate immediately rather than getting stuck
    }
  }

  // Same idea, but for Back buttons, which don't have a fixed destination URL — they rely on
  // the browser's own history. Falls back to `fallbackUrl` if there was nothing real to go
  // back to (checked only after the ad break has resolved, not from a blind fixed delay).
  function goBackWithInterstitial(fallbackUrl) {
    const doBack = () => {
      const before = location.href;
      history.back();
      setTimeout(() => { if (location.href === before) location.href = fallbackUrl; }, 200);
    };
    let done = false;
    const safeDoBack = () => { if (!done) { done = true; doBack(); } };
    if (typeof adBreak !== 'function') { safeDoBack(); return; }
    setTimeout(safeDoBack, 2500);
    try {
      adBreak({ type: 'next', name: 'page-nav', adBreakDone: safeDoBack });
    } catch (e) {
      safeDoBack();
    }
  }

  return { getState, setState, fillAds, fillAdsWhenReady, navigateWithInterstitial, goBackWithInterstitial };
})();
