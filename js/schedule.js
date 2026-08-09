(async function () {
  var grid = document.getElementById("calendar-grid");
  var monthLabel = document.getElementById("calendar-month");
  var agendaEl = document.getElementById("agenda-list");
  var prevBtn = document.getElementById("cal-prev");
  var nextBtn = document.getElementById("cal-next");

  var events = [];
  try {
    events = await LPL.loadJSON("data/schedule.json");
  } catch (e) {
    grid.innerHTML = '<p class="empty-line">Couldn’t load the schedule.</p>';
    agendaEl.innerHTML = "";
    return;
  }

  var eventsByDate = {};
  events.forEach(function (e) {
    (eventsByDate[e.date] = eventsByDate[e.date] || []).push(e);
  });

  var today = new Date(); today.setHours(0, 0, 0, 0);
  var view = { year: today.getFullYear(), month: today.getMonth() };
  if (events.length) {
    var first = events.slice().sort(function (a, b) { return a.date.localeCompare(b.date); })[0];
    var upcoming = events.filter(function (e) { return new Date(e.date + "T00:00:00") >= today; });
    var anchor = upcoming.length ? upcoming[0] : first;
    var ad = new Date(anchor.date + "T00:00:00");
    view.year = ad.getFullYear();
    view.month = ad.getMonth();
  }

  var WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function renderCalendar() {
    monthLabel.textContent = MONTHS[view.month] + " " + view.year;

    var html = WEEKDAYS.map(function (w) { return '<div class="weekday">' + w + "</div>"; }).join("");

    var firstOfMonth = new Date(view.year, view.month, 1);
    var startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
    var daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

    for (var i = 0; i < startOffset; i++) {
      html += '<div class="cal-cell pad"></div>';
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var iso = view.year + "-" + pad(view.month + 1) + "-" + pad(day);
      var isToday = iso === (today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate()));
      var dayEvents = eventsByDate[iso] || [];

      html += '<div class="cal-cell' + (isToday ? " today" : "") + '"><span class="daynum">' + day + "</span>";
      dayEvents.forEach(function (e) {
        var isMajor = /Challenge|Championship/.test(e.title);
        html += '<div class="cal-event' + (isMajor ? " major" : "") + '">' + LPL.escapeHtml(e.title) + "</div>";
      });
      html += "</div>";
    }

    var totalCells = startOffset + daysInMonth;
    var trailing = (7 - (totalCells % 7)) % 7;
    for (var j = 0; j < trailing; j++) {
      html += '<div class="cal-cell pad"></div>';
    }

    grid.innerHTML = html;
  }

  function renderAgenda() {
    var upcoming = events
      .filter(function (e) { return new Date(e.date + "T00:00:00") >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });

    if (!upcoming.length) {
      agendaEl.innerHTML = '<p class="empty-line">No events on the calendar yet.</p>';
      return;
    }

    agendaEl.innerHTML = upcoming.map(function (e) {
      var d = new Date(e.date + "T00:00:00");
      var month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
      return (
        '<div class="card agenda-item">' +
        '<div class="when"><span class="day">' + d.getDate() + "</span>" + month + "</div>" +
        "<div><h3>" + LPL.escapeHtml(e.title) + "</h3>" +
        "<p>" + LPL.escapeHtml(e.description) + "</p>" +
        '<span class="meta">' + e.time + " &middot; " + LPL.escapeHtml(e.format) + " &middot; " + LPL.escapeHtml(e.location) + "</span></div>" +
        "</div>"
      );
    }).join("");
  }

  prevBtn.addEventListener("click", function () {
    view.month -= 1;
    if (view.month < 0) { view.month = 11; view.year -= 1; }
    renderCalendar();
  });

  nextBtn.addEventListener("click", function () {
    view.month += 1;
    if (view.month > 11) { view.month = 0; view.year += 1; }
    renderCalendar();
  });

  renderCalendar();
  renderAgenda();
})();
