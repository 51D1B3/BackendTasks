# Explication du fichier authController.js

Ce fichier gère la logique d'authentification des utilisateurs dans l'application.

## Fonctionnalités principales

1. **Inscription (Register)** :
   - Permet à un nouvel utilisateur de créer un compte.
   - Les informations sont validées et enregistrées dans la base de données.
   - Un mot de passe sécurisé est généralement hashé avant d'être stocké.

2. **Connexion (Login)** :
   - Vérifie les informations d'identification de l'utilisateur (email et mot de passe).
   - Si les informations sont correctes, un token d'authentification (JWT) est généré et renvoyé.

3. **Gestion des erreurs** :
   - Les erreurs d'authentification (utilisateur non trouvé, mot de passe incorrect, etc.) sont gérées et des messages appropriés sont renvoyés au client.

## Utilité

Ce contrôleur centralise toute la logique liée à l'authentification, ce qui facilite la maintenance et la sécurité du système d'accès des utilisateurs.
