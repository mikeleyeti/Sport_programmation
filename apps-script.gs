/**
 * PROGRAMME SPORTIF — Google Apps Script
 * =====================================================================
 *  - doPost      : reçoit une séance et l'ajoute dans l'onglet "Séances"
 *                  (une ligne par série d'exercice).
 *  - doGet       : renvoie le catalogue d'exercices (onglet "Catalogue")
 *                  au format JSON, lu par l'appli.
 *  - seedCatalogue() : remplit l'onglet "Catalogue" avec un jeu d'exercices
 *                  de départ (à lancer UNE fois depuis l'éditeur Apps Script).
 *
 * INSTALLATION (voir aussi le README) :
 *  1. Crée un Google Sheet.
 *  2. Menu Extensions → Apps Script.
 *  3. Colle ce fichier entier (remplace le code par défaut). Enregistre.
 *  4. (Recommandé) Dans la liste des fonctions en haut, choisis
 *     "seedCatalogue" puis clique ▶ Exécuter (autorise l'accès la 1re fois).
 *     → l'onglet "Catalogue" est créé et pré-rempli. Tu pourras l'éditer
 *       directement dans le Sheet (ajouter/modifier des exercices).
 *  5. Déployer → Nouveau déploiement → type "Application Web".
 *       - Exécuter en tant que : Moi
 *       - Qui a accès : Tout le monde
 *  6. Copie l'URL de l'application web (…/exec) et colle-la dans
 *     app.js → const GOOGLE_SHEET_URL = "…".
 *
 * Si tu modifies ce script plus tard : Déployer → Gérer les déploiements
 * → modifie le déploiement existant (ne crée pas une nouvelle URL).
 * =====================================================================
 */

var SHEET_NAME = "Séances";
var CATALOG_SHEET = "Catalogue";

// En-têtes de l'onglet "Séances".
var HEADERS = [
  "Horodatage", "Date séance", "Séance", "#", "Groupe", "Exercice",
  "Machine", "Muscle", "Reps cible", "Série", "Fait", "Charge"
];

// En-têtes / colonnes de l'onglet "Catalogue" (ordre = colonnes du Sheet).
var CATALOG_HEADERS = [
  "id", "categorie", "groupe", "nom", "machine", "muscle",
  "sets", "reps", "charge_s12", "charge_s34", "repos", "conseils"
];

// ---------------------------------------------------------------------
// POST : enregistrement d'une séance
// ---------------------------------------------------------------------
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var rows = [];
    (payload.exercises || []).forEach(function (ex) {
      (ex.sets || []).forEach(function (set) {
        rows.push([
          payload.timestamp || new Date().toISOString(),
          payload.date || "",
          payload.sessionLabel || payload.session || "",
          ex.num || "",
          ex.groupe || "",
          ex.name || "",
          ex.machine || "",
          ex.muscle || "",
          ex.repsTarget || "",
          set.set || "",
          set.done ? "Oui" : "Non",
          set.weight || ""
        ]);
      });
    });

    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length)
           .setValues(rows);
    }

    return json_({ status: "ok", rows: rows.length });
  } catch (err) {
    return json_({ status: "error", message: String(err) });
  }
}

// ---------------------------------------------------------------------
// GET : ?action=catalogue → renvoie le catalogue ; sinon ping.
// ---------------------------------------------------------------------
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : "";
  if (action === "catalogue") {
    return json_({ status: "ok", catalogue: readCatalogue_() });
  }
  return json_({ status: "ok", message: "Programme Sportif endpoint actif." });
}

function readCatalogue_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CATALOG_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return [];

  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (h) { return String(h).trim(); });

  var items = [];
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    if (!row[0]) continue; // ignore les lignes sans id
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    // Normalisation des noms de champs attendus par l'appli.
    items.push({
      id: String(obj.id).trim(),
      categorie: String(obj.categorie || "").trim(),
      groupe: String(obj.groupe || "").trim(),
      name: String(obj.nom || obj.name || "").trim(),
      machine: String(obj.machine || "").trim(),
      muscle: String(obj.muscle || "").trim(),
      sets: Number(obj.sets) || 3,
      reps: String(obj.reps || "").trim(),
      charge_s12: String(obj.charge_s12 || "").trim(),
      charge_s34: String(obj.charge_s34 || "").trim(),
      repos: String(obj.repos || "").trim(),
      tips: String(obj.conseils || obj.tips || "").trim()
    });
  }
  return items;
}

