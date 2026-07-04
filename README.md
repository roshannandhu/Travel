# Fantastic Tourist Service — Website

Cinematic single-page site for **Fantastic Tourist Service** (Kerala, since 1985).
React + Vite · GSAP ScrollTrigger · Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

Deploy by uploading the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, shared hosting).

## Edit content (no code knowledge needed)

| What | Where |
| --- | --- |
| Package text — descriptions, highlights, itineraries, duration, best time | `src/data/destinations.js` |
| Phones, branches, services, socials, map location, WhatsApp number | `src/data/company.js` |

## Images

Original artwork lives in `src/assets/destinations/raw/` (one PNG per destination,
named by slug — e.g. `kashmir.png`). The site uses optimized WebP renditions.
After adding or replacing a raw image, regenerate them:

```bash
npm run optimize-images
```

To add a whole new destination: drop `<slug>.png` into `raw/`, run the command
above, then add an entry with the same `slug` in `src/data/destinations.js`.

## How the hero works

Clicking a destination card hands the card's screen position to the hero, which
reveals the new background through an expanding clip-path that "flows" out of
the card (GSAP `expo.inOut`). The selected destination is shared through
`src/context/DestinationContext.jsx` — the package section, destinations grid
and footer all stay in sync with it. The hero auto-advances every 8 s while
idle and pauses when you interact or scroll away.

# Travel
