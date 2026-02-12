// ===== STATE =====
const visited = { garden: false, memories: false, surprise: false };
const stopOrder = ['garden', 'memories', 'surprise'];

// ===== STARS =====
function createStars(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.width = star.style.height = (1 + Math.random() * 3) + 'px';
    container.appendChild(star);
  }
}

// ===== TYPEWRITER =====
function typeWriter(text, elementId, speed, callback) {
  const el = document.getElementById(elementId);
  el.textContent = '';
  el.classList.add('cursor-blink');
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      el.classList.remove('cursor-blink');
      if (callback) setTimeout(callback, 400);
    }
  }

  setTimeout(type, 800);
}

// ===== SCREEN NAVIGATION =====
function showScreen(id) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(id);

  if (current) {
    current.classList.add('screen-exit');
    setTimeout(() => {
      current.classList.remove('active', 'screen-exit');
      next.classList.add('active', 'screen-enter');
      setTimeout(() => next.classList.remove('screen-enter'), 500);
    }, 350);
  } else {
    next.classList.add('active');
  }
}

// ===== JOURNEY START =====
function startJourney() {
  showScreen('map');
}

// ===== STOP NAVIGATION =====
function openStop(stopId) {
  showScreen(stopId);

  if (!visited[stopId]) {
    visited[stopId] = true;
    const idx = stopOrder.indexOf(stopId);
    const dot = document.getElementById('tracker-' + (idx + 1));
    if (dot) dot.classList.add('visited');
  }

  if (stopId === 'garden') {
    startFloatingHearts();
  }
}

function goBack() {
  // Check if all visited
  if (visited.garden && visited.memories && visited.surprise) {
    showScreen('finale');
    createStars('finale-stars', 100);
    launchFinaleConfetti();
  } else {
    showScreen('map');
  }
}

// ===== FLOATING HEARTS (GARDEN) =====
let heartInterval;

function startFloatingHearts() {
  if (heartInterval) clearInterval(heartInterval);
  const container = document.getElementById('floating-hearts');
  container.innerHTML = '';

  const hearts = ['\u2764\ufe0f', '\uD83D\uDC9C', '\uD83E\uDE77', '\uD83C\uDF38', '\u2728', '\uD83C\uDF3C'];

  heartInterval = setInterval(() => {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = (10 + Math.random() * 80) + '%';
    heart.style.bottom = '-20px';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }, 600);

  // Stop after some time to avoid overloading
  setTimeout(() => {
    if (heartInterval) clearInterval(heartInterval);
  }, 30000);
}

// ===== CONFETTI (MEMORIES) =====
function launchConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const colors = ['#e0aaff', '#c77dff', '#ff9a9e', '#fad0c4', '#ffd6ff', '#ffb3c6'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// ===== SURPRISE BUTTON =====
const surpriseMessages = [
  "Paulina, dato importante:\nEres increible y punto. No se discute. \uD83D\uDE0C",
  "Noticia de ultima hora:\nAlguien esta sonriendo leyendo esto. \uD83D\uDE09",
  "Recuerda: los dias grises\ntambien tienen su encanto.\nPero tu le ganas a todos. \u2601\ufe0f\u2728",
  "Si la vida fuera un playlist,\ntu serias la cancion\nque siempre pones en repeat. \uD83C\uDFB5",
  "Dato curioso:\nCada vez que sonries,\nel universo hace un mini festejo. \uD83C\uDF89",
  "Paulina > dias grises.\nEso es matematica pura. \uD83E\uDDE0\u2728",
];

let lastSurpriseIdx = -1;

function triggerSurprise() {
  // Pick a random message (avoid repeating)
  let idx;
  do {
    idx = Math.floor(Math.random() * surpriseMessages.length);
  } while (idx === lastSurpriseIdx && surpriseMessages.length > 1);
  lastSurpriseIdx = idx;

  const msgEl = document.getElementById('surprise-message');
  msgEl.classList.remove('show');
  msgEl.classList.add('hidden');

  // Small confetti burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#667eea', '#764ba2', '#f093fb', '#e0aaff', '#ffd6ff'],
  });

  setTimeout(() => {
    msgEl.textContent = surpriseMessages[idx];
    msgEl.style.whiteSpace = 'pre-line';
    msgEl.classList.remove('hidden');
    msgEl.classList.add('show');
  }, 300);
}

// ===== FINALE CONFETTI =====
function launchFinaleConfetti() {
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#e0aaff', '#c77dff', '#4ade80', '#ffd6ff', '#ff9a9e'],
    });
  }, 600);
}

// ===== RESTART =====
function restartJourney() {
  visited.garden = false;
  visited.memories = false;
  visited.surprise = false;

  document.querySelectorAll('.tracker-dot').forEach(d => d.classList.remove('visited'));

  showScreen('intro');
  initIntro();
}

// ===== INIT =====
function initIntro() {
  typeWriter(
    'Hola Paulina\u2026 esto es una mision especial \uD83D\uDE0A',
    'typewriter',
    60,
    () => {
      const btn = document.getElementById('btn-enter');
      btn.classList.remove('hidden');
      btn.style.transition = 'opacity 0.6s ease';
      btn.style.opacity = '1';
    }
  );
}

// Boot
createStars('stars-container', 120);
initIntro();
