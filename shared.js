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

  // ---------------------------------------------------------------------------
  // Non-rewarded interstitial ("blanket" ad break) on navigation.
  //
  // Why the previous version never showed an ad:
  //   1. A blind setTimeout(go, 2500) fired REGARDLESS of whether an ad was
  //      playing. A real interstitial takes longer than 2.5s (the user has to
  //      view/dismiss it), so even a successfully-served ad got destroyed by
  //      navigating away mid-playback. The timeout has to distinguish "no ad is
  //      coming" from "an ad is on screen right now" — that's what beforeAd is for.
  //   2. adBreakDone receives a placementInfo argument whose breakStatus says
  //      exactly why no ad showed (noAdPreloaded / frequencyCapped / timeout /
  //      ignored / dismissed / viewed / error / notReady / other). It was being
  //      discarded, so there was no way to tell a policy/fill decision apart from
  //      a code bug. It's now logged.
  //   3. Every screen is a REAL page load in this app, so each page starts a brand
  //      new ad-placement session with nothing preloaded. Clicking a few seconds
  //      later then asks for a break that was never fetched. adConfig now sets
  //      preloadAdBreaks:'on' so Google starts fetching a break at page load.
  //
  // Timing model: wait a short window to see if an ad even starts (beforeAd). If
  // it doesn't, navigate immediately — no ad was coming. If it does, cancel that
  // window and allow a long one so the ad can actually play to completion.
  // Navigation is never blocked indefinitely no matter what the ad script does.
  var NO_AD_MS = 1200;   // "is an ad even coming?" window
  var AD_PLAY_MS = 30000; // safety net once an ad is genuinely on screen

  function adLog() {
    try { console.log.apply(console, ['[ads]'].concat([].slice.call(arguments))); } catch (e) {}
  }

  // Runs an interstitial opportunity, then calls onDone() exactly once.
  function runNavInterstitial(label, onDone) {
    var done = false;
    var timer = null;
    function finish(why) {
      if (done) return;
      done = true;
      if (timer) clearTimeout(timer);
      adLog(label, '-> continuing:', why);
      onDone();
    }
    if (typeof adBreak !== 'function') { finish('adBreak() unavailable'); return; }

    timer = setTimeout(function () { finish('no ad started within ' + NO_AD_MS + 'ms'); }, NO_AD_MS);

    try {
      adBreak({
        type: 'next',
        name: label,
        // Fires only when an ad is actually about to take over the screen. This is
        // the signal that we must NOT navigate yet.
        beforeAd: function () {
          adLog(label, 'beforeAd — ad taking over, holding navigation');
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () { finish('ad exceeded ' + AD_PLAY_MS + 'ms safety net'); }, AD_PLAY_MS);
        },
        afterAd: function () { adLog(label, 'afterAd — ad finished'); },
        adBreakDone: function (info) {
          adLog(label, 'adBreakDone breakStatus =', (info && info.breakStatus) || '(none)');
          finish('adBreakDone');
        }
      });
    } catch (e) {
      adLog(label, 'adBreak() threw:', e && e.message);
      finish('adBreak() threw');
    }
  }

  function navigateWithInterstitial(url) {
    runNavInterstitial('page-nav', function () { location.href = url; });
  }

  // Same, but for Back buttons, which have no fixed destination — they rely on
  // browser history, with fallbackUrl used only if there was nothing to go back to.
  function goBackWithInterstitial(fallbackUrl) {
    runNavInterstitial('page-back', function () {
      var before = location.href;
      history.back();
      setTimeout(function () { if (location.href === before) location.href = fallbackUrl; }, 200);
    });
  }

  return { getState, setState, fillAds, fillAdsWhenReady, navigateWithInterstitial, goBackWithInterstitial };
})();
