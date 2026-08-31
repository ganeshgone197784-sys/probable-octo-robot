/* ============================================================
   ⚙️  CONFIGURATION — edit everything here
   ============================================================ */
const birthdayConfig = {
  name: "Ganesh",
  birthday: "September 10, 2026 00:00:00" // local time of the visitor
};

// Replace with your 7 real, live website URLs.
const websites = [
  { name: "Website 01", url: "https://ganeshgone197784-sys.github.io/ROLEX/" },
  { name: "Website 02", url: "https://ganeshgone197784-sys.github.io/VELOURA-Luxury-Perfume-Website/" },
  { name: "Website 03", url: "https://ganeshgone197784-sys.github.io/Coffee-shop-/" },
  { name: "Website 04", url: "https://ganeshgone197784-sys.github.io/AUR-LLE/" },
  { name: "Website 05", url: "https://ganeshgone197784-sys.github.io/Zeno-health-care/" },
  { name: "Website 06", url: "https://ganeshgone197784-sys.github.io/Zeno-health-care/" },
  { name: "Website 07", url: "https://ganeshgone197784-sys.github.io/GG-PORTFOLIO-/" }
];

// Optional background music. Leave empty string to disable.
const birthdayAudio = ""; // e.g. "https://your-domain.com/music.mp3"

// The big reveal photo (e.g. a video-style pic of you saying "Happy Birthday").
// Drop the real file in the same folder as index.html and keep this filename,
// or rename it here to match your file.
const heroPhoto = {
  src: "a.jpg",
  caption: "GODGANESHH 🎉",
  subcaption: "HAPPIEST BIRTHDAY TO YOU"
};

// More photos for the "a few more moments" gallery — add as many as you like.
// Just drop b.jpg, c.jpg, d.jpg... next to index.html; edit captions freely.
const galleryPhotos = [
  { src: "b.jpg", caption: "happiest birthday" },
  { src: "c.jpg", caption: "lovely day" },
  { src: "d.jpg", caption: "today will be your best day" },
  { src: "e.jpg", caption: "crazzy" },
  { src: "f.jpg", caption: "damn" }
];

// "What's next" goal cards — edit freely.
const futureGoals = [
  "Learn more",
  "Build better projects",
  "Improve coding",
  "Explore AI",
  "Explore cybersecurity",
  "Build useful products",
  "Become a better engineer",
  "Keep learning"
];

// Personal letter to your future self — edit freely.
const futureMessage =
`Hey Ganesh,

If you're reading this, another year has passed.

Remember how many things you wanted to build.
Remember the projects that didn't work.
Remember the things you learned.

Keep building.
Keep learning.
Keep improving.

And never forget why you started.`;

// Optional social links — shown on the final screen if provided.
const socialLinks = [
   { label: "GitHub", url: "https://github.com/ganeshgone197784-sys" },
   { label: "INSTAGRAM", url: "https://www.instagram.com/codewith_gg?igsi=MWQyNnNzdXVxOWJzNw==" }
];

/* ============================================================
   Internal state / helpers
   ============================================================ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targetDate = new Date(birthdayConfig.birthday);

function $(id){ return document.getElementById(id); }
function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

/* ============================================================
   SCROLL FIX — make sure every screen can be scrolled on small
   viewports, and auto-scroll to any "continue" button the moment
   it becomes visible so it's never stranded below the fold.
   ============================================================ */
(function enableScrollFix(){
  const style = document.createElement('style');
  style.textContent = `
    html, body { height: auto !important; overflow-y: auto !important; }
    .screen {
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      max-height: 100vh;
      padding-bottom: 2.5rem;
    }
  `;
  document.head.appendChild(style);
})();

