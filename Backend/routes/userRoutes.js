const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Routes protégées par authentification
router.use(auth);

// GET /api/users - Récupérer tous les utilisateurs (admin uniquement)
router.get('/', adminAuth, userController.getAllUsers);

// GET /api/users/:id - Récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Supprimer un utilisateur (admin uniquement)
router.delete('/:id', adminAuth, userController.deleteUser);

module.exports = router;
