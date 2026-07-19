/**
 * PROGRAMME SPORTIF — Google Apps Script
 * =====================================================================
 * Reçoit les séances envoyées par l'appli et les ajoute dans un
 * Google Sheet (une ligne par série d'exercice).
 *
 * INSTALLATION (voir aussi le README) :
 *  1. Crée un Google Sheet.
 *  2. Menu Extensions → Apps Script.
 *  3. Colle ce fichier entier (remplace le code par défaut). Enregistre.
 *  4. Déployer → Nouveau déploiement → type "Application Web".
 *       - Exécuter en tant que : Moi
 *       - Qui a accès : Tout le monde
 *  5. Copie l'URL de l'application web (…/exec) et colle-la dans
 *     app.js → const GOOGLE_SHEET_URL = "…".
 *
 * Si tu modifies ce script plus tard : Déployer → Gérer les déploiements
 * → modifie le déploiement existant (ne crée pas une nouvelle URL).
 * =====================================================================
 */

// Nom de l'onglet où écrire les données.
var SHEET_NAME = "Séances";

// En-têtes des colonnes (créés automatiquement à la 1re écriture).
var HEADERS = [
  "Horodatage", "Date séance", "Séance", "#", "Exercice",
  "Machine", "Muscle", "Reps cible", "Série", "Fait", "Charge"
];

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

// Vérification rapide dans le navigateur (ouvre l'URL /exec en GET).
function doGet() {
  return json_({ status: "ok", message: "Programme Sportif endpoint actif." });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
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
