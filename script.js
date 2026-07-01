// Minimal progressive enhancement. The page is fully functional without JS.
(function () {
  "use strict";
  // Keep the footer copyright year current.
  var el = document.getElementById("year");
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
})();
