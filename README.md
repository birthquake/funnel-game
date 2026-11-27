# TiltSphere

Tilt your phone to roll the ball into the green funnel. 250 levels, a daily challenge, an endless mode, and a pile of obstacles that get meaner as you go.

> The repository is called `funnel-game`; the game itself is **TiltSphere**.

It is a single `index.html` file (plus a tiny manifest, service worker and icons that let you install it). No build step, no dependencies.

## Play

Open `index.html` on a phone (or serve the folder with any static host, such as GitHub Pages). On iPhone, allow *Motion & Orientation* when asked. If tilt isn't available, an on-screen joystick appears. Add it to your home screen to play full-screen and offline.

## How it works

- **Goal:** get the ball into the funnel before the timer runs out. You have 3 lives.
- **Stars and goals:** each level gives up to 3 stars: 1 for finishing, +1 for no hits, +1 for finishing within half the time limit. The goal is shown at the start of every level, and your best time is saved. Replay levels from **Menu > Levels**.
- **Combos:** hit-free levels build a score multiplier.
- **Power-ups** (from level 5): ⏱ freezes the timer, 🛡 blocks one hit, 🐢 slows the obstacles.
- **Losing lives:** red mines (from level 6) and lasers cost a life. Running out of time does not cost a life; the level simply restarts.
- **New things are introduced one at a time:** the first time a new obstacle or power-up appears, the level intro tells you what it does.
- **Obstacles:** blocks, bumpers, spinners, mines and lasers. From the *master* tier the funnel drifts.
- **Special levels:** spinners, bouncy walls, mazes, orbiting obstacles, chaos.
- **Assist:** after two lives lost on one level, obstacles slow down and you get +8 seconds (can be turned off in Settings).
- **Modes:** Campaign, Daily Challenge (same layout for everyone each day, with a day streak, playable from the title screen), Endless.
- **Rush:** a 30 second sprint. Clear as many short levels as you can. Each clear adds 2 seconds (up to 45), mines and lasers cost 3 seconds, and there are no lives. Your best is saved and shown on the title screen.
- **Worlds:** every 25 levels the board gets a new look (Neon Grid, Circuit Board, Lava Fields, Frozen Peaks, Deep Space, Toxic Swamp, Sunset Dunes, The Abyss, Storm Front, The Void). The level screen is a winding map grouped by world.
- **Sharing:** Daily and Challenge-a-friend shares send a picture card (on phones that support sharing images) plus a link. The Daily window shows a calendar of the days you've played.
- **Skins** unlock by beating levels. The skin screen shows your progress toward each one.

### Settings

Sensitivity, sound, haptics, ball trail, music, auto-pause, assist, and a high-contrast shapes mode (static obstacles have solid outlines, moving ones dashed; circles, crosses and lines mark the obstacle types). **Menu > Calibrate tilt** sets your current phone angle as "flat".

## Development

Everything lives in `index.html` (one `TiltBallGame` class). Progress is saved in the browser's `localStorage`. When you change `index.html`, bump the `CACHE` name in `sw.js` so installed copies pick up the update.
