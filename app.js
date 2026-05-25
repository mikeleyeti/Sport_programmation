/* =============================================
   PROGRAMME SPORTIF — APP.JS
   ============================================= */

// ---- PLANNING DATA ----
const PLANNING = [
  { day: 0, label: "Lundi",    type: "rest",   emoji: "💤", title: "Repos",                    detail: "Récupération" },
  { day: 1, label: "Mardi",    type: "cardio", emoji: "🚣", title: "Salle 1 — Cardio doux",    detail: "Rameur, vélo ou elliptique · 35-45 min · FC 140-155 bpm" },
  { day: 2, label: "Mercredi", type: "push",   emoji: "🏋️", title: "Salle 2 — Poussée",        detail: "Pectoraux · Épaules (incliné) · Triceps" },
  { day: 3, label: "Jeudi",    type: "run",    emoji: "🏃", title: "Footing 1 — Endurance",     detail: "40-45 min · Allure 5:50-6:30 /km · FC 140-160 bpm" },
  { day: 4, label: "Vendredi", type: "rest",   emoji: "💤", title: "Repos",                    detail: "Récupération" },
  { day: 5, label: "Samedi",   type: "pull",   emoji: "🏋️", title: "Salle 3 — Tirage",         detail: "Dos · Biceps · Gainage" },
  { day: 6, label: "Dimanche", type: "run",    emoji: "🏃", title: "Footing 2 — Sortie longue", detail: "50-60 min · Allure 6:00-6:45 /km · FC 135-155 bpm" },
];

// ---- EXERCISES DATA ----
const EXERCISES = {
  poussee: [
    {
      num: 1,
      name: "Développé couché machine",
      machine: "Technogym Selection Chest Press",
      muscle: "Pectoraux",
      sets: 3, reps: "12",
      charge_s12: "35 kg", charge_s34: "45 kg",
      repos: "1'30",
      tips: "Descente contrôlée (2s) · Omoplates serrées"
    },
    {
      num: 2,
      name: "Développé couché incliné machine",
      machine: "Technogym Selection Incline Chest Press",
      muscle: "Pectoraux supérieurs · Deltoïdes antérieurs",
      sets: 3, reps: "12",
      charge_s12: "25 kg", charge_s34: "35 kg",
      repos: "1'30",
      tips: "Dos plaqué · Mouvement sous la ligne des épaules"
    },
    {
      num: 3,
      name: "Pec-fly machine (Butterfly)",
      machine: "Technogym Selection Pectoral Machine",
      muscle: "Pectoraux (isolation)",
      sets: 3, reps: "12",
      charge_s12: "25 kg", charge_s34: "30 kg",
      repos: "1'15",
      tips: "Mouvement lent · Ne pas claquer les poignées"
    },
    {
      num: 4,
      name: "Élévations latérales haltères",
      machine: "Haltères Technogym (rack libre)",
      muscle: "Deltoïdes moyens",
      sets: 3, reps: "15",
      charge_s12: "6 kg", charge_s34: "8 kg",
      repos: "1'00",
      tips: "Monter jusqu'à l'horizontale max · Pas d'élan"
    },
    {
      num: 5,
      name: "Triceps poulie haute (corde)",
      machine: "Technogym Selection Poulie",
      muscle: "Triceps",
      sets: 3, reps: "12",
      charge_s12: "20 kg", charge_s34: "25 kg",
      repos: "1'00",
      tips: "Coudes collés au corps · Écarter la corde en bas"
    },
    {
      num: 6,
      name: "Gainage (planche)",
      machine: "Au sol (tapis)",
      muscle: "Sangle abdominale",
      sets: 3, reps: "30-40s",
      charge_s12: "PDC", charge_s34: "PDC",
      repos: "0'45",
      tips: "Face + côté D + côté G · Bassin neutre"
    }
  ],
  tirage: [
    {
      num: 1,
      name: "Tirage vertical (Lat Pulldown)",
      machine: "Technogym Selection Lat Machine",
      muscle: "Grand dorsal · Biceps",
      sets: 3, reps: "12",
      charge_s12: "40 kg", charge_s34: "50 kg",
      repos: "1'30",
      tips: "Tirer vers la poitrine · PAS derrière la nuque"
    },
    {
      num: 2,
      name: "Rowing machine assis",
      machine: "Technogym Selection Seated Row",
      muscle: "Dos (épaisseur)",
      sets: 3, reps: "12",
      charge_s12: "35 kg", charge_s34: "45 kg",
      repos: "1'30",
      tips: "Poitrine contre le support · Contrôler le retour"
    },
    {
      num: 3,
      name: "Tirage horizontal poulie basse",
      machine: "Technogym Selection Low Row",
      muscle: "Rhomboïdes · Trapèzes",
      sets: 3, reps: "12",
      charge_s12: "30 kg", charge_s34: "35 kg",
      repos: "1'15",
      tips: "Buste fixe · Tirer vers le nombril · Serrer 1s en fin"
    },
    {
      num: 4,
      name: "Oiseau machine (Reverse Fly)",
      machine: "Technogym Selection Rear Delt",
      muscle: "Deltoïdes postérieurs · Rhomboïdes",
      sets: 3, reps: "15",
      charge_s12: "15 kg", charge_s34: "20 kg",
      repos: "1'00",
      tips: "Bras à hauteur des épaules max · Serrer les omoplates"
    },
    {
      num: 5,
      name: "Curl biceps haltères (alternés)",
      machine: "Haltères Technogym (rack libre)",
      muscle: "Biceps",
      sets: 3, reps: "12/bras",
      charge_s12: "8 kg", charge_s34: "10 kg",
      repos: "1'00",
      tips: "Debout, pas d'élan · Descente lente (2s)"
    },
    {
      num: 6,
      name: "Gainage (planche)",
      machine: "Au sol (tapis)",
      muscle: "Sangle abdominale",
      sets: 3, reps: "30-40s",
      charge_s12: "PDC", charge_s34: "PDC",
      repos: "0'45",
      tips: "Face + côté D + côté G · Bassin neutre"
    }
  ]
};

