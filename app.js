/* =============================================
   PROGRAMME SPORTIF — APP.JS
   ============================================= */

// ---- PLANNING DATA ----
const PLANNING = [
  { day: 0, label: "Lundi", type: "rest", emoji: "🚶", title: "Marche + routine matinale", detail: "Routine matinale (10 min) · Marche 30 min dans la journée · Récup active" },
  { day: 1, label: "Mardi", type: "cardio", emoji: "🏊", title: "Natation — décharge complète", detail: "30-40 min · Dos crawlé en priorité, crawl si à l'aise · PAS de brasse (cambrure)" },
  { day: 2, label: "Mercredi", type: "push", emoji: "🏋️", title: "Salle 1 — Poussée (adaptée)", detail: "Pectoraux · Épaules · Triceps · ⚠️ Éviter développé debout et exos en charge axiale" },
  { day: 3, label: "Jeudi", type: "cardio", emoji: "🏊", title: "Natation ou vélo home-trainer", detail: "30-40 min · Position droite sur vélo · Sans à-coups · Zéro impact" },
  { day: 4, label: "Vendredi", type: "rest", emoji: "🚶", title: "Marche + routine matinale", detail: "Routine matinale (10 min) · Marche 30 min · Éviter position assise prolongée" },
  { day: 5, label: "Samedi", type: "pull", emoji: "🏋️", title: "Salle 2 — Tirage (adaptée)", detail: "Dos · Biceps · Gainage · ⚠️ Éviter rowing barre penché et soulevé de terre" },
  { day: 6, label: "Dimanche", type: "run", emoji: "🚶", title: "Marche longue en nature", detail: "45-60 min · Terrain souple (forêt, chemins) · Allure confortable · Chaussures qui amortissent" },
];