// ---------------------------------------------------------------------
// Onglets
// ---------------------------------------------------------------------
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------
// seedCatalogue() : à lancer UNE fois depuis l'éditeur pour pré-remplir
// l'onglet "Catalogue". N'écrase pas un onglet déjà rempli.
// ---------------------------------------------------------------------
function seedCatalogue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CATALOG_SHEET);
  if (!sheet) sheet = ss.insertSheet(CATALOG_SHEET);

  if (sheet.getLastRow() > 1) {
    throw new Error("L'onglet Catalogue contient déjà des données. Vide-le d'abord si tu veux le regénérer.");
  }

  // [id, categorie, groupe, nom, machine, muscle, sets, reps, charge_s12, charge_s34, repos, conseils]
  var data = [
    // POUSSÉE — Pectoraux
    ["chest-press", "poussee", "Pectoraux", "Développé couché machine", "Technogym Selection Chest Press", "Pectoraux", 3, "12", "35 kg", "45 kg", "1'30", "Descente contrôlée (2s) · Omoplates serrées"],
    ["chest-press-db", "poussee", "Pectoraux", "Développé couché haltères", "Banc plat + haltères", "Pectoraux", 3, "12", "18 kg", "22 kg", "1'30", "Coudes ~45° · Descente 2s"],
    ["pushups", "poussee", "Pectoraux", "Pompes", "Poids du corps (tapis)", "Pectoraux · Triceps", 3, "max", "PDC", "PDC", "1'00", "Gainage · Amplitude complète"],
    // POUSSÉE — Pectoraux supérieurs
    ["incline-press", "poussee", "Pectoraux supérieurs", "Développé couché incliné machine", "Technogym Selection Incline Chest Press", "Pectoraux supérieurs · Deltoïdes antérieurs", 3, "12", "25 kg", "35 kg", "1'30", "Dos plaqué · Sous la ligne des épaules"],
    ["incline-press-db", "poussee", "Pectoraux supérieurs", "Développé incliné haltères", "Banc incliné (30-45°) + haltères", "Pectoraux supérieurs", 3, "12", "14 kg", "18 kg", "1'30", "Banc à 30-45° · Contrôle"],
    // POUSSÉE — Pectoraux (isolation)
    ["pec-fly", "poussee", "Pectoraux (isolation)", "Pec-fly machine (Butterfly)", "Technogym Selection Pectoral Machine", "Pectoraux (isolation)", 3, "12", "25 kg", "30 kg", "1'15", "Mouvement lent · Ne pas claquer les poignées"],
    ["cable-crossover", "poussee", "Pectoraux (isolation)", "Écarté à la poulie (crossover)", "Poulie vis-à-vis", "Pectoraux (isolation)", 3, "12", "10 kg", "15 kg", "1'15", "Léger buste en avant · Serrer les pecs"],
    // POUSSÉE — Épaules
    ["lat-raise-db", "poussee", "Épaules", "Élévations latérales haltères", "Haltères Technogym (rack libre)", "Deltoïdes moyens", 3, "15", "6 kg", "8 kg", "1'00", "Jusqu'à l'horizontale · Pas d'élan"],
    ["shoulder-press", "poussee", "Épaules", "Développé épaules machine", "Technogym Selection Shoulder Press", "Deltoïdes · Triceps", 3, "12", "20 kg", "30 kg", "1'30", "Ne pas cambrer · Amplitude contrôlée"],
    ["lat-raise-cable", "poussee", "Épaules", "Élévations latérales poulie", "Poulie basse (poignée)", "Deltoïdes moyens", 3, "15", "5 kg", "7 kg", "1'00", "Bras quasi tendu · Tempo lent"],
    // POUSSÉE — Triceps
    ["triceps-rope", "poussee", "Triceps", "Triceps poulie haute (corde)", "Technogym Selection Poulie", "Triceps", 3, "12", "20 kg", "25 kg", "1'00", "Coudes collés · Écarter la corde en bas"],
    ["dips-machine", "poussee", "Triceps", "Dips machine", "Technogym Selection Dip", "Triceps · Pectoraux bas", 3, "12", "30 kg", "40 kg", "1'15", "Buste droit pour cibler les triceps"],
    ["triceps-overhead", "poussee", "Triceps", "Extension nuque haltère", "Haltère (2 mains)", "Triceps (longue portion)", 3, "12", "10 kg", "12 kg", "1'00", "Coudes fixes · Amplitude complète"],
    // TIRAGE — Dos (largeur)
    ["lat-pulldown", "tirage", "Dos (largeur)", "Tirage vertical (Lat Pulldown)", "Technogym Selection Lat Machine", "Grand dorsal · Biceps", 3, "12", "40 kg", "50 kg", "1'30", "Vers la poitrine · PAS derrière la nuque"],
    ["assisted-pullup", "tirage", "Dos (largeur)", "Tractions assistées machine", "Technogym Selection Assisted Pull-up", "Grand dorsal", 3, "10", "assist. -30 kg", "assist. -20 kg", "1'30", "Amplitude complète · Contrôle descente"],
    // TIRAGE — Dos (épaisseur)
    ["seated-row", "tirage", "Dos (épaisseur)", "Rowing machine assis", "Technogym Selection Seated Row", "Dos (épaisseur)", 3, "12", "35 kg", "45 kg", "1'30", "Poitrine contre le support · Contrôler le retour"],
    ["low-row", "tirage", "Dos (épaisseur)", "Tirage horizontal poulie basse", "Technogym Selection Low Row", "Rhomboïdes · Trapèzes", 3, "12", "30 kg", "35 kg", "1'15", "Buste fixe · Vers le nombril · Serrer 1s"],
    ["row-db", "tirage", "Dos (épaisseur)", "Rowing haltère unilatéral", "Banc + haltère", "Dos (épaisseur)", 3, "12/bras", "16 kg", "20 kg", "1'15", "Dos plat · Tirer vers la hanche"],
    // TIRAGE — Épaules postérieures
    ["reverse-fly", "tirage", "Épaules postérieures", "Oiseau machine (Reverse Fly)", "Technogym Selection Rear Delt", "Deltoïdes postérieurs · Rhomboïdes", 3, "15", "15 kg", "20 kg", "1'00", "Bras à hauteur épaules · Serrer omoplates"],
    ["reverse-fly-db", "tirage", "Épaules postérieures", "Oiseau haltères (buste penché)", "Haltères + buste penché", "Deltoïdes postérieurs", 3, "15", "6 kg", "8 kg", "1'00", "Buste ~45° · Tempo lent"],
    // TIRAGE — Biceps
    ["biceps-curl-db", "tirage", "Biceps", "Curl biceps haltères (alternés)", "Haltères Technogym (rack libre)", "Biceps", 3, "12/bras", "8 kg", "10 kg", "1'00", "Debout, pas d'élan · Descente lente (2s)"],
    ["biceps-curl-cable", "tirage", "Biceps", "Curl biceps poulie basse", "Poulie basse + barre", "Biceps", 3, "12", "20 kg", "25 kg", "1'00", "Coudes fixes · Amplitude complète"],
    ["biceps-machine", "tirage", "Biceps", "Curl pupitre machine", "Technogym Selection Arm Curl", "Biceps", 3, "12", "20 kg", "25 kg", "1'00", "Bras calés · Contrôle"],
    // GAINAGE (commun)
    ["plank", "both", "Gainage", "Gainage (planche)", "Au sol (tapis)", "Sangle abdominale", 3, "30-40s", "PDC", "PDC", "0'45", "Face + côté D + côté G · Bassin neutre"],
    ["plank-lateral", "both", "Gainage", "Gainage latéral", "Au sol (tapis)", "Obliques", 3, "20-30s/côté", "PDC", "PDC", "0'45", "Corps aligné · Hanches hautes"],
    ["plank-dynamic", "both", "Gainage", "Gainage dynamique (mountain climbers)", "Au sol (tapis)", "Abdominaux · Cardio", 3, "30s", "PDC", "PDC", "0'45", "Rythme contrôlé · Dos plat"]
  ];

  sheet.getRange(1, 1, 1, CATALOG_HEADERS.length).setValues([CATALOG_HEADERS]);
  sheet.getRange(1, 1, 1, CATALOG_HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.getRange(2, 1, data.length, CATALOG_HEADERS.length).setValues(data);
}
