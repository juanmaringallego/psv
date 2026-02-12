// ===== TERMINAL BOOT SEQUENCE =====

const output = document.getElementById('output');

// Lines to display with delays
const bootSequence = [
  { delay: 300, html: '<span class="cmd-text">$ whoami</span>' },
  { delay: 600, html: '<span class="ascii">    _                      </span>' },
  { delay: 80,  html: '<span class="ascii">   (_) ___ _ __ ___   __ _ </span>' },
  { delay: 80,  html: '<span class="ascii">   | |/ _ \\ \'_ ` _ \\ / _` |</span>' },
  { delay: 80,  html: '<span class="ascii">   | |  __/ | | | | | (_| |</span>' },
  { delay: 80,  html: '<span class="ascii">  _/ |\\___|_| |_| |_|\\__, |</span>' },
  { delay: 80,  html: '<span class="ascii"> |__/                |___/ </span>' },
  { delay: 500, html: '' },
  { delay: 100, html: '<span class="comment">// Servidor personal de desarrollo</span>' },
  { delay: 400, html: '' },
  { delay: 100, html: '<span class="cmd-text">$ cat about.json</span>' },
  { delay: 300, html: '{' },
  { delay: 80,  html: '  <span class="keyword">"nombre"</span>: <span class="string">"Juan Esteban Marin Gallego"</span>,' },
  { delay: 80,  html: '  <span class="keyword">"rol"</span>: <span class="string">"Desarrollador"</span>,' },
  { delay: 80,  html: '  <span class="keyword">"server"</span>: <span class="string">"jemg.tech"</span>,' },
  { delay: 80,  html: '  <span class="keyword">"status"</span>: <span class="success">"online"</span>,' },
  { delay: 80,  html: '  <span class="keyword">"cafe_hoy"</span>: <span class="value">' + getCoffeeCount() + '</span>' },
  { delay: 80,  html: '}' },
  { delay: 400, html: '' },
  { delay: 100, html: '<span class="cmd-text">$ ls ./proyectos/</span>' },
  { delay: 300, type: 'projects' },
  { delay: 400, html: '' },
  { delay: 100, html: '<span class="cmd-text">$ uptime</span>' },
  { delay: 200, type: 'status' },
  { delay: 400, html: '' },
  { delay: 100, html: '<span class="cmd-text">$ fortune</span>' },
  { delay: 300, type: 'fortune' },
  { delay: 500, html: '' },
  { delay: 100, html: '<span class="success">Sistema listo.</span> <span class="comment">Bienvenido a jemg.tech</span>' },
];

// Projects list
const projects = [
  { icon: '\uD83D\uDEE0\uFE0F', name: '/proyectos', desc: 'Proximamente', url: '#' },
];

// Fortune messages (random dev humor)
const fortunes = [
  '"El codigo funciona en mi maquina." - Todos, siempre.',
  '"No es un bug, es una feature no documentada."',
  '"git commit -m \\"arreglo final final v2 ahora si\\""',
  '"Funciona. No lo toques."',
  '"99 bugs en el codigo, arreglas uno... 127 bugs en el codigo."',
  '"La documentacion es como el gimnasio: todos saben que deberian ir."',
  '"Hoy no hay frase. Solo cafe y codigo."',
  '"ctrl+z es mi segundo mejor amigo. El primero es stackoverflow."',
  '"Deberia estar durmiendo, pero aqui estoy."',
  '"Todo empezo con un Hello World."',
];

// Helpers
function getCoffeeCount() {
  var hour = new Date().getHours();
  if (hour < 8) return 0;
  if (hour < 12) return Math.floor((hour - 7) / 1.5) + 1;
  if (hour < 18) return Math.floor((hour - 7) / 2) + 1;
  return Math.floor(Math.random() * 3) + 4;
}

function getUptime() {
  // Random uptime for fun
  var days = Math.floor(Math.random() * 90) + 30;
  var hours = Math.floor(Math.random() * 24);
  return days + 'd ' + hours + 'h';
}

function addLine(html) {
  var line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = html;
  output.appendChild(line);
  // Auto scroll
  line.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function addProjects() {
  var grid = document.createElement('div');
  grid.className = 'projects-grid';

  projects.forEach(function (p) {
    var row = document.createElement('div');
    row.className = 'project-row line';
    row.innerHTML =
      '<span class="proj-icon">' + p.icon + '</span>' +
      '<a href="' + p.url + '" class="proj-name">' + p.name + '</a>' +
      '<span class="proj-sep">-</span>' +
      '<span class="proj-desc">' + p.desc + '</span>';
    grid.appendChild(row);
  });

  output.appendChild(grid);
}

function addStatus() {
  var container = document.createElement('div');
  container.className = 'status-items line';
  container.innerHTML =
    '<span class="status-item"><span class="label">uptime: </span><span class="val">' + getUptime() + '</span></span>' +
    '<span class="status-item"><span class="label">status: </span><span class="val up">running</span></span>' +
    '<span class="status-item"><span class="label">load: </span><span class="val">chill</span></span>';
  output.appendChild(container);
}

function addFortune() {
  var msg = fortunes[Math.floor(Math.random() * fortunes.length)];
  addLine('<span class="string">' + msg + '</span>');
}

// ===== RUN BOOT SEQUENCE =====
function runBoot() {
  var totalDelay = 0;

  bootSequence.forEach(function (step) {
    totalDelay += step.delay;
    setTimeout(function () {
      if (step.type === 'projects') {
        addProjects();
      } else if (step.type === 'status') {
        addStatus();
      } else if (step.type === 'fortune') {
        addFortune();
      } else {
        addLine(step.html);
      }
    }, totalDelay);
  });
}

// Boot!
runBoot();
