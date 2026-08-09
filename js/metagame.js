(async function () {
  var body = document.getElementById("metagame-body");

  var decks;
  try {
    decks = await LPL.loadJSON("data/metagame.json");
  } catch (e) {
    body.innerHTML = '<tr><td colspan="5" class="empty-line">Couldn’t load the metagame breakdown.</td></tr>';
    return;
  }

  decks.sort(function (a, b) { return b.presence - a.presence; });
  var maxPresence = Math.max.apply(null, decks.map(function (d) { return d.presence; }));

  body.innerHTML = decks.map(function (d) {
    var barWidth = (d.presence / maxPresence) * 100;
    return (
      "<tr>" +
      '<td class="deck-name">' + LPL.escapeHtml(d.deck) + "</td>" +
      '<td><span class="archetype-tag">' + LPL.escapeHtml(d.archetype) + "</span></td>" +
      '<td><div class="presence-bar"><div class="track"><div class="fill" style="width:' + barWidth.toFixed(0) + '%"></div></div><span class="value">' + d.presence.toFixed(1) + '%</span></div></td>' +
      '<td class="num">' + d.winrate.toFixed(1) + "%</td>" +
      "<td>" + LPL.escapeHtml(d.bestPilot) + "</td>" +
      "</tr>"
    );
  }).join("");
})();