// ---- STATE ----
let currentWeekOffset = 0;
let currentSession = "poussee";

// ---- UTILS ----
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

// ---- AGENDA VIEW ----
function renderWeek() {
  const today = new Date();
  const monday = getMonday(today);
  monday.setDate(monday.getDate() + currentWeekOffset * 7);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const weekLabel = document.getElementById('week-label');
  weekLabel.textContent = `Semaine du ${formatDate(monday)} au ${formatDate(sunday)}`;

  const grid = document.getElementById('week-grid');
  grid.innerHTML = '';

  PLANNING.forEach(item => {
    const date = new Date(monday);
    date.setDate(date.getDate() + item.day);

    const card = document.createElement('div');
    card.className = `day-card type-${item.type}${isToday(date) ? ' today' : ''}`;

    const typeLabels = {
      rest: "REPOS",
      push: "MUSCU",
      pull: "MUSCU",
      cardio: "CARDIO",
      run: "COURSE"
    };

    card.innerHTML = `
      <div>
        <div class="day-name">${item.label}</div>
        <div class="day-date">${formatDate(date)}</div>
      </div>
      <div class="day-content">
        <div class="day-emoji">${item.emoji}</div>
        <div class="day-info">
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
        </div>
      </div>
      <div class="day-badge">${typeLabels[item.type]}</div>
    `;

    grid.appendChild(card);
  });
}

function changeWeek(offset) {
  currentWeekOffset += offset;
  renderWeek();
}