// ---- CATALOGUE D'EXERCICES (repli intégré) ----
// Chaque exercice appartient à une catégorie (poussee / tirage / both) et à un
// groupe musculaire. Le remplacement ne propose que des exercices du même groupe
// → la séance reste cohérente avec son objectif.
// Ce catalogue sert de valeur par défaut ; s'il existe un onglet "Catalogue" dans
// le Google Sheet, il est chargé et remplace celui-ci (voir loadCatalog).
const CATALOG_DEFAULT = [
  // ===== POUSSÉE =====
  // Pectoraux
  { id: "chest-press", categorie: "poussee", groupe: "Pectoraux", name: "Développé couché machine", machine: "Technogym Selection Chest Press", muscle: "Pectoraux", sets: 3, reps: "12", charge_s12: "35 kg", charge_s34: "45 kg", repos: "1'30", tips: "Descente contrôlée (2s) · Omoplates serrées" },
  { id: "chest-press-db", categorie: "poussee", groupe: "Pectoraux", name: "Développé couché haltères", machine: "Banc plat + haltères", muscle: "Pectoraux", sets: 3, reps: "12", charge_s12: "18 kg", charge_s34: "22 kg", repos: "1'30", tips: "Coudes ~45° · Descente 2s · Ne pas rebondir" },
  { id: "pushups", categorie: "poussee", groupe: "Pectoraux", name: "Pompes", machine: "Poids du corps (tapis)", muscle: "Pectoraux · Triceps", sets: 3, reps: "max", charge_s12: "PDC", charge_s34: "PDC", repos: "1'00", tips: "Gainage · Amplitude complète · Coudes près du corps" },

  // Pectoraux supérieurs
  { id: "incline-press", categorie: "poussee", groupe: "Pectoraux supérieurs", name: "Développé couché incliné machine", machine: "Technogym Selection Incline Chest Press", muscle: "Pectoraux supérieurs · Deltoïdes antérieurs", sets: 3, reps: "12", charge_s12: "25 kg", charge_s34: "35 kg", repos: "1'30", tips: "Dos plaqué · Mouvement sous la ligne des épaules" },
  { id: "incline-press-db", categorie: "poussee", groupe: "Pectoraux supérieurs", name: "Développé incliné haltères", machine: "Banc incliné (30-45°) + haltères", muscle: "Pectoraux supérieurs", sets: 3, reps: "12", charge_s12: "14 kg", charge_s34: "18 kg", repos: "1'30", tips: "Banc à 30-45° · Contrôle de la descente" },

  // Pectoraux (isolation)
  { id: "pec-fly", categorie: "poussee", groupe: "Pectoraux (isolation)", name: "Pec-fly machine (Butterfly)", machine: "Technogym Selection Pectoral Machine", muscle: "Pectoraux (isolation)", sets: 3, reps: "12", charge_s12: "25 kg", charge_s34: "30 kg", repos: "1'15", tips: "Mouvement lent · Ne pas claquer les poignées" },
  { id: "cable-crossover", categorie: "poussee", groupe: "Pectoraux (isolation)", name: "Écarté à la poulie (crossover)", machine: "Poulie vis-à-vis", muscle: "Pectoraux (isolation)", sets: 3, reps: "12", charge_s12: "10 kg", charge_s34: "15 kg", repos: "1'15", tips: "Léger buste en avant · Serrer les pecs en fin" },

  // Épaules
  { id: "lat-raise-db", categorie: "poussee", groupe: "Épaules", name: "Élévations latérales haltères", machine: "Haltères Technogym (rack libre)", muscle: "Deltoïdes moyens", sets: 3, reps: "15", charge_s12: "6 kg", charge_s34: "8 kg", repos: "1'00", tips: "Monter jusqu'à l'horizontale max · Pas d'élan" },
  { id: "shoulder-press", categorie: "poussee", groupe: "Épaules", name: "Développé épaules machine", machine: "Technogym Selection Shoulder Press", muscle: "Deltoïdes · Triceps", sets: 3, reps: "12", charge_s12: "20 kg", charge_s34: "30 kg", repos: "1'30", tips: "Ne pas cambrer · Amplitude contrôlée" },
  { id: "lat-raise-cable", categorie: "poussee", groupe: "Épaules", name: "Élévations latérales poulie", machine: "Poulie basse (poignée)", muscle: "Deltoïdes moyens", sets: 3, reps: "15", charge_s12: "5 kg", charge_s34: "7 kg", repos: "1'00", tips: "Bras quasi tendu · Tempo lent · Un bras à la fois" },

  // Triceps
  { id: "triceps-rope", categorie: "poussee", groupe: "Triceps", name: "Triceps poulie haute (corde)", machine: "Technogym Selection Poulie", muscle: "Triceps", sets: 3, reps: "12", charge_s12: "20 kg", charge_s34: "25 kg", repos: "1'00", tips: "Coudes collés au corps · Écarter la corde en bas" },
  { id: "dips-machine", categorie: "poussee", groupe: "Triceps", name: "Dips machine", machine: "Technogym Selection Dip", muscle: "Triceps · Pectoraux bas", sets: 3, reps: "12", charge_s12: "30 kg", charge_s34: "40 kg", repos: "1'15", tips: "Buste droit pour cibler les triceps" },
  { id: "triceps-overhead", categorie: "poussee", groupe: "Triceps", name: "Extension nuque haltère", machine: "Haltère (2 mains)", muscle: "Triceps (longue portion)", sets: 3, reps: "12", charge_s12: "10 kg", charge_s34: "12 kg", repos: "1'00", tips: "Coudes fixes vers l'avant · Amplitude complète" },

  // ===== TIRAGE =====
  // Dos (largeur)
  { id: "lat-pulldown", categorie: "tirage", groupe: "Dos (largeur)", name: "Tirage vertical (Lat Pulldown)", machine: "Technogym Selection Lat Machine", muscle: "Grand dorsal · Biceps", sets: 3, reps: "12", charge_s12: "40 kg", charge_s34: "50 kg", repos: "1'30", tips: "Tirer vers la poitrine · PAS derrière la nuque" },
  { id: "assisted-pullup", categorie: "tirage", groupe: "Dos (largeur)", name: "Tractions assistées machine", machine: "Technogym Selection Assisted Pull-up", muscle: "Grand dorsal", sets: 3, reps: "10", charge_s12: "assist. -30 kg", charge_s34: "assist. -20 kg", repos: "1'30", tips: "Amplitude complète · Contrôle de la descente" },

  // Dos (épaisseur)
  { id: "seated-row", categorie: "tirage", groupe: "Dos (épaisseur)", name: "Rowing machine assis", machine: "Technogym Selection Seated Row", muscle: "Dos (épaisseur)", sets: 3, reps: "12", charge_s12: "35 kg", charge_s34: "45 kg", repos: "1'30", tips: "Poitrine contre le support · Contrôler le retour" },
  { id: "low-row", categorie: "tirage", groupe: "Dos (épaisseur)", name: "Tirage horizontal poulie basse", machine: "Technogym Selection Low Row", muscle: "Rhomboïdes · Trapèzes", sets: 3, reps: "12", charge_s12: "30 kg", charge_s34: "35 kg", repos: "1'15", tips: "Buste fixe · Tirer vers le nombril · Serrer 1s en fin" },
  { id: "row-db", categorie: "tirage", groupe: "Dos (épaisseur)", name: "Rowing haltère unilatéral", machine: "Banc + haltère", muscle: "Dos (épaisseur)", sets: 3, reps: "12/bras", charge_s12: "16 kg", charge_s34: "20 kg", repos: "1'15", tips: "Dos plat · Tirer vers la hanche · Un bras à la fois" },

  // Épaules postérieures
  { id: "reverse-fly", categorie: "tirage", groupe: "Épaules postérieures", name: "Oiseau machine (Reverse Fly)", machine: "Technogym Selection Rear Delt", muscle: "Deltoïdes postérieurs · Rhomboïdes", sets: 3, reps: "15", charge_s12: "15 kg", charge_s34: "20 kg", repos: "1'00", tips: "Bras à hauteur des épaules max · Serrer les omoplates" },
  { id: "reverse-fly-db", categorie: "tirage", groupe: "Épaules postérieures", name: "Oiseau haltères (buste penché)", machine: "Haltères + buste penché", muscle: "Deltoïdes postérieurs", sets: 3, reps: "15", charge_s12: "6 kg", charge_s34: "8 kg", repos: "1'00", tips: "Buste ~45° · Tempo lent · Ne pas balancer" },

  // Biceps
  { id: "biceps-curl-db", categorie: "tirage", groupe: "Biceps", name: "Curl biceps haltères (alternés)", machine: "Haltères Technogym (rack libre)", muscle: "Biceps", sets: 3, reps: "12/bras", charge_s12: "8 kg", charge_s34: "10 kg", repos: "1'00", tips: "Debout, pas d'élan · Descente lente (2s)" },
  { id: "biceps-curl-cable", categorie: "tirage", groupe: "Biceps", name: "Curl biceps poulie basse", machine: "Poulie basse + barre", muscle: "Biceps", sets: 3, reps: "12", charge_s12: "20 kg", charge_s34: "25 kg", repos: "1'00", tips: "Coudes fixes · Amplitude complète" },
  { id: "biceps-machine", categorie: "tirage", groupe: "Biceps", name: "Curl pupitre machine", machine: "Technogym Selection Arm Curl", muscle: "Biceps", sets: 3, reps: "12", charge_s12: "20 kg", charge_s34: "25 kg", repos: "1'00", tips: "Bras calés · Contrôle · Ne pas décoller les coudes" },

  // ===== GAINAGE (commun aux deux séances) =====
  { id: "plank", categorie: "both", groupe: "Gainage", name: "Gainage (planche)", machine: "Au sol (tapis)", muscle: "Sangle abdominale", sets: 3, reps: "30-40s", charge_s12: "PDC", charge_s34: "PDC", repos: "0'45", tips: "Face + côté D + côté G · Bassin neutre" },
  { id: "plank-lateral", categorie: "both", groupe: "Gainage", name: "Gainage latéral", machine: "Au sol (tapis)", muscle: "Obliques", sets: 3, reps: "20-30s/côté", charge_s12: "PDC", charge_s34: "PDC", repos: "0'45", tips: "Corps aligné · Hanches hautes" },
  { id: "plank-dynamic", categorie: "both", groupe: "Gainage", name: "Gainage dynamique (mountain climbers)", machine: "Au sol (tapis)", muscle: "Abdominaux · Cardio", sets: 3, reps: "30s", charge_s12: "PDC", charge_s34: "PDC", repos: "0'45", tips: "Rythme contrôlé · Dos plat" },
];