function revealButton(el){
  if(!el) return;
  el.style.display = 'inline-block';
  // Give the layout a tick to update, then scroll it into view.
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

const screens = {};
document.querySelectorAll('.screen').forEach(s => screens[s.id] = s);
let currentScreenId = 'screen-countdown';

function showScreen(id, fadeMs = 900){
  return new Promise(resolve => {
    const from = screens[currentScreenId];
    const to = screens[id];
    if(from && from !== to){
      from.classList.remove('active');
    }
    to.classList.add('active');
    requestAnimationFrame(() => {
      to.style.opacity = '1';
    });
    currentScreenId = id;
    setTimeout(resolve, fadeMs);
  });
}

/* ============================================================
   AMBIENT PARTICLES (single canvas, lightweight)
   ============================================================ */
(function ambientParticles(){
  const canvas = $('particle-canvas');
  const ctx = canvas.getContext('2d');
  let w,h, particles = [];
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = reduceMotion ? 0 : (window.innerWidth < 600 ? 26 : 46);
  for(let i=0;i<COUNT;i++){
    particles.push({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*1.6+.4,
      vy: -(Math.random()*0.18+0.04),
      vx: (Math.random()-0.5)*0.06,
      a: Math.random()*0.5+0.15,
      tw: Math.random()*Math.PI*2
    });
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#C9A75A';
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.tw += 0.02;
      if(p.y < -10){ p.y = h+10; p.x = Math.random()*w; }
      const alpha = p.a * (0.6 + 0.4*Math.sin(p.tw));
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ============================================================
   EFFECTS: confetti + fireworks (shared canvas)
   ============================================================ */
const fx = (function(){
  const canvas = $('effects-canvas');
  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  let items = [];
  let running = false;
  function loop(){
    ctx.clearRect(0,0,w,h);
    items.forEach(it => it.update());
    items = items.filter(it => it.life > 0);
    items.forEach(it => it.draw(ctx));
    if(items.length){
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }
  function ensureLoop(){
    if(!running){ running = true; requestAnimationFrame(loop); }
  }

  function confettiBurst(count = 90){
    if(reduceMotion) count = Math.min(count, 20);
    const colors = ['#C9A75A','#F5EDE0','#4A1620','#e3c98a'];
    for(let i=0;i<count;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = Math.random()*6+2;
      items.push({
        x: w/2, y: h*0.35,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - 2,
        rot: Math.random()*Math.PI, vrot:(Math.random()-0.5)*0.3,
        size: Math.random()*6+4,
        color: colors[i%colors.length],
        life: 90 + Math.random()*40,
        update(){ this.vy += 0.12; this.x += this.vx; this.y += this.vy; this.rot += this.vrot; this.life--; },
        draw(ctx){
          ctx.save(); ctx.translate(this.x,this.y); ctx.rotate(this.rot);
          ctx.globalAlpha = Math.max(this.life/120,0);
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size/2,-this.size/4,this.size,this.size/2);
          ctx.restore();
        }
      });
    }
    ensureLoop();
  }

  function fireworkBurst(x, y, count = 40){
    if(reduceMotion) count = Math.min(count, 14);
    const colors = ['#C9A75A','#F5EDE0','#e3c98a','#ffdca0'];
    for(let i=0;i<count;i++){
      const angle = (Math.PI*2)*(i/count);
      const speed = Math.random()*3.6+1.6;
      items.push({
        x, y,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        life: 55 + Math.random()*20,
        maxLife: 70,
        color: colors[i%colors.length],
        update(){ this.vx *= 0.96; this.vy = this.vy*0.96 + 0.03; this.x+=this.vx; this.y+=this.vy; this.life--; },
        draw(ctx){
          ctx.globalAlpha = Math.max(this.life/70,0);
          ctx.fillStyle = this.color;
          ctx.beginPath(); ctx.arc(this.x,this.y,2.2,0,Math.PI*2); ctx.fill();
        }
      });
    }
    ensureLoop();
  }

  function fireworksShow(bursts = 4){
    let i = 0;
    const t = setInterval(() => {
      fireworkBurst(w*(0.25+Math.random()*0.5), h*(0.2+Math.random()*0.3));
      i++;
      if(i>=bursts) clearInterval(t);
    }, 420);
  }

  function goldenUpdraft(count = 30){
    if(reduceMotion) count = 10;
    for(let i=0;i<count;i++){
      items.push({
        x: w/2 + (Math.random()-0.5)*160, y: h*0.62 + Math.random()*30,
        vx: (Math.random()-0.5)*0.5, vy: -(Math.random()*1.4+0.6),
        life: 70+Math.random()*30,
        color:'#C9A75A',
        update(){ this.x+=this.vx; this.y+=this.vy; this.life--; },
        draw(ctx){
          ctx.globalAlpha = Math.max(this.life/100,0)*0.8;
          ctx.fillStyle = this.color;
          ctx.beginPath(); ctx.arc(this.x,this.y,1.6,0,Math.PI*2); ctx.fill();
        }
      });
    }
    ensureLoop();
  }

  return { confettiBurst, fireworkBurst, fireworksShow, goldenUpdraft };
})();

/* ============================================================
   AUDIO
   ============================================================ */
let audioEl = null, soundOn = false;
if(birthdayAudio){
  audioEl = new Audio(birthdayAudio);
  audioEl.loop = true;
  audioEl.volume = 0.5;
}
$('soundToggle').addEventListener('click', () => {
  if(!birthdayAudio){
    $('soundToggle').textContent = '🔇 No audio set';
    return;
  }
  soundOn = !soundOn;
  if(soundOn){
    audioEl.play().catch(()=>{ soundOn = false; $('soundToggle').textContent = '🔇 SOUND OFF'; });
    $('soundToggle').textContent = '🔊 SOUND ON';
  } else {
    audioEl.pause();
    $('soundToggle').textContent = '🔇 SOUND OFF';
  }
});
if(!birthdayAudio){ $('soundToggle').style.opacity = '.5'; }

/* ============================================================
   1. COUNTDOWN
   ============================================================ */
let countdownTimer = null;
let blastoffStarted = false;
function startCountdown(){
  function tick(){
    const now = new Date();
    let diff = targetDate - now;

    if(diff <= 3000 && !blastoffStarted){
      // Hand off from the ticking clock to the cinematic 3·2·1 blast-off.
      blastoffStarted = true;
      clearInterval(countdownTimer);
      runBlastoffThenBirthday();
      return;
    }

    if(diff <= 0){
      clearInterval(countdownTimer);
      if(!blastoffStarted){ blastoffStarted = true; runBlastoffThenBirthday(); }
      return;
    }

    // Last 5 seconds: switch the whole countdown screen into "critical" mode.
    const countdownScreen = $('screen-countdown');
    if(diff <= 5000){
      if(!countdownScreen.classList.contains('critical')){
        countdownScreen.classList.add('critical');
        $('timerEl').classList.add('critical');
      }
      beep(880, .08, 'sine', .05);
    } else if(countdownScreen.classList.contains('critical')){
      countdownScreen.classList.remove('critical');
      $('timerEl').classList.remove('critical');
    }

    const d = Math.floor(diff/86400000); diff -= d*86400000;
    const h = Math.floor(diff/3600000); diff -= h*3600000;
    const m = Math.floor(diff/60000); diff -= m*60000;
    const s = Math.floor(diff/1000);
    $('tDays').textContent = String(d).padStart(2,'0');
    $('tHours').textContent = String(h).padStart(2,'0');
    $('tMins').textContent = String(m).padStart(2,'0');
    $('tSecs').textContent = String(s).padStart(2,'0');
  }
  tick();
  countdownTimer = setInterval(tick, 1000);
}

/* ============================================================
   1b. TINY WEBAUDIO SFX (no external files needed)
   ============================================================ */
let audioCtx = null;
function ensureAudioCtx(){
  if(audioCtx) return audioCtx;
  try{ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ audioCtx = null; }
  return audioCtx;
}
document.addEventListener('pointerdown', () => ensureAudioCtx(), { once:true });

function beep(freq = 440, dur = .12, type = 'sine', vol = .08){
  if(reduceMotion) return;
  const ctx = audioCtx;
  if(!ctx) return;
  try{
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }catch(e){}
}

function chime(){
  if(reduceMotion) return;
  const ctx = audioCtx;
  if(!ctx) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f,i) => {
    setTimeout(() => beep(f, .5, 'triangle', .07), i*110);
  });
}

/* ============================================================
   1c. FINAL 3 · 2 · 1 BLAST-OFF
   ============================================================ */
function shakeApp(){
  const app = $('app');
  app.classList.remove('shake');
  void app.offsetWidth;
  app.classList.add('shake');
}

function flashScreen(){
  const f = $('screenFlash');
  f.style.transition = 'none';
  f.style.opacity = '.9';
  requestAnimationFrame(() => {
    f.style.transition = 'opacity .7s ease';
    f.style.opacity = '0';
  });
}

async function blastNumber(n, label){
  const el = $('blastNum');
  const ring = $('blastRing');
  const lbl = $('blastLabel');

  el.textContent = n;
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  ring.classList.remove('go'); void ring.offsetWidth; ring.classList.add('go');
  lbl.textContent = label;
  lbl.classList.remove('show'); void lbl.offsetWidth; lbl.classList.add('show');

  shakeApp();
  fx.fireworkBurst(window.innerWidth/2, window.innerHeight*0.42, reduceMotion ? 10 : 30);
  beep(220, .28, 'square', .1);

  await wait(1000);
}

async function runBlastoffThenBirthday(){
  $('screen-countdown').classList.remove('critical');
  $('timerEl').classList.remove('critical');
  await showScreen('screen-blastoff', 400);
  await wait(150);
  await blastNumber('3', 'HERE WE GO…');
  await blastNumber('2', 'ALMOST THERE…');
  await blastNumber('1', 'MAKE IT COUNT…');

  flashScreen();
  shakeApp();
  fx.confettiBurst(reduceMotion ? 20 : 90);
  chime();
  await wait(350);

  beginBirthdaySequence({ instant:true });
}

/* ============================================================
   SEQUENTIAL LINE REVEAL HELPER
   lines: array of {text, cls, pause} rendered one at a time into `el`
   ============================================================ */
async function playLines(el, lines, opts = {}){
  const holdMs = opts.hold ?? 1500;
  const outMs = opts.out ?? 500;
  for(const item of lines){
    const text = typeof item === 'string' ? item : item.text;
    const extraClass = typeof item === 'string' ? '' : (item.cls || '');
    el.className = el.className.split(' ').filter(c=>!c.startsWith('serif')&&c!=='strong').join(' ');
    el.classList.add('line','serif');
    if(extraClass) el.classList.add(extraClass);
    el.textContent = text;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    await wait(holdMs);
    el.classList.remove('show');
    await wait(outMs);
  }
}

/* ============================================================
   2 & 3. MIDNIGHT TRANSITION + HAPPY BIRTHDAY REVEAL
   ============================================================ */
async function beginBirthdaySequence(opts = {}){
  if(opts.instant){
    // We already played the cinematic 3·2·1 blast-off + flash, so go straight
    // into the Happy Birthday reveal at full intensity — no need to replay
    // the slower "12:00 AM" narration on top of it.
    await showScreen('screen-happybirthday', 700);
    fx.confettiBurst(reduceMotion ? 24 : 140);
    fx.fireworksShow(5);
    fx.goldenUpdraft(reduceMotion ? 14 : 44);
    await wait(3400);
    await runPhotoReveal();
    await showScreen('screen-gallery', 900);
    runGallery();
    return;
  }

  await showScreen('screen-midnight', 900);
  const line = $('midnightLine1');
  const diya = $('diyaEl');
  diya.style.animation = 'none'; void diya.offsetWidth; diya.style.animation = '';
  line.classList.remove('show'); line.textContent = '';
  await wait(1400);
  line.textContent = '12:00 AM.';
  line.classList.add('show');
  await wait(1600);
  line.classList.remove('show');
  await wait(600);
  line.textContent = '10 SEPTEMBER.';
  line.classList.add('show');
  await wait(1700);
  line.classList.remove('show');
  await wait(600);

  await showScreen('screen-happybirthday', 900);
  fx.confettiBurst(110);
  fx.fireworksShow(4);
  await wait(3400);

  await runPhotoReveal();
  await showScreen('screen-gallery', 900);
  runGallery();
}

/* ============================================================
   3b. THE PHOTO REVEAL
   ============================================================ */
function spawnSparkles(container, count = 10){
  if(reduceMotion) count = 4;
  const glyphs = ['✨','💛','⭐','🎉'];
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'sparkle-float';
    s.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    s.style.left = (10 + Math.random()*80) + '%';
    s.style.bottom = (Math.random()*20) + '%';
    s.style.animationDelay = (Math.random()*1.2) + 's';
    container.appendChild(s);
    setTimeout(() => s.remove(), 4600);
  }
}

function handleImgFallback(img, filename){
  img.onerror = () => {
    const ph = document.createElement('div');
    ph.className = 'img-placeholder';
    ph.innerHTML = `<span class="ph-icon">🖼️</span><span>Add ${filename}</span>`;
    img.replaceWith(ph);
  };
}

async function runPhotoReveal(){
  const heroImg = $('heroPhotoImg');
  heroImg.src = heroPhoto.src;
  heroImg.alt = heroPhoto.caption;
  handleImgFallback(heroImg, heroPhoto.src);
  $('photoCaption').textContent = heroPhoto.caption;
  $('photoSubcaption').textContent = heroPhoto.subcaption;

  await showScreen('screen-photo', 900);
  fx.confettiBurst(reduceMotion ? 20 : 80);
  fx.goldenUpdraft(reduceMotion ? 10 : 30);
  spawnSparkles($('screen-photo'), reduceMotion ? 4 : 12);
  const sparkleLoop = reduceMotion ? null : setInterval(() => spawnSparkles($('screen-photo'), 4), 1300);
  await wait(4200);
  if(sparkleLoop) clearInterval(sparkleLoop);
}

/* ============================================================
   3c. GALLERY OF MOMENTS
   ============================================================ */
async function runGallery(){
  const wrap = $('galleryGrid');
  wrap.innerHTML = '';
  galleryPhotos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'polaroid';
    card.style.setProperty('--r', (Math.random()*12 - 6).toFixed(1) + 'deg');
    const img = document.createElement('img');
    img.src = p.src; img.alt = p.caption; img.loading = 'lazy';
    handleImgFallback(img, p.src);
    const cap = document.createElement('div');
    cap.className = 'polaroid-cap';
    cap.textContent = p.caption;
    card.appendChild(img); card.appendChild(cap);
    wrap.appendChild(card);
  });
  await wait(150);
  const cards = wrap.querySelectorAll('.polaroid');
  for(let i=0;i<cards.length;i++){
    cards[i].classList.add('show');
    await wait(150);
  }
  requestAnimationFrame(() => {
    $('galleryContinueBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
$('galleryContinueBtn').addEventListener('click', async () => {
  await showScreen('screen-cake', 900);
});

/* ============================================================
   4/5/6. CAKE — WISH — CUT
   ============================================================ */
$('wishBtn').addEventListener('click', async () => {
  $('wishBtn').disabled = true;
  const cake = $('cakeEl');
  cake.classList.add('glowing');
  fx.goldenUpdraft(reduceMotion ? 10 : 34);
  await wait(1600);
  const top = $('cakeTopLine');
  top.textContent = 'Wish made. ✨';
  top.classList.add('show');
  await wait(1700);
  top.classList.remove('show');
  await wait(500);
  $('wishBtn').style.display = 'none';
  $('cakeSubLine').textContent = "Now let's cut the cake.";
  top.textContent = '';
  await wait(300);
  revealButton($('cutBtn'));
});

$('cutBtn').addEventListener('click', async () => {
  $('cutBtn').disabled = true;
  const knife = $('knifeEl');
  const cake = $('cakeEl');
  knife.classList.add('show');
  await wait(600);
  knife.classList.add('cut');
  await wait(700);
  cake.classList.add('lit-out');
  fx.confettiBurst(90);
  fx.goldenUpdraft(reduceMotion ? 10 : 26);
  await wait(500);
  fx.fireworksShow(3);
  const sub = $('cakeSubLine');
  sub.textContent = 'CAKE CUT! 🎂';
  sub.classList.add('show','strong');
  await wait(2000);
  sub.classList.remove('show');
  await wait(600);
  await showScreen('screen-efforts', 900);
  runEffortsSequence();
});

/* ============================================================
   7. YOUR EFFORTS
   ============================================================ */
async function runEffortsSequence(){
  const el = $('effortsLine');
  const seq = [
    "A birthday isn't just about another year…",
    { text: "IT'S ABOUT THE JOURNEY.", cls:'strong' },
    { text: 'YOUR EFFORTS.', cls:'strong' },
    'Every idea.',
    'Every line of code.',
    'Every bug.',
    'Every failed attempt.',
    'Every late-night project.',
    'Every lesson.',
    'And eventually…',
    { text: '7 WEBSITES.', cls:'strong' },
    'Built by me.'
  ];
  await playLines(el, seq, { hold: 1450, out: 450 });
  await wait(300);
  await showScreen('screen-websites', 900);
  initWebsiteCarousel();
}

/* ============================================================
   8-11. WEBSITE CAROUSEL
   ============================================================ */
let currentSite = 0;
let autoplay = true;
let autoplayTimer = null;
const DWELL_MS = 7000;
let progressStart = 0;
let progressRAF = null;
let carouselStarted = false;
const FRAME_SCROLL_MULTIPLIER = 3.2; // iframe rendered at 3.2x the visible height, then slid up
let frameMaxOffset = 0;

function computeFrameOffset(){
  const body = $('frameBody');
  const iframe = $('siteFrame');
  if(!body || !iframe) return;
  const visibleH = body.clientHeight;
  const iframeH = Math.round(visibleH * FRAME_SCROLL_MULTIPLIER);
  iframe.style.height = iframeH + 'px';
  frameMaxOffset = Math.max(0, iframeH - visibleH);
}
window.addEventListener('resize', computeFrameOffset);

function domainOf(url){
  try{ return new URL(url).hostname; }catch(e){ return url; }
}

function loadSite(idx){
  const site = websites[idx];
  $('projIdx').textContent = `PROJECT ${String(idx+1).padStart(2,'0')} / 07`;
  $('projName').textContent = site.name;
  $('addrBar').textContent = site.url;
  $('openLiveTop').href = site.url;
  $('fallbackOpen').href = site.url;

  const iframe = $('siteFrame');
  const fallback = $('frameFallback');
  fallback.style.display = 'none';
  iframe.style.display = 'block';

  computeFrameOffset();
  iframe.style.transform = 'translateY(0)';

  let loaded = false;
  iframe.onload = () => { loaded = true; };
  iframe.src = site.url;

  clearTimeout(loadSite._fallbackTimer);
  loadSite._fallbackTimer = setTimeout(() => {
    if(!loaded){
      iframe.style.display = 'none';
      fallback.style.display = 'flex';
    }
  }, 3500);
}

function updateProgress(){
  cancelAnimationFrame(progressRAF);
  if(!autoplay) return;
  progressStart = performance.now();
  const fill = $('progressFill');
  function step(t){
    const elapsed = t - progressStart;
    const pct = Math.min(elapsed / DWELL_MS, 1) * 100;
    fill.style.width = pct + '%';
    if(!reduceMotion){
      const siteFrame = $('siteFrame');
      if(siteFrame) siteFrame.style.transform = `translateY(-${frameMaxOffset * (pct/100)}px)`;
    }
    if(pct < 100 && autoplay){
      progressRAF = requestAnimationFrame(step);
    }
  }
  progressRAF = requestAnimationFrame(step);
}

function goToSite(idx, {advanceScreen = true} = {}){
  if(idx >= websites.length){
    stopAutoplay();
    if(advanceScreen) finishWebsites();
    return;
  }
  if(idx < 0) idx = 0;
  currentSite = idx;
  loadSite(currentSite);
  updateProgress();
  restartAutoplayTimer();
}

function restartAutoplayTimer(){
  clearTimeout(autoplayTimer);
  if(!autoplay) return;
  autoplayTimer = setTimeout(() => {
    goToSite(currentSite + 1);
  }, DWELL_MS);
}

function stopAutoplay(){
  autoplay = false;
  clearTimeout(autoplayTimer);
  cancelAnimationFrame(progressRAF);
  $('playPauseBtn').textContent = '▶';
}

function startAutoplay(){
  autoplay = true;
  $('playPauseBtn').textContent = 'Ⅱ';
  updateProgress();
  restartAutoplayTimer();
}

async function finishWebsites(){
  await showScreen('screen-afterwebsites', 900);
  const el = $('afterLine');
  await playLines(el, [
    { text:'7 WEBSITES.', cls:'strong' },
    { text:'7 CHAPTERS.', cls:'strong' },
    { text:'ONE JOURNEY.', cls:'strong' },
    "AND I'M JUST GETTING STARTED. 🚀"
  ], { hold: 1500, out: 450 });
  await wait(300);
  await showScreen('screen-terminal', 900);
  runTerminal();
}

$('prevBtn').addEventListener('click', () => { goToSite(currentSite - 1); });
$('nextBtn').addEventListener('click', () => { goToSite(currentSite + 1); });
$('playPauseBtn').addEventListener('click', () => {
  if(autoplay) stopAutoplay(); else startAutoplay();
});

// keyboard controls
document.addEventListener('keydown', (e) => {
  if(currentScreenId !== 'screen-websites') return;
  if(e.key === 'ArrowRight') goToSite(currentSite + 1);
  if(e.key === 'ArrowLeft') goToSite(currentSite - 1);
  if(e.key === ' '){ e.preventDefault(); autoplay ? stopAutoplay() : startAutoplay(); }
});

// swipe controls
(function swipe(){
  const target = $('screen-websites');
  let sx = 0, sy = 0;
  target.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  target.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)){
      if(dx < 0) goToSite(currentSite + 1); else goToSite(currentSite - 1);
    }
  }, {passive:true});
})();

