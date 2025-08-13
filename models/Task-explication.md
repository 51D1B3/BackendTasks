# Explication du fichier Task.js

Ce fichier définit le modèle de données pour les tâches dans l'application, en utilisant Mongoose.

## Fonctionnalités principales

1. **Définition du schéma de la tâche** :
   - Spécifie les champs d'une tâche (ex : titre, description, statut, date d'échéance, utilisateur associé, etc.).
   - Définit les types de données, les validations et les valeurs par défaut pour chaque champ.

2. **Création du modèle Mongoose** :
   - Utilise le schéma pour créer un modèle Mongoose nommé `Task`.
   - Ce modèle permet d'interagir avec la collection `tasks` dans la base de données MongoDB.

3. **Exportation du modèle** :
   - Le modèle est exporté pour être utilisé dans les contrôleurs et autres parties de l'application.

## Utilité

Ce fichier permet de structurer et de valider les données des tâches, facilitant ainsi les opérations CRUD et la cohérence des données dans la base MongoDB.