// Composition par défaut de chaque séance (liste d'identifiants du catalogue).
const DEFAULT_COMPOSITION = {
  poussee: ["chest-press", "incline-press", "pec-fly", "lat-raise-db", "triceps-rope", "plank"],
  tirage: ["lat-pulldown", "seated-row", "low-row", "reverse-fly", "biceps-curl-db", "plank"],
};

// ---- CONFIG ----
// URL de l'application web Google Apps Script (voir apps-script.gs + README).
// Laisser vide ("") pour désactiver l'envoi vers Google Sheets (sauvegarde locale uniquement).
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyhpRzNSm3900H97CNUzSQU76_0ltP4q8Aw3oakQtk2OkdhXyMDQm5GXTw4EBoPWs-krA/exec";

// ---- STATE ----
let currentWeekOffset = 0;
let currentSession = "poussee";

let catalog = CATALOG_DEFAULT.slice();        // catalogue actif (par défaut ou distant)
let catalogById = {};                          // index id -> exercice
const sessionExercises = { poussee: [], tirage: [] };  // exercices résolus affichés
const sessionCompIds = { poussee: [], tirage: [] };    // identifiants effectivement affichés

// Historique (dataviz)
let historyRows = [];        // lignes brutes (une par série) provenant du Sheet
let historyLoaded = false;   // évite de recharger à chaque ouverture de la vue
const charts = {};           // instances Chart.js (pour destruction/refresh)

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
  // Date locale (évite le décalage UTC de toISOString).
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---- CATALOGUE ----
function buildCatalogIndex() {
  catalogById = {};
  catalog.forEach(ex => { catalogById[ex.id] = ex; });
}

