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
- **Catalogue d'exercices** : chaque exercice peut être remplacé, ajouté ou retiré. Les remplacements ne proposent que des exercices du **même groupe musculaire** → la séance reste cohérente. La composition personnalisée est mémorisée par séance.

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

## Catalogue d'exercices dans Google Sheet

Le catalogue (liste de tous les exercices disponibles, par groupe musculaire)
peut être géré directement dans le Google Sheet, dans un onglet **`Catalogue`** :

1. Dans l'éditeur Apps Script, sélectionne la fonction **`seedCatalogue`** dans
   la liste en haut, puis clique **▶ Exécuter** (autorise l'accès la 1re fois).
   → l'onglet `Catalogue` est créé et pré-rempli.
2. Édite librement cet onglet pour **ajouter / modifier / supprimer** des
   exercices. Colonnes : `id`, `categorie` (`poussee`, `tirage` ou `both`),
   `groupe`, `nom`, `machine`, `muscle`, `sets`, `reps`, `charge_s12`,
   `charge_s34`, `repos`, `conseils`.
   - L'`id` doit être **unique** (sans espace, ex. `chest-press-2`).
   - Le `groupe` détermine les alternatives proposées lors d'un remplacement.
3. L'appli lit ce catalogue au démarrage et le met en cache (fonctionne ensuite
   hors-ligne). Si l'onglet `Catalogue` est absent ou vide, un catalogue intégré
   par défaut est utilisé.

> La composition de chaque séance (exercices choisis) est mémorisée dans le
> navigateur (`localStorage`), pas dans le Sheet. Le bouton **« Composition par
> défaut »** rétablit la séance d'origine.

## Déploiement GitHub Pages

1. Settings → Pages → Source : `main` branch, `/ (root)`
2. L'appli sera disponible sur `https://<username>.github.io/Sport_programmation/`
