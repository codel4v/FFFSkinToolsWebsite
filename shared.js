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

  // Navigate to `url`, giving Google a real interstitial opportunity first — called
  // synchronously from a link's click handler, so it genuinely is "part of a user action".
  // Navigation always completes via adBreakDone, whether or not an ad actually showed.
  function navigateWithInterstitial(url) {
    if (typeof adBreak !== 'function') { location.href = url; return; }
    adBreak({ type: 'next', name: 'page-nav', adBreakDone: () => { location.href = url; } });
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
    if (typeof adBreak !== 'function') { doBack(); return; }
    adBreak({ type: 'next', name: 'page-nav', adBreakDone: doBack });
  }

  return { getState, setState, fillAds, navigateWithInterstitial, goBackWithInterstitial };
})();