// Charge le catalogue distant (onglet "Catalogue") si disponible, sinon garde
// le cache local ou le repli intégré. Ne bloque jamais l'appli.
async function loadCatalog() {
  const cached = localStorage.getItem('catalogue-cache');
  if (cached) {
    try {
      const arr = JSON.parse(cached);
      if (Array.isArray(arr) && arr.length) catalog = arr;
    } catch (e) { /* cache corrompu : on garde le repli */ }
  }
  buildCatalogIndex();

  if (!GOOGLE_SHEET_URL) return;

  try {
    const res = await fetch(`${GOOGLE_SHEET_URL}?action=catalogue`);
    const json = await res.json();
    if (json && json.status === "ok" && Array.isArray(json.catalogue) && json.catalogue.length) {
      catalog = json.catalogue;
      localStorage.setItem('catalogue-cache', JSON.stringify(catalog));
      buildCatalogIndex();
    }
  } catch (err) {
    console.warn("Catalogue distant indisponible, repli local utilisé.", err);
  }
}

function availableForCategory(session) {
  return catalog.filter(ex => ex.categorie === session || ex.categorie === "both");
}

// ---- COMPOSITION ----
function getComposition(session) {
  const raw = localStorage.getItem(`composition-${session}`);
  if (raw) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    } catch (e) { /* ignore */ }
  }
  return DEFAULT_COMPOSITION[session].slice();
}

function setComposition(session, ids) {
  localStorage.setItem(`composition-${session}`, JSON.stringify(ids));
}

