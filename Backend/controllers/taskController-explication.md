# Explication du fichier taskController.js

Ce fichier gère la logique métier liée aux tâches dans l'application.

## Fonctionnalités principales

1. **Création de tâche** :
   - Permet à un utilisateur de créer une nouvelle tâche.
   - Les données de la tâche sont validées et enregistrées dans la base de données.

2. **Récupération des tâches** :
   - Permet de récupérer toutes les tâches ou celles d'un utilisateur spécifique.
   - Peut inclure la pagination ou le filtrage selon les besoins.

3. **Mise à jour de tâche** :
   - Permet de modifier les informations d'une tâche existante.
   - Vérifie que l'utilisateur a le droit de modifier la tâche.

4. **Suppression de tâche** :
   - Permet de supprimer une tâche existante.
   - Vérifie que l'utilisateur a le droit de supprimer la tâche.

5. **Gestion des erreurs** :
   - Les erreurs (tâche non trouvée, accès non autorisé, etc.) sont gérées et des messages appropriés sont renvoyés au client.

## Utilité

Ce contrôleur centralise toute la logique liée à la gestion des tâches, ce qui facilite la maintenance et l'évolution du système de gestion des tâches.
