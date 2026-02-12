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

// ===== GREETINGS BY TIME OF DAY =====
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Buenos dias, Paulina';
  if (hour >= 12 && hour < 19) return 'Hola, Paulina';
  return 'Buenas noches, Paulina';
}

// ===== DAILY CONTENT ENGINE =====
// Types: "phrase" (just text), "wyr" (would you rather), "catch" (tap game), "compliment" (cumplido)
const dailyContent = [
  // --- FRASES TIERNAS ---
  {
    type: 'phrase',
    icon: '\u2728',
    text: 'Las personas mas bonitas\nno siempre lo saben.\nPero tu mereces saberlo.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF19',
    text: 'Si la luna pudiera elegir\na quien alumbrar primero,\nte elegiria a ti.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF38',
    text: 'Hay flores que florecen\nsin que nadie las vea.\nPero tu brillas\ny todo el mundo lo nota.',
  },
  {
    type: 'phrase',
    icon: '\uD83D\uDCAB',
    text: 'El universo no comete errores.\nY ponerte en este mundo\nfue de sus mejores ideas.',
  },
  {
    type: 'phrase',
    icon: '\u2600\ufe0f',
    text: 'Hay dias que necesitan\nun poquito de luz extra.\nPara eso estas tu.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF1F',
    text: 'No tienes que ser perfecta.\nSolo tienes que ser tu.\nY eso ya es mas que suficiente.',
  },
  {
    type: 'phrase',
    icon: '\uD83E\uDE77',
    text: 'Si yo pudiera regalarte algo,\nte regalaria verte\ncomo te veo yo.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF3C',
    text: 'Ojala pudieras sentir\nlo bonito que es\ncuando apareces.',
  },
  {
    type: 'phrase',
    icon: '\uD83D\uDC9C',
    text: 'Hablar contigo\nes como encontrar\ntu cancion favorita\nen la radio por sorpresa.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF0C',
    text: 'Si las estrellas se ordenaran\npor lo bonitas que son,\ntu serias la primera.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF3A',
    text: 'El mundo puede ser ruidoso.\nPero tu presencia\nse siente como calma.',
  },
  {
    type: 'phrase',
    icon: '\uD83E\uDDE1',
    text: 'Mereces que alguien\nte recuerde lo especial que eres.\nHoy ese alguien soy yo.',
  },
  {
    type: 'phrase',
    icon: '\u2604\ufe0f',
    text: 'Hay personas que hacen\nque todo valga la pena.\nTu eres una de esas.',
  },
  {
    type: 'phrase',
    icon: '\uD83C\uDF08',
    text: 'No necesitas hacer nada especial\npara ser importante.\nYa lo eres solo existiendo.',
  },

  // --- CUMPLIDOS TIERNOS CON BOTON ---
  {
    type: 'compliment',
    icon: '\uD83D\uDE0A',
    text: 'Dato importante del dia:\nTu sonrisa tiene el poder\nde mejorar cualquier momento.',
    buttonText: '\uD83D\uDC96 Eso es muy lindo',
    response: 'Es la verdad. Y alguien tenia que decirtelo hoy.',
  },
  {
    type: 'compliment',
    icon: '\uD83C\uDF1E',
    text: 'Recordatorio oficial:\nEres mas fuerte de lo que crees,\nmas bonita de lo que imaginas,\ny mas querida de lo que sabes.',
    buttonText: '\u2728 Gracias',
    response: 'No me lo agradezcas a mi. Agradecele a quien te hizo tan increible.',
  },
  {
    type: 'compliment',
    icon: '\uD83D\uDE0C',
    text: 'Si pudiera elegir\ncon quien compartir un silencio comodo,\nte elegiria a ti sin pensarlo.',
    buttonText: '\uD83E\uDE77 Que tierno',
    response: 'Es que hay personas con las que hasta el silencio es bonito.',
  },
  {
    type: 'compliment',
    icon: '\uD83D\uDCAB',
    text: 'Noticia de ultima hora:\nAlguien esta pensando en ti\nen este momento\ny le sacas una sonrisa.',
    buttonText: '\uD83D\uDE0A De verdad?',
    response: 'De verdad. Y probablemente no es la primera vez hoy.',
  },
  {
    type: 'compliment',
    icon: '\uD83C\uDF3B',
    text: 'Las cosas mas bonitas de la vida\nno se buscan.\nAparecen.\nComo apareciste tu.',
    buttonText: '\uD83D\uDC9C Aww',
    response: 'Y desde que apareciste, todo se ve un poquito mejor.',
  },

  // --- QUE PREFIERES (TIERNO/ABSURDO) ---
  {
    type: 'wyr',
    icon: '\uD83E\uDD14',
    text: 'Que prefieres:',
    options: ['Que tu risa curara todo', 'Que tus abrazos dieran calor eterno'],
    response: 'Honestamente, creo que ya haces las dos.',
  },
  {
    type: 'wyr',
    icon: '\uD83D\uDC31',
    text: 'Que prefieres:',
    options: ['Poder hablar con los gatos', 'Que los gatos te manden mensajes tiernos'],
    response: 'Los gatos aprobarian cualquiera. Tienes energia felina.',
  },
  {
    type: 'wyr',
    icon: '\uD83C\uDF19',
    text: 'Que prefieres:',
    options: ['Que las estrellas escribieran tu nombre', 'Que la luna brillara solo para ti'],
    response: 'Sea cual sea, el cielo ya sabe que existes.',
  },
  {
    type: 'wyr',
    icon: '\uD83C\uDF69',
    text: 'Que prefieres:',
    options: ['Playlist infinita de tus canciones', 'Snack infinito de tu comida favorita'],
    response: 'Excelente gusto. Como siempre, Paulina.',
  },
  {
    type: 'wyr',
    icon: '\u2601\ufe0f',
    text: 'Que prefieres:',
    options: ['Que lloviera confeti en tus dias tristes', 'Que tu almohada siempre estuviera fria'],
    response: 'Ambas opciones son para personas que merecen cosas bonitas. O sea, tu.',
  },
  {
    type: 'wyr',
    icon: '\uD83C\uDF08',
    text: 'Que prefieres:',
    options: ['Revivir tu recuerdo mas feliz', 'Saber que el mejor aun no llega'],
    response: 'La buena noticia es que ambas son ciertas.',
  },

  // --- MINI JUEGOS (ATRAPAR CORAZONES) ---
  {
    type: 'catch',
    icon: '\uD83C\uDFAE',
    text: 'Atrapa todos los corazones que puedas\nen 15 segundos!',
    items: ['\u2764\ufe0f', '\uD83D\uDC9C', '\uD83E\uDE77', '\uD83D\uDC97', '\uD83D\uDC96'],
    results: [
      { min: 0, msg: 'Lo importante es que lo intentaste. Como en la vida.' },
      { min: 3, msg: 'Nada mal! Tienes manos rapidas.' },
      { min: 6, msg: 'Increible! Atrapas corazones en la vida real tambien.' },
      { min: 10, msg: 'Eres imparable, Paulina. Atrapar corazones es tu talento natural.' },
    ],
  },
  {
    type: 'catch',
    icon: '\u2B50',
    text: 'Atrapa todas las estrellas que puedas!\nCada una es un deseo para ti.',
    items: ['\u2B50', '\uD83C\uDF1F', '\u2728', '\uD83D\uDCAB', '\u26A1'],
    results: [
      { min: 0, msg: 'Pocas estrellas, pero cada una cuenta.' },
      { min: 3, msg: 'Bien! Esos deseos van directo a ti.' },
      { min: 6, msg: 'Wow! El universo te tiene en su lista VIP.' },
      { min: 10, msg: 'El cielo entero es tuyo, Paulina.' },
    ],
  },
];