// Résout la composition en exercices réels (ignore les ids introuvables).
function resolveExercises(session) {
  let ids = getComposition(session);
  let exs = ids.map(id => catalogById[id]).filter(Boolean);

  if (!exs.length) {
    ids = DEFAULT_COMPOSITION[session].slice();
    exs = ids.map(id => catalogById[id]).filter(Boolean);
  } else {
    // Ne garder que les ids réellement résolus (cohérence index <-> affichage).
    ids = exs.map(ex => ex.id);
  }

  sessionCompIds[session] = ids;
  sessionExercises[session] = exs;
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
  resolveExercises(sessionKey);
  const exercises = sessionExercises[sessionKey];
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
                 placeholder="${escapeHtml(ex.charge_s12)}"
                 title="Charge utilisée">
        </div>
      `;
    }

    item.innerHTML = `
      <div class="exercise-top">
        <input type="checkbox" class="exercise-check"
               id="excheck-${sessionKey}-${idx}"
               onchange="onExerciseCheck('${sessionKey}', ${idx})">
        <span class="exercise-num">${idx + 1}</span>
        <div class="exercise-info">
          <div class="exercise-name">${escapeHtml(ex.name)}</div>
          <div class="exercise-machine">${escapeHtml(ex.machine)}</div>
          <div class="exercise-muscle"><span class="exercise-group">${escapeHtml(ex.groupe)}</span> · ${escapeHtml(ex.muscle)} · ${escapeHtml(ex.tips)}</div>
        </div>
        <div class="exercise-actions">
          <button class="ex-action" title="Remplacer par un autre exercice du même groupe" onclick="openReplaceModal(${idx})">🔄</button>
          <button class="ex-action" title="Retirer de la séance" onclick="removeExercise(${idx})">🗑️</button>
        </div>
      </div>
      <div class="sets-grid">
        ${setsHTML}
      </div>
      <div class="exercise-meta">
        <span class="meta-badge charge">📊 ${escapeHtml(ex.reps)} reps</span>
        <span class="meta-badge charge">🏋️ ${escapeHtml(ex.charge_s12)} → ${escapeHtml(ex.charge_s34)}</span>
        <span class="meta-badge repos">⏱ repos ${escapeHtml(ex.repos)}</span>
      </div>
    `;

    container.appendChild(item);
  });

  // Bouton "Ajouter un exercice"
  const addBtn = document.createElement('button');
  addBtn.className = 'btn-add-exercise';
  addBtn.type = 'button';
  addBtn.textContent = '➕ Ajouter un exercice';
  addBtn.onclick = () => openAddModal();
  container.appendChild(addBtn);
}

function onSetCheck(session, exIdx, setNum) {
  const checkbox = document.getElementById(`check-${session}-${exIdx}-${setNum}`);
  const box = document.getElementById(`set-${session}-${exIdx}-${setNum}`);

  if (checkbox.checked) {
    box.classList.add('checked');
  } else {
    box.classList.remove('checked');
  }

  // Toutes les séries faites → coche l'exercice
  const ex = sessionExercises[session][exIdx];
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
  exItem.classList.toggle('completed', allDone);
}

function onExerciseCheck(session, exIdx) {
  const exCheck = document.getElementById(`excheck-${session}-${exIdx}`);
  const ex = sessionExercises[session][exIdx];
  const exItem = exCheck.closest('.exercise-item');

  for (let s = 1; s <= ex.sets; s++) {
    const setCheck = document.getElementById(`check-${session}-${exIdx}-${s}`);
    const box = document.getElementById(`set-${session}-${exIdx}-${s}`);
    setCheck.checked = exCheck.checked;
    box.classList.toggle('checked', exCheck.checked);
  }

  exItem.classList.toggle('completed', exCheck.checked);
}

// ---- REMPLACER / AJOUTER / RETIRER ----
// Applique une nouvelle liste d'ids en préservant les saisies en cours.
function commitComposition(session, ids) {
  const live = collectSessionData(session);
  setComposition(session, ids);
  renderExercises(session);
  applySessionData(session, live);
}

function openReplaceModal(idx) {
  const ex = sessionExercises[currentSession][idx];
  const options = availableForCategory(currentSession)
    .filter(o => o.groupe === ex.groupe && o.id !== ex.id);

  openModal(`Remplacer — ${ex.groupe}`, body => {
    if (!options.length) {
      body.innerHTML = `<p class="picker-empty">Aucune alternative dans le catalogue pour le groupe « ${escapeHtml(ex.groupe)} ».<br>Ajoute-en dans l'onglet Catalogue du Google Sheet.</p>`;
      return;
    }
    options.forEach(o => body.appendChild(exOptionButton(o, () => {
      const ids = sessionCompIds[currentSession].slice();
      ids[idx] = o.id;
      commitComposition(currentSession, ids);
      closeModal();
    })));
  });
}

function removeExercise(idx) {
  if (sessionCompIds[currentSession].length <= 1) {
    alert("Une séance doit contenir au moins un exercice.");
    return;
  }
  const ex = sessionExercises[currentSession][idx];
  if (!confirm(`Retirer « ${ex.name} » de la séance ?`)) return;

  const ids = sessionCompIds[currentSession].slice();
  ids.splice(idx, 1);
  commitComposition(currentSession, ids);
}

function openAddModal() {
  const options = availableForCategory(currentSession);
  openModal("Ajouter un exercice", body => {
    if (!options.length) {
      body.innerHTML = `<p class="picker-empty">Catalogue vide pour cette séance.</p>`;
      return;
    }
    const groups = [];
    options.forEach(o => { if (!groups.includes(o.groupe)) groups.push(o.groupe); });

    groups.forEach(g => {
      const heading = document.createElement('div');
      heading.className = 'picker-group';
      heading.textContent = g;
      body.appendChild(heading);

      options.filter(o => o.groupe === g).forEach(o => {
        const already = sessionCompIds[currentSession].includes(o.id);
        body.appendChild(exOptionButton(o, () => {
          const ids = sessionCompIds[currentSession].slice();
          ids.push(o.id);
          commitComposition(currentSession, ids);
          closeModal();
        }, already));
      });
    });
  });
}

function resetComposition() {
  if (!confirm("Revenir à la composition par défaut de cette séance ? Tes remplacements/ajouts seront perdus.")) return;
  const live = collectSessionData(currentSession);
  localStorage.removeItem(`composition-${currentSession}`);
  renderExercises(currentSession);
  applySessionData(currentSession, live);
}

