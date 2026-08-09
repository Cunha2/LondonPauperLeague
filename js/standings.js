(async function () {
  var body = document.getElementById("standings-body");

  var players;
  try {
    players = await LPL.loadJSON("data/standings.json");
  } catch (e) {
    body.innerHTML = '<tr><td colspan="5" class="empty-line">Couldn’t load standings.</td></tr>';
    return;
  }

  players.sort(function (a, b) { return b.points - a.points; });

  body.innerHTML = players.map(function (p, i) {
    var rank = i + 1;
    return (
      "<tr>" +
      '<td><div class="rank-cell">' + (rank === 1 ? LPL.crownIcon() : "") + rank + "</div></td>" +
      '<td class="player-name">' + LPL.escapeHtml(p.name) + "</td>" +
      '<td class="num">' + p.legsPlayed + "</td>" +
      '<td class="num">' + p.points + "</td>" +
      '<td class="num">' + p.winrate.toFixed(1) + "%</td>" +
      "</tr>"
    );
  }).join("");
})();
