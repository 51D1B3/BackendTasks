# Explication du fichier authRoutes.js

Ce fichier définit les routes liées à l'authentification des utilisateurs dans l'application.

## Fonctionnalités principales

1. **Définition des routes d'inscription et de connexion** :
   - Route pour l'inscription (`/register`) : permet à un nouvel utilisateur de créer un compte.
   - Route pour la connexion (`/login`) : permet à un utilisateur existant de se connecter.

2. **Association avec le contrôleur d'authentification** :
   - Les routes appellent les fonctions du contrôleur `authController` pour gérer la logique métier (validation, création de token, etc.).

3. **Gestion des middlewares** :
   - Peut inclure des middlewares pour la validation des données ou la gestion des erreurs.

## Utilité

Ce fichier centralise toutes les routes liées à l'authentification, facilitant la gestion et la sécurisation de l'accès utilisateur dans l'application.