// ---- MODALE ----
function openModal(title, bodyBuilder) {
  document.getElementById('modal-title').textContent = title;
  const body = document.getElementById('modal-body');
  body.innerHTML = '';
  bodyBuilder(body);
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function exOptionButton(ex, onClick, already) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'picker-option' + (already ? ' already' : '');
  b.innerHTML = `
    <span class="picker-name">${escapeHtml(ex.name)}${already ? ' <span class="picker-tag">déjà dans la séance</span>' : ''}</span>
    <span class="picker-machine">${escapeHtml(ex.machine)}</span>
    <span class="picker-meta">${escapeHtml(ex.muscle)} · ${escapeHtml(ex.reps)} reps · ${escapeHtml(ex.charge_s12)} → ${escapeHtml(ex.charge_s34)}</span>
  `;
  b.onclick = onClick;
  return b;
}

// ---- COLLECTE / APPLICATION DE L'ÉTAT UI ----
// Lit l'état courant de l'UI d'une séance, indexé par identifiant d'exercice.
function collectSessionData(session) {
  const data = {};
  sessionExercises[session].forEach((ex, idx) => {
    const exCheck = document.getElementById(`excheck-${session}-${idx}`);
    if (!exCheck) return;
    const sets = [];
    for (let s = 1; s <= ex.sets; s++) {
      const c = document.getElementById(`check-${session}-${idx}-${s}`);
      const w = document.getElementById(`weight-${session}-${idx}-${s}`);
      sets.push({ checked: c ? c.checked : false, weight: w ? w.value : "" });
    }
    data[ex.id] = { checked: exCheck.checked, sets };
  });
  return data;
}

// Applique un état (indexé par id) à l'UI ; réinitialise les exercices absents.
function applySessionData(session, data) {
  data = data || {};
  sessionExercises[session].forEach((ex, idx) => {
    const exData = data[ex.id];
    const exCheck = document.getElementById(`excheck-${session}-${idx}`);
    if (!exCheck) return;
    const exItem = exCheck.closest('.exercise-item');

    const checked = !!(exData && exData.checked);
    exCheck.checked = checked;
    exItem.classList.toggle('completed', checked);

    for (let s = 1; s <= ex.sets; s++) {
      const setCheck = document.getElementById(`check-${session}-${idx}-${s}`);
      const setBox = document.getElementById(`set-${session}-${idx}-${s}`);
      const weightInput = document.getElementById(`weight-${session}-${idx}-${s}`);
      const sd = exData && exData.sets ? exData.sets[s - 1] : null;

      if (setCheck) {
        setCheck.checked = !!(sd && sd.checked);
        setBox.classList.toggle('checked', !!(sd && sd.checked));
      }
      if (weightInput) {
        weightInput.value = sd && sd.weight ? sd.weight : "";
      }
    }
  });
}

// ---- SAVE / LOAD ----
function getSessionKey() {
  const date = document.getElementById('session-date').value;
  return `session-${currentSession}-${date}`;
}

