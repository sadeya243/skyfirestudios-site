(function () {
  var cfg = window.MATHMEND_CONFIG || {};

  // Download buttons: <a data-store="android|ios|web">. Missing links become "Coming soon".
  var labels = { android: "Get it on Google Play", ios: "Download on the App Store", web: "Use MathMend in your browser" };
  var urls = { android: cfg.androidUrl, ios: cfg.iosUrl, web: cfg.webUrl };
  var ua = navigator.userAgent || "";
  var device = /android/i.test(ua) ? "android" : /iphone|ipad|ipod/i.test(ua) ? "ios" : "web";

  document.querySelectorAll("[data-store]").forEach(function (el) {
    var kind = el.getAttribute("data-store");
    var url = urls[kind];
    if (url) {
      el.href = url;
      el.textContent = labels[kind];
      el.rel = "noopener";
      el.classList.remove("is-soon");
      el.removeAttribute("aria-disabled");
      if (kind === device) el.classList.add("is-primary");
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-soon");
      el.textContent = { android: "Google Play", ios: "App Store", web: "Web app" }[kind] + ": coming soon";
    }
  });

  // Contact links: <a data-mail data-subject="..." data-body="...">.
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var subject = el.getAttribute("data-subject") || "MathMend";
    var body = el.getAttribute("data-body") || "";
    el.href = "mailto:" + cfg.contactEmail + "?subject=" + encodeURIComponent(subject) +
      (body ? "&body=" + encodeURIComponent(body) : "");
    if (!el.textContent.trim()) el.textContent = cfg.contactEmail;
  });

  // Mobile menu toggle.
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("open", !open);
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
