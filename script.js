// ===== STATE =====
const visited = { garden: false, memories: false, surprise: false, daily: false };
const stopOrder = ['garden', 'memories', 'surprise', 'daily'];

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

  if (stopId === 'daily') {
    renderDaily();
  }
}

function goBack() {
  if (visited.garden && visited.memories && visited.surprise && visited.daily) {
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
  let idx;
  do {
    idx = Math.floor(Math.random() * surpriseMessages.length);
  } while (idx === lastSurpriseIdx && surpriseMessages.length > 1);
  lastSurpriseIdx = idx;

  const msgEl = document.getElementById('surprise-message');
  msgEl.classList.remove('show');
  msgEl.classList.add('hidden');

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
  visited.daily = false;

  document.querySelectorAll('.tracker-dot').forEach(d => d.classList.remove('visited'));

  showScreen('intro');
  initIntro();
}

// =============================================
// ===== DAILY SURPRISE ENGINE =====
// =============================================

// 7 categories, one per day of the week
// Each category has 8 items = 8 weeks without repeats per category = 56 unique days
const dailyCategories = [
  // SUNDAY (day 0) — Mensaje especial del domingo
  {
    name: 'Mensaje del domingo',
    badge: 'Domingo especial',
    badgeColor: '#f9a8d4',
    badgeBg: 'rgba(249, 168, 212, 0.15)',
    icon: '\u2728',
    items: [
      'Los domingos fueron inventados\npara que personas como tu\ndescansen de ser tan geniales.',
      'Hoy el universo dijo:\n"Paulina merece un dia tranquilo."\nY aqui estas.',
      'Recordatorio dominical:\nNo tienes que hacer nada hoy\npara ser increible. Ya lo eres.',
      'Los domingos huelen a paz.\nY la paz huele a Paulina.\n(No, no tiene sentido, pero es bonito.)',
      'Si los domingos tuvieran soundtrack,\nel tuyo seria algo suave\ncon piano y lluvia de fondo.',
      'Feliz domingo, Paulina.\nHoy tu unica tarea es existir.\nY ya la estas cumpliendo de sobra.',
      'El domingo es el abrazo\nde la semana.\nConsideralo un abrazo oficial.',
      'Dato dominical:\nLas personas bonitas\ndescansan los domingos.\nCoincidencia? No lo creo.',
    ],
  },
  // MONDAY (day 1) — Dato inutil pero genial
  {
    name: 'Dato inutil pero genial',
    badge: 'Lunes curioso',
    badgeColor: '#93c5fd',
    badgeBg: 'rgba(147, 197, 253, 0.15)',
    icon: '\uD83E\uDDE0',
    items: [
      'Las nutrias se toman de las manos\nal dormir para no separarse.\nTu con tus amigos, basicamente.',
      'Las vacas tienen mejores amigas\ny se estresan cuando las separan.\nHasta las vacas valoran\na la gente bonita.',
      'El cerebro humano genera\nsuficiente electricidad\npara encender una bombilla.\nEl tuyo probablemente dos.',
      'Los pulpos tienen tres corazones.\nTu solo tienes uno\npero vale por diez.',
      'La miel nunca caduca.\nIgual que las buenas vibras\nque transmites.',
      'Los delfines se ponen nombres\nentre ellos.\nSeguro el tuyo seria\nalgo como "la chida".',
      'Un grupo de flamingos\nse llama "flamboyance".\nBasicamente, tu y tus amigas.',
      'Las estrellas que vemos de noche\npueden ya no existir.\nPero su luz sigue brillando.\nIgual que tu.',
    ],
  },
  // TUESDAY (day 2) — Mini reto del dia
  {
    name: 'Mini reto del dia',
    badge: 'Martes de retos',
    badgeColor: '#86efac',
    badgeBg: 'rgba(134, 239, 172, 0.15)',
    icon: '\uD83C\uDFAF',
    items: [
      'Reto: Mandale un mensaje bonito\na alguien que no espere nada hoy.\n(Incluirte a ti misma vale.)',
      'Reto: Escucha una cancion\nque no hayas escuchado nunca.\nSi te gusta, hoy fue un buen dia.',
      'Reto: Cierra los ojos 10 segundos\ny piensa en algo que te hizo reir\nesta semana.\n...Listo? Ya ganaste.',
      'Reto: Di en voz alta\nuna cosa que te guste de ti.\nSi te da pena, susurrala.\nCuenta igual.',
      'Reto: Tomate una foto hoy\nhaciendo algo random.\nEn un anio te va a dar risa.',
      'Reto: Haz algo que llevas\nposponiendo, pero que sea chiquito.\nComo tomar agua. O sonreir.\nYa cumpliste uno.',
      'Reto: Piensa en 3 cosas\nque salieron bien hoy.\nSi no se te ocurren...\nque encontraste esta pagina\ncuenta como una.',
      'Reto: Escribe una palabra\nque describa como te sientes ahora.\nSea cual sea, es valida.',
    ],
    hasButton: true,
    buttonText: '\u2705 Reto aceptado',
    buttonResponse: '\uD83C\uDF89 Esa es la actitud, Paulina!',
  },
  // WEDNESDAY (day 3) — Prediccion magica
  {
    name: 'Prediccion magica para Paulina',
    badge: 'Miercoles mistico',
    badgeColor: '#c4b5fd',
    badgeBg: 'rgba(196, 181, 253, 0.15)',
    icon: '\uD83D\uDD2E',
    items: [
      'La bola magica dice:\nAlgo inesperadamente bueno\nte va a pasar esta semana.\nNo se que es, pero confio.',
      'Prediccion: Hoy vas a hacer reir\na alguien sin proponertelo.\nTu poder natural en accion.',
      'Las estrellas dicen:\nUna buena noticia viene en camino.\n(Las estrellas a veces se tardan,\npero siempre cumplen.)',
      'Prediccion: Esta semana\nalguien va a pensar en ti\ny le vas a sacar una sonrisa\nsin enterarte.',
      'La bola magica dice:\nEl proximo fin de semana\nva a estar bueno.\nNo se por que, solo lo siento.',
      'Prediccion: Algo que te preocupa\nse va a resolver mas facil\nde lo que crees.',
      'Las estrellas dicen:\nMereces todo lo bonito\nque esta por venir.\nY viene bastante.',
      'Prediccion: Hoy es un buen dia\npara empezar algo nuevo.\nO para no hacer nada.\nAmbas son validas.',
    ],
  },
  // THURSDAY (day 4) — Que prefieres (absurdo)
  {
    name: 'Que prefieres?',
    badge: 'Jueves absurdo',
    badgeColor: '#fcd34d',
    badgeBg: 'rgba(252, 211, 77, 0.15)',
    icon: '\uD83E\uDD14',
    items: [
      'Que prefieres:\nQue tu risa curara enfermedades\no que tu pelo siempre se viera\nperfecto sin peinarte?',
      'Que prefieres:\nPoder hablar con los gatos\no que los gatos pudieran\nmandarte memes?',
      'Que prefieres:\nTener una playlist infinita\nde canciones que te gustan\no un snack infinito\nde tu comida favorita?',
      'Que prefieres:\nPoder teletransportarte\npero solo a lugares random\no volar pero solo\na 5 km/h?',
      'Que prefieres:\nQue cada semaforo\nte toque en verde\no nunca volver a tener\nun lunes feo?',
      'Que prefieres:\nVivir en un mundo\ndonde llueve confeti\no donde los arboles\ndan churros?',
      'Que prefieres:\nQue tu serie favorita\nnunca se acabe\no poder revivir\ntu recuerdo mas feliz\ncuando quieras?',
      'Que prefieres:\nQue tu almohada siempre este fria\no que tus audiculares\nnunca se enreden?',
    ],
    hasWYR: true,
    wyrOptions: [
      ['\uD83D\uDE02 La primera', '\uD83E\uDD29 La segunda'],
      ['\uD83D\uDC31 Hablar con gatos', '\uD83D\uDCF1 Memes gatunos'],
      ['\uD83C\uDFB5 Playlist infinita', '\uD83C\uDF69 Snack infinito'],
      ['\u26A1 Teletransporte random', '\uD83E\uDD85 Volar lento'],
      ['\uD83D\uDEA6 Siempre verde', '\uD83D\uDE0E Cero lunes feos'],
      ['\uD83C\uDF89 Lluvia de confeti', '\uD83C\uDF3F Arboles de churros'],
      ['\uD83D\uDCFA Serie infinita', '\uD83D\uDCAD Revivir recuerdos'],
      ['\u2744\ufe0f Almohada fria', '\uD83C\uDFA7 Sin nudos'],
    ],
    wyrResponses: [
      'Respuesta correcta! (Las dos lo eran.)',
      'Sabia decision. Los gatos aprueban.',
      'Excelente gusto, como siempre.',
      'Opcion valida! Igual las dos son geniales.',
      'La mejor eleccion. Confirmado.',
      'Tu mundo ideal suena increible.',
      'Buen gusto, Paulina. Siempre.',
      'La respuesta perfecta no exis... ah no, si. Esa.',
    ],
  },
  // FRIDAY (day 5) — Cumplido cientifico
  {
    name: 'Cumplido con base cientifica',
    badge: 'Viernes cientifico',
    badgeColor: '#f0abfc',
    badgeBg: 'rgba(240, 171, 252, 0.15)',
    icon: '\uD83E\uDDEA',
    items: [
      'Estudios confirman que\nlas personas con buen sentido\ndel humor son mas inteligentes.\nQueda claro por que\neres tan graciosa.',
      'La ciencia dice que sonreir\nlibera endorfinas, serotonina\ny dopamina.\nBasicamente, tu sonrisa\nes una farmacia ambulante.',
      'Dato cientifico:\nEl cerebro recuerda mejor\nlas experiencias positivas\nasociadas a personas especiales.\nPor eso tus amigos\nte recuerdan tanto.',
      'Investigaciones muestran que\nlas personas genuinas\ngeneran confianza instantanea\nen los demas.\nTu, basicamente, en cada sala.',
      'La neurociencia dice que\nescuchar la voz de alguien\nque te importa reduce\nel cortisol (estres).\nTu voz es literalmente medicina.',
      'Estudios demuestran que\nlas personas creativas\nven el mundo diferente.\nPor eso todo se ve\nmas bonito cuando tu llegas.',
      'Dato cientifico:\nEl contacto social positivo\nfortalece el sistema inmune.\nSer tu amigo es bueno\npara la salud. Literal.',
      'La ciencia confirma que\nlas personas bondadosas\nviven mas tiempo.\nPaulina, vas a ser\neterna.',
    ],
  },
  // SATURDAY (day 6) — Chiste suave
  {
    name: 'Chiste suave del sabado',
    badge: 'Sabado de risa',
    badgeColor: '#fdba74',
    badgeBg: 'rgba(253, 186, 116, 0.15)',
    icon: '\uD83D\uDE04',
    items: [
      'Por que el libro de matematicas\nestaba triste?\nPorque tenia muchos problemas.\n\n...Como tu lunes promedio.\nPero hoy es sabado, asi que relax.',
      'Que le dijo un semaforo a otro?\nNo me mires, me estoy cambiando.\n\n...Paulina, perdon por esto.\nPero si te reiste, funciono.',
      'Que hace una abeja en el gym?\n\nZzzzumba.\n\n(Si, merecia estar aqui.)',
      'Como se despiden los quimicos?\nAcido un placer.\n\n...El nivel de humor\nsolo puede mejorar desde aqui.',
      'Que le dijo la luna al sol?\nTan grande y no te dejan\nsalir de noche.\n\nIgual que tu cuando tienes suenio.',
      'Por que los pajaros\nno usan Facebook?\nPorque ya tienen Twitter.\n\n...Este chiste tiene copyright 2012\npero sigue funcionando.',
      'Que le dijo un techo a otro?\nTecho de menos.\n\n\uD83E\uDD7A\nPerdon. Pero sonreiste.',
      'Que hace un pez payaso?\nNada gracioso.\n\n(Literalmente. Nada. Get it?\nOk ya paro.)',
    ],
  },
];

// Get today's content based on date
function getDailyContent() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const category = dailyCategories[dayOfWeek];

  // Use week number of the year to cycle through items
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  const itemIdx = weekNum % category.items.length;

  return {
    category: category,
    text: category.items[itemIdx],
    itemIdx: itemIdx,
    dayOfWeek: dayOfWeek,
  };
}

