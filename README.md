# London Pauper League

Static site for the club: home, schedule, standings, hall of fame, metagame. Plain HTML/CSS/JS, no build step, no dependencies — pushes straight to GitHub Pages.

## Structure

```
index.html, schedule.html, standings.html, hall-of-fame.html, metagame.html
css/style.css        — all styling
js/main.js           — shared helpers + mobile nav toggle
js/*.js              — one render script per page, each fetches its matching JSON
data/*.json          — one file per page; edit these to update real content
assets/logo.png      — your club crest (add this yourself, see below)
assets/crest.svg     — placeholder crest used until logo.png exists
assets/portrait-placeholder.svg — silhouette used on Hall of Fame until you add real photos
```

## Adding your logo

Save your crest as **`assets/logo.png`**. Every place it's used (nav, hero, page stamps) already points at that path with a fallback to the placeholder crow-and-crown mark, so nothing else needs to change — it just upgrades automatically once the file exists. Works best as a roughly-square image with a transparent or white background (it's blended with `mix-blend-mode: multiply`, so black-ink-on-white art reads cleanly against the parchment background).

## Editing content

Each page's data lives in its own JSON file under `data/`:

- `data/schedule.json` — events: `title`, `date` (YYYY-MM-DD), `time`, `format`, `location`, `description`
- `data/standings.json` — players: `name`, `legsPlayed`, `points`, `winrate`
- `data/hallOfFame.json` — members: `name`, `mainDeck`, `joined` (YYYY-MM-DD), `accent` (one of `ember`/`oxblood`/`moss`/`brass`/`ink`), `blurb`
- `data/metagame.json` — decks: `deck`, `archetype`, `presence`, `winrate`, `bestPilot`

All the data currently in there is placeholder — replace it with real results whenever.

## Previewing locally

Opening the HTML files directly (`file://`) won't work — browsers block `fetch()` for local files, so the JSON won't load. Serve the folder over HTTP instead, e.g.:

```bash
python -m http.server 5500
```

then visit `http://localhost:5500`.

## Publishing to GitHub Pages

Push this folder to a GitHub repo, then in **Settings → Pages** set the source to the `main` branch, root folder. No build step required.
