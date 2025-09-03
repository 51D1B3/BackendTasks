# Explication du fichier validateTask.js

Ce fichier fournit un middleware pour valider les données lors de la création ou mise à jour d’une tâche ("task") dans une application Node.js avec Express. Il s’appuie sur la bibliothèque express-validator.

## Explications détaillées

### 1. Importations
```js
const { check, validationResult } = require('express-validator');
```
- **express-validator** : Librairie de validation des données dans Express.
- **check** : Sert à définir des contraintes de validation sur les champs.
- **validationResult** : Permet de récupérer les résultats des validations sur la requête.

### 2. Règles de validation des tâches
```js
const taskValidationRules = [
  check('title', 'Title is required').not().isEmpty(),
  check('priority').optional().isIn(['low', 'medium', 'high']),
  check('status').optional().isIn(['todo', 'in_progress', 'done'])
];
```
- Le champ `title` est obligatoire et ne doit pas être vide. Si absent, le message "Title is required" s’affiche.
- Le champ `priority` est optionnel, mais s’il existe, il doit prendre l’une de ces valeurs : "low", "medium" ou "high".
- Le champ `status` est optionnel, mais s’il existe, il doit prendre la valeur "todo", "in_progress" ou "done".

### 3. Fonction middleware
```js
const validateTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
```
- Récupère le résultat de la validation.
- Si des erreurs existent, retourne une réponse HTTP 400 contenant la liste.
- Si aucune erreur, passe la main au middleware suivant ou au contrôleur.

### 4. Export
```js
module.exports = { taskValidationRules, validateTask };
```
- Rend disponible les règles et le middleware pour d’autres parties du projet.

## Exemple d’utilisation
Dans un routeur Express, on chaîne généralement les règles et le middleware :
```js
const { taskValidationRules, validateTask } = require('./middlewares/validateTask');

app.post('/tasks', taskValidationRules, validateTask, (req, res) => {
  // Traitement pour créer la tâche
});
```
Cela garantit que seules les tâches valides sont traitées par l’API.