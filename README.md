# 15-Minute Productivity Day

A mobile-first productivity app that splits your day into 15-minute slots. Set your work window (start/end time), run a timer for each block, and log 1–2 sentences per slot.

- **Day view**: Slots for the selected day with notes; start a 15‑min timer from any slot.
- **Week view**: Overview of the week; tap a day to open the day view.
- **Month view**: Calendar with dots for days that have notes; tap a day to open the day view.

Data is stored in the browser (localStorage). No backend or account required.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to GitHub Pages

1. Push this repo to GitHub (e.g. `https://github.com/martinkl164/15-minutes-productivity-day`).
2. In the repo go to **Settings → Pages**.
3. Under **Source** choose **GitHub Actions**.
4. Push to the `master` branch (or run the workflow manually from the **Actions** tab).

The app will be available at:

`https://<your-username>.github.io/15-minutes-productivity-day/`

The workflow is in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).
