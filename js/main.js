// Shared helpers + mobile nav toggle, loaded on every page.
window.LPL = (function () {
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatDate(iso, opts) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", opts || { day: "numeric", month: "long", year: "numeric" });
  }

  function crownIcon(extraClass) {
    return (
      '<svg class="crown-icon ' + (extraClass || "") + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M3 19h18v2H3v-2Zm0-2 1.6-9.6L9 12l3-7 3 7 4.4-4.6L21 17H3Z"/>' +
      "</svg>"
    );
  }

  async function loadJSON(path) {
    var res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load " + path);
    return res.json();
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var scrim = document.querySelector(".scrim");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
    if (scrim) {
      scrim.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
      });
    }
    document.querySelectorAll(".sidebar .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initNav);

  return { escapeHtml: escapeHtml, formatDate: formatDate, crownIcon: crownIcon, loadJSON: loadJSON };
})();
