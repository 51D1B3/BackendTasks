# Explication du fichier taskRoutes.js

Ce fichier définit les routes liées à la gestion des tâches dans l'application.

## Fonctionnalités principales

1. **Définition des routes CRUD pour les tâches** :
   - Route pour la création de tâche (`POST /tasks`).
   - Route pour la récupération des tâches (`GET /tasks`).
   - Route pour la mise à jour d'une tâche (`PUT /tasks/:id`).
   - Route pour la suppression d'une tâche (`DELETE /tasks/:id`).

2. **Association avec le contrôleur de tâches** :
   - Les routes appellent les fonctions du contrôleur `taskController` pour gérer la logique métier (création, modification, suppression, etc.).

3. **Gestion des middlewares** :
   - Peut inclure des middlewares pour l'authentification, la validation des données ou la gestion des erreurs.

## Utilité

Ce fichier centralise toutes les routes liées à la gestion des tâches, facilitant la maintenance et la sécurisation des opérations sur les tâches dans l'application.