// Get today's content deterministically
function getDailyContent() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  const idx = dayOfYear % dailyContent.length;
  return dailyContent[idx];
}

// ===== SHOW SURPRISE =====
function showSurprise() {
  showScreen('surprise');

  const content = getDailyContent();
  document.getElementById('surprise-icon').textContent = content.icon;
  document.getElementById('surprise-text').textContent = content.text;

  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '';

  if (content.type === 'compliment') {
    renderCompliment(gameArea, content);
  } else if (content.type === 'wyr') {
    renderWYR(gameArea, content);
  } else if (content.type === 'catch') {
    renderCatchGame(gameArea, content);
  }

  confetti({
    particleCount: 60,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#e0aaff', '#c77dff', '#ffd6ff', '#ff9a9e', '#9d4edd'],
  });
}

// ===== RENDER COMPLIMENT =====
function renderCompliment(container, content) {
  const btn = document.createElement('button');
  btn.className = 'btn-game';
  btn.textContent = content.buttonText;
  btn.addEventListener('click', function () {
    btn.style.display = 'none';
    const resp = document.createElement('p');
    resp.className = 'game-response';
    resp.textContent = content.response;
    container.appendChild(resp);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e0aaff', '#ff9a9e', '#ffd6ff'],
    });
  });
  container.appendChild(btn);
}

