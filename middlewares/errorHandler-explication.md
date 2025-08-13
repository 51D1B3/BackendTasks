# Explication du fichier errorHandler.js

Ce fichier est un middleware qui gère la gestion des erreurs dans l'application.

## Fonctionnalités principales

1. **Capture des erreurs** :
   - Intercepte les erreurs survenant lors du traitement des requêtes HTTP.
   - Reçoit l'objet d'erreur, la requête, la réponse et la fonction `next`.

2. **Formatage de la réponse d'erreur** :
   - Formate et envoie une réponse claire au client avec le code d'état approprié (ex : 400, 404, 500).
   - Peut inclure un message d'erreur personnalisé ou générique selon le type d'erreur.

3. **Centralisation de la gestion des erreurs** :
   - Permet d'avoir un point unique pour gérer toutes les erreurs de l'application, facilitant la maintenance et le débogage.

## Utilité

Ce middleware améliore la robustesse de l'application en assurant que toutes les erreurs sont traitées de manière cohérente et sécurisée.
