# 📋 Gestionnaire de Tâches - Application Complète

Une application full-stack moderne de gestion de tâches avec backend Node.js/Express et frontend React.js.

## 🏗️ Architecture

- **Backend** : Node.js + Express + MongoDB + JWT
- **Frontend** : React 18 + React Router + Tailwind CSS
- **Base de données** : MongoDB
- **Authentification** : JWT (JSON Web Tokens)

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
# Installer toutes les dépendances (backend + frontend)
npm run install:all

# Ou installer séparément
npm run backend:install
npm run frontend:install
```

### 2. Configuration de l'environnement

**Backend** - Créer `Backend/.env` :
```env
MONGODB_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5001
NODE_ENV=development
```

**Frontend** - Créer `Frontend/.env` :
```env
REACT_APP_API_URL=http://localhost:5001/api
NODE_ENV=development
```

### 3. Démarrer l'application complète
```bash
# Démarre backend (port 5001) + frontend (port 3000) simultanément
npm run dev
```

**Ou démarrer séparément :**
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend  
npm run frontend:dev
```

### 4. Accéder à l'application
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5001/api

## 📁 Structure du Projet

```
GestionTasks/
├── Backend/                 # API Node.js/Express
│   ├── config/             # Configuration DB
│   ├── controllers/        # Logique métier
│   ├── middlewares/        # Middlewares Express
│   ├── models/             # Modèles MongoDB
│   ├── routes/             # Routes API
│   └── server.js           # Point d'entrée
├── Frontend/               # Application React
│   ├── public/             # Fichiers statiques
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── contexts/       # Contextes (Auth)
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── pages/          # Pages de l'app
│   │   ├── services/       # Services API
│   │   └── __tests__/      # Tests unitaires
│   └── package.json
└── package.json            # Scripts globaux
```

## 🔧 Scripts Disponibles

### Scripts Globaux
- `npm run dev` - Démarre backend + frontend en mode développement
- `npm run install:all` - Installe toutes les dépendances
- `npm test` - Lance les tests frontend

### Scripts Backend
- `npm run backend:dev` - Backend avec nodemon (auto-reload)
- `npm run backend:start` - Backend en mode production

### Scripts Frontend
- `npm run frontend:dev` - Frontend en mode développement
- `npm run frontend:build` - Build de production
- `npm run frontend:test` - Tests unitaires

## 🔐 Authentification

L'application utilise JWT pour l'authentification :
1. **Inscription** : Créez un compte avec nom, email, mot de passe
2. **Connexion** : Authentifiez-vous avec email/mot de passe
3. **Token JWT** : Stocké automatiquement pour les requêtes API

## 📋 Fonctionnalités

### Gestion des Tâches
- ✅ Créer des tâches avec titre, description, priorité, échéance
- ✏️ Modifier les tâches existantes
- 🗑️ Supprimer les tâches (avec confirmation)
- 🔄 Changer le statut : À faire → En cours → Terminé
- 🔍 Filtrer par statut et priorité

### Interface Utilisateur
- 📊 Tableau de bord avec statistiques
- 📱 Design responsive (mobile/desktop)
- 🎨 Interface moderne avec Tailwind CSS
- ⚡ Performance optimisée (React.memo, useCallback, useMemo)

## 🧪 Tests

```bash
# Tests frontend
npm run frontend:test

# Tests avec couverture
cd Frontend && npm test -- --coverage
```

## 🌐 Déploiement

### Frontend (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Déployez le dossier build/
```

### Backend (Heroku/Railway/Render)
```bash
cd Backend
# Configurez les variables d'environnement
# Déployez avec votre plateforme préférée
```

## 🔧 Prérequis

- **Node.js** 16+ 
- **MongoDB** (local ou Atlas)
- **npm** ou **yarn**

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Tâches
- `GET /api/tasks` - Liste des tâches (avec filtres)
- `GET /api/tasks/:id` - Détail d'une tâche
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

## 🐛 Dépannage

### Backend ne démarre pas
- Vérifiez que MongoDB est démarré
- Vérifiez le fichier `.env` dans Backend/
- Port 5001 disponible

### Frontend ne se connecte pas au backend
- Vérifiez que le backend est démarré sur le port 5001
- Vérifiez le fichier `.env` dans Frontend/
- Vérifiez la configuration CORS

### Erreurs d'authentification
- Videz le localStorage du navigateur
- Vérifiez la configuration JWT_SECRET

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez (`git commit -m 'Ajout fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

---

**Développé avec ❤️ - Gestionnaire de Tâches Full-Stack**
