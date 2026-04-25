# Registry Review OS

This repo contains two static workshop exercises:

- root: Exercise 1, `Registry Review OS`
- `exercise2/`: Exercise 2, `STS Detection OS`

## Open locally

Open `index.html` directly in a browser for Exercise 1.

Open `exercise2/index.html` directly in a browser for Exercise 2.

Optional local server:

```bash
python -m http.server
```

Then open the local address shown in the terminal.

## Exercise 1 localStorage

The root Exercise 1 app stores browser-local state only for this page key:

- selected view
- selected vessel
- intro dismissal
- hidden facilitator toggle
- per-vessel `Risk`, `Action`, and short note entries

Nothing is sent to a backend. Decisions stay on the laptop/browser that was used.

## Reset decisions

Use the `Reset Decisions` button in the Decision Board section of the inbox.

If you want a full clean slate, clear localStorage for the page in the browser.

## Exercise 1 vessel data

Exercise 1 content lives in `data.js`.

The fifteen workshop records are defined in `registryData.vessels`, including:

- application snapshot fields
- facilitator-only intended answers
- AIS map points, segments, and event markers

## Exercise 1 vessel images

Source ship images live in `assets/new_assets`.

Optimized frontend images live in `assets/vessels` and are generated with:

```bash
python scripts/optimize_exercise1_images.py
```

The app uses smaller `preview` images in the inbox/review cards and only loads the larger `full` image when participants click `Inspect`.

## Exercise 1 live web checking

The app does not simulate Equasis, OFAC, or search results.

The web-check panel opens the real external sites outside the app:

- Equasis
- OFAC Sanctions Search

Copy buttons are provided for vessel name, IMO, owner, manager, operator, address, and insurer so participants can run their own manual searches in Google or other tools outside the app.

## Exercise 1 facilitator mode

Press `Shift + F` to reveal the hidden facilitator layer for the currently open vessel.