async function saveSession() {
  const date = document.getElementById('session-date').value;
  if (!date) {
    alert("Choisis une date pour la séance !");
    return;
  }

  const data = collectSessionData(currentSession);

  // 1) Sauvegarde locale (toujours, source de vérité + hors-ligne)
  localStorage.setItem(getSessionKey(), JSON.stringify(data));

  const toast = document.getElementById('save-toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  };

  // 2) Envoi vers Google Sheets (si configuré)
  if (!GOOGLE_SHEET_URL) {
    showToast("✅ Séance sauvegardée (local) !");
    return;
  }

  showToast("💾 Sauvegarde… envoi vers Google Sheets…");
  const ok = await sendToGoogleSheet(date, data);
  showToast(ok
    ? "✅ Séance sauvegardée (local + Google Sheets) !"
    : "⚠️ Enregistrée en local, mais envoi Google Sheets échoué.");
}

// Construit la charge utile lisible et l'envoie à l'application Apps Script.
async function sendToGoogleSheet(date, data) {
  const exercises = sessionExercises[currentSession];
  const sessionLabels = { poussee: "Poussée", tirage: "Tirage" };

  const payload = {
    timestamp: new Date().toISOString(),
    date: date,
    session: currentSession,
    sessionLabel: sessionLabels[currentSession] || currentSession,
    exercises: exercises.map((ex, idx) => {
      const d = data[ex.id] || { checked: false, sets: [] };
      return {
        num: idx + 1,
        id: ex.id,
        name: ex.name,
        machine: ex.machine,
        groupe: ex.groupe,
        muscle: ex.muscle,
        repsTarget: ex.reps,
        done: d.checked,
        sets: (d.sets || []).map((s, sIdx) => ({
          set: sIdx + 1,
          done: s.checked,
          weight: s.weight || ""
        }))
      };
    })
  };

  try {
    // Content-Type "text/plain" => requête simple, pas de préflight CORS.
    const res = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const result = await res.json().catch(() => ({}));
    if (result && result.status === "ok") return true;
    console.warn("Réponse Google Sheets inattendue:", result);
    return res.ok;
  } catch (err) {
    console.error("Échec de l'envoi vers Google Sheets:", err);
    return false;
  }
}

function loadSessionData() {
  const raw = localStorage.getItem(getSessionKey());
  let data = {};
  if (raw) {
    try { data = JSON.parse(raw) || {}; } catch (e) { data = {}; }
  }
  applySessionData(currentSession, data);
}

function resetSession() {
  if (confirm("Réinitialiser cette séance ?")) {
    applySessionData(currentSession, {});
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

  if (viewName === 'history' && !historyLoaded) {
    loadHistory(false);
  }
}

function showSession(sessionKey) {
  currentSession = sessionKey;

  document.querySelectorAll('.session-card').forEach(s => s.classList.remove('active'));
  document.getElementById(`session-${sessionKey}`).classList.add('active');

  document.querySelectorAll('.carnet-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.carnet-tab[data-session="${sessionKey}"]`).classList.add('active');

  loadSessionData();
}

// ---- HISTORIQUE / DATAVIZ ----
function setHistoryStatus(msg) {
  const el = document.getElementById('history-status');
  if (el) el.textContent = msg;
}

// Charge l'historique depuis Google Sheets (avec cache local pour le hors-ligne).
async function loadHistory(force) {
  historyLoaded = true;

  // Repli immédiat sur le cache local pour un affichage instantané.
  const cached = localStorage.getItem('history-cache');
  if (cached && !historyRows.length) {
    try { historyRows = JSON.parse(cached) || []; } catch (e) { historyRows = []; }
    renderHistory();
  }

  if (!GOOGLE_SHEET_URL) {
    setHistoryStatus(cached ? "Cache local (Google Sheets non configuré)" : "Google Sheets non configuré");
    if (!cached) renderHistory();
    return;
  }

  setHistoryStatus("Chargement…");
  try {
    const res = await fetch(`${GOOGLE_SHEET_URL}?action=sessions${force ? `&t=${Date.now()}` : ''}`);
    const json = await res.json();
    if (json && json.status === "ok" && Array.isArray(json.sessions)) {
      historyRows = json.sessions;
      localStorage.setItem('history-cache', JSON.stringify(historyRows));
      const now = new Date();
      setHistoryStatus(`À jour · ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`);
      renderHistory();
      return;
    }
    // Réponse "ok" mais sans tableau sessions => ancienne version du script déployée.
    if (json && json.status === "ok") {
      setHistoryStatus("⚠️ Script à redéployer (endpoint « sessions » absent)");
      renderHistory();
      return;
    }
    throw new Error("réponse inattendue");
  } catch (err) {
    console.warn("Historique distant indisponible.", err);
    setHistoryStatus(historyRows.length ? "Hors-ligne · cache local" : "Indisponible (hors-ligne)");
    renderHistory();
  }
}

// Extrait le premier nombre d'une chaîne ("35 kg" -> 35, "PDC" -> null).
function parseNumber(str) {
  if (str == null) return null;
  const m = String(str).replace(',', '.').match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

function parseLocalDate(iso) {
  const parts = String(iso).split('-').map(Number);
  return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
}

// Clé ISO année-semaine (lundi) + date du lundi, pour l'assiduité.
function isoWeekInfo(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  const monday = getMonday(date);
  return { key: `${d.getUTCFullYear()}-S${String(week).padStart(2, '0')}`, monday };
}

function renderHistory() {
  const hasData = historyRows.length > 0;
  document.getElementById('history-empty').classList.toggle('hidden', hasData);
  document.getElementById('history-charts').classList.toggle('hidden', !hasData);
  if (!hasData) return;

  if (typeof Chart === 'undefined') {
    setHistoryStatus("Graphiques indisponibles hors-ligne (Chart.js non chargé)");
    return;
  }

  // Sélecteur d'exercice pour la progression
  const select = document.getElementById('progress-exercise');
  const exercises = [...new Set(historyRows.map(r => r.exercice).filter(Boolean))].sort();
  const previous = select.value;
  select.innerHTML = '';
  exercises.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
  if (exercises.includes(previous)) select.value = previous;

  renderProgressChart();
  renderVolumeChart();
  renderFrequencyChart();
  renderCompletionChart();
}

// Regroupe les lignes par séance : clé "date|session".
function groupBySession() {
  const map = new Map();
  historyRows.forEach(r => {
    const key = `${r.date}|${r.session}`;
    if (!map.has(key)) map.set(key, { date: r.date, session: r.session, rows: [] });
    map.get(key).rows.push(r);
  });
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function sessionColor(session) {
  return /tir/i.test(session) ? '#2e86c1' : '#e67e22';
}

function makeChart(id, config) {
  if (charts[id]) charts[id].destroy();
  const ctx = document.getElementById(id);
  if (!ctx) return;
  charts[id] = new Chart(ctx, config);
}

function renderProgressChart() {
  if (typeof Chart === 'undefined') return;
  const name = document.getElementById('progress-exercise').value;
  const points = [];
  // Charge max par date pour l'exercice sélectionné.
  const byDate = new Map();
  historyRows.filter(r => r.exercice === name).forEach(r => {
    const w = parseNumber(r.charge);
    if (w == null) return;
    const cur = byDate.get(r.date);
    if (cur == null || w > cur) byDate.set(r.date, w);
  });
  [...byDate.keys()].sort().forEach(date => points.push({ date, w: byDate.get(date) }));

  makeChart('chart-progress', {
    type: 'line',
    data: {
      labels: points.map(p => formatDate(parseLocalDate(p.date))),
      datasets: [{
        label: `${name} — charge max (kg)`,
        data: points.map(p => p.w),
        borderColor: '#e67e22',
        backgroundColor: 'rgba(230,126,34,0.15)',
        tension: 0.25,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#e67e22'
      }]
    },
    options: baseOptions()
  });
}

function renderVolumeChart() {
  const sessions = groupBySession();
  const data = sessions.map(s => {
    let vol = 0;
    s.rows.forEach(r => {
      if (!/oui/i.test(r.fait)) return;
      const w = parseNumber(r.charge);
      const reps = parseNumber(r.reps);
      if (w != null && reps != null && w > 0) vol += w * reps;
    });
    return vol;
  });

  makeChart('chart-volume', {
    type: 'bar',
    data: {
      labels: sessions.map(s => `${formatDate(parseLocalDate(s.date))} · ${s.session}`),
      datasets: [{
        label: 'Volume (kg × reps)',
        data,
        backgroundColor: sessions.map(s => sessionColor(s.session))
      }]
    },
    options: baseOptions()
  });
}

function renderFrequencyChart() {
  const sessions = groupBySession();
  const byWeek = new Map();
  sessions.forEach(s => {
    const info = isoWeekInfo(parseLocalDate(s.date));
    if (!byWeek.has(info.key)) byWeek.set(info.key, { label: formatDate(info.monday), count: 0 });
    byWeek.get(info.key).count += 1;
  });
  const keys = [...byWeek.keys()].sort();

  makeChart('chart-frequency', {
    type: 'bar',
    data: {
      labels: keys.map(k => `sem. ${byWeek.get(k).label}`),
      datasets: [{
        label: 'Séances',
        data: keys.map(k => byWeek.get(k).count),
        backgroundColor: '#27ae60'
      }]
    },
    options: baseOptions({ stepSize: 1 })
  });
}

function renderCompletionChart() {
  const sessions = groupBySession();
  const data = sessions.map(s => {
    const total = s.rows.length;
    const done = s.rows.filter(r => /oui/i.test(r.fait)).length;
    return total ? Math.round((done / total) * 100) : 0;
  });

  makeChart('chart-completion', {
    type: 'bar',
    data: {
      labels: sessions.map(s => `${formatDate(parseLocalDate(s.date))} · ${s.session}`),
      datasets: [{
        label: '% séries validées',
        data,
        backgroundColor: '#8e44ad'
      }]
    },
    options: baseOptions({ max: 100 })
  });
}

// Options communes aux graphiques (thème sombre).
function baseOptions(yOpts) {
  yOpts = yOpts || {};
  const grid = { color: 'rgba(255,255,255,0.06)' };
  const ticks = { color: '#8c919d' };
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#eef0f4' } }
    },
    scales: {
      x: { grid, ticks },
      y: Object.assign({ beginAtZero: true, grid, ticks: Object.assign({}, ticks, yOpts.stepSize ? { stepSize: yOpts.stepSize } : {}) }, yOpts.max ? { max: yOpts.max } : {})
    }
  };
}

// ---- INIT ----
async function init() {
  // Date du jour par défaut
  document.getElementById('session-date').value = formatDateISO(new Date());

  await loadCatalog();

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

  // Fermer la modale au clic sur le fond
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
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