// Render the daily section
function renderDaily() {
  const daily = getDailyContent();
  const cat = daily.category;

  // Badge
  const badge = document.getElementById('daily-category-badge');
  badge.textContent = cat.badge;
  badge.style.color = cat.badgeColor;
  badge.style.background = cat.badgeBg;
  badge.style.border = '1px solid ' + cat.badgeColor + '33';

  // Title
  document.getElementById('daily-title').textContent = cat.icon + ' ' + cat.name;

  // Icon
  document.getElementById('daily-icon').textContent = cat.icon;

  // Text
  document.getElementById('daily-text').textContent = daily.text;

  // Extra area (buttons, WYR, etc.)
  const extra = document.getElementById('daily-extra');
  extra.innerHTML = '';

  if (cat.hasButton) {
    const btn = document.createElement('button');
    btn.className = 'btn-daily-action';
    btn.textContent = cat.buttonText;
    btn.addEventListener('click', function () {
      btn.textContent = cat.buttonResponse;
      btn.style.pointerEvents = 'none';
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#86efac', '#4ade80', '#22c55e', '#e0aaff'],
      });
    });
    extra.appendChild(btn);
  }

  if (cat.hasWYR) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'wyr-options';
    const opts = cat.wyrOptions[daily.itemIdx];
    opts.forEach(function (optText, optIdx) {
      const btn = document.createElement('button');
      btn.className = 'btn-wyr';
      btn.textContent = optText;
      btn.addEventListener('click', function () {
        // Mark selected
        optionsDiv.querySelectorAll('.btn-wyr').forEach(function (b) {
          b.classList.remove('selected');
          b.style.pointerEvents = 'none';
        });
        btn.classList.add('selected');

        // Show response
        const resp = document.createElement('p');
        resp.style.cssText = 'color: #c4b5fd; margin-top: 1rem; font-size: 0.95rem; animation: popIn 0.5s ease;';
        resp.textContent = cat.wyrResponses[daily.itemIdx];
        extra.appendChild(resp);

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fcd34d', '#fbbf24', '#f59e0b', '#e0aaff'],
        });
      });
      optionsDiv.appendChild(btn);
    });
    extra.appendChild(optionsDiv);
  }

  // Streak
  updateStreak();
}

// ===== STREAK TRACKER =====
function updateStreak() {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('paulina_daily_last');
  let streak = parseInt(localStorage.getItem('paulina_daily_streak') || '0', 10);

  if (stored === today) {
    // Already visited today
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (stored === yesterday.toDateString()) {
      streak += 1;
    } else {
      streak = 1;
    }
    localStorage.setItem('paulina_daily_last', today);
    localStorage.setItem('paulina_daily_streak', String(streak));
  }

  const streakEl = document.getElementById('daily-streak-text');
  if (streak >= 2) {
    streakEl.textContent = '\uD83D\uDD25 ' + streak + ' dias seguidos visitando!';
  } else {
    streakEl.textContent = '\uD83C\uDF1F Primera visita de hoy. Vuelve manana!';
  }
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
