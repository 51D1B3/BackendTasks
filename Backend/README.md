# 🚀 Backend de gestion des tâches

Backend RESTful API en Node.js + Express pour la gestion collaborative des tâches d'une équipe, avec authentification JWT et MongoDB.

## 📋 Table des matières
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage rapide](#démarrage-rapide)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Authentification](#authentification)
- [Déploiement](#déploiement)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Contribution](#contribution)

## 🔧 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou cloud MongoDB Atlas)
- npm ou yarn

## 📦 Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd gestion-tasks-backend

# Installer les dépendances
npm install
```

## ⚙️ Configuration

1. Créer un fichier `.env` à la racine du projet :
```bash
cp .env.example .env
```

2. Configurer les variables d'environnement dans `.env` :
```env
PORT=5000

MONGO_URI=MONGO_URI="mongodb+srv://51D1B3:Sidibe2004@cluster0.i2yw1cl.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=Cluster0"

JWT_SECRET=votre_secret_jwt_ici

NODE_ENV=development
```

## 🚀 Démarrage rapide

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

L'API sera accessible sur `http://localhost:5001`

## 📡 API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription d'un nouvel utilisateur |
| POST | `/api/auth/login` | Connexion utilisateur |

### Tâches (routes protégées)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Récupérer toutes les tâches de l'utilisateur |
| GET | `/api/tasks/:id` | Récupérer une tâche spécifique |
| POST | `/api/tasks` | Créer une nouvelle tâche |
| PUT | `/api/tasks/:id` | Mettre à jour une tâche |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |

### Exemples de requêtes

**Inscription :**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456"}'
```

**Créer une tâche :**
```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT" \
  -d '{"title":"Ma première tâche","description":"Description détaillée","priority":"high"}'
```

## 🗃️ Modèles de données

### User (Utilisateur)
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hash),
  createdAt: Date,
  updatedAt: Date
}
```

### Task (Tâche)
```javascript
{
  title: String (required),
  description: String,
  priority: String (low|medium|high),
  status: String (todo|in-progress|done),
  dueDate: Date,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentification

L'API utilise JWT (JSON Web Token) pour l'authentification. Inclure le token dans le header :
```
Authorization: Bearer <votre_token_jwt>
```

## 🌐 Déploiement

### Déploiement sur Render
L'application est déployée sur Render et accessible à l'URL :
**https://backendtasks-5bde.onrender.com**

### Variables d'environnement pour Render
- `MONGO_URI`: URI MongoDB Atlas
- `JWT_SECRET`: Secret JWT sécurisé
- `NODE_ENV`: production

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Lancer l'application en mode production |
| `npm run dev` | Lancer l'application en mode développement avec nodemon |
| `npm test` | Lancer les tests (à implémenter) |

## 📁 Structure du projet

```
gestion-tasks-backend/
├── config/
│   ├── db.js              # Configuration MongoDB
│   └── db-explication.md  # Documentation DB
├── controllers/
│   ├── authController.js  # Logique d'authentification
│   └── taskController.js  # Logique des tâches
├── middlewares/
│   ├── auth.js           # Middleware JWT
│   ├── errorHandler.js   # Gestion des erreurs
│   └── validate*.js      # Validation des données
├── models/
│   ├── User.js           # Modèle utilisateur
│   └── Task.js           # Modèle tâche
├── routes/
│   ├── authRoutes.js     # Routes authentification
│   └── taskRoutes.js     # Routes tâches
├── utils/
│   └── paginate.js       # Pagination des résultats
├── server.js             # Point d'entrée
└── README.md             # Ce fichier
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème, ouvrez une issue sur GitHub ou contactez l'équipe de développement.

## Informations
Projet realiser par Mahamadou Sidibé.
