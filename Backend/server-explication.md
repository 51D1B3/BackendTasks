# Explication du fichier server.js

Ce fichier est le point d'entrée principal de l'application backend. Il initialise et configure le serveur.

## Fonctionnalités principales

1. **Importation des modules nécessaires** :
   - Importe les modules comme Express, les middlewares, les routes, et la configuration de la base de données.

2. **Configuration du serveur Express** :
   - Initialise une instance d'Express.
   - Configure les middlewares (ex : gestion du JSON, gestion des erreurs, authentification, etc.).

3. **Définition des routes** :
   - Monte les routes d'authentification et de gestion des tâches sur des chemins spécifiques.

4. **Connexion à la base de données** :
   - Utilise le module de configuration pour établir la connexion à MongoDB.

5. **Démarrage du serveur** :
   - Lance le serveur sur le port spécifié (souvent défini dans les variables d'environnement).
   - Affiche un message dans la console pour indiquer que le serveur est opérationnel.

## Utilité

Ce fichier orchestre le démarrage et le fonctionnement global de l'application, assurant la liaison entre les différents modules et la gestion des requêtes HTTP.
