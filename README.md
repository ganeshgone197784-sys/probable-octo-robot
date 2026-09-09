# 🎉 Happy Birthday Ganesh

A single-page, animated birthday website — countdown → midnight reveal → photo gallery → cake cutting → coding-journey terminal → future letter → final surprise.

Live structure: `index.html` (markup) + `style.css` (styling/animations) + `script.js` (all logic/config).

---

## 📁 Files

| File | Purpose |
|---|---|
| `index.html` | Page structure — one `<section class="screen">` per step |
| `style.css` | Fonts, colors, animations for every screen |
| `script.js` | **All the config lives here.** Countdown target, gallery photos, goals, letter text, social links |

---

## ⚙️ Setup — edit `script.js`

Everything you'll want to change is at the top of `script.js`, inside `birthdayConfig` and the constants right below it.

```js
const birthdayConfig = {
  name: "Ganesh",
  birthday: "September 10, 2026 00:00:00" // local time of the visitor
};
```

### Background music (optional)
```js
const birthdayAudio = ""; // e.g. "https://your-domain.com/music.mp3"
```
Leave empty to disable — the sound button will just show "No audio set".

### Gallery photos
```js
const galleryPhotos = [
  { src: "b.jpg", caption: "happiest birthday" },
  { src: "c.jpg", caption: "lovely day" },
  ...
];
```
Drop `b.jpg`, `c.jpg`, `d.jpg`... in the same folder as `index.html`. Add or remove entries freely — the gallery grid renders however many you list. If an image fails to load, a placeholder card shows automatically instead of breaking the page.

### "What's Next" goal cards
```js
const futureGoals = [
  "Learn more",
  "Build better projects",
  ...
];
```

### Letter to future self
```js
const futureMessage = `Hey Ganesh, ...`;
```
Multi-line template string — edit the text directly, keep the backticks.

### Social links (shown on the final screen)
```js
const socialLinks = [
  { label: "GitHub", url: "https://github.com/..." },
  { label: "INSTAGRAM", url: "https://instagram.com/..." }
];
```
Leave the array empty (`[]`) to hide this section entirely.

---

## 🖼️ Images you need

Only the gallery images listed in `galleryPhotos` (e.g. `b.jpg`, `c.jpg`, `d.jpg`, `e.jpg`, `f.jpg`). Place them next to `index.html`. No other photo files are required — the site has no separate "hero photo" step.

---

## ▶️ How the flow works

1. **Countdown** — ticks down to `birthdayConfig.birthday`. A **"Skip to Birthday"** button (top of screen) jumps straight there for testing.
2. **Midnight transition** — "12:00 AM." → date reveal, or a cinematic 3·2·1 blast-off if the countdown runs out live.
3. **Gallery** — confetti/fireworks burst, then straight into the photo gallery.
4. **Cake** — make a wish → cut the cake (confetti + fireworks).
5. **Your Efforts** — animated line-by-line message.
6. **Terminal** — typewriter-style "stats" readout.
7. **What's Next** — goal cards.
8. **Dear Future Ganesh** — typed letter.
9. **Final Surprise** — button reveal → "HAPPY BIRTHDAY" finale.
10. **Final screen** — closing lines + social links.

---

## 🚀 Deploying (GitHub Pages)

1. Push `index.html`, `style.css`, `script.js`, and your gallery images to a GitHub repo.
2. Repo → **Settings → Pages** → set source to your default branch, root folder.
3. Visit `https://<username>.github.io/<repo>/`.

Any time you edit `script.js`, `style.css`, or `index.html`, re-push all changed files together — they depend on each other's element IDs and config.
