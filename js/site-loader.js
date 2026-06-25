(function () {
  var PHRASES = [
    "Loading with peace...",
    "Arriving quietly...",
    "A soft moment...",
    "Settling in...",
    "Finding stillness...",
  ];

  var MIN_MS = 520;
  var TRANSITION_MS = 320;
  var shownAt = Date.now();
  var overlay;
  var textEl;

  function pickPhrase() {
    return PHRASES[Math.floor(Math.random() * PHRASES.length)];
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "site-loader";
    overlay.className = "site-loader";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML =
      '<div class="site-loader-glow" aria-hidden="true"></div>' +
      '<div class="site-loader-ring" aria-hidden="true"></div>' +
      '<p class="site-loader-text"></p>';
    textEl = overlay.querySelector(".site-loader-text");
    document.body.appendChild(overlay);
    return overlay;
  }

  function setPhrase(phrase) {
    if (!textEl) return;
    textEl.textContent = phrase;
  }

  function showLoader(phrase) {
    document.documentElement.classList.remove("is-ready");
    document.documentElement.classList.add("is-loading");
    ensureOverlay();
    overlay.classList.remove("is-hidden");
    shownAt = Date.now();
    if (phrase) {
      textEl.classList.add("is-changing");
      setTimeout(function () {
        setPhrase(phrase);
        textEl.classList.remove("is-changing");
      }, 180);
    } else {
      setPhrase(pickPhrase());
    }
  }

  function hideLoader() {
    var elapsed = Date.now() - shownAt;
    var wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(function () {
      if (!overlay) return;
      overlay.classList.add("is-hidden");
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("is-ready");
    }, wait);
  }

  function isInternalLink(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.target === "_blank") return false;
    if (anchor.href.indexOf("mailto:") === 0) return false;
    if (anchor.href.indexOf("tel:") === 0) return false;
    if (anchor.origin !== window.location.origin) return false;
    var path = anchor.pathname || "";
    if (path === "/" || path === "") return true;
    return /\.html$/i.test(path);
  }

  document.documentElement.classList.add("is-loading");
  ensureOverlay();
  setPhrase(pickPhrase());

  document.addEventListener("click", function (event) {
    var anchor = event.target.closest("a");
    if (!isInternalLink(anchor)) return;
    if (anchor.pathname === window.location.pathname && anchor.search === window.location.search) return;
    event.preventDefault();
    showLoader("Moving gently...");
    setTimeout(function () {
      window.location.href = anchor.href;
    }, TRANSITION_MS);
  });

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }
})();