// FFF Skin Tools — shared module for the query-string-routed single-file site.
// Loaded before the page's own <script type="text/x-dc"> block.
//
// Every screen is now a genuinely real page load (index.html?screen=...&key=...&item=...),
// which is what actually fixes the AdSense problem — but it also means nothing in `this.state`
// survives between screens on its own anymore. This module is the one thing that DOES persist
// (coins/uid/region/unlocked, via localStorage) plus the ad helpers, which are much simpler now
// than the old SPA version since every load starts with a genuinely clean DOM.

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

  // Real page loads mean a genuinely clean DOM every time — no more accumulation of stale
  // <ins> tags across "screens", so this is back to the simple, original form.
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

  // The H5 Games Ads Placement API has no automatic click/navigation detection (that's a
  // GPT/Web-Interstitial thing) — it always needs an explicit call. One real page load = one
  // natural opportunity, called once from componentDidMount.
  function triggerInterstitial(name) {
    if (typeof adBreak !== 'function') return;
    adBreak({ type: 'next', name: name || 'page-nav' });
  }

  return { getState, setState, fillAds, triggerInterstitial };
})();
