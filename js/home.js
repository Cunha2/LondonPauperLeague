(async function () {
  var statMembers = document.getElementById("stat-members");
  var statEvents = document.getElementById("stat-events");
  var statTopdog = document.getElementById("stat-topdog");
  var nextUp = document.getElementById("next-up-slot");

  try {
    var standings = await LPL.loadJSON("data/standings.json");
    standings.sort(function (a, b) { return b.points - a.points; });
    statMembers.textContent = standings.length;
    statTopdog.textContent = standings[0] ? standings[0].name.split(" ")[0] : "—";
  } catch (e) {
    statMembers.textContent = "—";
    statTopdog.textContent = "—";
  }

  try {
    var events = await LPL.loadJSON("data/schedule.json");
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var upcoming = events
      .filter(function (e) { return new Date(e.date + "T00:00:00") >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });

    statEvents.textContent = upcoming.length;

    if (upcoming[0]) {
      var e = upcoming[0];
      var d = new Date(e.date + "T00:00:00");
      var month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
      nextUp.innerHTML =
        '<div class="card next-up-card"><span class="pin"></span>' +
        '<div class="when"><span class="day">' + d.getDate() + '</span><span class="month">' + month + "</span></div>" +
        "<div>" +
        "<h3>" + LPL.escapeHtml(e.title) + "</h3>" +
        "<p>" + LPL.escapeHtml(e.format) + " &middot; " + e.time + " &middot; " + LPL.escapeHtml(e.location) + "</p>" +
        "</div></div>";
    } else {
      nextUp.innerHTML = '<p class="empty-line">Nothing on the books yet — check back soon.</p>';
    }
  } catch (e) {
    statEvents.textContent = "—";
    nextUp.innerHTML = '<p class="empty-line">Couldn’t load the schedule.</p>';
  }
})();