function initWebsiteCarousel(){
  if(carouselStarted) return;
  carouselStarted = true;
  currentSite = 0;
  autoplay = true;
  goToSite(0);
}

/* ============================================================
   14. CODING JOURNEY TERMINAL
   ============================================================ */
async function typeText(el, text, speed = 22){
  for(let i=0;i<text.length;i++){
    el.textContent += text[i];
    if(!reduceMotion) await wait(speed);
  }
}

async function runTerminal(){
  const out = $('termOutput');
  out.textContent = '';
  const rows = [
    ['projects_completed', '07'],
    ['ideas_remaining', '∞'],
    ['bugs_fixed', 'countless'],
    ['lessons_learned', 'countless'],
    ['hours_coding', 'loading...'],
    ['dreams', 'loading...'],
    ['next_level', 'UNLOCKED']
  ];
  for(const [k,v] of rows){
    const lineStart = document.createElement('span');
    out.appendChild(document.createTextNode('> '));
    const keySpan = document.createElement('span');
    keySpan.className = 'k';
    out.appendChild(keySpan);
    await typeText(keySpan, k + ': ', 14);
    const valSpan = document.createElement('span');
    out.appendChild(valSpan);
    await typeText(valSpan, v, 26);
    out.appendChild(document.createTextNode('\n'));
    await wait(260);
  }
  await wait(400);
  const kb = $('keepBuildingLine');
  kb.classList.add('show');
  await wait(2200);
  await showScreen('screen-next', 900);
  runNextChapter();
}

