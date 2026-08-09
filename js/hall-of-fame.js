(async function () {
  var grid = document.getElementById("hof-grid");

  var members;
  try {
    members = await LPL.loadJSON("data/hallOfFame.json");
  } catch (e) {
    grid.innerHTML = '<p class="empty-line">Couldn’t load the Hall of Fame.</p>';
    return;
  }

  var portraitMark = '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="46" r="26" fill="currentColor"/><path fill="currentColor" d="M14,118 C14,86 34,66 60,66 C86,66 106,86 106,118 Z"/></svg>';

  grid.innerHTML = members.map(function (m) {
    var joined = LPL.formatDate(m.joined, { month: "short", year: "numeric" });
    return (
      '<article class="hof-card">' +
      '<div class="hof-frame" style="background: var(--' + (m.accent || "ink") + ')">' + portraitMark + "</div>" +
      "<h3>" + LPL.escapeHtml(m.name) + "</h3>" +
      '<div class="hof-deck">' + LPL.escapeHtml(m.mainDeck) + "</div>" +
      '<div class="hof-joined">Member since ' + joined + "</div>" +
      '<p class="hof-blurb">' + LPL.escapeHtml(m.blurb) + "</p>" +
      "</article>"
    );
  }).join("");
})();
