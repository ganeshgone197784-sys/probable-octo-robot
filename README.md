# 🎂 Happy Birthday, Ganesh — Cinematic Countdown Experience

A single-page interactive birthday website: a live countdown that transitions
into a cinematic reveal, a personal photo moment, a memory gallery, a cake
you get to "cut," a tour of 7 live projects, and a personal letter — all
wrapped in a gold/glassmorphic aesthetic.

## 📁 Files in this project

You get **two ways to use this**, pick whichever fits your hosting:

| File | Use this when… |
|---|---|
| `ganesh-birthday.html` | You want **one self-contained file**. Everything (HTML, CSS, JS) is inlined. Just upload this one file. |
| `index.html` + `style.css` + `script.js` | You prefer **separate files** (e.g. cleaner GitHub repo, easier to edit individual parts). |

Both versions are functionally identical — edit whichever set you're deploying.

## 🖼️ Adding your photos

The site expects these image files sitting in the **same folder** as the HTML file:

| Filename | Where it appears |
|---|---|
| `a.jpg` | The big reveal photo — full-screen "GODGANESHH 🎉" moment right after the countdown hits zero |
| `b.jpg` | Gallery — "a few more moments" |
| `c.jpg` | Gallery |
| `d.jpg` | Gallery |
| `e.jpg` | Gallery |
| `f.jpg` | Gallery |

Just drop your photos into the folder with those exact names and they'll appear automatically.
Until you do, each slot shows a nice placeholder ("🖼️ Add a.jpg") instead of a broken image icon —
so the site never looks broken, even mid-setup.

**Want more/fewer gallery photos, or different filenames/captions?**
Open the `<script>` config block (top of `ganesh-birthday.html`, or `script.js` if using
the split version) and edit:

```js
const heroPhoto = {
  src: "a.jpg",
  caption: "GODGANESHH 🎉",
  subcaption: "HAPPIEST BIRTHDAY TO YOU"
};

const galleryPhotos = [
  { src: "b.jpg", caption: "Add a caption" },
  { src: "c.jpg", caption: "Add a caption" },
  // add or remove as many entries as you like
];
```

## ⚙️ Other things you can edit (same config block)

- `birthdayConfig.birthday` — the target date/time the countdown counts down to
- `websites` — your 7 live project URLs shown in the browser-frame carousel
- `birthdayAudio` — optional background music URL (leave `""` to disable)
- `futureGoals` — the "What's Next" cards
- `futureMessage` — the "Dear Future Ganesh" letter
- `socialLinks` — optional links shown on the final screen

## 🚀 Deploying

**GitHub Pages (single file):**
1. Create a repo, upload `ganesh-birthday.html` (rename to `index.html` if you want it at the root URL), plus `a.jpg`–`f.jpg`.
2. Enable GitHub Pages in repo Settings → Pages.

**GitHub Pages (split files):**
1. Upload `index.html`, `style.css`, `script.js`, and `a.jpg`–`f.jpg` all in the same folder.
2. Enable GitHub Pages.

## 🧪 Testing before the big day

There's a **"SKIP TO BIRTHDAY"** button in the bottom-right corner — click it any time to
jump straight into the full birthday sequence without waiting for the countdown, so you
can preview everything (photo reveal, gallery, cake, carousel, letter, surprise) instantly.
