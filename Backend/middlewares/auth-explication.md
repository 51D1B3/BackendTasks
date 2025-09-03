# Explication du fichier auth.js

Ce fichier est un middleware qui gère l'authentification des requêtes dans l'application.

## Fonctionnalités principales

1. **Vérification du token d'authentification** :
   - Intercepte les requêtes pour vérifier la présence d'un token (généralement JWT) dans les en-têtes.
   - Décode et valide le token pour s'assurer qu'il est authentique et non expiré.

2. **Autorisation de l'accès** :
   - Si le token est valide, le middleware autorise la requête à accéder aux routes protégées.
   - Si le token est absent ou invalide, la requête est rejetée avec un message d'erreur (ex : 401 Unauthorized).

3. **Gestion des erreurs** :
   - Les erreurs liées à l'authentification sont capturées et des réponses appropriées sont envoyées au client.

## Utilité

Ce middleware permet de sécuriser les routes sensibles de l'application en s'assurant que seules les requêtes authentifiées peuvent y accéder.