// ---- CARNET VIEW ----
function renderExercises(sessionKey) {
  const exercises = EXERCISES[sessionKey];
  const container = document.getElementById(`exercises-${sessionKey}`);
  container.innerHTML = '';

  exercises.forEach((ex, idx) => {
    const item = document.createElement('div');
    item.className = 'exercise-item';
    item.dataset.session = sessionKey;
    item.dataset.index = idx;

    let setsHTML = '';
    for (let s = 1; s <= ex.sets; s++) {
      setsHTML += `
        <div class="set-box" id="set-${sessionKey}-${idx}-${s}">
          <span class="set-label">Série ${s}</span>
          <input type="checkbox" class="set-check" 
                 id="check-${sessionKey}-${idx}-${s}"
                 onchange="onSetCheck('${sessionKey}', ${idx}, ${s})">
          <input type="text" class="set-input" 
                 id="weight-${sessionKey}-${idx}-${s}"
                 placeholder="${ex.charge_s12}"
                 title="Charge utilisée">
        </div>
      `;
    }

    item.innerHTML = `
      <div class="exercise-top">
        <input type="checkbox" class="exercise-check" 
               id="excheck-${sessionKey}-${idx}"
               onchange="onExerciseCheck('${sessionKey}', ${idx})">
        <span class="exercise-num">${ex.num}</span>
        <div class="exercise-info">
          <div class="exercise-name">${ex.name}</div>
          <div class="exercise-machine">${ex.machine}</div>
          <div class="exercise-muscle">${ex.muscle} · ${ex.tips}</div>
        </div>
      </div>
      <div class="sets-grid">
        ${setsHTML}
      </div>
      <div class="exercise-meta">
        <span class="meta-badge charge">📊 ${ex.reps} reps</span>
        <span class="meta-badge charge">🏋️ ${ex.charge_s12} → ${ex.charge_s34}</span>
        <span class="meta-badge repos">⏱ repos ${ex.repos}</span>
      </div>
    `;

    container.appendChild(item);
  });
}

function onSetCheck(session, exIdx, setNum) {
  const checkbox = document.getElementById(`check-${session}-${exIdx}-${setNum}`);
  const box = document.getElementById(`set-${session}-${exIdx}-${setNum}`);
  
  if (checkbox.checked) {
    box.classList.add('checked');
  } else {
    box.classList.remove('checked');
  }

  // Check if all sets done → auto-check exercise
  const ex = EXERCISES[session][exIdx];
  let allDone = true;
  for (let s = 1; s <= ex.sets; s++) {
    if (!document.getElementById(`check-${session}-${exIdx}-${s}`).checked) {
      allDone = false;
      break;
    }
  }
  
  const exCheck = document.getElementById(`excheck-${session}-${exIdx}`);
  exCheck.checked = allDone;
  
  const exItem = exCheck.closest('.exercise-item');
  if (allDone) {
    exItem.classList.add('completed');
  } else {
    exItem.classList.remove('completed');
  }
}

function onExerciseCheck(session, exIdx) {
  const exCheck = document.getElementById(`excheck-${session}-${exIdx}`);
  const ex = EXERCISES[session][exIdx];
  const exItem = exCheck.closest('.exercise-item');

  // Toggle all sets
  for (let s = 1; s <= ex.sets; s++) {
    const setCheck = document.getElementById(`check-${session}-${exIdx}-${s}`);
    const box = document.getElementById(`set-${session}-${exIdx}-${s}`);
    setCheck.checked = exCheck.checked;
    if (exCheck.checked) {
      box.classList.add('checked');
    } else {
      box.classList.remove('checked');
    }
  }

  if (exCheck.checked) {
    exItem.classList.add('completed');
  } else {
    exItem.classList.remove('completed');
  }
}

// ---- SAVE / LOAD ----
function getSessionKey() {
  const date = document.getElementById('session-date').value;
  return `session-${currentSession}-${date}`;
}

