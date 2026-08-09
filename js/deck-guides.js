(function () {
  var COLOR_PIPS = { W: "#e8dcb0", U: "#3d6b8a", B: "#2a231c", R: "#a63d2f", G: "#4a5a3c" };

  function pips(colors) {
    return colors.map(function (c) {
      return '<span class="pip" style="background:' + (COLOR_PIPS[c] || "#9c8657") + '" title="' + c + '"></span>';
    }).join("");
  }

  (async function () {
    var grid = document.getElementById("guide-grid");
    var guides;
    try {
      guides = await LPL.loadJSON("data/deckGuides.json");
    } catch (e) {
      grid.innerHTML = '<p class="empty-line">Couldn’t load the deck guides.</p>';
      return;
    }

    grid.innerHTML = guides.map(function (g) {
      return (
        '<a class="guide-card card" href="' + g.page + '">' +
        '<div class="pips">' + pips(g.colors) + "</div>" +
        '<span class="archetype-tag">' + LPL.escapeHtml(g.archetype) + "</span>" +
        "<h3>" + LPL.escapeHtml(g.deck) + "</h3>" +
        '<p class="tagline">' + LPL.escapeHtml(g.tagline) + "</p>" +
        '<span class="read-link">Read the guide &rarr;</span>' +
        "</a>"
      );
    }).join("");
  })();
})();
