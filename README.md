# 15-Min Productivity

Plan your day in 15-minute blocks. Set your work window, run a timer per slot, and log what you did in 1–2 sentences. Mobile-first, no account required.

**Live app:** [https://martinkl164.github.io/15-minutes-productivity-day/](https://martinkl164.github.io/15-minutes-productivity-day/)

---

## Features

- **Day view** — 15‑min slots for the selected day; start/stop timer and add a note per slot
- **Week view** — Summary of the week; tap a day to open the day view
- **Month view** — Calendar with indicators for days that have notes
- **Current time line** — Visual marker for “now” in the day (today only)
- **Themes** — Dark, Light, Sepia, Ocean, and Dashboard; configurable in Settings
- **Locale** — Time and date format follow your browser language
- **Offline** — Data stored in the browser (localStorage); no backend

---

## Tech

- **Stack:** React 18, TypeScript, Vite 5
- **Deploy:** GitHub Actions → GitHub Pages (static)

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Build

```bash
npm run build
```

Output is in `dist/`.

---

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to the `master` branch (or trigger the workflow from the **Actions** tab).

The workflow in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) builds the app and deploys it. The site will be available at:

**https://martinkl164.github.io/15-minutes-productivity-day/**

(Replace the username and repo name if you use a different repository.)

---

## License

MIT
