# Explication du fichier User.js

Ce fichier définit le modèle de données pour les utilisateurs dans l'application, en utilisant Mongoose.

## Fonctionnalités principales

1. **Définition du schéma de l'utilisateur** :
   - Spécifie les champs d'un utilisateur (ex : nom, email, mot de passe, date de création, etc.).
   - Définit les types de données, les validations et les contraintes (unicité de l'email, format du mot de passe, etc.).

2. **Hashage du mot de passe** :
   - Peut inclure des hooks (middleware Mongoose) pour hasher le mot de passe avant de le sauvegarder dans la base de données.

3. **Création du modèle Mongoose** :
   - Utilise le schéma pour créer un modèle Mongoose nommé `User`.
   - Ce modèle permet d'interagir avec la collection `users` dans la base de données MongoDB.

4. **Exportation du modèle** :
   - Le modèle est exporté pour être utilisé dans les contrôleurs et autres parties de l'application.

## Utilité

Ce fichier permet de structurer et de sécuriser les données des utilisateurs, facilitant ainsi l'authentification, la gestion des comptes et la cohérence des données dans la base MongoDB.
