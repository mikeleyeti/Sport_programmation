# 🏋️ Programme Sportif — Reprise

Application web de suivi de programme sportif : planning hebdomadaire et carnet de séances de musculation.

## Profil

- 43 ans, 68 kg
- Objectifs : remise en forme, perte de poids, musculation haut du corps
- Machines : Technogym Selection Line
- FCmax : 200 bpm

## Planning hebdomadaire

| Jour | Séance |
|------|--------|
| Lundi | 💤 Repos |
| Mardi | 🚣 Salle 1 — Cardio doux (rameur/vélo/elliptique) |
| Mercredi | 🏋️ Salle 2 — Poussée |
| Jeudi | 🏃 Footing 1 — Endurance fondamentale |
| Vendredi | 💤 Repos |
| Samedi | 🏋️ Salle 3 — Tirage |
| Dimanche | 🏃 Footing 2 — Sortie longue |

## Fonctionnalités

- **Planning** : agenda hebdomadaire avec navigation entre les semaines
- **Carnet** : suivi des séances de musculation avec cases à cocher par série, saisie des charges, sauvegarde locale

## Utilisation

Ouvrir `index.html` dans un navigateur. Aucune dépendance, aucun build nécessaire.

Les données de séances sont sauvegardées dans le `localStorage` du navigateur.

## Enregistrement dans Google Sheets (optionnel)

En plus de la sauvegarde locale, chaque séance sauvegardée peut être envoyée
dans un Google Sheet (une ligne par série). Configuration en une fois :

1. Crée un **Google Sheet** vide.
2. Dans ce Sheet : menu **Extensions → Apps Script**.
3. Colle le contenu de [`apps-script.gs`](apps-script.gs) (remplace le code par
   défaut), puis **Enregistre**.
4. **Déployer → Nouveau déploiement → type « Application Web »** :
   - *Exécuter en tant que* : **Moi**
   - *Qui a accès* : **Tout le monde**
5. Copie l'**URL de l'application web** (elle finit par `/exec`).
6. Ouvre [`app.js`](app.js) et colle-la dans :
   ```js
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/……/exec";
   ```

Vérification : ouvre l'URL `/exec` dans un navigateur — tu dois voir
`{"status":"ok",…}`. La sauvegarde locale continue de fonctionner même si
l'envoi vers Google Sheets échoue (hors-ligne, etc.).

> Si tu modifies `apps-script.gs` plus tard, utilise **Déployer → Gérer les
> déploiements** pour mettre à jour le déploiement existant (garde la même URL).

## Déploiement GitHub Pages

1. Settings → Pages → Source : `main` branch, `/ (root)`
2. L'appli sera disponible sur `https://<username>.github.io/Sport_programmation/`