/* ============================================================
   15. WHAT'S NEXT
   ============================================================ */
async function runNextChapter(){
  const wrap = $('goalCards');
  wrap.innerHTML = '';
  futureGoals.forEach(g => {
    const c = document.createElement('div');
    c.className = 'card';
    c.textContent = g;
    wrap.appendChild(c);
  });
  await wait(200);
  const cards = wrap.querySelectorAll('.card');
  for(let i=0;i<cards.length;i++){
    cards[i].classList.add('show');
    await wait(120);
  }
  requestAnimationFrame(() => {
    $('nextContinueBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
$('nextContinueBtn').addEventListener('click', async () => {
  await showScreen('screen-future', 900);
  runFutureLetter();
});

/* ============================================================
   16. DEAR FUTURE GANESH
   ============================================================ */
let futureLetterPlayed = false;
async function runFutureLetter(){
  if(futureLetterPlayed) return;
  futureLetterPlayed = true;
  const el = $('letterText');
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  for(let i=0;i<futureMessage.length;i++){
    el.textContent += futureMessage[i];
    if(!reduceMotion && i % 2 === 0) await wait(10);
  }
  el.appendChild(cursor);
  await wait(600);
  revealButton($('futureContinueBtn'));
}
$('futureContinueBtn').addEventListener('click', async () => {
  await showScreen('screen-surprise', 900);
  runSurpriseIntro();
});

/* ============================================================
   17. FINAL SURPRISE
   ============================================================ */
async function runSurpriseIntro(){
  const line = $('surpriseLine');
  line.textContent = 'One last thing…';
  line.classList.add('show');
  await wait(1700);
  line.classList.remove('show');
  await wait(500);
  line.textContent = 'READY?';
  line.classList.add('show','strong');
  await wait(1200);
  revealButton($('surpriseBtn'));
}

$('surpriseBtn').addEventListener('click', async () => {
  $('surpriseBtn').disabled = true;
  document.body.style.transition = 'background .6s ease';
  fx.confettiBurst(130);
  fx.fireworksShow(5);
  fx.goldenUpdraft(reduceMotion ? 12 : 40);
  await wait(1500);
  $('surpriseLine').classList.remove('show','strong');
  await wait(300);
  const line = $('surpriseLine');
  await playLines(line, [
    { text: '🎉 HAPPY BIRTHDAY GANESH 🎂', cls:'strong' },
    '10 • 09 • 2026',
    { text: 'A NEW CHAPTER BEGINS.', cls:'strong' }
  ], { hold: 1900, out: 500 });
  await wait(300);
  await showScreen('screen-final', 900);
  runFinalScreen();
});

/* ============================================================
   18. FINAL SCREEN
   ============================================================ */
async function runFinalScreen(){
  const el = $('finalLine');
  await playLines(el, [
    "I didn't just turn another year older.",
    { text:'I built.', cls:'strong' },
    { text:'I learned.', cls:'strong' },
    { text:'I failed.', cls:'strong' },
    { text:'I improved.', cls:'strong' },
    "AND I'M JUST GETTING STARTED. 🚀"
  ], { hold: 1500, out: 450 });
  el.classList.remove('show');
  await wait(400);

  el.className = 'line serif show strong';
  el.style.fontSize = 'clamp(1.6rem,5vw,2.4rem)';
  el.textContent = "AND I'M JUST GETTING STARTED. 🚀";
  await wait(2200);

  const footer = document.createElement('div');
  footer.style.marginTop = '2.4rem';
  footer.style.fontFamily = "'JetBrains Mono',monospace";
  footer.style.fontSize = '.7rem';
  footer.style.letterSpacing = '.2em';
  footer.style.color = 'rgba(245,237,224,.5)';
  footer.style.textTransform = 'uppercase';
  footer.textContent = 'Made by me, for me — 10 September 2026';
  $('screen-final').appendChild(footer);

  if(socialLinks.length){
    const linksWrap = document.createElement('div');
    linksWrap.style.marginTop = '1.2rem';
    linksWrap.style.display = 'flex';
    linksWrap.style.gap = '1rem';
    socialLinks.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url; a.textContent = s.label; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'open-live';
      linksWrap.appendChild(a);
    });
    $('screen-final').appendChild(linksWrap);
  }
}

/* ============================================================
   BOOTSTRAP
   ============================================================ */
$('skipBtn').addEventListener('click', () => {
  clearInterval(countdownTimer);
  beginBirthdaySequence();
});

(function init(){
  const now = new Date();
  if(now >= targetDate){
    // Already the birthday (or past it) — enter birthday mode immediately.
    screens['screen-countdown'].classList.remove('active');
    beginBirthdaySequence();
  } else {
    startCountdown();
  }
})();
