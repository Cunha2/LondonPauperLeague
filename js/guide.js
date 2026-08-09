(function () {
  var COLOR_PIPS = { W: "#e8dcb0", U: "#3d6b8a", B: "#2a231c", R: "#a63d2f", G: "#4a5a3c" };

  function pips(colors) {
    return colors.map(function (c) {
      return '<span class="pip" style="background:' + (COLOR_PIPS[c] || "#9c8657") + '" title="' + c + '"></span>';
    }).join("");
  }

  function sumQty(list) {
    return list.reduce(function (total, card) { return total + card.qty; }, 0);
  }

  function renderRows(cards) {
    return cards.map(function (c) {
      return '<div class="decklist-row"><span class="qty">' + c.qty + "</span><span>" + LPL.escapeHtml(c.name) + "</span></div>";
    }).join("");
  }

  function renderGroup(title, cards) {
    return (
      '<div class="decklist-group"><h3>' + LPL.escapeHtml(title) + "</h3>" +
      renderRows(cards) +
      '<div class="group-total">' + sumQty(cards) + " cards</div>" +
      "</div>"
    );
  }

  function renderMainColumn(groups) {
    return '<div class="decklist-col">' + groups.map(function (g) { return renderGroup(g.type, g.cards); }).join("") + "</div>";
  }

  function renderSideboardColumn(cards) {
    return '<div class="decklist-col sideboard-col">' + renderGroup("Sideboard", cards) + "</div>";
  }

  function cardListText(cards) {
    return cards.map(function (c) { return c.qty + " " + c.name; }).join(", ");
  }

  (async function () {
    var main = document.querySelector("[data-guide-src]");
    if (!main) return;
    var src = main.getAttribute("data-guide-src");

    var metaEl = document.getElementById("guide-meta");
    var introEl = document.getElementById("guide-intro");
    var decklistEl = document.getElementById("decklist-grid");
    var howtoEl = document.getElementById("howto-list");
    var sbBody = document.getElementById("sideboard-body");

    var guide;
    try {
      guide = await LPL.loadJSON(src);
    } catch (e) {
      main.innerHTML = '<p class="empty-line">Couldn’t load this guide.</p>';
      return;
    }

    metaEl.innerHTML =
      '<div class="pips">' + pips(guide.colors) + "</div>" +
      '<span class="archetype-tag">' + LPL.escapeHtml(guide.archetype) + "</span>" +
      (guide.pilot ? '<span class="pilot">Piloted best by ' + LPL.escapeHtml(guide.pilot) + "</span>" : "");

    introEl.innerHTML = guide.intro.map(function (p) { return "<p>" + LPL.escapeHtml(p) + "</p>"; }).join("");

    var col1 = guide.decklist.mainboard.filter(function (g) { return g.col === 1; });
    var col2 = guide.decklist.mainboard.filter(function (g) { return g.col === 2; });

    decklistEl.innerHTML =
      renderMainColumn(col1) +
      renderMainColumn(col2) +
      renderSideboardColumn(guide.decklist.sideboard);

    howtoEl.innerHTML = guide.howToPlay.map(function (block) {
      return '<div class="howto-block"><h3>' + LPL.escapeHtml(block.heading) + "</h3><p>" + LPL.escapeHtml(block.text) + "</p></div>";
    }).join("");

    sbBody.innerHTML = guide.sideboardGuide.map(function (row) {
      return (
        "<tr><td>" + LPL.escapeHtml(row.matchup) + "</td>" +
        "<td>" + LPL.escapeHtml(cardListText(row.in)) + "</td>" +
        "<td>" + LPL.escapeHtml(cardListText(row.out)) + "</td>" +
        "<td>" + LPL.escapeHtml(row.notes) + "</td></tr>"
      );
    }).join("");
  })();
})();