function saveSession() {
  const date = document.getElementById('session-date').value;
  if (!date) {
    alert("Choisis une date pour la séance !");
    return;
  }

  const data = {};
  const exercises = EXERCISES[currentSession];

  exercises.forEach((ex, idx) => {
    const exData = {
      checked: document.getElementById(`excheck-${currentSession}-${idx}`).checked,
      sets: []
    };

    for (let s = 1; s <= ex.sets; s++) {
      exData.sets.push({
        checked: document.getElementById(`check-${currentSession}-${idx}-${s}`).checked,
        weight: document.getElementById(`weight-${currentSession}-${idx}-${s}`).value
      });
    }

    data[idx] = exData;
  });

  localStorage.setItem(getSessionKey(), JSON.stringify(data));

  // Show toast
  const toast = document.getElementById('save-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function loadSessionData() {
  const key = getSessionKey();
  const raw = localStorage.getItem(key);

  if (!raw) {
    // Reset UI
    resetSessionUI();
    return;
  }

  const data = JSON.parse(raw);
  const exercises = EXERCISES[currentSession];

  exercises.forEach((ex, idx) => {
    const exData = data[idx];
    if (!exData) return;

    const exCheck = document.getElementById(`excheck-${currentSession}-${idx}`);
    exCheck.checked = exData.checked;
    
    const exItem = exCheck.closest('.exercise-item');
    if (exData.checked) {
      exItem.classList.add('completed');
    } else {
      exItem.classList.remove('completed');
    }

    exData.sets.forEach((setData, sIdx) => {
      const s = sIdx + 1;
      const setCheck = document.getElementById(`check-${currentSession}-${idx}-${s}`);
      const setBox = document.getElementById(`set-${currentSession}-${idx}-${s}`);
      const weightInput = document.getElementById(`weight-${currentSession}-${idx}-${s}`);

      if (setCheck) {
        setCheck.checked = setData.checked;
        if (setData.checked) {
          setBox.classList.add('checked');
        }
      }
      if (weightInput && setData.weight) {
        weightInput.value = setData.weight;
      }
    });
  });
}

function resetSessionUI() {
  const exercises = EXERCISES[currentSession];
  exercises.forEach((ex, idx) => {
    const exCheck = document.getElementById(`excheck-${currentSession}-${idx}`);
    if (exCheck) {
      exCheck.checked = false;
      exCheck.closest('.exercise-item').classList.remove('completed');
    }

    for (let s = 1; s <= ex.sets; s++) {
      const setCheck = document.getElementById(`check-${currentSession}-${idx}-${s}`);
      const setBox = document.getElementById(`set-${currentSession}-${idx}-${s}`);
      const weightInput = document.getElementById(`weight-${currentSession}-${idx}-${s}`);

      if (setCheck) {
        setCheck.checked = false;
        setBox.classList.remove('checked');
      }
      if (weightInput) {
        weightInput.value = '';
      }
    }
  });
}

function resetSession() {
  if (confirm("Réinitialiser cette séance ?")) {
    resetSessionUI();
    const date = document.getElementById('session-date').value;
    if (date) {
      localStorage.removeItem(getSessionKey());
    }
  }
}

// ---- VIEW SWITCHING ----
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.nav-btn[data-view="${viewName}"]`).classList.add('active');
}

function showSession(sessionKey) {
  currentSession = sessionKey;

  document.querySelectorAll('.session-card').forEach(s => s.classList.remove('active'));
  document.getElementById(`session-${sessionKey}`).classList.add('active');

  document.querySelectorAll('.carnet-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.carnet-tab[data-session="${sessionKey}"]`).classList.add('active');

  // Reload data for this session
  loadSessionData();
}

// ---- INIT ----
function init() {
  // Set today's date as default
  const today = new Date();
  document.getElementById('session-date').value = formatDateISO(today);

  // Render
  renderWeek();
  renderExercises('poussee');
  renderExercises('tirage');
  loadSessionData();
}

document.addEventListener('DOMContentLoaded', init);

// ---- PWA INSTALL PROMPT ----
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install banner
  const banner = document.getElementById('install-banner');
  if (banner) banner.classList.remove('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install outcome:', outcome);
      deferredPrompt = null;
      document.getElementById('install-banner').classList.add('hidden');
    });
  }
});

function dismissInstall() {
  document.getElementById('install-banner').classList.add('hidden');
}

// Hide banner if already installed
window.addEventListener('appinstalled', () => {
  document.getElementById('install-banner').classList.add('hidden');
  deferredPrompt = null;
});
