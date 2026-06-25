(function () {
  var STORE_URL =
    "https://apps.apple.com/us/app/quiet-light-illuminations/id6759539902";

  var primaryNav = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "changelog.html", label: "Updates" },
  ];

  var footerNav = [
    { href: "privacy.html", label: "Privacy" },
    { href: "terms.html", label: "Terms" },
    { href: "mailto:support@quietlight.app", label: "Support" },
    { href: "pause.html", label: "Pause" },
  ];

  var socialSvg = {
    x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l7.13 8.13L1.5 21.75h3l7.13-8.13L18.75 21.75h3l-7.13-8.13L21.75 2.25h-3.506z"/></svg>',
    instagram:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.23-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.07 3.118.346.676 2.79.4 6.735.345 8.015.333 8.423.333 12c0 3.577.012 3.985.067 5.265.276 3.945 2.718 6.389 6.653 6.665 1.28.057 1.688.069 4.948.069 3.259 0 3.668-.013 4.948-.069 3.935-.276 6.377-2.72 6.653-6.665.054-1.28.066-1.688.066-5.265 0-3.577-.012-3.985-.066-5.265-.276-3.945-2.718-6.389-6.653-6.665C15.667.014 15.259 0 12 0z"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>',
  };

  function currentPage() {
    var p = window.location.pathname.split("/").pop();
    return !p ? "index.html" : p;
  }

  function isActive(href) {
    return currentPage() === href;
  }

  function buildPrimaryNav() {
    return primaryNav
      .map(function (link) {
        var cls = "site-nav-link" + (isActive(link.href) ? " is-active" : "");
        return (
          '<a href="' +
          link.href +
          '" class="' +
          cls +
          '">' +
          link.label +
          "</a>"
        );
      })
      .join("");
  }

  function buildFooterNav() {
    return footerNav
      .map(function (link) {
        return '<a href="' + link.href + '">' + link.label + "</a>";
      })
      .join("");
  }

  var skip = document.createElement("a");
  skip.href = "#main-content";
  skip.className = "skip-link";
  skip.textContent = "Skip to content";
  document.body.prepend(skip);

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="site-header-inner">' +
    '<a href="index.html" class="site-brand" aria-label="Quiet Light home">' +
    '<img src="images/icon.png" alt="" width="32" height="32" class="site-brand-icon" />' +
    "<span>Quiet Light</span></a>" +
    '<nav class="site-nav" aria-label="Main">' +
    buildPrimaryNav() +
    "</nav>" +
    '<a href="' +
    STORE_URL +
    '" class="site-cta" target="_blank" rel="noopener noreferrer">Get the app</a>' +
    "</div>";
  document.body.prepend(header);
  document.body.classList.add("has-site-header");

  var main =
    document.querySelector("main") || document.querySelector("#root main");
  if (main && !main.id) {
    main.id = "main-content";
  }

  var footer = document.querySelector("footer");
  if (!footer) {
    footer = document.createElement("footer");
    document.body.appendChild(footer);
  }
  footer.className = "site-footer";
  footer.innerHTML =
    '<nav class="site-footer-nav" aria-label="Footer">' +
    buildFooterNav() +
    "</nav>" +
    '<div class="site-footer-social">' +
    '<a href="https://x.com/QuietLightApp" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">' +
    socialSvg.x +
    "</a>" +
    '<a href="https://www.instagram.com/quietlightapp/" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram">' +
    socialSvg.instagram +
    "</a>" +
    "</div>";
})();