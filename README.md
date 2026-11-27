# TiltSphere

Tilt your phone to roll the ball into the green funnel. 250 levels, a daily challenge, an endless mode, and a pile of obstacles that get meaner as you go.

> The repository is called `funnel-game`; the game itself is **TiltSphere**.

It is a single `index.html` file (plus a tiny manifest, service worker and icons that let you install it). No build step, no dependencies.

## Play

Open `index.html` on a phone (or serve the folder with any static host, such as GitHub Pages). On iPhone, allow *Motion & Orientation* when asked. If tilt isn't available, an on-screen joystick appears. Add it to your home screen to play full-screen and offline.

## How it works

- **Goal:** get the ball into the funnel before the timer runs out. You have 3 lives.
- **Stars:** each level gives up to 3 stars: 1 for finishing, +1 for no hits, +1 for finishing with half the time left. Replay levels from **Menu > Levels**.
- **Combos:** hit-free levels build a score multiplier.
- **Power-ups** (from level 5): ⏱ freezes the timer, 🛡 blocks one hit, 🐢 slows the obstacles.
- **Obstacles:** blocks, bumpers, spinners and lasers. From the *expert* tier, lasers cost a life. From *master* onward the funnel drifts.
- **Special levels:** spinners, bouncy walls, mazes, orbiting obstacles, chaos.
- **Assist:** after two lives lost on one level, obstacles slow down and you get +8 seconds (can be turned off in Settings).
- **Modes:** Campaign, Daily Challenge (same layout for everyone each day), Endless.
- **Skins** unlock through achievements.

### Settings

Sensitivity, sound, haptics, ball trail, music, auto-pause, assist, and a high-contrast shapes mode (static obstacles have solid outlines, moving ones dashed; circles, crosses and lines mark the obstacle types). **Menu > Calibrate tilt** sets your current phone angle as "flat".

## Development

Everything lives in `index.html` (one `TiltBallGame` class). Progress is saved in the browser's `localStorage`. When you change `index.html`, bump the `CACHE` name in `sw.js` so installed copies pick up the update.