// ===== RENDER WOULD YOU RATHER =====
function renderWYR(container, content) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;';

  content.options.forEach(function (optText) {
    const btn = document.createElement('button');
    btn.className = 'btn-game';
    btn.textContent = optText;
    btn.addEventListener('click', function () {
      wrapper.querySelectorAll('.btn-game').forEach(function (b) {
        b.style.pointerEvents = 'none';
        b.style.opacity = '0.5';
      });
      btn.classList.add('selected');
      btn.style.opacity = '1';

      const resp = document.createElement('p');
      resp.className = 'game-response';
      resp.textContent = content.response;
      container.appendChild(resp);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fcd34d', '#fbbf24', '#e0aaff'],
      });
    });
    wrapper.appendChild(btn);
  });

  container.appendChild(wrapper);
}

// ===== RENDER CATCH GAME =====
function renderCatchGame(container, content) {
  const gameDiv = document.createElement('div');
  gameDiv.className = 'catch-game';

  const scoreP = document.createElement('p');
  scoreP.className = 'catch-score';
  scoreP.textContent = 'Corazones: 0';

  container.appendChild(gameDiv);
  container.appendChild(scoreP);

  let score = 0;
  let gameActive = true;
  let spawnInterval;

  function spawnItem() {
    if (!gameActive) return;
    const item = document.createElement('span');
    item.className = 'catch-item';
    item.textContent = content.items[Math.floor(Math.random() * content.items.length)];
    item.style.left = (5 + Math.random() * 80) + '%';
    item.style.top = (5 + Math.random() * 75) + '%';

    item.addEventListener('click', function () {
      if (!gameActive) return;
      score++;
      scoreP.textContent = 'Corazones: ' + score;
      item.remove();
    });

    // Touch support
    item.addEventListener('touchstart', function (e) {
      e.preventDefault();
      if (!gameActive) return;
      score++;
      scoreP.textContent = 'Corazones: ' + score;
      item.remove();
    });

    gameDiv.appendChild(item);

    // Remove after 2 seconds if not caught
    setTimeout(function () {
      if (item.parentNode) item.remove();
    }, 2000);
  }

  // Start spawning
  spawnInterval = setInterval(spawnItem, 700);
  spawnItem();

  // End after 15 seconds
  setTimeout(function () {
    gameActive = false;
    clearInterval(spawnInterval);
    gameDiv.innerHTML = '';
    gameDiv.style.display = 'flex';
    gameDiv.style.alignItems = 'center';
    gameDiv.style.justifyContent = 'center';
    gameDiv.style.fontSize = '1.2rem';
    gameDiv.style.color = '#e0aaff';

    // Find result message
    let resultMsg = content.results[0].msg;
    for (let i = content.results.length - 1; i >= 0; i--) {
      if (score >= content.results[i].min) {
        resultMsg = content.results[i].msg;
        break;
      }
    }

    gameDiv.textContent = score + ' atrapados!';
    scoreP.textContent = '';

    const resultP = document.createElement('p');
    resultP.className = 'catch-result';
    resultP.textContent = resultMsg;
    container.appendChild(resultP);

    confetti({
      particleCount: 60 + score * 5,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e0aaff', '#c77dff', '#ff9a9e', '#ffd6ff'],
    });
  }, 15000);
}

// ===== SHOW GREETING (BACK BUTTON) =====
function showGreeting() {
  showScreen('greeting');
  initGreeting();
}

// ===== INIT =====
function initGreeting() {
  const greeting = getGreeting();
  typeWriter(
    greeting + '...\nPara ti tengo hoy esto \uD83D\uDE0A',
    'typewriter',
    55,
    () => {
      const btn = document.getElementById('btn-ver');
      btn.classList.remove('hidden');
      btn.style.transition = 'opacity 0.6s ease';
      btn.style.opacity = '1';
    }
  );
}

// Boot
createStars('stars-container', 120);
initGreeting();
